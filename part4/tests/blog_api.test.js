const { test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blogSchema')

const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

beforeEach(async() => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as JSON and correct amount', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(res.body.length, initialBlogs.length)
})

test('unique identifier property is id', async () => {
    const res = await api.get('/api/blogs')
    const blog = res.body[0]

    // assert.ok(blog.id, 'id property missing')
    // assert.strictEqual(blog._id, undefined)

    assert(!Object.keys(blog).includes('_id'))
    assert(Object.keys(blog).includes('id'))
})

test('successfully added new blog to database', async () => {
    const newBlog = {
      title: "Love Kuang Yun",
      author: "Yu-Chen Lin",
      url: "http://benicetokuangyun.com",
      likes: 1000
    }
    // why don't we check the content of the return of the post?
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(titles.includes("Love Kuang Yun"))
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: "Blog without likes",
    author: "Test Author",
    url: "http://example.com/no-likes"
    // likes: missing on purpose
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Check that likes defaults to 0
  assert.strictEqual(response.body.likes, 0)
})

test('missing title returns 400', async () => {
  const newBlog = {
      // title: "Blog without likes",
      author: "Test Author",
      url: "http://example.com/no-title",
      likes: 10
    }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  // Check that response code is 400 
  assert.strictEqual(response.status, 400)
})

after(async () => {
  await mongoose.connection.close()
})