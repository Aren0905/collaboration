# The Other Chair

Cinematic storytelling site that explains a transparent remote software collaboration: technical delivery and English communication as complementary roles (illustrative 60% / 40% responsibility share).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- GSAP ScrollTrigger
- Lenis
- Motion for React
- React Three Fiber (lazy, optional)

## Develop

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy (Vercel free)

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com): **Add New Project** → import the GitHub repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables required.
4. Deploy. Vercel will run `npm run build` (`next build --webpack`).

Optional CLI:

```bash
npx vercel
```

## Assets

Optional media:

- `public/images/`
- `public/videos/`
- `public/audio/`
