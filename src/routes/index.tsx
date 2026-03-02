import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowsOut,
  CaretDown,
  CirclesThreePlus,
  Wrench,
} from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import EcosystemSnapshot from '@/components/EcosystemSnapshot'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import PixelArtHero from '@/components/PixelArtHero'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground transition-colors">
      {/* Hero */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <PixelArtHero />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-32 sm:pt-0">
          <div className="flex w-full max-w-5xl flex-col items-center gap-8 text-center">
            <div className="backdrop-blur-xl bg-foreground/10 rounded-full border border-foreground/10 px-8 py-5 shadow-2xl sm:px-10 sm:py-7">
              <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Create what matters.
              </h1>
              <p className="mt-2 text-pretty text-xl font-light text-foreground/80 sm:mt-4 sm:text-2xl md:text-3xl">
                We handle the rest.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Link
                to="/blog/$slug"
                params={{ slug: 'introducing-dotlanth' }}
                className="group inline-flex items-center justify-center rounded-full border border-primary-foreground/20 bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-2xl transition-all duration-300 hover:brightness-110 active:scale-95 sm:px-8 sm:py-4 sm:text-lg"
              >
                Read the vision
                <ArrowRight className="ml-2 h-5 w-5 sm:ml-3 sm:h-6 sm:w-6" weight="bold" />
              </Link>

              <a
                href="mailto:hello@synerthink.com"
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 px-6 py-3 text-base font-semibold text-foreground shadow-2xl transition-all duration-300 hover:bg-foreground/15 active:scale-95 sm:px-8 sm:py-4 sm:text-lg"
              >
                Contact
              </a>
            </div>

            <button
              type="button"
              aria-label="Scroll to How it works"
              onClick={() => {
                document
                  .getElementById('how-it-works')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-5 py-2 text-sm font-semibold text-foreground/80 shadow-xl transition hover:bg-foreground/10 hover:text-foreground"
            >
              How it works
              <CaretDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Synerthink */}
      <section className="w-full px-4 py-16 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Less friction. More momentum.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/75 sm:text-lg">
              Synerthink is built to remove the parts of software that slow you
              down—so you can stay close to the idea.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <WhyCard
              title="Less boilerplate"
              description="Focus on logic, not scaffolding."
              icon={<Wrench className="h-6 w-6 text-primary" weight="bold" />}
            />
            <WhyCard
              title="Fewer moving parts"
              description="A calmer stack with fewer things to babysit."
              icon={
                <CirclesThreePlus
                  className="h-6 w-6 text-primary"
                  weight="bold"
                />
              }
            />
            <WhyCard
              title="Scale without ceremony"
              description="Grow from one user to many—without rewrites."
              icon={<ArrowsOut className="h-6 w-6 text-primary" weight="bold" />}
            />
          </div>
        </div>
      </section>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <Features />
      <EcosystemSnapshot />

      {/* Final CTA */}
      <section className="w-full px-4 pb-24 pt-6 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2.25rem] border border-foreground/10 bg-foreground/5 px-6 py-10 text-center shadow-2xl backdrop-blur-xl sm:px-10 sm:py-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Build with us.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/75 sm:text-lg">
              Follow along as we build Dotlanth in the open.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://github.com/synerthink"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition hover:bg-foreground/5"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/company/synerthink"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition hover:bg-foreground/5"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function WhyCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: ReactNode
}) {
  return (
    <div className="rounded-[2rem] border border-foreground/10 bg-foreground/5 px-6 py-7 shadow-xl backdrop-blur-xl transition hover:bg-foreground/10">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/75">
        {description}
      </p>
    </div>
  )
}
