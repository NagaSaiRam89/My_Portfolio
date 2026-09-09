# Portfolio — Naga Sai Ram Sunkara

Personal site for a backend and AI engineer. React + TypeScript on Vite, Tailwind
and shadcn/ui, deployed on Vercel. Includes a retrieval-backed assistant that
answers questions about the work, grounded in the résumé and project notes.

Live: [nagasairams-portfolio.com](https://nagasairams-portfolio.com)

## Running locally

```sh
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in what you need — every feature degrades
gracefully when its variable is unset, so the site runs fine with an empty file.

## Structure

| Path | What's in it |
| --- | --- |
| `src/components/` | Page sections. Content lives in a `const` at the top of each file. |
| `src/pages/CaseSnapStudy.tsx` | The SnapStudy AI case study at `/case/snapstudy`. |
| `src/hooks/use-reveal.ts` | Scroll reveal that respects reduced motion and never leaves a section stuck invisible. |
| `content/corpus.json` | Source documents the assistant answers from. |
| `scripts/embed.mjs` | Pre-embeds the corpus into `api/_index.json`. |
| `api/ask.js` | Serverless endpoint for the assistant. Holds the Gemini key. |

## Contact form

Set `VITE_CONTACT_ENDPOINT` to a form relay URL ([Formspree](https://formspree.io)
or [Web3Forms](https://web3forms.com), both free) and the contact form posts to it.

Leave it unset and the site renders a direct-email panel instead. That is a
deliberate fallback: a form that silently drops messages is worse than no form.

## The "Ask this portfolio" assistant

Retrieval-augmented generation over `content/corpus.json`. The corpus is embedded
ahead of time; at request time the serverless function embeds only the incoming
question, takes the nearest chunks by cosine similarity, and asks Gemini to answer
from those and nothing else — citing which sources it used.

**The API key never reaches the browser.** It is read by `api/ask.js` at request
time and is not exposed to the client. Do not prefix it with `VITE_`.

### Setup

1. Get a key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

2. Build the embedding index once (and again whenever `content/corpus.json`
   changes). This is the only step that needs the key locally:

   ```sh
   # PowerShell
   $env:GEMINI_API_KEY='your-key'; npm run embed

   # bash / zsh
   GEMINI_API_KEY=your-key npm run embed
   ```

   That writes `api/_index.json`. Commit it — the deployed function reads it.

3. Add `GEMINI_API_KEY` to your Vercel project under
   Settings → Environment Variables, then deploy.

Until step 3 is done the widget answers with a clear "only runs on the deployed
site" message rather than failing silently.

### Changing what it knows

Edit `content/corpus.json` and re-run `npm run embed`. Each entry needs an `id`,
a `source` (the label shown as a citation) and `text`. Keep chunks to a single
topic — retrieval is per chunk, so a chunk covering three subjects matches all
three weakly instead of one strongly.

### Model IDs

Defaults are `gemini-3.8-flash` for generation and `gemini-embedding-001` for
embeddings. Override with `GEMINI_MODEL` and `GEMINI_EMBED_MODEL` if either is
retired. If a model ID is wrong the function logs the upstream error verbatim.

## Deploying

`vercel.json` rewrites all paths to `index.html` so client-side routes like
`/case/snapstudy` survive a refresh. `public/_redirects` does the same on
Netlify and Render.

Two static assets are referenced but not in the repo — add them before launch:

- `public/resume.pdf` — the hero's Resume button points here
- `public/og.png` — 1200×630 social share card, referenced by the meta tags

## Scripts

```sh
npm run dev      # dev server
npm run build    # production build
npm run embed    # rebuild the assistant's embedding index
npm run lint     # eslint
```
