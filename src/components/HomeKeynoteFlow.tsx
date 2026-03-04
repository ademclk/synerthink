import { Link } from '@tanstack/react-router'
import * as React from 'react'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { cn } from '@/lib/utils'

type HomeKeynoteFlowProps = {
  className?: string
}

type KeynoteCta =
  | { kind: 'route'; label: string; to: string; hash?: string }
  | { kind: 'external'; label: string; href: string }

type KeynoteSlide = {
  id: string
  kicker: string
  title: string
  body: string
  bullets: readonly string[]
  ascii: string
  ctas?: readonly KeynoteCta[]
}

function KeynoteCtaLink({ cta }: { cta: KeynoteCta }) {
  const className =
    'group inline-flex items-center gap-1 rounded-sm font-mono text-[13px] text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25'

  if (cta.kind === 'external') {
    return (
      <a
        className={className}
        href={cta.href}
        target="_blank"
        rel="noreferrer"
      >
        <span className="relative">
          {cta.label}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 rounded-full bg-foreground/35 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-x-100 group-hover:opacity-100 group-focus-visible:scale-x-100 group-focus-visible:opacity-100"
          />
        </span>
        <span
          aria-hidden="true"
          className="opacity-60 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          ↗
        </span>
      </a>
    )
  }

  return (
    <Link className={className} to={cta.to} hash={cta.hash}>
      <span className="relative">
        {cta.label}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 rounded-full bg-foreground/35 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-x-100 group-hover:opacity-100 group-focus-visible:scale-x-100 group-focus-visible:opacity-100"
        />
      </span>
      <span
        aria-hidden="true"
        className="opacity-60 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        →
      </span>
    </Link>
  )
}

export default function HomeKeynoteFlow({ className }: HomeKeynoteFlowProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const slides = React.useMemo<readonly KeynoteSlide[]>(
    () => [
      {
        id: 'intent',
        kicker: '01 / intent',
        title: 'Complexity is the tax. Remove it.',
        body: 'Build foundations that feel obvious: simple to use, predictable to operate, and resilient under autonomy.',
        bullets: [
          'Small core, stable interfaces',
          'Operations you can reason about',
          'Systems that degrade gracefully',
        ],
        ascii: ['┌───────────────────────┐', '│  intent → substrate    │', '└───────────────────────┘'].join(
          '\n',
        ),
        ctas: [
          { kind: 'route', label: 'read the vision', to: '/blog/' },
        ],
      },
      {
        id: 'substrate',
        kicker: '02 / substrate',
        title: 'Execution · state · control.',
        body: 'The layers beneath the app. Make them legible, and the rest becomes engineering — not folklore.',
        bullets: ['Execution paths stay narrow', 'State stays inspectable', 'Control stays explicit'],
        ascii: [
          'state ───────┼────── control',
          '             │',
          '          execution',
        ].join('\n'),
        ctas: [{ kind: 'route', label: 'principles', to: '/about' }],
      },
      {
        id: 'dotlanth',
        kicker: '03 / dotlanth',
        title: 'A runtime you can explain.',
        body: 'Dotlanth is our first product: a high-trust execution fabric for autonomous systems and frontier compute with a focus on clarity and control.',
        bullets: [
          'Define APIs from a simple file',
          'Ship in modules, evolve safely',
          'Keep the core deterministic',
        ],
        ascii: ['┌─ dotlanth ─────────────┐', '│  execution fabric      │', '└────────────────────────┘'].join(
          '\n',
        ),
        ctas: [
          { kind: 'route', label: 'product', to: '/products/dotlanth' },
          { kind: 'external', label: 'releases', href: 'https://github.com/ademclk/dotlanth/releases' },
        ],
      },
      {
        id: 'shipping',
        kicker: '04 / shipping',
        title: 'Ship small. Trust the core.',
        body: 'The keynote ends where the work begins: build a stable substrate, then iterate at the edges.',
        bullets: ['Surface area stays minimal', 'Features compose, not sprawl', 'Upgrades stay boring'],
        ascii: ['┌──────────────┐', '│  ship → learn │', '└──────────────┘'].join('\n'),
        ctas: [
          { kind: 'route', label: 'solutions', to: '/solutions' },
          { kind: 'route', label: 'resources', to: '/resources' },
        ],
      },
    ],
    [],
  )

  React.useEffect(() => {
    let ctx: gsap.Context | undefined

    if (prefersReducedMotion) return
    if (!rootRef.current) return

      ; (async () => {
        const { default: gsapRuntime } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        gsapRuntime.registerPlugin(ScrollTrigger)

        ctx = gsapRuntime.context(() => {
          const slideEls = gsapRuntime.utils.toArray<HTMLElement>('.home-keynote-slide')

          slideEls.forEach((slideEl) => {
            const inner = slideEl.querySelector<HTMLElement>('.home-keynote-inner')
            if (!inner) return

            const ascii = slideEl.querySelector<HTMLElement>('.home-keynote-ascii')
            const meta = slideEl.querySelector<HTMLElement>('.home-keynote-meta')

            const tl = gsapRuntime.timeline({
              defaults: { ease: 'power2.out' },
              scrollTrigger: {
                trigger: slideEl,
                start: 'top 72%',
                once: true,
              },
            })

            tl.fromTo(
              inner,
              { opacity: 0, y: 44, scale: 0.985, filter: 'blur(10px)' },
              { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.85 },
            )

            if (meta) {
              tl.fromTo(
                meta,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.45 },
                0.08,
              )
            }

            if (ascii) {
              tl.fromTo(
                ascii,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.55 },
                0.15,
              )
            }
          })
        }, rootRef)
      })()

    return () => ctx?.revert?.()
  }, [prefersReducedMotion])

  return (
    <section
      aria-labelledby="home-keynote-title"
      className={cn('relative', className)}
    >
      <div ref={rootRef} className="mx-auto w-full max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-2xl">
            <h2
              id="home-keynote-title"
              className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              A small keynote, in scroll.
            </h2>
            <p className="mt-3 text-pretty text-sm text-foreground/70 sm:text-base">
              Four slides. One throughline: make the substrate understandable.
            </p>
          </div>

          <a
            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
            href="#home-sections"
          >
            Skip
            <span aria-hidden="true" className="ml-2 font-mono opacity-65">
              ↴
            </span>
          </a>
        </header>

        <ol className="home-keynote-flow mt-12">
          {slides.map((slide, index) => {
            const descId = `home-keynote-${slide.id}-desc`
            const position = String(index + 1).padStart(2, '0')

            return (
              <li
                key={slide.id}
                className={cn(
                  'home-keynote-slide relative min-h-[88svh] scroll-mt-28',
                  index === 0 ? 'mt-0' : '-mt-24 sm:-mt-28 lg:-mt-32',
                )}
                style={{ zIndex: slides.length - index }}
              >
                <article
                  aria-describedby={descId}
                  aria-roledescription="slide"
                  className={cn(
                    'home-keynote-inner sticky top-24 overflow-hidden rounded-[2.25rem] border border-foreground/10 bg-foreground/5 px-7 py-8 shadow-[0_22px_60px_-48px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-colors sm:top-28 sm:px-10 sm:py-10',
                    'focus-within:ring-2 focus-within:ring-foreground/20',
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(1200px_500px_at_20%_0%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(900px_450px_at_80%_30%,rgba(255,255,255,0.06),transparent_58%)] dark:opacity-70"
                  />

                  <div className="relative">
                    <div className="home-keynote-meta flex items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">
                      <span>{slide.kicker}</span>
                      <span aria-hidden="true" className="text-foreground/35">
                        {position}/{String(slides.length).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-5 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                      {slide.title}
                    </h3>

                    <p
                      id={descId}
                      className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/75 sm:text-base"
                    >
                      {slide.body}
                    </p>

                    <div className="mt-7 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
                      <ul className="space-y-2 text-sm text-foreground/75 sm:text-base">
                        {slide.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-1 font-mono text-xs text-foreground/35"
                            >
                              +
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col justify-between gap-5">
                        <pre
                          aria-hidden="true"
                          className="home-keynote-ascii select-none whitespace-pre rounded-2xl border border-foreground/10 bg-background/30 px-5 py-4 font-mono text-[12px] leading-4 text-foreground/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        >
                          {slide.ascii}
                        </pre>

                        {slide.ctas?.length ? (
                          <nav aria-label={`${slide.title} links`}>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                              {slide.ctas.map((cta) => (
                                <KeynoteCtaLink
                                  key={`${cta.kind}-${cta.label}`}
                                  cta={cta}
                                />
                              ))}
                            </div>
                          </nav>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
