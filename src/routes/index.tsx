import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import HomeSections from '@/components/HomeSections'
import PixelArtHero from '@/components/PixelArtHero'
import { absoluteUrl } from '@/lib/seo'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

export const Route = createFileRoute('/')({
  head: () => {
    const title = 'Synerthink'
    const description =
      'We build foundational computing products that remove complexity in the AI era.'
    const url = absoluteUrl('/')

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: HomePage,
})

function HomePage() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground transition-colors">
      {/* Hero: full-bleed, sits behind navbar via negative margin-top */}
      <section className="relative -mt-[4.5rem] min-h-[100dvh] w-full overflow-hidden isolation-isolate">
        <div className="pointer-events-none absolute inset-0 hidden md:block blur-sm scale-[1.01]">
          {prefersReducedMotion ? null : <PixelArtHero />}
        </div>
        <div className="absolute inset-0 bg-background/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background dark:via-background/15" />

        <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-4 pb-14 pt-36 sm:px-8 sm:pb-16 lg:px-12">
          <div className="mx-auto mt-12 w-full max-w-3xl text-center sm:mt-14">
            <h1 className="text-balance text-[clamp(2.7rem,5.2vw,4.25rem)] font-semibold tracking-tight leading-[1.03]">
              Building foundational computing products for the AI era.
            </h1>

            <p className="mt-8 text-pretty text-lg text-foreground/75 sm:text-xl">
              We remove complexity by designing systems that are simple to use, predictable to
              operate, and built for real-world autonomy.
            </p>

            <div className="mt-12 flex flex-nowrap items-center justify-center gap-8 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-10">
              <Link
                to="/blog/$slug"
                params={{ slug: 'dotlanth-v26-1-0-alpha' }}
                className="group relative inline-flex w-fit items-center whitespace-nowrap rounded-md text-sm font-semibold leading-none tracking-tight text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 sm:text-base"
              >
                <span className="relative">
                  Read v26.1.0-alpha
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 rounded-full bg-foreground/35 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-x-100 group-hover:opacity-90 group-focus-visible:scale-x-100 group-focus-visible:opacity-90"
                  />
                </span>
                <span className="ml-2 inline-flex h-[1em] w-[1em] items-center justify-center">
                  <ArrowUpRightIcon
                    className="h-[1em] w-[1em] translate-x-[-0.25em] opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    weight="bold"
                    aria-hidden="true"
                    focusable="false"
                  />
                </span>
              </Link>

              <a
                href="https://github.com/ademclk/dotlanth/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-fit items-center whitespace-nowrap rounded-md text-sm font-semibold leading-none tracking-tight text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 sm:text-base"
              >
                <span className="relative">
                  Releases
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 rounded-full bg-foreground/35 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-x-100 group-hover:opacity-90 group-focus-visible:scale-x-100 group-focus-visible:opacity-90"
                  />
                </span>
                <span className="ml-2 inline-flex h-[1em] w-[1em] items-center justify-center">
                  <ArrowUpRightIcon
                    className="h-[1em] w-[1em] translate-x-[-0.25em] opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    weight="bold"
                    aria-hidden="true"
                    focusable="false"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Apple-style Premium Sections */}
      <HomeSections />
    </main>
  )
}
