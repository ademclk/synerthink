import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import Navbar from '@/components/navbar'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'

import cssUrl from '../index.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var storageKey='vite-ui-theme';var stored=window.localStorage.getItem(storageKey);var theme=(stored==='light'||stored==='dark'||stored==='system')?stored:'dark';var root=document.documentElement;root.classList.remove('light','dark');var resolved=theme;if(theme==='system'){resolved=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}root.classList.add(resolved);root.style.colorScheme=resolved}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { title: 'Synerthink - Create What Matters' },
      {
        name: 'description',
        content:
          'Create what matters. We handle the rest. Synerthink is building the next generation of digital infrastructure with the Dotlanth ecosystem - featuring dotVM, dotDB, dotUX, and dotCloud.',
      },
      {
        name: 'keywords',
        content:
          'Synerthink, Dotlanth, dotVM, dotDB, dotUX, dotCloud, technology, software development, innovation, digital infrastructure, create what matters',
      },
      { property: 'og:title', content: 'Synerthink - Create What Matters' },
      {
        property: 'og:description',
        content:
          'Create what matters. We handle the rest. Synerthink is building the next generation of digital infrastructure with the Dotlanth ecosystem - featuring dotVM, dotDB, dotUX, and dotCloud.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Synerthink - Create What Matters' },
      {
        name: 'twitter:description',
        content:
          'Create what matters. We handle the rest. Synerthink is building the next generation of digital infrastructure with the Dotlanth ecosystem - featuring dotVM, dotDB, dotUX, and dotCloud.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: cssUrl },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}

