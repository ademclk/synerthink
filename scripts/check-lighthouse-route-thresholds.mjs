import fs from 'node:fs'
import path from 'node:path'

const thresholds = {
  'blog-index': { performance: 90 },
  solutions: { performance: 95 },
}

const suffixArg = process.argv.find((arg) => arg.startsWith('--suffix='))
const suffix = suffixArg ? suffixArg.slice('--suffix='.length) : ''
const reportDirArg = process.argv.find((arg) => arg.startsWith('--dir='))
const reportDir = reportDirArg ? reportDirArg.slice('--dir='.length) : '/tmp'

let hasFailure = false

for (const [route, expectation] of Object.entries(thresholds)) {
  const reportPath = path.join(reportDir, `synerthink-${route}${suffix}.report.json`)

  if (!fs.existsSync(reportPath)) {
    hasFailure = true
    console.error(`${route}: missing Lighthouse report at ${reportPath}`)
    continue
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'))
  const performanceScore = Math.round((report.categories.performance.score ?? 0) * 100)

  if (performanceScore < expectation.performance) {
    hasFailure = true
    console.error(
      `${route}: performance ${performanceScore} is below required ${expectation.performance}`
    )
  } else {
    console.log(`${route}: performance ${performanceScore} meets required ${expectation.performance}`)
  }
}

if (hasFailure) {
  process.exitCode = 1
}
