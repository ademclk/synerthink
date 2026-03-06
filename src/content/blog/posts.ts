export type BlogStatus = 'draft' | 'published'
export type BlogKind = 'releases' | 'research'

export type BlogFrontmatter = {
  title: string
  date: string
  tags: string[]
  status: BlogStatus
  subtitle?: string
  description?: string
  image?: string
  slug: string
}

export type BlogPostMeta = {
  slug: string
  kind: BlogKind
  frontmatter: BlogFrontmatter
}

export const blogPostsMeta: BlogPostMeta[] = [
  {
    slug: 'why-dotlanth-is-record-first',
    kind: 'research',
    frontmatter: {
      title: 'Why Dotlanth Is Record-First',
      date: '2026-03-06',
      tags: ['research'],
      status: 'published',
      subtitle: 'Designing a runtime where execution explains itself',
      description:
        'A research note on Dotlanth\'s record-first model: one syscall boundary, explicit capabilities, and run history written by default.',
      image: '/record-first.png',
      slug: 'why-dotlanth-is-record-first',
    },
  },
  {
    slug: 'dotlanth-v26-1-0-alpha',
    kind: 'releases',
    frontmatter: {
      title: 'Dotlanth v26.1.0-alpha',
      date: '2026-03-04',
      tags: ['release'],
      status: 'published',
      description:
        'A foundational milestone for autonomous execution. Built seamlessly from the ground up for absolute trust and immediate inspectability.',
      image: '/dotlanth-v2610alpha-og.png',
      slug: 'dotlanth-v26-1-0-alpha',
    },
  },
]
