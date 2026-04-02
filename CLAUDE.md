# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (runs on :3000, or :3002 if already occupied)
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured.

## Critical: Next.js version

This project runs **Next.js 16.2.2** — read `node_modules/next/dist/docs/` before writing any Next.js-specific code. APIs and conventions differ from earlier versions. Heed all deprecation notices.

## Architecture

### Routing

- `src/proxy.ts` — next-intl middleware (intentionally named `proxy.ts`, NOT `middleware.ts`; Next.js 16.2.2 requires this)
- All public pages live under `src/app/[locale]/` and are wrapped by next-intl
- Admin pages live under `src/app/admin/` and are **excluded** from i18n middleware (see matcher in `proxy.ts`)
- Auth guard is applied only to `src/app/admin/(protected)/layout.tsx` — the login page at `src/app/admin/login/` sits outside this group intentionally to avoid redirect loops

### Supabase clients — use the right one

| File | When to use |
|------|-------------|
| `src/lib/supabase/server.ts` | Server Components, Route Handlers — uses SSR cookies |
| `src/lib/supabase/client.ts` | Client Components — browser session |
| `src/lib/supabase/admin.ts` | Server Actions that must bypass RLS — uses `SUPABASE_SERVICE_ROLE_KEY` |

**All DB mutations in Server Actions must use `createAdminClient()`** — the anon/browser client is blocked by RLS for writes.

### Data flow pattern

```
src/lib/queries/*.ts      → read-only fetches (Server Components)
src/lib/actions/*.ts      → "use server" mutations (Server Actions, always use createAdminClient)
```

### i18n

- Locales: `ja` (default), `en`, `zh`, `ko`
- Message files: `messages/{locale}.json`
- Routing config: `src/i18n/routing.ts`
- `useTranslations()` in Client Components, `getTranslations()` in Server Components

### SEO

All metadata is generated via `src/lib/seo.ts` → `buildMetadata(locale, page)`. This function outputs title, description, canonical URL, hreflang (ja/en/zh/ko/x-default), OGP, and Twitter card. Add new pages by extending the `titles` and `descriptions` records in that file.

### Dynamic effects components

Reusable animation components in `src/components/common/`:
- `ScrollFadeIn` — Intersection Observer fade-in (supports delay, direction)
- `ParallaxSection` — scroll parallax wrapper
- `PageLoader` — site entry loader
- `CountUp` — animated number counter
- `CastRibbon` — auto-scrolling marquee
- `RippleButton` — click ripple effect

### Environment variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY     ← server-only, never expose to client
```

### Deployment

- Hosted on **Vercel**, auto-deploys on push to `main`
- GitHub: `git@github.com:pan811ua-web/royal-legato.git`
- Production URL: `https://royal-legato.vercel.app`
