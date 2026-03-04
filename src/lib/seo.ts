const DEFAULT_SITE_URL = 'https://synerthink.com'

export const DEFAULT_OG_IMAGE_PATH = '/hero-core.png'

export function getSiteUrl() {
  const raw = (import.meta.env.VITE_SITE_URL as string | undefined) ?? ''
  const siteUrl = (raw || DEFAULT_SITE_URL).trim()
  return siteUrl.replace(/\/+$/, '')
}

export function absoluteUrl(path: string) {
  const base = getSiteUrl()
  if (!path) return base
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath}`
}

