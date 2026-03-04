import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from '@phosphor-icons/react'

export const Route = createFileRoute('/products/')({
  head: () => ({
    meta: [
      { title: 'Products | Synerthink' },
      {
        name: 'description',
        content:
          'Explore Synerthink products. Dotlanth is a high-trust execution fabric for autonomous systems and frontier compute. Dotlanth Studio is a private console for operating Dotlanth.',
      },
    ],
  }),
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <main className="min-h-[calc(100svh-4rem)] px-4 py-12 pt-28 sm:px-8 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-2xl text-center mx-auto mb-20">
          <p className="text-sm font-semibold tracking-widest text-foreground/40 uppercase outline-none">
            Ecosystem
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-6xl text-foreground">
            Products
          </h1>
          <p className="mt-6 text-pretty text-lg text-foreground/60 leading-relaxed sm:text-xl">
            Foundational computing products designed to remove complexity in the AI era. Built for durability and scale.
          </p>
        </header>

        <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            to="/products/dotlanth"
            className="group rounded-[2.5rem] bg-foreground/5 glass glass-1 px-8 py-10 transition-colors hover:bg-foreground/10 flex flex-col items-start text-left sm:px-10 sm:py-12"
          >
            <div className="mb-4">
              <span className="inline-flex items-center rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-foreground/60">
                Core Engine
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mt-2 mb-4">
              Dotlanth
            </h2>
            <p className="mt-2 text-xl font-medium text-foreground/80 leading-relaxed">
              High-trust execution fabric for autonomous systems and frontier compute.
            </p>
            <p className="mt-4 text-base text-foreground/60 leading-relaxed flex-1">
              Artifacts by default. Record/replay by default. Capability-explicit security. A foundation built on trust rather than magic.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
              Explore Dotlanth
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" weight="bold" />
            </div>
          </Link>

          <div className="rounded-[2.5rem] bg-foreground/5 glass glass-2 px-8 py-10 flex flex-col items-start text-left sm:px-10 sm:py-12">
            <div className="mb-4">
              <span className="inline-flex items-center rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-foreground/60">
                Operations
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mt-2 mb-4">
              Dotlanth Studio
            </h2>
            <p className="mt-2 text-xl font-medium text-foreground/80 leading-relaxed">
              A private console for operating Dotlanth.
            </p>
            <p className="mt-4 text-base text-foreground/60 leading-relaxed flex-1">
              Studio consumes Dotlanth APIs to inspect artifacts and manage environments. It stays entirely separate from the execution semantics.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground/40 cursor-not-allowed">
              Private Project
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2.5rem] bg-foreground/5 glass glass-1 px-8 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-foreground">
            Get the latest release. Run it locally.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 sm:text-lg">
            Grab the latest compiled binary from GitHub. Zero dependencies, start with a single run.
          </p>
          <div className="mt-8">
            <a
              href="https://github.com/ademclk/dotlanth/releases"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-foreground/15 bg-background px-8 py-4 text-base font-semibold text-foreground shadow-sm hover:bg-foreground/5 transition-all active:scale-[0.98]"
            >
              View Releases
              <ArrowRight className="ml-2 h-5 w-5 opacity-70" weight="bold" />
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
