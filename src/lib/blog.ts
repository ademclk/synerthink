import React from 'react'

import { blogPostsMeta, type BlogPostMeta } from '@/content/blog/posts'

export type { BlogFrontmatter, BlogKind, BlogStatus } from '@/content/blog/posts'

export type BlogPost = BlogPostMeta & {
  component: React.ComponentType
}

const componentsBySlug: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = {
  'why-dotdsl-is-a-source-language': () =>
    import('@/components/blog/posts/DotDslPseudocodePost'),
  'why-dotlanth-is-record-first': () =>
    import('@/components/blog/posts/RecordFirstPost'),
  'dotlanth-v26-1-0-alpha': () => import('@/components/blog/posts/V26AlphaPost'),
}

// Lazy load the actual post components so they don't bloat the main bundle
const posts: BlogPost[] = blogPostsMeta.map((postMeta) => {
  const importer = componentsBySlug[postMeta.slug]
  if (!importer) {
    throw new Error(`Missing blog post component for slug: ${postMeta.slug}`)
  }
  return { ...postMeta, component: React.lazy(importer) }
})

function toSortableTime(date: string) {
  const time = new Date(date).getTime()
  return Number.isFinite(time) ? time : 0
}

export function getAllBlogPosts(opts?: { includeDrafts?: boolean }): BlogPost[] {
  const includeDrafts = opts?.includeDrafts ?? true

  return posts
    .filter((post) => includeDrafts || post.frontmatter.status === 'published')
    .sort((a, b) => toSortableTime(b.frontmatter.date) - toSortableTime(a.frontmatter.date))
}

export function getBlogPostBySlug(
  slug: string,
  opts?: { includeDrafts?: boolean }
): BlogPost | null {
  const includeDrafts = opts?.includeDrafts ?? true
  return getAllBlogPosts({ includeDrafts }).find((post) => post.slug === slug) ?? null
}
