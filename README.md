# A Scene Made for Her 🎬

> A tiny K-drama corner of the internet, made to make her smile.

A cozy, cute, slightly cinematic interactive gift site built with Vite + React.

## ✨ What's inside

- **Landing** — a soft K-drama title card with floating petals and film grain.
- **The Café** — a random little date-idea generator.
- **The Rainy Window** — mood buttons that reveal comforting notes, with gentle CSS rain.
- **The Letter Box** — tappable envelopes that open to handwritten messages.
- **The Playlist Bench** — K-drama "OST" scene cards (ready for Spotify/YouTube links).
- **The Arcade Corner** — *Catch the K-Drama Moments*, a cute falling-items mini-game.
- **The Secret Scene** — unlocks after exploring at least 4 sections, with a sincere ending and claimable rewards.

Progress is tracked in `localStorage` under `scene-made-for-her-progress`.

## 🧰 Tech stack

Vite · React · React Router · Tailwind CSS · Framer Motion

## 🚀 Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## 🌐 Deployment

The app uses a relative base (`base: './'`) and `HashRouter`, so it works out of
the box on **GitHub Pages**, **Vercel**, and **Netlify** with no extra config.

### GitHub Pages (automated)

A workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds
and deploys on every push to `main`. To enable it:

1. Push this repo to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source** and pick **GitHub Actions**.
3. Push to `main` — the site deploys automatically.

---

made by Aleem, softly.
