import { createFileRoute } from '@tanstack/react-router'
import { absoluteUrl } from '@/lib/seo'

export const Route = createFileRoute('/solutions')({
  head: () => {
    const title = 'Solutions | Synerthink'
    const description =
      'Solutions are coming soon. Learn how Synerthink approaches enterprise, startup, and developer needs with Dotlanth.'
    const url = absoluteUrl('/solutions')

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { name: 'robots', content: 'noindex, follow' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: SolutionsPage,
})

function SolutionsPage() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 pt-20">
      <div className="development-notice mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Solutions coming soon</h1>
        <p className="mb-6 text-lg text-muted-foreground">
          We’re currently drafting solution briefs for teams building and operating autonomous systems.
          Soon you’ll find guidance on:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Agent operability and run lifecycle</li>
          <li>• Capability security and isolation</li>
          <li>• Record/replay debugging workflows</li>
          <li>• Modular upgrades and deterministic surfaces</li>
        </ul>
      </div>
    </main>
  )
}
