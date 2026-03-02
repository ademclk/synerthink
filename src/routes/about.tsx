import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About | Synerthink' },
      {
        name: 'description',
        content:
          'Learn about Synerthink — building the next generation of digital infrastructure with the Dotlanth ecosystem.',
      },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | undefined

    ;(async () => {
      const { default: gsapRuntime } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsapRuntime.registerPlugin(ScrollTrigger)

      ctx = gsapRuntime.context(() => {
        gsapRuntime.from('.about-section', {
          opacity: 0,
          y: 20,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
          },
        })
      }, sectionRef)
    })()

    return () => ctx?.revert?.()
  }, [])

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-28 text-center sm:px-6">
      <div ref={sectionRef} className="space-y-10">
        <div className="about-section">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Synerthink
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/75 sm:text-lg">
            We’re building Dotlanth — a new foundation that helps teams ship
            durable software with less ceremony and more clarity.
          </p>
        </div>

        <div className="about-section rounded-[2rem] border border-foreground/10 bg-foreground/5 px-6 py-8 text-left shadow-xl backdrop-blur-xl sm:px-10">
          <h2 className="text-xl font-bold">Our thesis</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75 sm:text-base">
            Great products are built when the tooling disappears. The best
            developer experience is the one that keeps you in flow — close to
            the user and the idea.
          </p>
        </div>
      </div>
    </main>
  )
}
