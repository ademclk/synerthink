import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft } from '@phosphor-icons/react'
import AnimatedBackground from '@/components/AnimatedBackground'
import DevelopmentExperience from '@/components/blog/DevelopmentExperience'
import DotVariants from '@/components/blog/DotVariants'
import FutureGoals from '@/components/blog/FutureGoals'
import TechnicalArchitecture from '@/components/blog/TechnicalArchitecture'

type BlogPostData = {
  title: string
  description: string
  publishedTime: string
}

const BLOG_POSTS: Record<string, BlogPostData> = {
  'introducing-dotlanth': {
    title: 'Introducing Dotlanth',
    description:
      "Learn about our vision for simplifying software development with Dotlanth, a new foundation for your software projects.",
    publishedTime: '2025-05-01',
  },
}

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = BLOG_POSTS[params.slug]
    if (!post) throw notFound()
    return post
  },
  head: ({ params }) => {
    const post = BLOG_POSTS[params.slug]
    const title = post ? `${post.title} | Synerthink Blog` : 'Blog | Synerthink'
    const description = post?.description ?? 'Synerthink blog.'

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { name: 'keywords', content: 'Dotlanth, Synerthink, software development' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        ...(post?.publishedTime
          ? [
              {
                property: 'article:published_time',
                content: post.publishedTime,
              },
            ]
          : []),
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
    }
  },
  component: BlogPostRoute,
})

function BlogPostRoute() {
  const post = Route.useLoaderData()

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground transition-colors">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] w-full items-center justify-center px-4 sm:min-h-[70vh] sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <AnimatedBackground />
        </div>

        <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6 md:left-8 md:top-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-colors duration-300 hover:bg-black/30"
          >
            <ArrowLeft className="h-4 w-4" weight="bold" />
            <span className="hidden sm:inline">Back to Blog</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center gap-4 text-center sm:gap-6">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-2xl sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-lg font-normal leading-relaxed text-white/80 drop-shadow-lg sm:text-xl md:text-2xl">
              If you&apos;ve ever built software, you know the feeling. You have a
              clear idea in your head, but to make it real, you have to fight
              through layers of boilerplate, infrastructure, and configuration.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
          <article className="max-w-none">
            <p className="mb-6 text-lg leading-loose text-foreground/80">
              It&apos;s a process that drains energy and gets in the way of
              actually creating. We started Synerthink because we were tired of
              that fight. We wanted to build a platform that gets out of your
              way—one that&apos;s powerful but feels simple and intuitive.
            </p>
            <p className="mb-6 text-lg leading-loose text-foreground/80">
              That&apos;s what Dotlanth is all about.
            </p>

            <h2 className="mt-16 mb-6 border-b border-foreground/10 pb-4 text-3xl font-bold text-foreground md:text-4xl">
              So, what is Dotlanth?
            </h2>
            <p className="mb-6 text-lg leading-loose text-foreground/80">
              Think of it as a new kind of foundation for your applications. It
              lets you write your business logic—the core rules that make your
              app work—in a clean, focused way. We handle the hard parts like
              servers, databases, and scaling, so you can just focus on your
              idea.
            </p>

            <h3 className="mt-10 mb-4 text-2xl font-bold text-primary">
              The Core Idea: The &quot;Dot&quot;
            </h3>
            <p className="mb-6 text-lg leading-loose text-foreground/80">
              Everything in Dotlanth is built around a simple concept we call a
              &quot;Dot.&quot; A Dot is just a self-contained piece of your
              application&apos;s logic. It&apos;s lightweight, easy to reuse, and
              designed to scale from one user to millions without you having to
              change a thing.
            </p>
            <p className="mb-6 text-lg leading-loose text-foreground/80">
              We have a few different types of Dots for common tasks:
            </p>
            <ul className="mb-6 list-inside list-disc space-y-3 pl-4 text-lg leading-loose text-foreground/80">
              <li>
                <strong>ParaDots</strong> – For heavy-duty tasks that need to
                run in parallel
              </li>
              <li>
                <strong>DataDots</strong> – A simple way to define and work
                with your data
              </li>
              <li>
                <strong>UILinks</strong> – Connect your Dots directly to a user
                interface
              </li>
            </ul>

            <TechnicalArchitecture />
            <DotVariants />
            <DevelopmentExperience />
            <FutureGoals />

            <h2 className="mt-16 mb-6 border-b border-foreground/10 pb-4 text-3xl font-bold text-foreground md:text-4xl">
              What&apos;s Next
            </h2>
            <p className="mb-6 text-lg leading-loose text-foreground/80">
              We&apos;re just at the beginning of this journey. Dotlanth is in
              active development, and we have a lot planned, from better
              AI-powered tools to advanced privacy features.
            </p>
            <p className="mb-6 text-lg leading-loose text-foreground/80">
              We&apos;re building this in the open because we believe the best
              products are built with the community. If you find this idea
              interesting, we&apos;d love for you to follow along with our
              progress.
            </p>

            <p className="mt-16 text-lg leading-loose text-foreground/70">
              Thanks for reading,
              <br />
              <em className="text-foreground/70">The Synerthink Team</em>
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

