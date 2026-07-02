# iesawazeer.com

Personal site. Next.js (App Router) + MDX, statically exported and deployed
to Netlify on merge to `master`.

The previous Vue 2 + Vuetify version is preserved on the `vue-legacy` branch.

## Develop

```
npm install
npm run dev
```

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
