import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

// Derive small, real previews from the existing project media. Originals stay intact.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const output = path.join(root, 'public/projects')
const port = 5177
const origin = `http://127.0.0.1:${port}`
const previewSeconds = { unify: 8, bleet: 35, 'hungry-doug': 15 }
const videos = [
  ['unify', 'unify.mp4'],
  ['unify-process', 'unify_previous.mp4'],
  ['learnverse', 'learnverse.mp4'],
  ['subvision', 'pathplanning.mp4'],
  ['bleet', 'bLeet _ nwHacks 2026 _ Grind Blender Smarter.mp4'],
  ['panoramizer', 'panoramizer.mp4'],
  ['hungry-doug', 'hungry_doug_demo.mp4'],
]
const photos = [
  ['learnverse-team', 'GDSC_us_winners.jpg'],
  ['competition-day', 'GDSC_all_group.jpg'],
  ['sfu-award', 'SFU_CS_AWARD.jpeg'],
]

const server = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  {
    cwd: root,
    stdio: 'ignore',
    windowsHide: true,
  },
)
let browser

try {
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error(`Preview server could not start on port ${port}.`)
    try {
      if ((await fetch(origin)).ok) break
    } catch {
      /* Wait for local Vite. */
    }
    if (attempt === 59) throw new Error('Preview server startup timed out.')
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  await mkdir(output, { recursive: true })
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(origin)
  await page.setContent('<!doctype html><html><body></body></html>')
  const manifest = []

  for (const [id, filename, kind] of [
    ...videos.map(([id, file]) => [id, file, 'video']),
    ...photos.map(([id, file]) => [id, file, 'photo']),
  ]) {
    const directory = kind === 'video' ? 'videos/project_videos' : 'images/projects_images'
    const result = await page.evaluate(
      async ({ url, kind, seconds }) => {
        const media = document.createElement(kind === 'video' ? 'video' : 'img')
        media.crossOrigin = 'anonymous'
        media.muted = true
        const loaded = new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error(`Timed out reading ${url}`)), 20000)
          media.addEventListener(kind === 'video' ? 'loadeddata' : 'load', resolve, { once: true })
          media.addEventListener('error', () => reject(new Error(`Could not read ${url}`)), {
            once: true,
          })
        })
        media.src = url
        if (kind === 'video') media.preload = 'auto'
        await loaded
        if (kind === 'video' && media.duration > 1) {
          const seeked = new Promise((resolve) =>
            media.addEventListener('seeked', resolve, { once: true }),
          )
          media.currentTime = Math.min(seconds, media.duration - 0.1)
          await seeked
        }
        const sourceWidth = kind === 'video' ? media.videoWidth : media.naturalWidth
        const sourceHeight = kind === 'video' ? media.videoHeight : media.naturalHeight
        const scale = Math.min(960 / sourceWidth, 720 / sourceHeight, 1)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(sourceWidth * scale)
        canvas.height = Math.round(sourceHeight * scale)
        canvas.getContext('2d').drawImage(media, 0, 0, canvas.width, canvas.height)
        const data = canvas.toDataURL('image/webp', 0.82).split(',')[1]
        const duration = kind === 'video' ? media.duration : undefined
        if (kind === 'video') {
          media.pause()
          media.removeAttribute('src')
          media.load()
        }
        return { data, width: canvas.width, height: canvas.height, duration }
      },
      {
        url: `${origin}/src/assets/${directory}/${encodeURIComponent(filename)}`,
        kind,
        seconds: previewSeconds[id] ?? 1.5,
      },
    )

    const bytes = Buffer.from(result.data, 'base64')
    await writeFile(path.join(output, `${id}.webp`), bytes)
    manifest.push({
      id,
      source: filename,
      kind,
      width: result.width,
      height: result.height,
      duration: result.duration,
      bytes: bytes.length,
    })
    console.log(`${id}.webp: ${bytes.length} bytes (${result.width} x ${result.height})`)
  }
  await writeFile(
    path.join(output, 'media-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
  )
} finally {
  await browser?.close()
  server.kill()
}
