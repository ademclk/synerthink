import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowCounterClockwise,
  ArrowRight,
  Eye,
  Fingerprint,
  FlowArrow,
  Sparkle,
} from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import PixelArtHero from '@/components/PixelArtHero'

export const Route = createFileRoute('/products/dotlanth')({
  head: () => ({
    meta: [
      { title: 'Dotlanth | Synerthink' },
      {
        name: 'description',
        content:
          'Dotlanth is a high-trust execution fabric for autonomous systems and frontier compute. Artifacts by default, record/replay by default, and capability-explicit security.',
      },
    ],
  }),
  component: DotlanthPage,
})

function DotlanthPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground transition-colors">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 opacity-75">
          <PixelArtHero />
        </div>
        <div className="absolute inset-0 bg-background/70" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 pb-16 pt-28 sm:px-8 sm:pb-20 md:pb-24 lg:px-24 lg:pb-28">
          <div className="max-w-3xl rounded-[2.5rem] bg-foreground/5 glass glass-2 px-8 py-10 sm:px-12 sm:py-12 flex flex-col items-start transition-colors hover:bg-foreground/10">
            <span className="inline-flex items-center rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2">
              Dotlanth · A Synerthink product
            </span>

            <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              High-trust execution fabric for autonomous systems and frontier compute.
            </h1>

            <p className="mt-4 max-w-2xl text-pretty text-lg text-foreground/75 sm:text-xl">
              Get artifacts by default. Replay runs when you need to. Declare
              permissions up front.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <MicroBadge icon={<Eye className="h-4 w-4" weight="bold" />}>
                Artifacts for every run
              </MicroBadge>
              <MicroBadge
                icon={<ArrowCounterClockwise className="h-4 w-4" weight="bold" />}
              >
                Replay when it matters
              </MicroBadge>
              <MicroBadge
                icon={<Fingerprint className="h-4 w-4" weight="bold" />}
              >
                Capability-explicit security
              </MicroBadge>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/ademclk/dotlanth/releases"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-primary-foreground/20 bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg glass-float hover:brightness-110 active:scale-[0.98] sm:px-8 sm:py-4 lg:text-lg"
              >
                View releases
                <ArrowRight className="ml-2 h-5 w-5" weight="bold" />
              </a>
              <Link
                to="/blog/$slug"
                params={{ slug: 'dotlanth-v26-1-0-alpha' }}
                className="inline-flex items-center justify-center rounded-2xl border border-foreground/15 bg-background/70 glass glass-1 px-6 py-3 text-base font-semibold text-foreground shadow-lg glass-float hover:bg-background/80 active:scale-[0.98] sm:px-8 sm:py-4 lg:text-lg"
              >
                Read v26.1.0-alpha
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <Section
        id="problem"
        title="Agents don’t fail like APIs."
        subtitle="You’re not debugging one request. You’re debugging a run that touched tools, state, and time."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard
            title="State drifts"
            description="It drifts between steps, retries, and environments."
          />
          <FeatureCard
            title="Side effects blur"
            description="They blur into “whatever happened” and “can’t reproduce.”"
          />
          <FeatureCard
            title="Reproduction breaks"
            description="Debugging turns into detective work."
          />
        </div>
        <QuietPunch>If you can’t replay it, you can’t trust it.</QuietPunch>
      </Section>

      {/* Core definition */}
      <Section
        id="core"
        title="Dotlanth is the execution substrate for autonomous systems."
        subtitle="It treats a run as a first-class object. Not an afterthought."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GlassPanel>
            <h3 className="text-xl font-semibold">Definition</h3>
            <p className="mt-3 text-base text-foreground/75">
              Dotlanth is an AI-native execution fabric for autonomous
              systems. It runs your system’s behavior, records what happened,
              and makes runs inspectable through artifacts.
            </p>
            <p className="mt-3 text-base text-foreground/75">
              dotDSL is a YAML-like declarative spec for capabilities and
              execution. Dotlanth executes it on a register-based VM and records run
              history in DotDB.
            </p>
          </GlassPanel>

          <GlassPanel>
            <h3 className="text-xl font-semibold">Dotlanth Studio (separate)</h3>
            <p className="mt-3 text-base text-foreground/75">
              Dotlanth Studio is Synerthink’s private console for operating Dotlanth.
              It consumes Dotlanth APIs to inspect artifacts and manage environments.
            </p>
            <p className="mt-3 text-base text-foreground/75">
              Studio doesn’t change execution semantics. Dotlanth stays the product.
            </p>
          </GlassPanel>
        </div>
        <QuietPunch>Execution becomes something you can hold.</QuietPunch>
      </Section>

      <Section
        id="today"
        title="What ships today."
        subtitle="Focused on replayability, artifacts, and explicit control."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GlassPanel>
            <h3 className="text-xl font-semibold">Dotlanth runtime</h3>
            <ul className="mt-4 space-y-2 text-base text-foreground/75">
              <li>Register-based VM</li>
              <li>dotDSL v0.1 (YAML-like spec)</li>
              <li>Default record/replay mode</li>
            </ul>
          </GlassPanel>
          <GlassPanel>
            <h3 className="text-xl font-semibold">State and control</h3>
            <ul className="mt-4 space-y-2 text-base text-foreground/75">
              <li>Local DotDB (state + run history)</li>
              <li>Capability security foundation</li>
              <li>CLI tooling</li>
            </ul>
          </GlassPanel>
        </div>
        <QuietPunch>Keep the system explainable.</QuietPunch>
      </Section>

      {/* Pillars */}
      <Section
        id="artifacts"
        title="Artifacts, by default."
        subtitle="Every run produces a structured artifact bundle."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PillarTile
            icon={<Eye className="h-6 w-6 text-primary" weight="bold" />}
            title="Inspect"
            description="See what the run saw, decided, and produced."
          />
          <PillarTile
            icon={<FlowArrow className="h-6 w-6 text-primary" weight="bold" />}
            title="Compare"
            description="Diff runs when behavior shifts."
          />
          <PillarTile
            icon={<Sparkle className="h-6 w-6 text-primary" weight="bold" />}
            title="Share"
            description="Hand your team one source of truth."
          />
        </div>
        <QuietPunch>The artifact becomes the unit of truth.</QuietPunch>
      </Section>

      <Section
        id="replay"
        title="Replayable execution."
        subtitle="Record the run. Replay it. Understand what changed."
      >
        <GlassPanel>
          <p className="text-base text-foreground/75">
            Record/replay is the default mode in Dotlanth. When something breaks,
            you replay the run and inspect the artifact.
          </p>
          <p className="mt-3 text-base text-foreground/75">
            Dotlanth doesn’t pretend the world is perfectly deterministic. Side
            effects are treated as controlled events, recorded under declared
            capabilities.
          </p>
        </GlassPanel>
        <QuietPunch>Debugging becomes replay, not guesswork.</QuietPunch>
      </Section>

      <Section
        id="security"
        title="Capability-explicit security."
        subtitle="Permissions are part of the spec."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GlassPanel>
            <h3 className="text-xl font-semibold">Declared capabilities</h3>
            <p className="mt-3 text-base text-foreground/75">
              Runs declare capabilities instead of inheriting ambient
              credentials. Capabilities are declared in dotDSL and enforced by
              the runtime.
            </p>
          </GlassPanel>
          <GlassPanel>
            <h3 className="text-xl font-semibold">Reported usage</h3>
            <p className="mt-3 text-base text-foreground/75">
              Capability usage is reported so you can review what happened.
              Connectors stay constrained and capability-gated, with interaction
              recorded into artifacts.
            </p>
          </GlassPanel>
        </div>
        <QuietPunch>Permissions stay visible.</QuietPunch>
      </Section>

      <Section
        id="determinism"
        title="Determinism, when you need it."
        subtitle="Strict determinism is optional. Designed for proof."
      >
        <GlassPanel>
          <p className="text-base text-foreground/75">
            Dotlanth doesn’t force strict determinism by default. Most real systems
            can’t.
          </p>
          <p className="mt-3 text-base text-foreground/75">
            Deterministic mode is an optional strict flag with replay validation.
            Phase 2 tightens opcode classes and capability checks at opcode
            boundaries.
          </p>
        </GlassPanel>
        <QuietPunch>Turn on determinism when you need proof.</QuietPunch>
      </Section>

      <Section
        id="operability"
        title="Built for agent operability."
        subtitle="Operability is an API surface."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard
            title="Run API"
            description="Submit dotDSL. Get status. Fetch artifacts."
          />
          <FeatureCard
            title="Status streaming"
            description="Know what’s happening while it happens."
          />
          <FeatureCard
            title="Isolated contexts"
            description="Keep concurrent runs from bleeding together."
          />
        </div>
        <QuietPunch>Make operability part of the build.</QuietPunch>
      </Section>

      {/* Clarity */}
      <Section
        id="clarity"
        title="Clear edges. Fewer surprises."
        subtitle="What it is. And what it isn’t."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GlassPanel>
            <h3 className="text-xl font-semibold">What it is</h3>
            <ul className="mt-4 space-y-2 text-base text-foreground/75">
              <li>High-trust execution fabric for autonomous systems and frontier compute.</li>
              <li>Artifact-first runtime with record/replay.</li>
              <li>Security model based on declared capabilities.</li>
              <li>Local-first engine with DotDB run history.</li>
            </ul>
          </GlassPanel>
          <GlassPanel>
            <h3 className="text-xl font-semibold">What it isn’t</h3>
            <ul className="mt-4 space-y-2 text-base text-foreground/75">
              <li>A services puzzle you assemble.</li>
              <li>A drag-and-drop builder.</li>
              <li>A black box that hides side effects.</li>
              <li>Dotlanth Studio isn’t the engine.</li>
            </ul>
          </GlassPanel>
        </div>
        <QuietPunch>Clarity is the feature.</QuietPunch>
      </Section>

      {/* Roadmap */}
      <Section
        id="roadmap"
        title="Build trust in the right order."
        subtitle="We build visibility first, then validity, then operability."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <RoadmapCard
            phase="Phase 1"
            title="Stabilize Core"
            description="Trace export, state diff, versioned artifact schema, and dot inspect/replay."
          />
          <RoadmapCard
            phase="Phase 2"
            title="Deterministic Mode"
            description="Strict flag, opcode classes, opcode-boundary checks, replay validator."
          />
          <RoadmapCard
            phase="Phase 3"
            title="Agent Operability"
            description="Run API, dotDSL submission, status streaming, isolated contexts."
          />
          <RoadmapCard
            phase="Phase 4"
            title="Intent Layer"
            description="Intent block → validator/transformer → executable spec. Deterministic and testable."
          />
          <RoadmapCard
            phase="Phase 5"
            title="Execution as Product"
            description="Hosted deterministic clusters, capability-scoped tenancy, versioned environments."
          />
        </div>
        <QuietPunch>Each phase tightens the loop.</QuietPunch>
      </Section>

      {/* Final CTA */}
      <section
        id="access"
        className="w-full px-4 pb-24 pt-6 sm:px-8 md:px-12 lg:px-24 xl:px-32"
      >
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2.5rem] bg-foreground/5 glass glass-2 px-8 py-12 text-center sm:px-12 sm:py-16 transition-colors hover:bg-foreground/10">
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl text-foreground">
              Start with one run.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-foreground/75 sm:text-xl">
              Get the latest release and run locally. When you’re ready to
              go deeper, read the vision and roadmap.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://github.com/ademclk/dotlanth/releases"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-primary-foreground/20 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg glass-float hover:brightness-110 active:scale-[0.98] sm:text-base"
              >
                View releases
                <ArrowRight className="ml-2 h-4 w-4" weight="bold" />
              </a>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-2xl border border-foreground/15 bg-background/70 glass glass-1 px-6 py-3 text-sm font-semibold text-foreground glass-float hover:bg-background/80 active:scale-[0.98] sm:text-base"
              >
                Back to products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="w-full px-4 py-16 sm:px-8 md:px-12 lg:px-24 xl:px-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-pretty text-base text-foreground/75 sm:text-lg">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </section>
  )
}

function QuietPunch({ children }: { children: ReactNode }) {
  return (
    <p className="mt-10 text-base font-medium text-foreground sm:text-lg">
      {children}
    </p>
  )
}

function GlassPanel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[2.5rem] bg-foreground/5 glass glass-1 px-8 py-10 transition-colors hover:bg-foreground/10 sm:px-10 sm:py-10">
      {children}
    </div>
  )
}

function FeatureCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-[2.5rem] bg-foreground/5 glass glass-1 px-8 py-10 transition-colors hover:bg-foreground/10 sm:px-10 sm:py-10">
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-base text-foreground/75 leading-relaxed">{description}</p>
    </div>
  )
}

function PillarTile({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-[2.5rem] bg-foreground/5 glass glass-1 px-8 py-10 transition-colors hover:bg-foreground/10 sm:px-10 sm:py-10">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/10 text-foreground transition-all duration-300">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-base text-foreground/75 leading-relaxed">{description}</p>
    </div>
  )
}

function RoadmapCard({
  phase,
  title,
  description,
}: {
  phase: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-[2.5rem] bg-foreground/5 glass glass-1 px-8 py-10 transition-colors hover:bg-foreground/10 sm:px-10 sm:py-10">
      <span className="inline-flex items-center rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2">
        {phase}
      </span>
      <h3 className="mt-2 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-base text-foreground/75 leading-relaxed">{description}</p>
    </div>
  )
}

function MicroBadge({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/10 glass glass-1 px-3 py-2 text-sm font-medium text-foreground/80">
      <span className="text-foreground/70">{icon}</span>
      <span>{children}</span>
    </div>
  )
}
