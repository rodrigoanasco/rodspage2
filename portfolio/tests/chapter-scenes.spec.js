import { test, expect } from '@playwright/test'

test('home preserves the original experience layout, media, and project links', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Rodrigo Añasco', level: 1 })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Past Work Experience', level: 2, exact: true }),
  ).toBeVisible()
  await expect(page.locator('.experience-chapter')).toHaveCount(0)
  await expect(page.locator('.experience-showcase .experience-panel')).toHaveCount(2)
  await expect(page.locator('.experience-panel .experience-highlights li')).toHaveCount(6)
  await expect(page.locator('.experience-collage-unify .collage-photo')).toHaveCount(4)
  await expect(page.locator('.experience-collage-subvision .collage-photo')).toHaveCount(3)
  await expect(page.locator('.experience-collage-unify .collage-photo-0 img')).toHaveAttribute(
    'src',
    '/experience/unify-phone.png',
  )

  const start = await page.evaluate(() => window.scrollY)
  await page.mouse.move(700, 700)
  await page.mouse.wheel(0, 650)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(start + 250)

  await page.locator('#experience').scrollIntoViewIfNeeded()
  await expect(page.locator('.experience-wrapper')).toHaveClass(/is-visible/)
  await expect(page.locator('.experience-panel').nth(1)).toHaveCSS('opacity', '1')
  await page
    .locator('#experience')
    .screenshot({ path: testInfo.outputPath('original-experience-desktop.png') })
  await page
    .locator('.experience-panel')
    .filter({ has: page.getByRole('heading', { name: 'Subvision Robotics', exact: true }) })
    .getByRole('link', { name: /View project/ })
    .click()
  await expect(page).toHaveURL(/\/projects#subvision$/)
  await expect(page.locator('#subvision')).toBeVisible()
  expect(errors).toEqual([])
})

test('original volunteer cards remain intact and mobile layouts do not overflow', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 760 })
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Volunteering Experience', level: 2, exact: true }),
  ).toBeVisible()
  const volunteers = page.locator('.volunteer-grid .volunteer-card')
  await expect(volunteers).toHaveCount(2)
  await expect(volunteers.nth(0).getByRole('heading', { level: 3 })).toHaveText(
    'York Region Educational Services',
  )
  await expect(volunteers.nth(0).locator('.experience-period')).toContainText('Mar 2026 - Present')
  await expect(volunteers.nth(1).getByRole('heading', { level: 3 })).toHaveText(
    'Fraser International College',
  )
  await expect(volunteers.nth(1).getByRole('heading', { level: 4 })).toHaveText('Peer Educator')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()

  await page.locator('#volunteering').scrollIntoViewIfNeeded()
  await expect(page.locator('.experience-wrapper')).toHaveClass(/is-visible/)
  await expect(page.locator('#volunteering')).toHaveCSS('opacity', '1')
  await expect(volunteers.nth(1)).toBeVisible()
  await page
    .locator('#volunteering')
    .screenshot({ path: testInfo.outputPath('original-volunteers-mobile.png') })
})

test('reduced motion keeps content visible and disables smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Past Work Experience', level: 2, exact: true }),
  ).toBeVisible()
  await expect(page.locator('.experience-panel').nth(0).locator('.experience-copy')).toBeVisible()
  await expect(page.locator('.experience-panel').nth(1).locator('.experience-copy')).toBeVisible()
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  )
  expect(
    await page
      .locator('.hero-title-layer')
      .evaluate((node) => Number.parseFloat(getComputedStyle(node).animationDuration)),
  ).toBeLessThanOrEqual(0.00001)
})

test('navigation, theme, and route anchors remain usable', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Skip to content' }).focus()
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await expect(page.getByRole('button', { name: /Switch to .* mode/ })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Home', exact: true })).toHaveCount(0)
  await page
    .locator('nav[aria-label="Main navigation"]')
    .getByRole('link', { name: 'Projects', exact: true })
    .click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible()
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible()
  await expect(page.locator('#subvision video')).toHaveCount(0)
  await expect(page.locator('#subvision .project-video-preview')).toHaveCount(1)
})
