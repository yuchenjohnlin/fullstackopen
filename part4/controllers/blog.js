const blogsRouter = require('express').Router()
const Blog = require('../models/blogSchema')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const blog = await Blog.findById(id)
    if (!blog) {
      return response.status(404).end()
    }
    response.json(blog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body
    if (!title || !url) {
      return response.status(400).json({ error: 'title and url required' })
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes === undefined ? 0 : likes,
    })

    const saved = await blog.save()
    response.status(201).json(saved)
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const { title, author, url, likes } = request.body

    if (!title || !url) {
      return response.status(400).json({ error: 'title and url required' })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, author, url, likes: likes === undefined ? 0 : likes },
      { new: true, runValidators: true }
    )

    if (!updatedBlog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params

    const blog = await Blog.findById(id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    await Blog.findByIdAndDelete(id)
    return response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
