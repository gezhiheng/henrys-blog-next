import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const projectRoot = process.cwd()
const sourceDir = path.join(
  projectRoot,
  'node_modules',
  'next',
  'dist',
  'compiled',
  '@vercel',
  'og',
)
const standalonePnpmDir = path.join(
  projectRoot,
  '.next',
  'standalone',
  'node_modules',
  '.pnpm',
)

async function ensureOgRuntimeInStandalone() {
  const sourceStats = await fs.stat(sourceDir).catch(() => null)
  const pnpmStats = await fs.stat(standalonePnpmDir).catch(() => null)

  if (!sourceStats?.isDirectory() || !pnpmStats?.isDirectory()) {
    return
  }

  const nextPackages = await fs.readdir(standalonePnpmDir, { withFileTypes: true })

  await Promise.all(
    nextPackages
      .filter(entry => entry.isDirectory() && entry.name.startsWith('next@'))
      .map(async (entry) => {
        const targetDir = path.join(
          standalonePnpmDir,
          entry.name,
          'node_modules',
          'next',
          'dist',
          'compiled',
          '@vercel',
          'og',
        )

        await fs.mkdir(path.dirname(targetDir), { recursive: true })
        await fs.cp(sourceDir, targetDir, { force: true, recursive: true })
      }),
  )
}

ensureOgRuntimeInStandalone().catch((error) => {
  console.error('Failed to copy Next OG runtime into standalone output.')
  console.error(error)
  process.exit(1)
})
