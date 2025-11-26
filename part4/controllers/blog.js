const blogsRouter = require('express').Router()
const Blog = require('../models/blogSchema')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

// because we use app.use('/api/blogs) so don' tneed to include it in url
// blogsRouter.post('/api/blogs', (request, response) => {
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter