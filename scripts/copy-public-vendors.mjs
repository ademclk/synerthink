import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const vendorFiles = [
  {
    from: resolve(repoRoot, 'node_modules/p5/lib/p5.min.js'),
    to: resolve(repoRoot, 'public/vendor/p5.min.js'),
  },
]

for (const file of vendorFiles) {
  mkdirSync(dirname(file.to), { recursive: true })
  copyFileSync(file.from, file.to)
}

