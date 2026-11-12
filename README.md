# Recharge Your Subconscious Mind

A responsive, single-page landing page built with React + Vite, styled around the dark plum and lavender palette in the supplied reference.

## Run locally
```bash
npm install
npm run dev
```

## Build for Vercel
```bash
npm run build
```
Vercel settings:
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

You can also import this repository directly into Vercel; the included `vercel.json` handles the SPA fallback.

## Interaction
The invitation section begins a four-second countdown once it scrolls into view. When the countdown finishes, a button appears and opens the supplied YouTube video in a new tab.

The video is embedded using YouTube's privacy-enhanced `youtube-nocookie.com` domain.