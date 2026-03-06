import { execFileSync } from 'node:child_process'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { blogPostsMeta } from './src/content/blog/posts'

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

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    nitro(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart({
      sitemap: {
        enabled: true,
        host: (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://synerthink.com').replace(/\/+$/, ''),
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
