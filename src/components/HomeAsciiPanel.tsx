import { Link } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type HomeAsciiPanelProps = {
  className?: string
}

type AsciiLinkProps = {
  children: ReactNode
  className?: string
} & (
    | {
      href: string
      to?: never
      hash?: never
    }
    | {
      href?: never
      to: string
      hash?: string
    }
  )

function AsciiLink({ children, className, ...props }: AsciiLinkProps) {
  const Comp = 'href' in props ? 'a' : Link
  const compProps =
    'href' in props
      ? { href: props.href, target: '_blank', rel: 'noreferrer' }
      : { to: props.to, hash: props.hash }

  return (
    <Comp
      {...compProps}
      className={cn(
        'group relative inline-flex items-center gap-1 rounded-sm px-1 py-0.5 -mx-1 text-foreground/75 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25',
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 rounded-full bg-foreground/40 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-x-100 group-hover:opacity-100 group-focus-visible:scale-x-100 group-focus-visible:opacity-100"
        />
      </span>
      <span
        aria-hidden="true"
        className="translate-x-0 opacity-60 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-[2px] group-hover:opacity-100 group-focus-visible:translate-x-[2px] group-focus-visible:opacity-100"
      >
        ↗
      </span>
    </Comp>
  )
}

export default function HomeAsciiPanel({ className }: HomeAsciiPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const asciiRule = useMemo(() => '─'.repeat(220), [])

  useEffect(() => {
    let ctx: gsap.Context | undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      ; (async () => {
        const { default: gsapRuntime } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        gsapRuntime.registerPlugin(ScrollTrigger)

        ctx = gsapRuntime.context(() => {
          const triggerEl = panelRef.current
          if (!triggerEl) return

          const lines = gsapRuntime.utils.toArray<HTMLElement>('.home-ascii-line')

          gsapRuntime.fromTo(
            '.home-ascii-shimmer',
            { opacity: 0, xPercent: -24 },
            {
              opacity: 0.22,
              xPercent: 24,
              duration: 1.35,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: triggerEl,
                start: 'top 78%',
                once: true,
              },
              onComplete: () => {
                gsapRuntime.to('.home-ascii-shimmer', {
                  opacity: 0,
                  duration: 1.1,
                  ease: 'power2.out',
                })
              },
            },
          )

          gsapRuntime.from(lines, {
            opacity: 0,
            y: 12,
            filter: 'blur(7px)',
            duration: 0.95,
            ease: 'power2.out',
            stagger: 0.06,
            scrollTrigger: {
              trigger: triggerEl,
              start: 'top 78%',
            },
          })
        }, panelRef)
      })()

    return () => ctx?.revert?.()
  }, [])

  return (
    <div
      ref={panelRef}
      className={cn(
        'relative overflow-hidden rounded-[2.25rem] bg-foreground/5 glass glass-2 transition-colors hover:bg-foreground/10',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="home-ascii-shimmer pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay bg-[linear-gradient(115deg,rgba(255,255,255,0.11),transparent_42%,rgba(255,255,255,0.06))] dark:bg-[linear-gradient(115deg,rgba(255,255,255,0.09),transparent_40%,rgba(255,255,255,0.05))]"
      />

      <div className="relative px-7 py-8 sm:px-10 sm:py-10">
        <div className="home-ascii-line flex items-baseline justify-between font-mono text-[11px] tracking-tight text-foreground/60 sm:text-xs">
          <span>synerthink(1)</span>
          <span>home</span>
        </div>

        <div
          aria-hidden="true"
          className="home-ascii-line mt-2 overflow-hidden whitespace-nowrap font-mono text-xs leading-none text-foreground/20 select-none"
        >
          {asciiRule}
        </div>

        <pre className="home-ascii-line mt-6 text-center font-mono text-xs leading-4 text-foreground/45">
          {`          execution
             │
state ───────┼────── control
             │
          dotlanth`}
        </pre>

        <div className="home-ascii-line mt-6 font-mono">
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55">
            Substrate
          </p>
          <p className="mt-3 text-pretty text-base text-foreground/80 sm:text-[1.05rem]">
            Execution · state · control — the layers beneath the app.
          </p>
          <p className="mt-1 text-pretty text-sm text-foreground/70 sm:text-base">
            Simple to use. Predictable to operate. Built for real‑world autonomy.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="home-ascii-line mt-6 overflow-hidden whitespace-nowrap font-mono text-xs leading-none text-foreground/15 select-none"
        >
          {asciiRule}
        </div>

        <div className="home-ascii-line mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="font-mono">
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55">
              Principles
            </p>
            <ol className="mt-3 space-y-2 text-sm text-foreground/75 sm:text-[0.95rem]">
              <li>
                <span className="text-foreground/50">01</span>{' '}
                <span className="text-foreground/80">Simplicity is the feature.</span>
              </li>
              <li>
                <span className="text-foreground/50">02</span>{' '}
                <span className="text-foreground/80">Trust is required.</span>
              </li>
              <li>
                <span className="text-foreground/50">03</span>{' '}
                <span className="text-foreground/80">Control the core.</span>
              </li>
              <li>
                <span className="text-foreground/50">04</span>{' '}
                <span className="text-foreground/80">Ship in modules.</span>
              </li>
            </ol>
            <p className="mt-4 text-sm text-foreground/60">
              see:{' '}
              <AsciiLink to="/about" className="font-semibold">
                principles
              </AsciiLink>
            </p>
          </div>

          <div className="font-mono">
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55">
              Dotlanth
            </p>
            <p className="mt-3 text-pretty text-base text-foreground/80 sm:text-[1.05rem]">
              High-trust execution fabric for autonomous systems and frontier compute.
            </p>
            <p className="mt-1 text-pretty text-sm text-foreground/70 sm:text-base">
              A runtime we’re building to define APIs from a simple file.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <AsciiLink href="https://github.com/ademclk/dotlanth">docs</AsciiLink>
              <AsciiLink to="/products/dotlanth" hash="roadmap">
                roadmap
              </AsciiLink>
              <AsciiLink href="https://github.com/ademclk/dotlanth/releases">
                releases
              </AsciiLink>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="home-ascii-line mt-6 overflow-hidden whitespace-nowrap font-mono text-xs leading-none text-foreground/15 select-none"
        >
          {asciiRule}
        </div>

        <div className="home-ascii-line mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="font-mono">
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55">
              Updates
            </p>
            <p className="mt-3 text-pretty text-sm text-foreground/75 sm:text-base">
              Releases: what shipped. Research notes: why it works this way.
            </p>
            <p className="mt-4 text-sm text-foreground/60">
              read:{' '}
              <AsciiLink to="/blog" className="font-semibold">
                updates
              </AsciiLink>
            </p>
          </div>

          <div className="font-mono">
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55">
              About
            </p>
            <p className="mt-3 text-pretty text-sm text-foreground/75 sm:text-base">
              We build in public. We move carefully. We keep the core small.
            </p>
            <p className="mt-4 text-sm text-foreground/60">
              contact:{' '}
              <AsciiLink to="/about" className="font-semibold">
                hello
              </AsciiLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

