import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { blogPostsMeta } from './src/content/blog/posts'

const SITE_URL = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://synerthink.com').replace(
  /\/+$/,
  ''
)
const SITE_TITLE = 'Synerthink'
const SITE_DESCRIPTION =
  'Synerthink builds foundational computing products for autonomous systems. Dotlanth is a high-trust execution fabric focused on record-first observability, replayable runs, and capability-explicit security.'

function getGitLastModified(...sourcePaths: string[]) {
  const paths = sourcePaths.filter(Boolean)
  if (paths.length === 0) return undefined

  try {
    const result = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], {
      encoding: 'utf8',
    }).trim()
    return result || undefined
  } catch {
    return undefined
  }
}

function createPage(
  path: string,
  sourcePaths: string[],
  sitemap?: {
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority?: number
    lastmod?: string
  }
) {
  const lastmod = sitemap?.lastmod ?? getGitLastModified(...sourcePaths)

  return {
    path,
    sitemap: {
      ...sitemap,
      ...(lastmod ? { lastmod } : {}),
    },
  }
}

const blogSourcePathsBySlug: Record<string, string[]> = {
  'why-dotlanth-is-record-first': [
    'src/content/blog/posts.ts',
    'src/components/blog/posts/RecordFirstPost.tsx',
  ],
  'dotlanth-v26-1-0-alpha': [
    'src/content/blog/posts.ts',
    'src/components/blog/posts/V26AlphaPost.tsx',
  ],
}

function xmlEscape(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function toRssDate(value: string) {
  return new Date(value).toUTCString()
}

const publishedBlogPosts = blogPostsMeta
  .filter((post) => post.frontmatter.status === 'published')
  .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())

function buildRssFeed(siteUrl: string) {
  const lastBuildDate = publishedBlogPosts[0]?.frontmatter.date ?? new Date().toISOString()
  const items = publishedBlogPosts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`
      const description = post.frontmatter.description ?? post.frontmatter.subtitle ?? post.frontmatter.title
      const categories = post.frontmatter.tags
        .map((tag) => `    <category>${xmlEscape(tag)}</category>`)
        .join('\n')

      return [
        '  <item>',
        `    <title>${xmlEscape(post.frontmatter.title)}</title>`,
        `    <link>${xmlEscape(url)}</link>`,
        `    <guid isPermaLink="true">${xmlEscape(url)}</guid>`,
        `    <pubDate>${toRssDate(post.frontmatter.date)}</pubDate>`,
        `    <description>${xmlEscape(description)}</description>`,
        categories,
        '  </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${SITE_TITLE}</title>`,
    `    <link>${siteUrl}/blog</link>`,
    `    <description>${xmlEscape(SITE_DESCRIPTION)}</description>`,
    '    <language>en</language>',
    `    <lastBuildDate>${toRssDate(lastBuildDate)}</lastBuildDate>`,
    `    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}

function buildAtomFeed(siteUrl: string) {
  const updated = publishedBlogPosts[0]?.frontmatter.date ?? new Date().toISOString()
  const entries = publishedBlogPosts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`
      const summary = post.frontmatter.description ?? post.frontmatter.subtitle ?? post.frontmatter.title

      return [
        '  <entry>',
        `    <title>${xmlEscape(post.frontmatter.title)}</title>`,
        `    <link href="${xmlEscape(url)}" />`,
        `    <id>${xmlEscape(url)}</id>`,
        `    <updated>${new Date(post.frontmatter.date).toISOString()}</updated>`,
        `    <summary>${xmlEscape(summary)}</summary>`,
        '    <author>',
        '      <name>Synerthink</name>',
        '    </author>',
        '  </entry>',
      ].join('\n')
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${SITE_TITLE}</title>`,
    `  <subtitle>${xmlEscape(SITE_DESCRIPTION)}</subtitle>`,
    `  <link href="${siteUrl}/atom.xml" rel="self" />`,
    `  <link href="${siteUrl}/blog" />`,
    `  <id>${siteUrl}/blog</id>`,
    `  <updated>${new Date(updated).toISOString()}</updated>`,
    '  <author>',
    '    <name>Synerthink</name>',
    '  </author>',
    entries,
    '</feed>',
    '',
  ].join('\n')
}

function writeFeedArtifacts(siteUrl: string) {
  const publicDir = join(process.cwd(), 'public')
  mkdirSync(publicDir, { recursive: true })
  writeFileSync(join(publicDir, 'feed.xml'), buildRssFeed(siteUrl))
  writeFileSync(join(publicDir, 'atom.xml'), buildAtomFeed(siteUrl))
}

writeFeedArtifacts(SITE_URL)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    nitro(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart({
      sitemap: {
        enabled: true,
        host: SITE_URL,
        outputPath: 'sitemap.xml',
      },
      pages: [
        createPage('/', ['src/routes/index.tsx', 'src/components/HomeSections.tsx'], {
          changefreq: 'weekly',
          priority: 1,
        }),
        createPage('/about', ['src/routes/about.tsx'], {
          changefreq: 'monthly',
          priority: 0.6,
        }),
        createPage('/solutions', ['src/routes/solutions.tsx'], {
          changefreq: 'monthly',
          priority: 0.5,
        }),
        createPage('/resources', ['src/routes/resources.tsx'], {
          changefreq: 'monthly',
          priority: 0.5,
        }),
        createPage('/products', ['src/routes/products.index.tsx'], {
          changefreq: 'weekly',
          priority: 0.8,
        }),
        createPage('/products/dotlanth', ['src/routes/products.dotlanth.tsx'], {
          changefreq: 'weekly',
          priority: 0.9,
        }),
        createPage('/blog', ['src/routes/blog.index.tsx', 'src/content/blog/posts.ts'], {
          changefreq: 'weekly',
          priority: 0.8,
        }),
        ...blogPostsMeta
          .filter((post) => post.frontmatter.status === 'published')
          .map((post) =>
            createPage(
              `/blog/${post.slug}`,
              blogSourcePathsBySlug[post.slug] ?? ['src/content/blog/posts.ts'],
              {
                changefreq: post.kind === 'releases' ? 'monthly' : 'yearly',
                priority: post.kind === 'releases' ? 0.8 : 0.7,
                lastmod:
                  getGitLastModified(...(blogSourcePathsBySlug[post.slug] ?? [])) ??
                  post.frontmatter.date,
              }
            )
          ),
      ],
    }),
    react(),
  ],
})
