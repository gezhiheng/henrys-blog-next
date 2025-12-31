Henry's blog built with Next.js App Router, Markdown content, and Tailwind CSS.

## Requirements

- Node.js 20+
- pnpm 9+

## Local development

Install dependencies and start the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

```bash
pnpm dev    # start dev server
pnpm build  # build for production
pnpm start  # start production server
pnpm lint   # run ESLint
```

## Project structure

- `src/app/` Next.js routes, layouts, and route handlers
- `src/components/` shared UI and layout components
- `src/lib/` content helpers and formatting
- `content/` Markdown posts
- `public/` static assets

## Docker

Build and run locally:

```bash
docker build -t henrys-blog-next .
docker run --rm -p 3000:3000 henrys-blog-next
```

## CI/CD

- CI runs on pull requests and `main` (lint + build).
- CD builds and pushes a Docker image to GHCR, then deploys over SSH if secrets are set.

Required secrets for deployment:

- `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, optional `DEPLOY_PORT`
- `GHCR_USERNAME`, `GHCR_TOKEN`

## Notes

- Production runs via Docker on port 3000; Nginx can reverse proxy to it.
- TypeScript build errors are ignored for deployment (`next.config.ts`).
