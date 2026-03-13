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
  versionLabel?: string
  ctaHref?: string
  ctaLabel?: string
  slug: string
}

export type BlogPostMeta = {
  slug: string
  kind: BlogKind
  frontmatter: BlogFrontmatter
}

export const blogPostsMeta = [
  {
    slug: 'dotlanth-v26-2-0-alpha',
    kind: 'releases',
    frontmatter: {
      title: 'Dotlanth v26.2.0-alpha',
      date: '2026-03-13',
      tags: [
        'release',
        'artifacts',
        'replayable-systems',
        'capability-security',
        'ai-infrastructure',
      ],
      status: 'published',
      subtitle: 'Why artifact-first execution matters for reliable AI-native systems',
      description:
        'Dotlanth v26.2.0-alpha turns artifacts into the unit of truth with capability reports, trace export, replay tooling, and a new capability lab for exercising real runs.',
      image: '/dotlanth-v2620alpha.png',
      versionLabel: 'v26.2.0-alpha',
      ctaHref: 'https://github.com/ademclk/dotlanth/releases/tag/v26.2.0-alpha',
      ctaLabel: 'Try it on GitHub',
      slug: 'dotlanth-v26-2-0-alpha',
    },
  },
  {
    slug: 'inside-dotvm-syscall-boundary',
    kind: 'research',
    frontmatter: {
      title: 'The ABI Behind Replayable Compute',
      date: '2026-03-12',
      tags: ['research', 'dotvm', 'vm-design', 'deterministic-systems', 'record-replay'],
      status: 'published',
      subtitle: 'Why Dotlanth starts with a tiny register VM, a versioned syscall ABI, and recorded events',
      description:
        'How Dotlanth uses a minimal register VM, a versioned syscall ABI, and structured recorded events to make replayable execution practical for AI-native systems.',
      image: '/replayable_compute.png',
      slug: 'inside-dotvm-syscall-boundary',
    },
  },
  {
    slug: 'why-dotdb-starts-with-sqlite',
    kind: 'research',
    frontmatter: {
      title: 'Inside DotDB: Why Deterministic Systems Start Local',
      date: '2026-03-10',
      tags: ['research', 'dotdb', 'sqlite', 'deterministic-systems', 'state'],
      status: 'published',
      subtitle: 'Why DotDB begins as a local storage contract, not a remote service',
      description:
        'Why DotDB uses a local SQLite backend for runs, logs, and state in Dotlanth, and why that storage contract matters more than the specific engine.',
      image: '/inside_dotdb.png',
      slug: 'why-dotdb-starts-with-sqlite',
    },
  },
  {
    slug: 'why-dotdsl-is-a-source-language',
    kind: 'research',
    frontmatter: {
      title: 'Why dotDSL Reads Like a Program',
      date: '2026-03-07',
      tags: ['research', 'dotdsl', 'dsl-design', 'language-design'],
      status: 'published',
      subtitle: 'Why the language optimizes for intent, validation, and runtime alignment',
      description:
        'A research note on why dotDSL v0.1 is designed as a source language with a single dot file, explicit end blocks, strict validation, and capability declarations.',
      image: '/dotdsl-programs.png',
      slug: 'why-dotdsl-is-a-source-language',
    },
  },
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
      versionLabel: 'v26.1.0-alpha',
      ctaHref: 'https://github.com/ademclk/dotlanth/releases/tag/v26.1.0-alpha',
      ctaLabel: 'Try it on GitHub',
      slug: 'dotlanth-v26-1-0-alpha',
    },
  },
] satisfies BlogPostMeta[]
