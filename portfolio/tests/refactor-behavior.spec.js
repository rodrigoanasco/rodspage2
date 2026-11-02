import { test, expect } from '@playwright/test'

test('shared navigation preserves browser history and the selected theme', async ({ page }) => {
  await page.route('**/api/blog/posts*', (route) =>
    route.fulfill({ json: { posts: [], hasMore: false } }),
  )
  await page.addInitScript(() => localStorage.setItem('theme', 'light'))
  await page.goto('/about')
  await expect(page.getByRole('button', { name: /Switch to .* mode/ })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Home', exact: true })).toHaveCount(0)
  for (const [label, path, heading] of [
    ['Projects', '/projects', 'Projects'],
    ['Blog', '/blog', 'Blog'],
    ['Contact', '/contact', "Let's build something useful."],
  ]) {
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: label, exact: true })
      .click()
    await expect(page).toHaveURL(new RegExp(`${path}$`))
    // A changed URL precedes the lazy route's first render on a cold Vite server.
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible({
      timeout: 15000,
    })
    await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' }).locator('a.is-active'),
    ).toHaveAttribute('href', path)
  }
  await page.goBack()
  await expect(page.getByRole('heading', { name: 'Blog', exact: true, level: 1 })).toBeVisible()
  await page.goForward()
  await expect(page.locator('.contact-page-main')).toBeVisible()
  await page.reload()
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'About me', exact: true })
    .click()
  await expect(page.getByRole('heading', { name: 'About me', level: 1, exact: true })).toBeVisible()
  await page.locator('header .left-logo-home').click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Rodrigo Añasco', level: 1 })).toBeVisible()
})

test('public blog preserves error recovery, safe content expansion, and pagination', async ({
  page,
}) => {
  let unavailable = true
  const requests = []
  await page.route('**/api/blog/posts*', (route) => {
    const offset = Number(new URL(route.request().url()).searchParams.get('offset'))
    requests.push(offset)
    if (unavailable) {
      return route.fulfill({ status: 503, json: { message: 'Temporary test outage.' } })
    }
    const firstPage = offset === 0
    return route.fulfill({
      json: {
        posts: [
          {
            id: firstPage ? 'first-entry' : 'older-entry',
            publishedAt: '2026-10-01T12:00:00.000Z',
            content: {
              title: firstPage ? 'First public entry' : 'Older public entry',
              body: firstPage
                ? '<script>window.executedUntrustedPost = true</script>\nPlain text remains plain.'
                : 'Older entry content.',
              videoUrl: firstPage
                ? 'https://www.youtube.com/watch?v=example'
                : 'javascript:alert(1)',
            },
          },
        ],
        hasMore: firstPage,
      },
    })
  })
  await page.goto('/blog')
  await expect(page.getByRole('alert')).toContainText('Temporary test outage.')
  unavailable = false
  await page.getByRole('button', { name: 'Retry loading posts' }).click()
  await page.getByRole('heading', { name: 'First public entry', exact: true }).click()
  await expect(page.locator('.blog-post-text')).toContainText(
    '<script>window.executedUntrustedPost = true</script>',
  )
  expect(await page.evaluate(() => window.executedUntrustedPost)).toBeUndefined()
  await expect(
    page.getByRole('link', { name: 'Watch the video (opens a new tab)' }),
  ).toHaveAttribute('rel', 'noopener noreferrer')
  await page.getByRole('button', { name: 'Older posts' }).click()
  await expect(page.getByRole('heading', { name: 'Older public entry', exact: true })).toBeVisible()
  await page.getByRole('heading', { name: 'Older public entry', exact: true }).click()
  await expect(page.getByRole('link', { name: 'Watch the video (opens a new tab)' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Newer posts' }).click()
  await expect(page.getByRole('heading', { name: 'First public entry', exact: true })).toBeVisible()
  expect(requests).toContain(20)
})

test('blog editor preserves private drafts, preview, publishing, and discard protection', async ({
  page,
}) => {
  await page.goto('/tests/editor-harness.html')
  await page.getByLabel('Title', { exact: true }).fill('Refactor fixture')
  await page.getByLabel('Post text', { exact: true }).fill('This remains private until published.')
  await expect(page.locator('.blog-editor-hint').first()).toContainText('Unsaved changes')
  await page.getByRole('button', { name: 'Preview post', exact: true }).click()
  await expect(page.getByRole('region', { name: 'Private preview' })).toContainText(
    'This remains private until published.',
  )
  await page.getByRole('button', { name: 'Save draft', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Draft saved to your database.')
  await expect(page.getByRole('complementary', { name: 'Your saved posts' })).toContainText(
    'Refactor fixture',
  )
  await page.getByRole('button', { name: 'Publish post', exact: true }).click()
  await expect(page.getByRole('status')).toContainText(
    'Published. Your post is now visible on the Blog.',
  )
  await page.getByLabel('Title', { exact: true }).fill('Unsaved title')
  page.once('dialog', (dialog) => dialog.dismiss())
  await page.getByRole('button', { name: 'New post', exact: true }).click()
  await expect(page.getByLabel('Title', { exact: true })).toHaveValue('Unsaved title')
  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'New post', exact: true }).click()
  await expect(page.getByLabel('Title', { exact: true })).toHaveValue('')
})

test('author workspace preserves modal URL, focus, escape, and scroll restoration', async ({
  page,
}) => {
  await page.route('**/api/blog/posts*', (route) =>
    route.fulfill({ json: { posts: [], hasMore: false } }),
  )
  let releaseProviderRequests
  const providerGate = new Promise((resolve) => {
    releaseProviderRequests = resolve
  })
  // Keep provider initialization pending: test dialog lifecycle without authenticating
  // or allowing an external request to leave the browser.
  await page.route(/clerk\.example\.test|clerk\.browser\.js/, async (route) => {
    await providerGate
    await route.abort().catch(() => {})
  })
  try {
    await page.goto('/blog', { waitUntil: 'domcontentloaded' })
    const open = page.getByRole('button', { name: 'Author sign-in', exact: true })
    const workspace = page.getByRole('dialog', { name: 'Author workspace' })
    await open.click()
    await expect(page).toHaveURL(/\/blog\?author=1$/)
    await expect(workspace).toBeVisible()
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
    await workspace.getByRole('button', { name: 'Close', exact: true }).click()
    await expect(workspace).toHaveCount(0)
    await expect(page).toHaveURL(/\/blog$/)
    await expect(open).toBeFocused()
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')

    await open.click()
    await expect(workspace).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(workspace).toHaveCount(0)
    await expect(page).toHaveURL(/\/blog$/)
    await expect(open).toBeFocused()

    await page.goto('/blog?author=1', { waitUntil: 'domcontentloaded' })
    await expect(workspace).toBeVisible()
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
    await page.keyboard.press('Escape')
    await expect(workspace).toHaveCount(0)
    await expect(page).toHaveURL(/\/blog$/)
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
  } finally {
    releaseProviderRequests()
  }
})
