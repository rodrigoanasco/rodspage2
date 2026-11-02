import { test, expect } from '@playwright/test'

test('home experience uses native continuous scrolling and preserves every entry', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Rodrigo Añasco', level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Experience', level: 2, exact: true })).toBeVisible()
  await expect(page.locator('.chapter-next, .chapter-gallery canvas')).toHaveCount(0)
  await expect(page.locator('#chapter-unify .chapter-highlights li')).toHaveCount(3)
  await expect(page.locator('#chapter-subvision .chapter-highlights li')).toHaveCount(3)
  await expect(page.locator('#chapter-unify .chapter-gallery-phone .chapter-photo-0 img')).toHaveAttribute('src', '/experience/unify-phone.png')

  const stagePositions = await page.locator('.chapter-stage').evaluateAll((nodes) =>
    nodes.map((node) => getComputedStyle(node).position),
  )
  expect(stagePositions.every((position) => position !== 'sticky')).toBeTruthy()

  const start = await page.evaluate(() => window.scrollY)
  await page.mouse.move(700, 700)
  await page.mouse.wheel(0, 650)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(start + 250)

  await page.locator('#chapter-subvision .chapter-project-link').click()
  await expect(page).toHaveURL(/\/projects#subvision$/)
  await expect(page.locator('#subvision')).toBeVisible()
  expect(errors).toEqual([])
})

test('volunteer entries stay together and mobile layouts do not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 })
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Volunteer experience', level: 2, exact: true })).toBeVisible()
  await expect(page.locator('#chapter-yres h3')).toContainText('York Region Educational Services')
  await expect(page.locator('#chapter-yres .chapter-period')).toContainText('Mar 2026 - Present')
  await expect(page.locator('#chapter-fic h3')).toContainText('Fraser International College')
  await expect(page.locator('#chapter-fic .chapter-role')).toHaveText('Peer Educator')
  await expect(page.locator('#chapter-yres .chapter-summary')).toBeVisible()
  await expect(page.locator('#chapter-fic .chapter-summary')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()

  await page.locator('#chapter-fic').scrollIntoViewIfNeeded()
  await expect(page.locator('#chapter-fic h3')).toBeVisible()
})

test('reduced motion keeps content visible and disables smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Experience', level: 2, exact: true })).toBeVisible()
  await expect(page.locator('#chapter-unify .chapter-copy')).toBeVisible()
  await expect(page.locator('#chapter-subvision .chapter-copy')).toBeVisible()
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  expect(await page.locator('.hero-title-layer').evaluate((node) => Number.parseFloat(getComputedStyle(node).animationDuration))).toBeLessThanOrEqual(0.00001)
})

test('navigation, theme, and route anchors remain usable', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Skip to content' }).focus()
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible()
  await page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Projects', exact: true }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('heading', { name: 'Selected projects', level: 1 })).toBeVisible()
  await expect(page.locator('#subvision video')).toHaveAttribute('poster', '/experience/subvision-hull-points.jpg')
})
