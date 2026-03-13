import * as React from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { getBlogPostBySlug } from '@/lib/blog'
import { absoluteUrl, DEFAULT_OG_IMAGE_PATH, getSiteUrl } from '@/lib/seo'

const INCLUDE_DRAFTS = import.meta.env.DEV

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    // Only check if it exists in the loader to throw a 404
    // We do NOT return the post object here because TanStack Router
    // tries to serialize the loader data, and React Components (post.component)
    // are not serializable.
    const post = getBlogPostBySlug(params.slug, { includeDrafts: INCLUDE_DRAFTS })
    if (!post) throw notFound()
    return { slug: params.slug }
  },
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug, { includeDrafts: INCLUDE_DRAFTS })
    const title = post ? `${post.frontmatter.title} | Synerthink Blog` : 'Blog | Synerthink'
    const description = post?.frontmatter.description ?? 'Synerthink blog.'
    const keywords = post
      ? ['Synerthink', 'Dotlanth', 'blog', post.kind, ...post.frontmatter.tags].join(', ')
      : 'Dotlanth, Synerthink, software development'
    const url = absoluteUrl(`/blog/${params.slug}`)
    const image = absoluteUrl(post?.frontmatter.image ?? DEFAULT_OG_IMAGE_PATH)
    const siteUrl = getSiteUrl()
    const organizationId = `${siteUrl}/#organization`
    const websiteId = `${siteUrl}/#website`
    const blogUrl = absoluteUrl('/blog')

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        { name: 'author', content: 'Synerthink' },
        { name: 'keywords', content: keywords },
        { property: 'og:site_name', content: 'Synerthink' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { property: 'og:image:alt', content: post?.frontmatter.title ?? 'Synerthink blog post' },
        ...(post
          ? [
            { property: 'article:author', content: 'Synerthink' },
            { property: 'article:section', content: post.kind === 'releases' ? 'Product' : 'Research' },
            ...post.frontmatter.tags.map((tag) => ({
              property: 'article:tag',
              content: tag,
            })),
          ]
          : []),
        ...(post?.frontmatter.date
          ? [
            {
              property: 'article:published_time',
              content: post.frontmatter.date,
            },
            {
              property: 'article:modified_time',
              content: post.frontmatter.date,
            },
          ]
          : []),
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
        { name: 'twitter:image:alt', content: post?.frontmatter.title ?? 'Synerthink blog post' },
        ...(post
          ? [
            {
              'script:ld+json': {
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'BlogPosting',
                    headline: post.frontmatter.title,
                    description,
                    url,
                    inLanguage: 'en',
                    isPartOf: {
                      '@id': websiteId,
                    },
                    mainEntityOfPage: {
                      '@type': 'WebPage',
                      '@id': url,
                    },
                    image: [image],
                    datePublished: post.frontmatter.date,
                    dateModified: post.frontmatter.date,
                    keywords: post.frontmatter.tags,
                    articleSection: post.kind === 'releases' ? 'Product' : 'Research',
                    about: [
                      'Dotlanth',
                      'dotDSL',
                      'DSL design',
                      'capability security',
                      'runtime validation',
                    ],
                    author: {
                      '@type': 'Organization',
                      '@id': organizationId,
                      name: 'Synerthink',
                    },
                    publisher: {
                      '@type': 'Organization',
                      '@id': organizationId,
                      name: 'Synerthink',
                      logo: {
                        '@type': 'ImageObject',
                        url: absoluteUrl('/android-chrome-512x512.png'),
                      },
                    },
                  },
                  {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                      {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: absoluteUrl('/'),
                      },
                      {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Blog',
                        item: blogUrl,
                      },
                      {
                        '@type': 'ListItem',
                        position: 3,
                        name: post.frontmatter.title,
                        item: url,
                      },
                    ],
                  },
                ],
              },
            },
          ]
          : []),
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: BlogPostRoute,
})

function BlogPostRoute() {
  const { slug } = Route.useLoaderData() as { slug: string }
  const post = getBlogPostBySlug(slug, { includeDrafts: INCLUDE_DRAFTS })

  // This shouldn't happen because we check in the loader, but TS needs it
  if (!post) return null

  const displayTitle =
    post.kind === 'releases'
      ? `Introducing ${post.frontmatter.title}`
      : post.frontmatter.title

  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground transition-colors">
      {/* Clean Minimalist Hero */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-16 px-6 sm:px-8 mt-16 sm:mt-0 max-w-4xl mx-auto text-center">

        {/* Top Meta Info (Replacing the Back Button / Gradient) */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold tracking-wide text-foreground/50 mb-8">
          <span className="uppercase text-foreground/80">{post.kind === 'releases' ? 'Product' : 'Research'}</span>
          <span>&middot;</span>
          {post.frontmatter.status === 'draft' ? (
            <>
              <span className="border border-foreground/20 px-2 py-0.5 rounded-md uppercase text-[11px] tracking-widest text-foreground/60">Draft</span>
              <span>&middot;</span>
            </>
          ) : null}
          {post.frontmatter.date ? <span>{post.frontmatter.date}</span> : null}
          <span>&middot;</span>
          <span>Synerthink</span>
        </div>

        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-foreground/50">
          <ol className="flex flex-wrap items-center justify-center gap-2">
            <li>
              <a href="/" className="hover:text-foreground">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/blog" className="hover:text-foreground">
                Blog
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground/70">{post.frontmatter.title}</li>
          </ol>
        </nav>

        {/* Title */}
        <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-[1.15] mb-12">
          {displayTitle}
        </h1>

        {post.frontmatter.subtitle ? (
          <p className="mx-auto mb-12 max-w-2xl text-balance text-lg leading-relaxed text-foreground/60 sm:text-xl">
            {post.frontmatter.subtitle}
          </p>
        ) : null}

        {/* Call to Action Button */}
        {post.kind === 'releases' ? (
          <a
            href={post.frontmatter.ctaHref ?? 'https://github.com/ademclk/dotlanth/releases'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-3.5 text-sm font-semibold shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {post.frontmatter.ctaLabel ?? 'Try it on GitHub'}
          </a>
        ) : null}
      </section>

      {/* Content */}
      <section className="relative z-10 bg-background pb-24">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <React.Suspense fallback={<div className="h-64 animate-pulse bg-foreground/5 rounded-xl"></div>}>
            <post.component />
          </React.Suspense>
        </div>
      </section>
    </main>
  )
}
