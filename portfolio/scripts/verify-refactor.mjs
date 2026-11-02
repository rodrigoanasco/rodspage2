import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const mode = process.argv[2] || 'compare'
if (!['capture', 'compare'].includes(mode)) throw new Error('Use capture or compare')
const artifactRoot = path.join(projectRoot, '.refactor-verification')
const outputRoot = path.join(artifactRoot, mode === 'capture' ? 'baseline' : 'current')
const routes = [
  '/',
  '/about',
  '/projects',
  '/blog',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/refunds',
]
const scenarios = [
  { name: 'desktop-dark', viewport: { width: 1440, height: 1000 }, theme: 'dark', routes },
  {
    name: 'mobile-light',
    viewport: { width: 390, height: 844 },
    theme: 'light',
    routes: routes.slice(0, 5),
  },
]
const digest = (data) => createHash('sha256').update(data).digest('hex')

async function compareScreenshot(page, actual, expected) {
  const exact = digest(actual) === digest(expected)
  if (exact) return { exact, matches: true, changedPixels: 0, maximumChannelDelta: 0 }

  return page.evaluate(
    async ({ actualData, expectedData }) => {
      const pixels = async (data) => {
        const image = new Image()
        image.src = `data:image/png;base64,${data}`
        await image.decode()
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d', { willReadFrequently: true })
        context.drawImage(image, 0, 0)
        return {
          width: image.width,
          height: image.height,
          data: context.getImageData(0, 0, image.width, image.height).data,
        }
      }
      const [current, baseline] = await Promise.all([pixels(actualData), pixels(expectedData)])
      if (current.width !== baseline.width || current.height !== baseline.height) {
        return { exact: false, matches: false, reason: 'Screenshot dimensions changed' }
      }
      let changedPixels = 0
      let maximumChannelDelta = 0
      for (let index = 0; index < current.data.length; index += 4) {
        let changed = false
        for (let channel = 0; channel < 4; channel += 1) {
          const delta = Math.abs(current.data[index + channel] - baseline.data[index + channel])
          if (delta) changed = true
          maximumChannelDelta = Math.max(maximumChannelDelta, delta)
        }
        if (changed) changedPixels += 1
      }
      // Chromium occasionally rounds a few antialiased border pixels differently.
      // Permit only tiny bounded noise, not broad color or content differences.
      const allowedPixels = Math.max(1, Math.floor(current.width * current.height * 0.00001))
      return {
        exact: false,
        matches: changedPixels <= allowedPixels && maximumChannelDelta <= 8,
        changedPixels,
        allowedPixels,
        maximumChannelDelta,
      }
    },
    { actualData: actual.toString('base64'), expectedData: expected.toString('base64') },
  )
}
const server = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '5174', '--strictPort'],
  {
    cwd: projectRoot,
    env: {
      ...process.env,
      VITE_TURNSTILE_SITE_KEY: '1x00000000000000000000AA',
      VITE_CLERK_PUBLISHABLE_KEY: 'pk_test_Y2xlcmsuZXhhbXBsZS50ZXN0JA',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  },
)
let serverOutput = ''
server.stdout.on('data', (chunk) => {
  serverOutput += chunk
})
server.stderr.on('data', (chunk) => {
  serverOutput += chunk
})
let browser
const results = []
try {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      if ((await fetch('http://127.0.0.1:5174')).ok) break
    } catch {
      /* Startup is asynchronous. */
    }
    if (server.exitCode !== null) throw new Error(serverOutput)
    if (attempt === 99) throw new Error(`Vite startup timed out: ${serverOutput}`)
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  await mkdir(outputRoot, { recursive: true })
  browser = await chromium.launch({ headless: true })
  for (const scenario of scenarios) {
    const context = await browser.newContext({
      viewport: scenario.viewport,
      reducedMotion: 'reduce',
      colorScheme: scenario.theme,
      locale: 'en-CA',
    })
    await context.addInitScript((theme) => localStorage.setItem('theme', theme), scenario.theme)
    await context.route('**/api/blog/posts*', (route) =>
      route.fulfill({ json: { posts: [], hasMore: false } }),
    )
    await context.route('**/*.mp4', (route) => route.abort())
    await context.route(
      /challenges\.cloudflare\.com|clerk\.browser\.js|fonts\.(googleapis|gstatic)\.com/,
      (route) => route.abort(),
    )
    const page = await context.newPage()
    for (const route of scenario.routes) {
      const errors = []
      const onError = (error) => errors.push(error.message)
      page.on('pageerror', onError)
      await page.goto(`http://127.0.0.1:5174${route}`)
      await page.locator('main').waitFor({ state: 'visible' })
      await page.locator('h1, h2').first().waitFor({ state: 'visible' })
      await page.evaluate(async () => {
        await document.fonts.ready
        document.querySelectorAll('img').forEach((image) => {
          image.loading = 'eager'
        })
        await Promise.all([...document.images].map((image) => image.decode().catch(() => {})))
        for (let top = 0; top < document.documentElement.scrollHeight; top += 650) {
          window.scrollTo({ top, behavior: 'instant' })
          await new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          )
        }
        window.scrollTo({ top: 0, behavior: 'instant' })
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      })
      await page.addStyleTag({
        content:
          '*,:before,:after { animation: none !important; transition: none !important; caret-color: transparent !important; }',
      })
      const contract = await page.evaluate(() => {
        const normalize = (value) => value.replace(/\s+/g, ' ').trim()
        const rect = (element) => {
          const box = element.getBoundingClientRect()
          return [box.x, box.y + scrollY, box.width, box.height].map(
            (value) => Math.round(value * 10) / 10,
          )
        }
        return {
          text: normalize(document.body.innerText),
          headings: [...document.querySelectorAll('h1,h2,h3,h4')].map((element) => ({
            level: element.tagName,
            text: normalize(element.textContent),
            rect: rect(element),
          })),
          links: [...document.querySelectorAll('a')].map((element) => ({
            text: normalize(element.textContent),
            href: element.getAttribute('href'),
            target: element.target,
            rel: element.rel,
          })),
          images: [...document.images].map((element) => ({
            src: element.getAttribute('src'),
            alt: element.alt,
            rect: rect(element),
          })),
          controls: [...document.querySelectorAll('input,textarea,button')].map((element) => ({
            tag: element.tagName,
            type: element.type,
            name: element.name,
            text: normalize(element.textContent),
            required: element.required || false,
            disabled: element.disabled || false,
          })),
          landmarks: [
            ...document.querySelectorAll('header.top-nav,header.legal-header,main,footer,nav'),
          ]
            .filter((element) => !element.matches('nav.blog-pagination'))
            .map((element) => ({
              tag: element.tagName,
              label: element.getAttribute('aria-label'),
              rect: rect(element),
            })),
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight,
        }
      })
      const name = `${scenario.name}-${route === '/' ? 'home' : route.slice(1)}`
      const screenshot = await page.screenshot({
        fullPage: true,
        animations: 'disabled',
        mask: [page.locator('video')],
      })
      await writeFile(path.join(outputRoot, `${name}.png`), screenshot)
      await writeFile(path.join(outputRoot, `${name}.json`), JSON.stringify(contract, null, 2))
      if (mode === 'compare') {
        const baselineContract = await readFile(
          path.join(artifactRoot, 'baseline', `${name}.json`),
          'utf8',
        )
        const baselineImage = await readFile(path.join(artifactRoot, 'baseline', `${name}.png`))
        const imageComparison = await compareScreenshot(page, screenshot, baselineImage)
        results.push({
          name,
          contractMatches: JSON.stringify(contract, null, 2) === baselineContract,
          screenshotMatches: imageComparison.matches,
          imageComparison,
          errors,
        })
      } else results.push({ name, errors })
      page.off('pageerror', onError)
      console.log(`${mode}: ${name}`)
    }
    await context.close()
  }
  await writeFile(path.join(outputRoot, 'results.json'), JSON.stringify(results, null, 2))
  if (
    results.some(
      (result) =>
        result.errors.length ||
        result.contractMatches === false ||
        result.screenshotMatches === false,
    )
  ) {
    console.log(
      JSON.stringify(
        results.filter(
          (result) =>
            result.errors.length ||
            result.contractMatches === false ||
            result.screenshotMatches === false,
        ),
        null,
        2,
      ),
    )
    process.exitCode = 1
  } else console.log(`${mode}: ${results.length} route/theme/viewport scenarios passed`)
} finally {
  await browser?.close()
  server.kill()
}
