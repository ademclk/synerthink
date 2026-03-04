import React from 'react'

export type BlogStatus = 'draft' | 'published'
export type BlogKind = 'releases' | 'research'

export type BlogFrontmatter = {
  title: string
  date: string
  tags: string[]
  status: BlogStatus
  description?: string
  image?: string
  slug: string
}

export type BlogPost = {
  slug: string
  kind: BlogKind
  frontmatter: BlogFrontmatter
  component: React.ComponentType
}

// Lazy load the actual post components so they don't bloat the main bundle
const posts: BlogPost[] = [
  {
    slug: 'dotlanth-v26-1-0-alpha',
    kind: 'releases',
    frontmatter: {
      title: 'Dotlanth v26.1.0-alpha',
      date: '2026-03-04',
      tags: ['release'],
      status: 'published',
      description: 'A foundational milestone for autonomous execution. Built seamlessly from the ground up for absolute trust and immediate inspectability.',
      image: '/dotlanth-v2610alpha.svg',
      slug: 'dotlanth-v26-1-0-alpha',
    },
    component: React.lazy(() => import('@/components/blog/posts/V26AlphaPost')),
  },
]

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
