import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const handlerPath = resolve(repoRoot, '.output/server/functions/index.mjs')

const source = readFileSync(handlerPath, 'utf8')

if (source.includes('/* patched: absolute Request URL for Azure SWA */')) {
  process.stdout.write(`[patch-azure-swa-handler] Already patched: ${handlerPath}\n`)
  process.exit(0)
}

const needle = 'const request = new Request(url, {'
if (!source.includes(needle)) {
  throw new Error(
    `[patch-azure-swa-handler] Could not find expected snippet in ${handlerPath}: ${needle}`,
  )
}

const replacement = `/* patched: absolute Request URL for Azure SWA */\n  const baseUrl = (() => {\n    const protoHeader = req.headers[\"x-forwarded-proto\"] || req.headers[\"x-forwarded-protocol\"]; \n    const hostHeader = req.headers[\"x-forwarded-host\"] || req.headers[\"host\"]; \n    const proto = Array.isArray(protoHeader) ? protoHeader[0] : protoHeader;\n    const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;\n    return \`\${proto || \"https\"}://\${host || \"localhost\"}\`;\n  })();\n  const requestUrl = new URL(url, baseUrl);\n  const request = new Request(requestUrl, {`

const patched = source.replace(needle, replacement)
writeFileSync(handlerPath, patched, 'utf8')
process.stdout.write(`[patch-azure-swa-handler] Patched: ${handlerPath}\n`)
