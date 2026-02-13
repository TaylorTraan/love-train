# Love Train

A journey for Taylor and Jamie — a scroll-driven, cinematic site built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

Start the production server with:

```bash
npm start
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com), sign in, and click **Add New Project**.
3. Import the GitHub repository. Vercel will detect Next.js automatically.
4. Use default settings (Node.js 18+ is supported). No environment variables are required.
5. Deploy. Your site will be live at a `*.vercel.app` URL.

Alternatively, use the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npx vercel
```

Follow the prompts to link the project and deploy.

## Replacing placeholder images

Placeholder SVGs live in `public/images/year1` through `public/images/year4` (five images per folder). Replace them with your own photos (e.g. `.jpg` or `.webp`) and update the `src` paths in `app/data/memories.ts` to match (e.g. `/images/year1/1.jpg`). The app uses `next/image` with lazy loading and will optimize non-SVG images automatically.
