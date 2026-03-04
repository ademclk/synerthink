import { readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const handlerPath = resolve(repoRoot, '.output/server/functions/index.mjs')

const source = readFileSync(handlerPath, 'utf8')

const MARKER_URL = '/* patched: absolute Request URL for Azure SWA */'
const MARKER_BODY = '/* patched: buffer Azure SWA response body */'

let patched = source
let didPatch = false

if (!patched.includes(MARKER_URL)) {
  const requestRe = /const request\s*=\s*new Request\(url,\s*\{/
  if (!requestRe.test(patched)) {
    throw new Error(
      `[patch-azure-swa-handler] Could not find expected Request() snippet in ${handlerPath}`,
    )
  }

  const requestReplacement = `${MARKER_URL}\n  const baseUrl = (() => {\n    const getFirst = (value) => (Array.isArray(value) ? value[0] : value);\n    const firstToken = (value) => {\n      const v = getFirst(value);\n      if (!v) return undefined;\n      const token = String(v).split(\",\")[0].trim();\n      return token || undefined;\n    };\n\n    const originalUrlHeader = firstToken(req.headers[\"x-ms-original-url\"]);\n    if (originalUrlHeader) {\n      try {\n        const origin = new URL(originalUrlHeader).origin;\n        if (origin && origin !== \"null\") return origin;\n      } catch {}\n    }\n\n    const protoHeader = req.headers[\"x-forwarded-proto\"] || req.headers[\"x-forwarded-protocol\"];\n    const hostHeader = req.headers[\"x-forwarded-host\"] || req.headers[\"host\"];\n    const proto = firstToken(protoHeader) || \"https\";\n    const host = firstToken(hostHeader) || \"localhost\";\n    return proto + \"://\" + host;\n  })();\n  const requestUrl = new URL(url, baseUrl);\n  const request = new Request(requestUrl, {`

  patched = patched.replace(requestRe, requestReplacement)
  didPatch = true
}

if (!patched.includes(MARKER_BODY)) {
  const bodyNeedle = 'body: response.body,'
  if (!patched.includes(bodyNeedle)) {
    throw new Error(
      `[patch-azure-swa-handler] Could not find expected response body snippet in ${handlerPath}: ${bodyNeedle}`,
    )
  }

  const bodyReplacement = `${MARKER_BODY}\n    body: Buffer.from(await response.arrayBuffer()),`
  patched = patched.replace(bodyNeedle, bodyReplacement)
  didPatch = true
}

if (!didPatch) {
  process.stdout.write(`[patch-azure-swa-handler] Already patched: ${handlerPath}\n`)
  process.exit(0)
}

const tmpPath = `${handlerPath}.tmp`
writeFileSync(tmpPath, patched, 'utf8')
renameSync(tmpPath, handlerPath)
process.stdout.write(`[patch-azure-swa-handler] Patched: ${handlerPath}\n`)
