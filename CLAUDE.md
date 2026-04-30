# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

No test suite is configured.

## Environment

The app requires one env var at runtime:

```
N8N_URL=<base URL of the n8n instance>
```

The form POSTs JSON to `${N8N_URL}/webhook/contact-insert`.

## Architecture

Single-page Next.js app (App Router) with one route (`/`). No API routes.

- `src/app/layout.tsx` — root layout; imports Bootstrap CSS globally and mounts `BootstrapClient`
- `src/app/page.tsx` — the entire UI: a client component (`'use client'`) with a contact form (first name, last name, email, consent checkbox) that submits to the n8n webhook
- `src/components/BootstrapClient.tsx` — dynamically imports Bootstrap JS on the client; exists as a separate component because Bootstrap's JS bundle requires browser APIs and cannot be imported at module level in a Server Component context
- `src/app/globals.css` — pastel color scheme (blue/pink/yellow/purple variables) overriding Bootstrap defaults with `!important`

`@/*` maps to `src/*` (configured in `tsconfig.json`).
