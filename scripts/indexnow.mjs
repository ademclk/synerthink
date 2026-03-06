import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { basename, join } from 'node:path'

const cwd = process.cwd()
const defaultSiteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://synerthink.com').replace(
  /\/+$/,
  ''
)

function normalizeUrl(input, host) {
  if (!input) return null
  if (input.startsWith('http://') || input.startsWith('https://')) return input
  const normalizedPath = input.startsWith('/') ? input : `/${input}`
  return `${host}${normalizedPath}`
}

function getIndexNowKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim()

  const publicDir = join(cwd, 'public')
  for (const fileName of readdirSync(publicDir)) {
    if (!fileName.endsWith('.txt')) continue
    if (fileName === 'robots.txt' || fileName === 'llms.txt') continue

    const filePath = join(publicDir, fileName)
    const key = basename(fileName, '.txt')
    const contents = readFileSync(filePath, 'utf8').trim()

    if (contents === key) return key
  }

  throw new Error(
    'No IndexNow key found. Add a root key file in public/{key}.txt or set INDEXNOW_KEY.'
  )
}

function getUrlsFromPagesManifest() {
  const pagesManifestPath = join(cwd, '.output', 'public', 'pages.json')
  if (!existsSync(pagesManifestPath)) return []

  const manifest = JSON.parse(readFileSync(pagesManifestPath, 'utf8'))
  const host = String(manifest.host || defaultSiteUrl).replace(/\/+$/, '')
  const pages = Array.isArray(manifest.pages) ? manifest.pages : []

  return pages
    .map((page) => normalizeUrl(page.path, host))
    .filter(Boolean)
}

const cliUrls = process.argv.slice(2)
const urls = [...new Set((cliUrls.length ? cliUrls : getUrlsFromPagesManifest()).filter(Boolean))]

if (urls.length === 0) {
  throw new Error(
    'No URLs to submit. Pass URLs as arguments or run this after build so .output/public/pages.json exists.'
  )
}

const host = new URL(urls[0]).origin.replace(/\/+$/, '')
const key = getIndexNowKey()
const keyLocation = `${host}/${key}.txt`

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    host: new URL(urls[0]).host,
    key,
    keyLocation,
    urlList: urls,
  }),
})

if (!response.ok) {
  const body = await response.text()
  throw new Error(`IndexNow submission failed with ${response.status}: ${body}`)
}

console.log(`Submitted ${urls.length} URL(s) to IndexNow for ${host}.`)
