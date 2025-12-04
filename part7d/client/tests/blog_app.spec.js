import { test, expect } from '@playwright/test'

const apiUrl = 'http://localhost:3003'
const baseUrl = 'http://localhost:5173'

const createUser = async (request, user) => {
  await request.post(`${apiUrl}/api/users`, { data: user })
}

const loginAndStore = async (page, request, credentials) => {
  const response = await request.post(`${apiUrl}/api/login`, { data: credentials })
  const body = await response.json()
  await page.addInitScript((user) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  }, body)
  return body
}

const createBlog = async (request, token, blog) => {
  await request.post(`${apiUrl}/api/blogs`, {
    data: blog,
    headers: { Authorization: `Bearer ${token}` },
  })
}

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post(`${apiUrl}/api/testing/reset`)
    await createUser(request, { name: 'Test User', username: 'testuser', password: 'secret' })
    await page.goto(baseUrl)
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.locator('input').first().fill('testuser')
      await page.locator('input[type="password"]').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.locator('input').first().fill('testuser')
      await page.locator('input[type="password"]').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong credentials')).toBeVisible()
      await expect(page.getByText('Test User logged in')).toBeHidden()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      const user = await loginAndStore(page, request, { username: 'testuser', password: 'secret' })
      await page.goto(baseUrl)
      page.context().setExtraHTTPHeaders({
        Authorization: `Bearer ${user.token}`,
      })
    })

    test('A blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByPlaceholder('title').fill('New Blog')
      await page.getByPlaceholder('author').fill('Author Name')
      await page.getByPlaceholder('url').fill('http://example.com')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('New Blog Author Name')).toBeVisible()
    })

    test.describe('and blogs exist', () => {
      test.beforeEach(async ({ page, request }) => {
        const loginRes = await request.post(`${apiUrl}/api/login`, {
          data: { username: 'testuser', password: 'secret' },
        })
        const { token } = await loginRes.json()
        await createBlog(request, token, {
          title: 'Existing Blog',
          author: 'Author',
          url: 'http://example.com',
          likes: 10,
        })
        await createBlog(request, token, {
          title: 'Second Blog',
          author: 'Another',
          url: 'http://another.com',
          likes: 50,
        })
        await createBlog(request, token, {
          title: 'Most Liked',
          author: 'Top',
          url: 'http://top.com',
          likes: 100,
        })
        await page.goto(baseUrl)
      })

      test('a blog can be liked', async ({ page }) => {
        const blog = page.locator('.blog', { hasText: 'Existing Blog Author' }).first()
        await blog.getByRole('button', { name: 'view' }).click()
        await blog.getByRole('button', { name: 'like' }).click()
        await expect(blog.getByText('likes 1')).toBeVisible()
      })

      test('creator can delete it', async ({ page }) => {
        const blog = page.locator('.blog', { hasText: 'Existing Blog Author' }).first()
        await blog.getByRole('button', { name: 'view' }).click()
        page.on('dialog', (dialog) => dialog.accept())
        await blog.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('Existing Blog Author')).not.toBeVisible()
      })

      test('only creator sees remove button', async ({ page, request, browser }) => {
        const context = await browser.newContext()
        const otherPage = await context.newPage()
        await createUser(request, { name: 'Other User', username: 'other', password: 'secret' })
        await loginAndStore(otherPage, request, { username: 'other', password: 'secret' })
        await otherPage.goto(baseUrl)
        const blog = otherPage.locator('.blog', { hasText: 'Existing Blog Author' }).first()
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).toBeHidden()
      })

      test('blogs are ordered by likes', async ({ page }) => {
        const blogs = page.locator('.blog')
        await expect(blogs.nth(0)).toContainText('Most Liked')
        await expect(blogs.nth(1)).toContainText('Second Blog')
        await expect(blogs.nth(2)).toContainText('Existing Blog')
      })
    })
  })
})
