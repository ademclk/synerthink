# SEO + GEO checklist (2026)

This repo ships a TanStack Start + Nitro site. This document is a practical punch list to improve classic SEO *and* GEO (Generative Engine Optimization) for AI-grounded answers/citations.

## High priority

### 1) Crawl + index basics
- Ensure all important pages return `200` and have a single canonical URL (avoid duplicate `/blog` vs `/blog/`).
- Avoid accidental `noindex` on key pages.
- Keep JS/CSS crawlable (don’t block asset paths in `robots.txt`).

### 2) Sitemap + robots
- Publish `sitemap.xml` with accurate URLs and `lastmod`.
- Publish `robots.txt` with `Sitemap:` and block internal endpoints (`/api/`, `/_serverFn/`).

### 3) Structured data (JSON-LD)
- Site-wide: `Organization` (or `Person`), plus `WebSite`.
- Blog posts: `BlogPosting` with `headline`, `description`, `datePublished`, `dateModified`, and `author`.

### 4) “Groundable” content for AI citations
- Make pages stand alone: define key terms, state claims plainly, and cite sources when applicable.
- Prefer clear headings and scannable sections so extractors can quote accurately.
- Add author/editorial context where it matters (E‑E‑A‑T).

## Medium priority

### 5) Add `llms.txt` (GEO)
- Provide a short, LLM-friendly overview of Synerthink/Dotlanth and a curated list of key URLs.
- Keep it stable and updated as content grows.

### 6) Fast freshness signals
- Consider IndexNow for rapid URL updates (especially helpful for Bing ecosystems).
- Keep sitemaps honest: update `lastmod` only when content changes.

## Low priority (situational)
- RSS/Atom feed (`/feed.xml`) for blog discovery.
- Add schema types only if you can keep them correct (`FAQPage`, `Product`, etc.).
- Advanced i18n (`hreflang`, locale sitemaps) if/when multiple languages ship.

Operational follow-up:
- Use [search-monitoring-checklist.md](./search-monitoring-checklist.md) after launches to verify Google/Bing coverage and freshness.
