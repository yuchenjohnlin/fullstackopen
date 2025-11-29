const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

let authHeader = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Root User', passwordHash })
  const savedUser = await user.save()

  const blogsWithUser = helper.initialBlogs.map(b => ({ ...b, user: savedUser._id }))
  await Blog.insertMany(blogsWithUser)

  const loginRes = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })

  authHeader = `Bearer ${loginRes.body.token}`
})



describe('when there are initially some blogs saved', () => {
  test('blogs are returned as JSON and correct amount', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property is id', async () => {
    const res = await api.get('/api/blogs')
    const blog = res.body[0]

    assert(!Object.keys(blog).includes('_id'))
    assert(Object.keys(blog).includes('id'))
  })

  test('successfully added new blog to database', async () => {
    const newBlog = {
      title: 'Love Kuang Yun',
      author: 'Yu-Chen Lin',
      url: 'http://benicetokuangyun.com',
      likes: 1000
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', authHeader)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes('Love Kuang Yun'))
  })

  test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Test Author',
      url: 'http://example.com/no-likes'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', authHeader)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('missing title returns 400', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'http://example.com/no-title',
      likes: 10
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', authHeader)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.status, 400)
  })

  test('adding a blog fails with 401 if token missing', async () => {
    const newBlog = {
      title: 'No token blog',
      author: 'Test Author',
      url: 'http://example.com/no-token',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const start = await Blog.find({})
      const blogToDelete = start[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', authHeader)
        .expect(204)

      const end = await Blog.find({})
      assert.strictEqual(end.length, helper.initialBlogs.length - 1)
      const titles = end.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('fails with status 401 if token is invalid', async () => {
      const start = await Blog.find({})
      const blogToDelete = start[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401)

      const end = await Blog.find({})
      assert.strictEqual(end.length, helper.initialBlogs.length)
    })
  })

  describe('updating a blog', () => {
    test('succeeds in updating likes with valid id', async () => {
      const start = await Blog.find({})
      const blogToUpdate = start[0]

      const updatedFields = { ...blogToUpdate.toJSON(), likes: blogToUpdate.likes + 1 }

      const res = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedFields)
        .set('Authorization', authHeader)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(res.body.likes, blogToUpdate.likes + 1)

      const afterUpdate = await Blog.findById(blogToUpdate.id)
      assert.strictEqual(afterUpdate.likes, blogToUpdate.likes + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
