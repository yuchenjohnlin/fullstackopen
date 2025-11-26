const blogsRouter = require('express').Router()
const Blog = require('../models/blogSchema')

// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs)
//   })
// })

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

// because we use app.use('/api/blogs) so don't need to include it in url
// blogsRouter.post('/api/blogs', (request, response) => {
// blogsRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)

//   blog.save().then((result) => {
//     response.status(201).json(result)
//   })
// })

blogsRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.url)
        response.status(400).json({ error: 'title and url required' })

    // seems like it is not recommended to change the user input directly
    if(!request.body.likes)
        request.body.likes = 0 
    // request.body.likes = request.body.like || 0

    const blog = new Blog(request.body)
    result = await blog.save()
    
    response.status(201).json(result)
})

module.exports = blogsRouter