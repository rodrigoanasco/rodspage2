import { test, expect } from '@playwright/test'

const policies = [
  ['privacy', 'Privacy Policy'],
  ['terms', 'Terms and Conditions'],
  ['cookies', 'Cookie Policy'],
  ['refunds', 'Refund Policy'],
]

test.beforeEach(async ({ page }) => {
  await page.route('**/api/blog/posts*', (route) =>
    route.fulfill({ json: { posts: [], hasMore: false } }),
  )
})

test('policy URLs render directly, survive reload, and support browser back', async ({
  page,
}, testInfo) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 320, height: 760 })
  for (const [path, heading] of policies) {
    await page.goto(`/${path}`)
    await expect(page.getByRole('heading', { level: 1, name: heading, exact: true })).toBeVisible()
    await expect(page).toHaveTitle(`${heading} | Rodrigo Anasco`)
    await page.reload()
    await expect(page.getByRole('heading', { level: 1, name: heading, exact: true })).toBeVisible()
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBeTruthy()
  }
  await page.goto('/privacy')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Privacy Policy', exact: true }),
  ).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath('privacy-mobile.png'), fullPage: true })
  await page
    .getByRole('navigation', { name: 'Legal policies' })
    .getByRole('link', { name: 'Terms', exact: true })
    .click()
  await expect(page).toHaveURL(/\/terms$/)
  await page.goBack()
  await expect(
    page.getByRole('heading', { level: 1, name: 'Privacy Policy', exact: true }),
  ).toBeVisible()
  expect(errors).toEqual([])
})

test('every public main route exposes all four policy links in its footer', async ({ page }) => {
  for (const path of ['/', '/about', '/projects', '/blog', '/contact']) {
    await page.goto(path)
    const links = page.locator('footer').getByRole('navigation', { name: 'Legal policies' })
    await expect(links).toHaveCount(1)
    for (const [policy] of policies) {
      await expect(links.locator(`a[href="/${policy}"]`)).toHaveCount(1)
    }
  }
  await page.locator('footer a[href="/privacy"]').click()
  await expect(
    page.getByRole('heading', { level: 1, name: 'Privacy Policy', exact: true }),
  ).toBeVisible()
})

test('passive public browsing does not request remote fonts, Turnstile, or Clerk services', async ({
  page,
}) => {
  const requests = []
  const forbidden =
    /fonts\.(googleapis|gstatic)\.com|challenges\.cloudflare\.com|(?:clerk\.accounts|clerk\.(?:com|dev))|clerk\.browser\.js/i
  page.on('request', (request) => {
    if (forbidden.test(request.url())) requests.push(request.url())
  })
  await page.route(forbidden, (route) => route.abort())
  for (const path of ['/', '/about', '/projects', '/blog', '/contact', '/privacy']) {
    await page.goto(path)
    await expect(page.locator('main')).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    // Let page effects and lazy routes settle without initiating feature providers.
    await expect(
      page.locator('script[src*="turnstile"], script[src*="clerk.browser"]'),
    ).toHaveCount(0)
  }
  expect(requests).toEqual([])
})

test('contact acknowledgement gates challenge, revocation clears token, and optional-name submission includes consent', async ({
  page,
}, testInfo) => {
  let providerLoads = 0
  let submitted
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', async (route) => {
    providerLoads++
    await route.fulfill({
      contentType: 'application/javascript',
      body: `
      window.mockChallenge = { renders: 0, removes: 0, resets: 0 };
      const widgets = new Map();
      window.turnstile = {
        render(container, options) {
          const id = 'mock-' + (++window.mockChallenge.renders);
          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = 'Complete mocked anti-spam';
          button.onclick = () => options.callback(id + '-token');
          container.appendChild(button);
          widgets.set(id, container);
          return id;
        },
        reset() { window.mockChallenge.resets++; },
        remove(id) { window.mockChallenge.removes++; widgets.get(id)?.replaceChildren(); widgets.delete(id); }
      };
      const callback = new URL(document.currentScript.src).searchParams.get('onload');
      window[callback]?.();
    `,
    })
  })
  await page.route('**/api/contact', async (route) => {
    submitted = route.request().postDataJSON()
    await route.fulfill({ json: { ok: true } })
  })

  await page.goto('/contact')
  const consent = page.getByRole('checkbox')
  const send = page.getByRole('button', { name: /Send message/ })
  await expect(page.getByLabel('Name (optional)')).not.toHaveAttribute('required')
  await page.getByLabel('Email', { exact: true }).fill('visitor@example.test')
  await page.getByLabel('Message', { exact: true }).fill('A mocked privacy test inquiry.')
  await expect(consent).not.toBeChecked()
  await expect(send).toBeDisabled()
  expect(providerLoads).toBe(0)

  await consent.check()
  await page.getByRole('button', { name: 'Complete mocked anti-spam' }).click()
  await expect(send).toBeEnabled()
  expect(providerLoads).toBe(1)
  await consent.uncheck()
  await expect(page.getByRole('button', { name: 'Complete mocked anti-spam' })).toHaveCount(0)
  await expect(send).toBeDisabled()
  await expect.poll(() => page.evaluate(() => window.mockChallenge.removes)).toBeGreaterThan(0)

  await consent.check()
  await expect(page.getByRole('button', { name: 'Complete mocked anti-spam' })).toBeVisible()
  await expect(send).toBeDisabled()
  await page.getByRole('button', { name: 'Complete mocked anti-spam' }).click()
  await expect(send).toBeEnabled()
  await page.screenshot({
    path: testInfo.outputPath('contact-consent-desktop.png'),
    fullPage: true,
  })
  await send.click()
  await expect(page.getByRole('status')).toContainText('Message sent.')
  expect(submitted).toMatchObject({
    name: '',
    privacyConsent: true,
    email: 'visitor@example.test',
    message: 'A mocked privacy test inquiry.',
  })
  expect(submitted.turnstileToken).toMatch(/^mock-\d+-token$/)
  await expect(consent).not.toBeChecked()
  await expect(send).toBeDisabled()
  expect(errors).toEqual([])
})
