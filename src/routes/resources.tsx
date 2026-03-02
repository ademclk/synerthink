import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/resources')({
  head: () => ({
    meta: [
      { title: 'Resources | Synerthink' },
      {
        name: 'description',
        content:
          'Resources coming soon — documentation, tutorials, examples, and community resources for Dotlanth and Synerthink.',
      },
    ],
  }),
  component: ResourcesPage,
})

function ResourcesPage() {
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
        <h1 className="text-4xl font-bold mb-6">Resources coming soon</h1>
        <p className="mb-6 text-lg text-muted-foreground">
          We’re currently developing our comprehensive resources section. Soon
          you’ll find:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Detailed Documentation</li>
          <li>• Step-by-step Tutorials</li>
          <li>• Code Examples</li>
          <li>• Community Resources</li>
        </ul>
      </div>
    </main>
  )
}
