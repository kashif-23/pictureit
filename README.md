# PictureIt

PictureIt is a modern interactive cybersecurity learning platform built with React and Vite.

## Setup

```bash
cd /Users/kashifamanat/pictureit/pictureit
npm install
npm run dev
```

## Project structure

- `src/App.tsx` — main page and sections
- `src/components/BufferOverflowDemo.tsx` — interactive buffer overflow simulator
- `src/components/ProcessHollowingDemo.tsx` — process hollowing visualizer
- `src/styles.css` — dark UI styling and responsive layout

## Notes

This project focuses on visual intuition and hands-on learning for cybersecurity concepts.

## Cloudflare deployment

- Build command: `npm run build`
- Output directory: `dist`
- For Cloudflare Workers static site hosting, use the provided `wrangler.toml`.
- When deploying, make sure the repo root is the Vite project root so Cloudflare can find `package.json` and `wrangler.toml`.
