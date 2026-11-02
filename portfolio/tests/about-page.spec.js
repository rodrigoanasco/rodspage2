import { test, expect } from '@playwright/test'

const photoFiles = [
  'me_in_victoria.jpg',
  'studying2.jpg',
  'object_recognition.jpg',
  'peru_flag.png',
  'lynn_park.jpg',
  'ceviche.jpg',
  'burnaby_mountain_park.jpg',
  'trying_new_things.jpg',
  'plane.jpg',
  'eating_the_sun.jpeg',
  'me_in_snow.png',
  'JiuJitsu.png',
  'table_tennis.png',
  'me_with_dog.jpeg',
]

for (const { width, theme } of [
  { width: 1440, theme: 'dark' },
  { width: 1440, theme: 'light' },
  { width: 390, theme: 'light' },
  { width: 320, theme: 'dark' },
]) {
  test(`About reads as one article with all photos at ${width}px in ${theme} mode`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.addInitScript((value) => localStorage.setItem('theme', value), theme)
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))

    await page.goto('/about')
    await expect(
      page.getByRole('heading', { level: 1, name: 'About me', exact: true }),
    ).toBeVisible()
    const article = page.getByRole('article', { name: 'About me' })
    await expect(article).toBeVisible()
    const text = await article.innerText()
    expect(text).toContain('NeuroOpticDX')
    expect(text).toContain('FISPAN')
    expect(text).toContain('Cooper')
    await expect(article.getByRole('heading', { level: 2 })).toHaveText([
      'What I like building',
      "A little about where I'm from",
      "When I'm away from my laptop",
    ])
    expect(text).not.toMatch(
      /get to know me|how i work|product-minded|systems-driven|curious by default/i,
    )

    for (const file of photoFiles) {
      const photo = article.locator(`img[src$="/${file}"]`)
      await expect(photo).toHaveCount(1)
      await photo.scrollIntoViewIfNeeded()
      await expect
        .poll(() => photo.evaluate((image) => image.complete && image.naturalWidth > 0))
        .toBe(true)
      await expect(photo).not.toHaveAttribute('alt', '')
      const bounds = await photo.boundingBox()
      expect(bounds.x).toBeGreaterThanOrEqual(0)
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width)
    }
    await expect(article.locator('img')).toHaveCount(photoFiles.length)
    if (width <= 720) {
      const workPhotos = article
        .getByRole('group', { name: 'University and project photos' })
        .locator('img')
      const first = await workPhotos.nth(0).boundingBox()
      const second = await workPhotos.nth(1).boundingBox()
      expect(first.x + first.width).toBeLessThan(second.x)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(errors).toEqual([])
  })
}

test('About inline links keep the existing client-side navigation and theme', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'light'))
  await page.goto('/about')
  await page
    .getByRole('article', { name: 'About me' })
    .getByRole('link', { name: 'projects page' })
    .click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Projects')
  await page.goBack()
  await expect(page.getByRole('heading', { level: 1, name: 'About me' })).toBeVisible()
  await page.getByRole('link', { name: 'reach out' }).click()
  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.getByLabel('Email', { exact: true })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})
