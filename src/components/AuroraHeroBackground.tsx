import { cn } from '@/lib/utils'

type AuroraHeroBackgroundProps = {
  className?: string
}

function AuroraLayer({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn('aurora aurora--bg', className)}>
      <div className="aurora__item" />
      <div className="aurora__item" />
      <div className="aurora__item" />
      <div className="aurora__item" />
    </div>
  )
}

export default function AuroraHeroBackground({ className }: AuroraHeroBackgroundProps) {
  const maskFull =
    'radial-gradient(circle at 50% 56%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 74%, rgba(0,0,0,0) 100%)'
  const maskWide =
    'radial-gradient(circle at 50% 56%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 94%)'
  const maskCenter =
    'radial-gradient(circle at 50% 56%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 46%, rgba(0,0,0,0) 86%)'

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      <div className="absolute inset-[-18%]">
        <div
          className="absolute inset-0 saturate-[1.35] dark:saturate-[1.15] [--aurora-size:min(132vw,1480px)] [--aurora-blur:260px] [--aurora-opacity:0.20] dark:[--aurora-opacity:0.26]"
          style={{ WebkitMaskImage: maskCenter, maskImage: maskCenter }}
        >
          <AuroraLayer className="aurora-drift-1" />
        </div>
        <div
          className="absolute inset-0 saturate-[1.25] dark:saturate-[1.1] [--aurora-size:min(116vw,1320px)] [--aurora-blur:180px] [--aurora-opacity:0.17] dark:[--aurora-opacity:0.21]"
          style={{ WebkitMaskImage: maskWide, maskImage: maskWide }}
        >
          <AuroraLayer className="aurora-drift-2" />
        </div>
        <div
          className="absolute inset-0 saturate-[1.15] dark:saturate-[1.05] [--aurora-size:min(98vw,1120px)] [--aurora-blur:120px] [--aurora-opacity:0.14] dark:[--aurora-opacity:0.17]"
          style={{ WebkitMaskImage: maskFull, maskImage: maskFull }}
        >
          <AuroraLayer className="aurora-drift-3" />
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(0,0,0,0.06),transparent_65%)] dark:bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.05),transparent_62%)]" />
      <div className="absolute inset-0 opacity-45 mix-blend-overlay bg-[linear-gradient(115deg,rgba(255,255,255,0.10),transparent_42%)] dark:opacity-28" />
      <div className="hero-grain absolute inset-0 opacity-[0.045] dark:opacity-[0.06]" />
    </div>
  )
}
