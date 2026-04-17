# Zoe's BookSphere

Zoe's BookSphere is a premium book and knowledge platform built with Next.js, React, and Tailwind CSS. It is designed as a high-conversion editorial experience for curated reading, self-development, and digital content discovery.

## What is included

- Premium homepage with hero, value proposition, feature grid, social proof, how-it-works, library showcase, CTA, and footer
- Interactive book browser with filters, bookmarks, and recommendation logic
- Dynamic book detail route at `/books/[slug]`
- Library, guides, account, and CMS pages
- Mock authentication and local CMS editor
- Clean App Router structure with reusable components
- Custom design system, responsive layout, and accessible interactions

## Run locally

```bash
npm install
npm run dev
```

## Supabase setup

Create a local `.env.local` with these values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`

Use `.env.example` as the template for the same variable names.

## Deploy

Add the same environment variables in Vercel before deploying the app.

## Build for production

```bash
npm run build
npm run start
```

## Project structure

- `src/app` - App Router pages, layout, and global styles
- `src/components` - Reusable UI and section components
- `src/data` - Mock catalog and marketing content
- `src/lib` - Filtering and recommendation helpers
