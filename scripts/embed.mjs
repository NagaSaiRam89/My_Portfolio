/**
 * Pre-embeds content/corpus.json into api/_index.json.
 *
 * Run once (and again whenever the corpus changes):
 *   GEMINI_API_KEY=... npm run embed
 *
 * The generated index is committed and read by the api/ask.js serverless
 * function, so the deployed site never embeds the corpus at request time —
 * only the incoming question.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const API_KEY = process.env.GEMINI_API_KEY;
const EMBED_MODEL = process.env.GEMINI_EMBED_MODEL || "gemini-embedding-001";

if (!API_KEY) {
  console.error(
    "GEMINI_API_KEY is not set.\n" +
      "Get a key at https://aistudio.google.com/apikey, then run:\n" +
      "  GEMINI_API_KEY=your-key npm run embed\n" +
      "On PowerShell:  $env:GEMINI_API_KEY='your-key'; npm run embed"
  );
  process.exit(1);
}

const corpus = JSON.parse(
  readFileSync(resolve(root, "content/corpus.json"), "utf8")
);

async function embed(text, taskType) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        model: `models/${EMBED_MODEL}`,
        content: { parts: [{ text }] },
        taskType,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Embedding failed (${response.status}): ${await response.text()}`
    );
  }

  const json = await response.json();
  return json.embedding.values;
}

const index = [];
for (const [i, chunk] of corpus.entries()) {
  process.stdout.write(`  [${i + 1}/${corpus.length}] ${chunk.id}\n`);
  index.push({
    id: chunk.id,
    source: chunk.source,
    text: chunk.text,
    embedding: await embed(chunk.text, "RETRIEVAL_DOCUMENT"),
  });
}

mkdirSync(resolve(root, "api"), { recursive: true });
writeFileSync(
  resolve(root, "api/_index.json"),
  JSON.stringify({ model: EMBED_MODEL, chunks: index })
);

console.log(
  `\nWrote api/_index.json — ${index.length} chunks, ` +
    `${index[0].embedding.length} dimensions, model ${EMBED_MODEL}.`
);
