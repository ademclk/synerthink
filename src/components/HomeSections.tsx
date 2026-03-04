import { Link } from '@tanstack/react-router'
import * as React from 'react'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  CodeBlock,
  Cpu,
  Database,
  Lightning,
  Lock,
  Package,
  Repeat,
  TerminalWindow,
} from '@phosphor-icons/react'

// ============================================================================
// APPLE-STYLE DESIGN SYSTEM
// ============================================================================

type HomeSectionsProps = {
  className?: string
}

function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent dark:from-white dark:via-white/90 dark:to-white/50',
        className,
      )}
    >
      {children}
    </span>
  )
}

function Section({
  children,
  className,
  id,
  dark = false,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  dark?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full py-32 sm:py-40 lg:py-48',
        dark && 'bg-foreground/[0.02] dark:bg-foreground/[0.03]',
        className,
      )}
    >
      {children}
    </section>
  )
}

function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16', className)}>
      {children}
    </div>
  )
}

function SectionHeadline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        'text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-tight leading-[1.05]',
        className,
      )}
    >
      {children}
    </h2>
  )
}

function SectionBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-balance text-xl text-foreground/60 sm:text-2xl leading-relaxed', className)}>
      {children}
    </p>
  )
}

function Card({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'highlighted' | 'dark'
}) {
  const variants = {
    default:
      'bg-foreground/[0.02] border border-foreground/5 dark:bg-foreground/[0.03] dark:border-foreground/[0.05] hover:border-foreground/15 dark:hover:border-foreground/20',
    highlighted:
      'bg-gradient-to-br from-foreground/[0.03] to-foreground/[0.01] border border-foreground/10 dark:from-foreground/[0.05] dark:to-foreground/[0.02] hover:border-foreground/20 dark:hover:border-foreground/25',
    dark: 'bg-foreground/[0.04] border border-foreground/10 dark:bg-foreground/[0.06] hover:border-foreground/20 dark:hover:border-foreground/30',
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-500',
        variants[variant],
        className,
      )}
    >
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center font-medium text-sm text-foreground/50 tracking-wide uppercase">
      {children}
    </span>
  )
}

function ArrowLink({
  to,
  href,
  children,
  className,
}: {
  to?: string
  href?: string
  children: React.ReactNode
  className?: string
}) {
  const props = href
    ? { href, target: '_blank' as const, rel: 'noreferrer' }
    : { to: to || '/' }
  const Comp = href ? 'a' : Link

  return (
    <Comp
      {...(props as React.ComponentProps<typeof Link>)}
      className={cn(
        'group inline-flex items-center gap-2 text-base font-medium text-foreground/80 transition-colors hover:text-foreground',
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-foreground/30 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-x-100"
        />
      </span>
      <ArrowRight
        className="h-4 w-4 translate-x-0 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        weight="bold"
      />
    </Comp>
  )
}

// ============================================================================
// SECTION 1 — THE TRANSITION
// ============================================================================
function TransitionSection() {
  return (
    <Section className="relative min-h-[90vh] flex items-center !py-24">
      <Container className="h-full w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center h-full">
          {/* Text Container (Left) */}
          <div className="flex flex-col justify-center order-2 lg:order-1 pt-4 lg:pt-0 pb-12 lg:pb-0">
            <SectionHeadline className="leading-tight text-left">
              <GradientText>Software creation, effortless.</GradientText>
            </SectionHeadline>
            <SectionBody className="mt-8 text-left max-w-lg">
              Synerthink builds foundational computing products that remove complexity—especially in the AI era.
            </SectionBody>
          </div>

          {/* Visual Container (Right) */}
          <div className="relative order-1 lg:order-2 h-[50vh] lg:h-[75vh] w-full rounded-[2.5rem] overflow-hidden shadow-2xl flex outline outline-1 outline-foreground/5 dark:outline-white/10 group">
            <img
              src="/hero-core.png"
              alt="Dotlanth Core Foundation"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Subtle overlay gradient to ensure the CTA stands out */}
            {/* Progressive blur bottom bar CTA */}
            <div className="absolute inset-x-0 bottom-0 pointer-events-none">
              <div
                className="absolute inset-0 bg-black/40"
                style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 100%)', maskImage: 'linear-gradient(to bottom, transparent, black 100%)' }}
              />
              <div className="absolute inset-0 backdrop-blur-xl" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 80%)', maskImage: 'linear-gradient(to bottom, transparent, black 80%)' }} />

              <div className="relative pt-24 pb-6 flex items-end justify-center">
                <ArrowLink
                  to="/products/dotlanth-core"
                  className="pointer-events-auto flex w-full items-center justify-center text-white/90 hover:text-white transition-all duration-300 py-4 text-lg tracking-wide border-t border-white/10 hover:bg-white/5"
                >
                  Explore the Architecture
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ============================================================================
// SECTION 2 — DOTLANTH IDENTITY
// ============================================================================
function DotlanthIdentitySection() {
  return (
    <Section dark className="overflow-hidden">
      <Container>
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-12 lg:items-center">
          {/* Left: copy */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/5 inner-shadow">
                <Lightning className="h-6 w-6 text-foreground/80" weight="fill" />
              </div>
              <span className="font-mono text-sm font-medium text-foreground/40">v26.1.0-alpha</span>
            </div>

            <h2 className="mt-10 text-balance text-[clamp(2.5vw,5vw,4rem)] font-semibold tracking-tight leading-[1.05]">
              Not a framework.<br />
              <GradientText>An AI-native execution fabric.</GradientText>
            </h2>

            <p className="mt-8 text-xl text-foreground/60 leading-relaxed max-w-prose">
              The layer below the application. Dotlanth makes execution observable, reproducible, and secure by default.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-8">
              <ArrowLink href="https://github.com/ademclk/dotlanth/releases">Releases</ArrowLink>
              <ArrowLink to="/products/dotlanth-core">Explore Dotlanth</ArrowLink>
            </div>
          </div>

          {/* Right: Bento Grid */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4 lg:gap-6">
            <Card variant="dark" className="p-8 sm:p-10 flex flex-col aspect-square group">
              <Cpu className="h-10 w-10 text-foreground/30 mb-auto transition-colors duration-500 group-hover:text-foreground/80" weight="duotone" />
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">Register-Based VM</h3>
            </Card>
            <Card variant="highlighted" className="p-8 sm:p-10 flex flex-col aspect-square group">
              <CodeBlock className="h-10 w-10 text-foreground/30 mb-auto transition-colors duration-500 group-hover:text-foreground/80" weight="duotone" />
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">dotDSL v0.1</h3>
            </Card>
            <Card variant="default" className="p-8 sm:p-10 flex flex-col aspect-square group">
              <TerminalWindow className="h-10 w-10 text-foreground/30 mb-auto transition-colors duration-500 group-hover:text-foreground/80" weight="duotone" />
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">CLI Engine</h3>
            </Card>
            <Card variant="dark" className="p-8 sm:p-10 flex flex-col aspect-square group">
              <Database className="h-10 w-10 text-foreground/30 mb-auto transition-colors duration-500 group-hover:text-foreground/80" weight="duotone" />
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">Local DotDB</h3>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ============================================================================
// SECTION 3 — THE THREE PILLARS
// ============================================================================
function PillarsSection() {
  const pillars = [
    {
      icon: Repeat,
      headline: 'Deterministic Core',
      body: 'Replayable by default. Opt-in to strict mode for opcode-level determinism and absolute replay validation.',
    },
    {
      icon: Package,
      headline: 'Artifact-First Runtime',
      body: 'Every run leaves a bundle. Traces, state diffs, and structured outputs—captured instantly.',
    },
    {
      icon: Lock,
      headline: 'Capability-Explicit Security',
      body: 'Declared in dotDSL. Enforced at the opcode boundary. Usage is recorded in the artifact. Nothing runs silently.',
    },
  ]

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeadline>
            Three pillars.<br />
            <GradientText>Absolute control.</GradientText>
          </SectionHeadline>
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.headline} variant="highlighted" className="p-10 flex flex-col group">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 transition-colors duration-500 group-hover:bg-foreground/10">
                <pillar.icon className="h-7 w-7 text-foreground/70" weight="duotone" />
              </div>
              <h3 className="mt-12 text-2xl font-semibold tracking-tight">{pillar.headline}</h3>
              <p className="mt-4 text-lg text-foreground/60 leading-relaxed flex-1">{pillar.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ============================================================================
// SECTION 4 — DOTDB
// ============================================================================
function DotDBSection() {
  return (
    <Section dark>
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          {/* Left: Focus Graphic */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-24 bg-gradient-to-tr from-foreground/5 via-foreground/0 to-transparent blur-3xl rounded-full" />
            <Card variant="dark" className="relative p-12 aspect-square flex flex-col items-center justify-center shadow-2xl">
              <Database className="h-24 w-24 text-foreground/20 " weight="duotone" />
              <div className="mt-8 flex items-center gap-3 w-full max-w-[200px] justify-between">
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
                    <div className="h-full w-2/3 bg-foreground/40 rounded-full" />
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
                    <div className="h-full w-1/3 bg-foreground/40 rounded-full" />
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
                    <div className="h-full w-5/6 bg-foreground/40 rounded-full" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: copy */}
          <div className="order-1 lg:order-2">
            <Label>Architecture</Label>
            <SectionHeadline className="mt-6">
              State and history,<br />
              <GradientText>built right in.</GradientText>
            </SectionHeadline>
            <SectionBody className="mt-8">
              DotDB stores internal state and the complete artifact history natively. External connectors exist only as controlled side-effects. Zero connector explosion. Just pure, isolated execution.
            </SectionBody>

            <div className="mt-12">
              <ArrowLink to="/products/dotlanth-core">Learn about Architecture</ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ============================================================================
// SECTION 5 — ROADMAP
// ============================================================================
function RoadmapSection() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Stabilize Core',
      description: 'Trace exports, state diffs, artifact schemas, and replay.',
      status: 'current',
    },
    {
      phase: 'Phase 2',
      title: 'Deterministic Mode',
      description: 'Strict flags, opcode classification, replay validation.',
      status: 'upcoming',
    },
    {
      phase: 'Phase 3',
      title: 'Agent Operability',
      description: 'Run APIs, submit dotDSL, isolated execution contexts.',
      status: 'upcoming',
    },
    {
      phase: 'Phase 4',
      title: 'Intent Layer',
      description: 'Intent blocks mapped to deterministic, executable specs.',
      status: 'upcoming',
    },
    {
      phase: 'Phase 5',
      title: 'Execution as Product',
      description: 'Hosted execution clusters and capability-scoped tenancy.',
      status: 'upcoming',
    },
  ]

  return (
    <Section id="roadmap">
      <Container>
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-32">
          <div className="lg:sticky lg:top-32 h-fit">
            <Label>Roadmap</Label>
            <SectionHeadline className="mt-6">
              From local runtime to execution network.
            </SectionHeadline>
            <div className="mt-12">
              <ArrowLink to="/products/dotlanth-core">View complete roadmap</ArrowLink>
            </div>
          </div>

          <div className="relative pl-8 md:pl-0">
            {/* Vertical timeline line */}
            <div className="absolute left-[3px] md:left-6 top-6 bottom-6 w-px bg-foreground/10" />

            <div className="space-y-16 lg:space-y-24">
              {phases.map((phase) => (
                <div key={phase.phase} className="relative md:pl-20">
                  {/* Timeline node */}
                  <div className={cn(
                    "absolute left-[-5px] md:left-[19px] top-1.5 h-3 w-3 rounded-full border-2 border-background ring-4 ring-background transition-colors",
                    phase.status === 'current' ? 'bg-foreground' : 'bg-foreground/20'
                  )} />

                  <div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="font-mono text-sm tracking-widest text-foreground/40 uppercase">{phase.phase}</span>
                      {phase.status === 'current' && (
                        <span className="rounded-full bg-foreground px-2.5 py-0.5 text-xs font-medium text-background">
                          In progress
                        </span>
                      )}
                    </div>
                    <h3 className={cn(
                      "mt-3 text-2xl font-semibold tracking-tight transition-colors",
                      phase.status === 'current' ? 'text-foreground' : 'text-foreground/80'
                    )}>
                      {phase.title}
                    </h3>
                    <p className="mt-4 text-xl text-foreground/60 leading-relaxed max-w-md">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ============================================================================
// SECTION 6 — FINAL CTA
// ============================================================================
function FinalCTASection() {
  return (
    <Section dark className="border-t border-foreground/5 min-h-[60vh] flex items-center">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-tight leading-[1.0] mb-12">
            Foundation ready.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12">
            <Link
              to="/products/dotlanth-core"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-8 py-4 text-lg font-medium text-background transition-transform hover:scale-105 active:scale-95"
            >
              Explore Dotlanth
            </Link>
            <Link
              to="/blog/$slug"
              params={{ slug: 'introducing-dotlanth' }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-foreground/10 bg-transparent px-8 py-4 text-lg font-medium transition-colors hover:border-foreground/30 hover:bg-foreground/5 active:scale-95"
            >
              Read our vision
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function HomeSections({ className }: HomeSectionsProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (prefersReducedMotion) return
    if (!containerRef.current) return

    let ctx: gsap.Context | undefined

      ; (async () => {
        const { default: gsapRuntime } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        gsapRuntime.registerPlugin(ScrollTrigger)

        ctx = gsapRuntime.context(() => {
          const sections = gsapRuntime.utils.toArray<HTMLElement>('.home-section-animate')

          sections.forEach((section) => {
            gsapRuntime.fromTo(
              section,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  once: true,
                },
              },
            )
          })
        }, containerRef)
      })()

    return () => ctx?.revert?.()
  }, [prefersReducedMotion])

  return (
    <div ref={containerRef} className={className}>
      <div className="home-section-animate">
        <TransitionSection />
      </div>
      <div className="home-section-animate">
        <DotlanthIdentitySection />
      </div>
      <div className="home-section-animate">
        <PillarsSection />
      </div>
      <div className="home-section-animate">
        <DotDBSection />
      </div>
      <div className="home-section-animate">
        <RoadmapSection />
      </div>
      <div className="home-section-animate">
        <FinalCTASection />
      </div>
    </div>
  )
}
