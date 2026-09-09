/**
 * POST /api/ask — answers a question about this portfolio, with citations.
 *
 * The Gemini key lives here and never reaches the browser. The corpus is
 * pre-embedded into _index.json by `npm run embed`; at request time we embed
 * only the question, take the nearest chunks by cosine similarity, and ask the
 * model to answer from those and nothing else.
 */
const API_KEY = process.env.GEMINI_API_KEY;
const CHAT_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

/**
 * The pre-built index is loaded lazily: a static import of a file that
 * `npm run embed` has not generated yet takes the whole function down with
 * FUNCTION_INVOCATION_FAILED before the handler can report anything useful.
 */
let indexPromise;
function loadIndex() {
  indexPromise ??= import("./_index.json", { with: { type: "json" } })
    .then((module) => module.default)
    .catch(() => null);
  return indexPromise;
}

const TOP_K = 6;
const MAX_QUESTION_LENGTH = 400;
const RATE_LIMIT = { windowMs: 60_000, max: 8 };

const SYSTEM_INSTRUCTION = `You answer questions about Naga Sai Ram Sunkara for visitors to his portfolio site — usually recruiters and engineers.

Rules:
- Answer only from the CONTEXT provided. It is the complete record you have.
- If the context does not contain the answer, say so plainly and suggest emailing ramhere939@gmail.com. Never guess, and never pad an answer with plausible-sounding detail that is not in the context.
- Never invent numbers, dates, employers, technologies or claims. Every specific must appear in the context verbatim.
- Cite the sources you used by their exact [Source] labels, at the end, on one line beginning "Sources:".
- Be concise: two to four sentences for most questions. Answer the question that was asked.
- Write in the third person about him. Be factual and plain; do not oversell.
- If asked something unrelated to his work, background or this portfolio, say that is outside what you can help with and redirect to his work.`;

const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || now - record.start > RATE_LIMIT.windowMs) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  record.count += 1;
  return record.count > RATE_LIMIT.max;
}

function cosine(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dot / denominator;
}

async function gemini(path, body) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${path}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    const error = new Error(`Gemini ${path} returned ${response.status}: ${detail}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }

  if (!API_KEY) {
    return res.status(500).json({
      error: "The assistant is not configured. Set GEMINI_API_KEY.",
    });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({
      error: "That is a lot of questions at once. Try again in a minute.",
    });
  }

  const question = (req.body?.question || "").toString().trim();
  if (!question) {
    return res.status(400).json({ error: "Ask a question first." });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({
      error: `Keep it under ${MAX_QUESTION_LENGTH} characters.`,
    });
  }

  const index = await loadIndex();
  if (!index?.chunks?.length) {
    console.error("[ask] api/_index.json is missing — run `npm run embed`.");
    return res.status(503).json({
      error:
        "The assistant's search index hasn't been built yet. Email ramhere939@gmail.com in the meantime.",
    });
  }
  const EMBED_MODEL =
    process.env.GEMINI_EMBED_MODEL || index.model || "gemini-embedding-001";

  try {
    // 1. Embed the question in the same space as the corpus.
    const embedded = await gemini(`${EMBED_MODEL}:embedContent`, {
      model: `models/${EMBED_MODEL}`,
      content: { parts: [{ text: question }] },
      taskType: "RETRIEVAL_QUERY",
    });
    const queryVector = embedded.embedding.values;

    // 2. Retrieve the nearest chunks.
    const retrieved = index.chunks
      .map((chunk) => ({ ...chunk, score: cosine(queryVector, chunk.embedding) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    const context = retrieved
      .map((chunk) => `[${chunk.source}]\n${chunk.text}`)
      .join("\n\n");

    // 3. Answer from those chunks only.
    const completion = await gemini(`${CHAT_MODEL}:generateContent`, {
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      contents: [
        {
          role: "user",
          parts: [{ text: `CONTEXT:\n${context}\n\nQUESTION: ${question}` }],
        },
      ],
      generationConfig: { temperature: 0.2, maxOutputTokens: 600 },
    });

    const answer = completion.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join("")
      .trim();

    if (!answer) {
      return res.status(502).json({
        error: "The model returned an empty answer. Try rephrasing.",
      });
    }

    return res.status(200).json({
      answer,
      sources: [...new Set(retrieved.map((chunk) => chunk.source))],
    });
  } catch (error) {
    console.error("[ask]", error);

    // 401/403 means the key is rejected or its project is blocked, and 404 a
    // retired model id — both are configuration, not a transient outage. They
    // are worth separating in the logs so the next person isn't guessing.
    if (error.status === 401 || error.status === 403) {
      return res.status(502).json({
        error:
          "The assistant's API key was rejected. Email ramhere939@gmail.com instead.",
      });
    }

    return res.status(502).json({
      error: `Couldn't reach the model. Email ramhere939@gmail.com instead.`,
    });
  }
}
