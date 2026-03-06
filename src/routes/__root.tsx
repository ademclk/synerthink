import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import Navbar from '@/components/navbar'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import { absoluteUrl, DEFAULT_OG_IMAGE_PATH, getSiteUrl } from '@/lib/seo'

import cssUrl from '../index.css?url'
import hankenGroteskLatinWoff2Url from '@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2?url'

const THEME_INIT_SCRIPT = `(function(){try{var storageKey='vite-ui-theme';var stored=window.localStorage.getItem(storageKey);var theme=(stored==='light'||stored==='dark'||stored==='system')?stored:'dark';var root=document.documentElement;root.classList.remove('light','dark');var resolved=theme;if(theme==='system'){resolved=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}root.classList.add(resolved);root.style.colorScheme=resolved}catch(e){}})();`

export const Route = createRootRoute({
  head: () => {
    const siteUrl = getSiteUrl()
    const ogImage = absoluteUrl(DEFAULT_OG_IMAGE_PATH)

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { title: 'Synerthink' },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
          name: 'description',
          content:
            'We build foundational computing products that remove complexity in the AI era.',
        },
        {
          name: 'keywords',
          content:
            'Synerthink, Dotlanth, autonomous systems, artifacts, record replay, capability security, dotDSL, DotDB',
        },
        { property: 'og:site_name', content: 'Synerthink' },
        { property: 'og:title', content: 'Synerthink' },
        {
          property: 'og:description',
          content:
            'We build foundational computing products that remove complexity in the AI era.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${siteUrl}/` },
        { property: 'og:image', content: ogImage },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Synerthink' },
        {
          name: 'twitter:description',
          content:
            'We build foundational computing products that remove complexity in the AI era.',
        },
        { name: 'twitter:image', content: ogImage },
        {
          'script:ld+json': {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': `${siteUrl}/#organization`,
                name: 'Synerthink',
                url: siteUrl,
                description:
                  'Synerthink builds foundational computing products for autonomous systems, with a focus on legible execution, explicit control, and inspectable run history.',
                logo: absoluteUrl('/android-chrome-512x512.png'),
                areaServed: 'Worldwide',
                knowsAbout: [
                  'autonomous systems',
                  'execution fabrics',
                  'record/replay',
                  'capability security',
                  'dotDSL',
                  'DotDB',
                ],
                sameAs: [
                  'https://github.com/synerthink',
                  'https://twitter.com/synerthink',
                  'https://linkedin.com/company/synerthink',
                ],
              },
              {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                url: siteUrl,
                name: 'Synerthink',
                inLanguage: 'en',
                publisher: { '@id': `${siteUrl}/#organization` },
              },
            ],
          },
        },
      ],
      links: [
        { rel: 'stylesheet', href: cssUrl },
        {
          rel: 'preload',
          href: hankenGroteskLatinWoff2Url,
          as: 'font',
          type: 'font/woff2',
          crossOrigin: 'anonymous',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'Synerthink RSS Feed',
          href: '/feed.xml',
        },
        {
          rel: 'alternate',
          type: 'application/atom+xml',
          title: 'Synerthink Atom Feed',
          href: '/atom.xml',
        },
      ],
    }
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 z-[200] rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-lg ring-1 ring-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/30"
        >
          Skip to content
        </a>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Navbar />
          <div id="content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
