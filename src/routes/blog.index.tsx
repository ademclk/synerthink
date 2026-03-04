import { createFileRoute, Link } from '@tanstack/react-router'
import { getAllBlogPosts } from '@/lib/blog'
import ScalableGradientBlur from '@/components/blog/ScalableGradientBlur'

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
  const posts = getAllBlogPosts({ includeDrafts: import.meta.env.DEV })

  return (
    <main className="min-h-[calc(100svh-4rem)] px-4 py-12 pt-28 sm:px-8 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-2xl text-center mx-auto mb-20">
          <p className="text-sm font-semibold tracking-widest text-foreground/40 uppercase outline-none">
            Research & Updates
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-6xl text-foreground">
            Blog
          </h1>
          <p className="mt-6 text-pretty text-lg text-foreground/60 leading-relaxed sm:text-xl">
            Ideas built over time. Our thoughts on creating what matters, system architecture, and building Dotlanth.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <div className="col-span-full rounded-[2.5rem] border border-foreground/10 bg-foreground/5 glass glass-1 px-8 py-10 text-center text-foreground/60 sm:px-12 sm:py-12">
              No posts yet.
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col gap-0"
              >
                <article className="flex w-full flex-col gap-4">
                  {/* Gradient card — square */}
                  <div
                    className="@container relative w-full overflow-hidden rounded-[1.5rem] bg-foreground/5 transition-transform duration-500 will-change-transform group-hover:scale-[1.02]"
                    style={{ aspectRatio: '1/1' }}
                  >
                    {post.kind === 'releases' ? (
                      <ScalableGradientBlur
                        seed={post.slug}
                        versionLabel="v26.1.0-alpha"
                      />
                    ) : (
                      <ScalableGradientBlur seed={post.slug} />
                    )}
                  </div>

                  {/* Post metadata below the card */}
                  <div className="flex flex-col gap-1.5 px-1 pt-1">
                    <h2 className="text-balance text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-foreground/80 sm:text-2xl leading-[1.2]">
                      {post.frontmatter.title}
                    </h2>

                    <div className="flex items-center gap-3 text-sm font-medium text-foreground/50">
                      <span>{post.kind === 'releases' ? 'Product' : 'Research'}</span>
                      {post.frontmatter.date ? (
                        <>
                          <span className="h-1 w-1 rounded-full bg-foreground/30"></span>
                          <span>{post.frontmatter.date}</span>
                        </>
                      ) : null}
                      {post.frontmatter.status === 'draft' ? (
                        <>
                          <span className="h-1 w-1 rounded-full bg-foreground/30"></span>
                          <span className="uppercase tracking-widest text-[10px] border border-foreground/20 px-1.5 py-0.5 rounded-sm">Draft</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Link>
            ))
          )}
        </section>
      </div>
    </main>
  )
}
