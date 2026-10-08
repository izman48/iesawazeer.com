# iesawazeer.com

Personal site. Next.js (App Router) + MDX, statically exported and deployed
to Netlify on merge to `master`.

The previous Vue 2 + Vuetify version is preserved on the `vue-legacy` branch.

## Develop

```
npm install
npm run dev
```

## Test

```
npm test           # builds the static export, then runs the tests
npm run test:unit  # tests only, against the existing out/
npm run typecheck
```

The tests use Node's built-in runner and need Node 22.18 or newer (native
TypeScript type stripping).

## Add a blog post

Drop a `.mdx` file in `content/posts/` with frontmatter:

```
---
title: My post
date: '2026-07-02'
description: Optional one-liner.
---
```

## Feature a project

Add its repo name to `data/projects.ts`. Description, language, and stars are
pulled from the GitHub API at build time; set `blurb` to override the wording.
