import { Link } from '@tanstack/react-router'
import { type ComponentProps, type ReactNode, useEffect, useMemo, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

type RouterLinkProps = ComponentProps<typeof Link>

type AsciiLinkItem =
  | {
    kind: 'internal'
    label: string
    description: string
    to: RouterLinkProps['to']
    hash?: RouterLinkProps['hash']
    params?: RouterLinkProps['params']
  }
  | {
    kind: 'external'
    label: string
    description: string
    href: string
  }

type AsciiFeatureLinksSectionProps = {
  heading?: string
  features?: Array<{ label: string; description: string }>
  links?: AsciiLinkItem[]
  className?: string
}

function AsciiBorder({ variant }: { variant: 'top' | 'mid' | 'bottom' }) {
  const left = variant === 'mid' ? '+' : '+'
  const right = variant === 'mid' ? '+' : '+'
  return (
    <div
      aria-hidden="true"
      data-ascii-border
      className="flex items-center gap-2 text-foreground/55 select-none"
    >
      <span className="leading-none">{left}</span>
      <div className="h-px flex-1 bg-foreground/20" />
      <span className="leading-none">{right}</span>
    </div>
  )
}

function AsciiRowFrame({
  children,
  as,
}: {
  children: ReactNode
  as?: 'div' | 'li'
}) {
  const Comp = as ?? 'div'
  return (
    <Comp
      data-ascii-row
      className="flex items-start gap-3 py-3 text-sm sm:text-[0.95rem]"
    >
      <span
        aria-hidden="true"
        className="pt-[0.12em] text-foreground/55 select-none"
      >
        |
      </span>
      <div className="min-w-0 flex-1">{children}</div>
      <span
        aria-hidden="true"
        className="pt-[0.12em] text-foreground/55 select-none"
      >
        |
      </span>
    </Comp>
  )
}

function AsciiSectionTitle({ title }: { title: string }) {
  return (
    <AsciiRowFrame>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-foreground/60">
          {title.toUpperCase()}
        </p>
        <span
          aria-hidden="true"
          className="hidden text-foreground/50 sm:inline"
        >
          $ <span data-ascii-cursor>▮</span>
        </span>
      </div>
    </AsciiRowFrame>
  )
}

function AsciiLinkRow({ item, index }: { item: AsciiLinkItem; index: number }) {
  const idx = String(index + 1).padStart(2, '0')

  const contents = (
    <span className="flex min-w-0 items-start justify-between gap-4">
      <span className="min-w-0">
        <span className="flex min-w-0 items-baseline gap-3">
          <span
            aria-hidden="true"
            className="shrink-0 text-foreground/50 tabular-nums"
          >
            [{idx}]
          </span>
          <span className="min-w-0 font-semibold text-foreground">
            {item.label}
          </span>
        </span>
        <span className="mt-1 block min-w-0 text-pretty text-foreground/70">
          {item.description}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="shrink-0 pt-[0.1em] text-foreground/55"
      >
        {item.kind === 'external' ? '↗' : '→'}
      </span>
    </span>
  )

  const baseClassName =
    'group -mx-2 block rounded-md px-2 py-1 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25'

  return (
    <AsciiRowFrame as="li">
      {item.kind === 'external' ? (
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={baseClassName}
        >
          {contents}
        </a>
      ) : (
        <Link
          to={item.to}
          hash={item.hash}
          {...(item.params ? { params: item.params } : {})}
          className={baseClassName}
        >
          {contents}
        </Link>
      )}
    </AsciiRowFrame>
  )
}

export default function AsciiFeatureLinksSection({
  heading = 'Explore Synerthink',
  features,
  links,
  className,
}: AsciiFeatureLinksSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  const resolvedFeatures = useMemo(
    () =>
      features ?? [
        {
          label: 'Simplicity is the feature.',
          description: 'Design systems that are predictable to operate.',
        },
        {
          label: 'Trust is required.',
          description: 'Make guarantees explicit and composable.',
        },
        {
          label: 'Control the core.',
          description: 'Keep foundations small; optimize the primitives.',
        },
        {
          label: 'Ship in modules.',
          description: 'Scale capability without scaling complexity.',
        },
      ],
    [features],
  )

  const resolvedLinks = useMemo<AsciiLinkItem[]>(
    () =>
      links ?? [
        {
          kind: 'internal',
          label: 'Dotlanth',
          description: 'High-trust execution fabric for autonomous systems and frontier compute.',
          to: '/products/dotlanth',
        },
        {
          kind: 'internal',
          label: 'Principles',
          description: 'How we build and what we optimize for.',
          to: '/about',
        },
        {
          kind: 'internal',
          label: 'Updates',
          description: 'Research notes, releases, and progress.',
          to: '/blog',
        },
        {
          kind: 'internal',
          label: 'v26.1.0-alpha',
          description: 'Foundation release notes and limitations.',
          to: '/blog/$slug',
          params: { slug: 'dotlanth-v26-1-0-alpha' },
        },
        {
          kind: 'external',
          label: 'Releases',
          description: 'What shipped, version-by-version.',
          href: 'https://github.com/ademclk/dotlanth/releases',
        },
      ],
    [links],
  )

  useEffect(() => {
    if (prefersReducedMotion) return
    let ctx: gsap.Context | undefined

      ; (async () => {
        const { default: gsapRuntime } = await import('gsap')

        ctx = gsapRuntime.context(() => {
          gsapRuntime.from('[data-ascii-border]', {
            opacity: 0,
            y: -6,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.06,
          })

          gsapRuntime.from('[data-ascii-row]', {
            opacity: 0,
            y: 10,
            duration: 0.75,
            ease: 'power2.out',
            stagger: 0.05,
            delay: 0.08,
          })

          gsapRuntime.to('[data-ascii-cursor]', {
            opacity: 0.25,
            duration: 0.65,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            delay: 0.8,
          })
        }, rootRef)
      })()

    return () => ctx?.revert?.()
  }, [prefersReducedMotion])

  return (
    <section
      aria-label={heading}
      className={className}
    >
      <div
        ref={rootRef}
        className="rounded-[2rem] bg-foreground/5 glass glass-1 px-6 py-7 sm:px-10 sm:py-10"
      >
        <div className="font-mono">
          <AsciiBorder variant="top" />

          <AsciiRowFrame>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {heading}
              </h2>
            </div>
          </AsciiRowFrame>

          <AsciiBorder variant="mid" />
          <AsciiSectionTitle title="Features" />

          <ul className="m-0 list-none p-0">
            {resolvedFeatures.map((feature) => (
              <AsciiRowFrame as="li" key={feature.label}>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">
                    {feature.label}
                  </p>
                  <p className="mt-1 text-pretty text-foreground/70">
                    {feature.description}
                  </p>
                </div>
              </AsciiRowFrame>
            ))}
          </ul>

          <AsciiBorder variant="mid" />
          <AsciiSectionTitle title="Links" />

          <nav aria-label="Primary" className="mt-0">
            <ul className="m-0 list-none p-0">
              {resolvedLinks.map((item, idx) => (
                <AsciiLinkRow key={`${item.kind}:${item.label}`} item={item} index={idx} />
              ))}
            </ul>
          </nav>

          <AsciiBorder variant="bottom" />
        </div>
      </div>
    </section>
  )
}
