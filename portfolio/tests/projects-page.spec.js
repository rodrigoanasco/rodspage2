import { test, expect } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'

const evidence = '.impeccable/review/projects-after'

for (const { width, theme } of [
  { width: 1440, theme: 'dark' },
  { width: 1440, theme: 'light' },
  { width: 390, theme: 'dark' },
  { width: 320, theme: 'light' },
]) {
  test(`Projects preserves content and loads previews at ${width}px in ${theme}`, async ({
    page,
  }) => {
    const mediaRequests = []
    const errors = []
    page.on('request', (request) => {
      if (request.resourceType() === 'media') mediaRequests.push(request.url())
    })
    page.on('pageerror', (error) => errors.push(error.message))
    await page.setViewportSize({ width, height: 900 })
    await page.addInitScript((value) => localStorage.setItem('theme', value), theme)
    await page.goto('/projects')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Projects')
    await expect(page.getByRole('link', { name: 'Read the paper on OpenReview' })).toHaveAttribute(
      'href',
      'https://openreview.net/forum?id=eVlJ1fn4g4',
    )
    await expect(page.locator('.project-case')).toHaveCount(6)
    await expect(
      page.getByRole('link', { name: 'Download the project report (PDF)' }),
    ).toHaveAttribute('download', '')
    await page.getByText('See the development process', { exact: true }).click()
    for (const image of await page.locator('.projects-main img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect
        .poll(() => image.evaluate((node) => node.complete && node.naturalWidth > 0))
        .toBe(true)
    }
    await expect(page.locator('video')).toHaveCount(0)
    expect(mediaRequests).toEqual([])
    expect(errors).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.getByText('See the development process', { exact: true }).click()
    await page.evaluate(() => scrollTo(0, 0))
    await mkdir(evidence, { recursive: true })
    await page.screenshot({ path: `${evidence}/${width}-${theme}.png`, fullPage: true })
    if (width === 1440 && theme === 'dark') {
      await writeFile(
        `${evidence}/performance.json`,
        JSON.stringify(
          {
            initialAndScrollMediaRequests: mediaRequests.length,
            videoElementsBeforeInteraction: 0,
          },
          null,
          2,
        ),
      )
    }
  })
}

test('Project demos load on request and pause offscreen or when another starts', async ({
  page,
}) => {
  const requested = []
  page.on('request', (request) => {
    if (request.resourceType() === 'media') requested.push(request.url())
  })
  await page.goto('/projects#subvision')
  const pathPlanning = page.locator('#subvision')
  await expect(pathPlanning.getByRole('heading')).toBeInViewport()
  await pathPlanning.getByRole('button', { name: 'Play PathPlanning GBNN project video' }).click()
  const first = pathPlanning.locator('video')
  await expect(first).toBeFocused()
  await expect
    .poll(() => first.evaluate((video) => !video.paused && video.currentTime > 0))
    .toBe(true)
  expect(new Set(requested).size).toBe(1)
  await expect(first).toHaveJSProperty('loop', false)
  const bleet = page.locator('#bleet')
  await bleet.evaluate((node) => node.scrollIntoView({ block: 'start', behavior: 'instant' }))
  await expect(first).not.toBeInViewport()
  await expect.poll(() => first.evaluate((video) => video.paused)).toBe(true)
  await bleet.getByRole('button', { name: 'Play bLeet project video' }).click()
  const second = bleet.locator('video')
  await expect.poll(() => second.evaluate((video) => !video.paused)).toBe(true)
  // Also verify the coordination listener independently of scrolling.
  await first.evaluate((video) => video.dispatchEvent(new Event('play')))
  await expect.poll(() => second.evaluate((video) => video.paused)).toBe(true)
})

test('A failed demo offers the original video as a recovery link', async ({ page }) => {
  await page.route('**/pathplanning.mp4', (route) => route.abort())
  await page.goto('/projects#subvision')
  await page.getByRole('button', { name: 'Play PathPlanning GBNN project video' }).click()
  await expect(page.getByRole('link', { name: 'Open the video directly' })).toHaveAttribute(
    'href',
    /pathplanning\.mp4$/,
  )
})
