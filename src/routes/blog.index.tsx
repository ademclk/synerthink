import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from '@phosphor-icons/react'

const blogPosts = [
  {
    title: 'Introducing Dotlanth',
    description:
      'Learn about our vision for simplifying software development with Dotlanth, a new foundation for your software projects.',
    slug: 'introducing-dotlanth',
    category: 'Vision',
  },
]

export const Route = createFileRoute('/blog/')({
  head: () => ({
    meta: [
      { title: 'Blog | Synerthink' },
      {
        name: 'description',
        content:
          'Explore our latest insights, updates, and thoughts on software development, technology, and innovation at Synerthink.',
      },
      {
        name: 'keywords',
        content:
          'Synerthink, blog, software development, technology, innovation, Dotlanth',
      },
      { property: 'og:title', content: 'Blog | Synerthink' },
      {
        property: 'og:description',
        content:
          'Explore our latest insights, updates, and thoughts on software development, technology, and innovation at Synerthink.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Blog | Synerthink' },
      {
        name: 'twitter:description',
        content:
          'Explore our latest insights, updates, and thoughts on software development, technology, and innovation at Synerthink.',
      },
    ],
  }),
  component: BlogIndex,
})

function BlogIndex() {
  return (
    <main className="min-h-[calc(100svh-4rem)] px-4 py-12 pt-24 sm:px-6 md:px-8 lg:px-12 xl:px-24">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center sm:mb-12 lg:mb-16">
          <div className="inline-block rounded-full border border-foreground/10 bg-foreground/10 px-6 py-3 shadow-2xl backdrop-blur-xl sm:px-8 sm:py-4 md:px-12 md:py-6 lg:px-16">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              Blog
            </h1>
          </div>
          <p className="mx-auto mt-4 max-w-2xl px-4 text-base text-foreground/80 sm:text-lg md:text-xl">
            Ideas being built over time. Our thoughts on creating what matters.
          </p>
        </header>

        <section className="space-y-4 sm:space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group block"
            >
              <article className="overflow-hidden rounded-full border border-foreground/10 bg-foreground/10 shadow-2xl transition-all duration-300 hover:bg-foreground/15 hover:shadow-xl hover:scale-[1.01] transform-gpu backdrop-blur-xl">
                <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-3">
                        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/20 px-3 py-1 text-xs font-medium text-primary sm:px-4 sm:py-2 sm:text-sm">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="mb-3 text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
                        {post.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-foreground/80 sm:text-base md:text-lg">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:h-14 sm:w-14 md:h-16 md:w-16">
                        <ArrowRight
                          className="h-5 w-5 transition-transform group-hover:translate-x-0.5 sm:h-6 sm:w-6 md:h-7 md:w-7"
                          weight="bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}

