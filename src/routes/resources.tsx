import { createFileRoute } from '@tanstack/react-router'
import { absoluteUrl } from '@/lib/seo'

export const Route = createFileRoute('/resources')({
  head: () => {
    const title = 'Resources | Synerthink'
    const description =
      'Resources are coming soon: documentation, tutorials, examples, and community resources for Dotlanth and Synerthink.'
    const url = absoluteUrl('/resources')

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
  component: ResourcesPage,
})

function ResourcesPage() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 pt-20">
      <div className="development-notice mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Resources coming soon</h1>
        <p className="mb-6 text-lg text-muted-foreground">
          We’re building a resources library for Dotlanth and the Synerthink ecosystem.
          Soon you’ll find:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Product documentation and reference</li>
          <li>• Step-by-step tutorials and examples</li>
          <li>• Release notes and research posts</li>
          <li>• Community links and updates</li>
        </ul>
      </div>
    </main>
  )
}
