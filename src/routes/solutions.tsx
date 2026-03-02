import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/solutions')({
  head: () => ({
    meta: [
      { title: 'Solutions | Synerthink' },
      {
        name: 'description',
        content:
          'Solutions coming soon — learn how Synerthink approaches enterprise, startup, and developer needs with Dotlanth.',
      },
    ],
  }),
  component: SolutionsPage,
})

function SolutionsPage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | undefined

    ;(async () => {
      const { default: gsapRuntime } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsapRuntime.registerPlugin(ScrollTrigger)

      ctx = gsapRuntime.context(() => {
        gsapRuntime.from('.development-notice', {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.development-notice',
            start: 'top 80%',
          },
        })
      }, sectionRef)
    })()

    return () => ctx?.revert?.()
  }, [])

  return (
    <main
      ref={sectionRef}
      className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 pt-20"
    >
      <div className="development-notice mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Solutions coming soon</h1>
        <p className="mb-6 text-lg text-muted-foreground">
          We’re currently developing our comprehensive solutions documentation.
          Soon you’ll find detailed information about:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Microservices Architecture</li>
          <li>• Real-time Application Development</li>
          <li>• Data Processing Solutions</li>
          <li>• API Development Patterns</li>
        </ul>
      </div>
    </main>
  )
}
