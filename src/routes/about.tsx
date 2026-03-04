import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from '@phosphor-icons/react'
import { absoluteUrl } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () => {
    const title = 'About | Synerthink'
    const description =
      'Learn about Synerthink: building the next generation of digital infrastructure with the Dotlanth ecosystem.'
    const url = absoluteUrl('/about')

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
  component: AboutPage,
})

function AboutPage() {
  return (
	    <main className="min-h-[calc(100svh-4rem)] px-4 py-12 pt-28 sm:px-8 md:px-12 lg:px-24">
	      <div className="mx-auto max-w-4xl">
        <header className="max-w-2xl text-center mx-auto mb-20">
          <p className="text-sm font-semibold tracking-widest text-foreground/60 uppercase outline-none">
            About
          </p>
	          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-6xl text-foreground">
	            Synerthink
	          </h1>
	          <p className="mt-6 text-pretty text-lg text-foreground/60 leading-relaxed sm:text-xl">
	            We’re building Dotlanth, a foundation that helps teams ship durable software with less ceremony and more clarity.
	          </p>
	        </header>

        <section className="mt-16 space-y-8">
	          <div className="rounded-[2.5rem] bg-foreground/5 glass glass-1 px-8 py-12 sm:px-12 sm:py-16 text-center shadow-sm">
	            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Our thesis</h2>
	            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg">
	              Great products happen when the tooling disappears. The best developer experience keeps you in flow, close to the user and the idea. We build foundations that stay out of your way and make systems easier to reason about.
	            </p>
	          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-foreground/5 glass glass-2 px-8 py-10 transition-colors hover:bg-foreground/10 flex flex-col items-start text-left">
              <div className="text-4xl text-foreground/40 font-light mb-4 text-left">01</div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">Simplicity is the feature.</h3>
              <p className="mt-3 text-base text-foreground/60 leading-relaxed">
                We design systems that are predictable to operate. No magic, no hidden complexity. Just clear execution paths and explicit state.
              </p>
            </div>

            <div className="rounded-[2rem] bg-foreground/5 glass glass-2 px-8 py-10 transition-colors hover:bg-foreground/10 flex flex-col items-start text-left">
              <div className="text-4xl text-foreground/40 font-light mb-4 text-left">02</div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">Trust is required.</h3>
              <p className="mt-3 text-base text-foreground/60 leading-relaxed">
                Make guarantees explicit and composable. When you run an autonomous system, you need to know exactly what it is allowed to do.
              </p>
            </div>

            <div className="rounded-[2rem] bg-foreground/5 glass glass-2 px-8 py-10 transition-colors hover:bg-foreground/10 flex flex-col items-start text-left">
              <div className="text-4xl text-foreground/40 font-light mb-4 text-left">03</div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">Control the core.</h3>
              <p className="mt-3 text-base text-foreground/60 leading-relaxed">
                Keep foundations small. Optimize the primitives. If the lowest level is rock solid, everything built on top of it inherits that stability.
              </p>
            </div>

            <div className="rounded-[2rem] bg-foreground/5 glass glass-2 px-8 py-10 transition-colors hover:bg-foreground/10 flex flex-col items-start text-left">
              <div className="text-4xl text-foreground/40 font-light mb-4 text-left">04</div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">Ship in modules.</h3>
              <p className="mt-3 text-base text-foreground/60 leading-relaxed">
                Scale capability without scaling complexity. We build composable pieces that work together seamlessly but remain independently verifiable.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 text-center pb-12">
          <a
            href="https://github.com/synerthink"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl border border-foreground/15 bg-background px-8 py-4 text-base font-semibold text-foreground shadow-sm hover:bg-foreground/5 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
          >
            Follow our work on GitHub
            <ArrowRight className="ml-2 h-5 w-5 opacity-70" weight="bold" aria-hidden="true" focusable="false" />
          </a>
        </section>
      </div>
    </main>
  )
}
