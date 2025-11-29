const blogsRouter = require('express').Router()
const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')

const jwt = require('jsonwebtoken')


// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs)
//   })
// })

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(id)
    if (!blog) {
        return response.status(404).end()
    }
    response.json(blog)
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
    const user = request.user
    const body = request.body

    // moved to middleware
    // const user = await User.findById(body.userId)

    if (!body.title || !body.url)
        return response.status(400).json({ error: 'title and url required' })

    // seems like it is not recommended to change the user input directly
    // if(!request.body.likes) - shouldn;t do this becase what if likes = 0
    // if(body.likes === undefined)
    //     request.body.likes = 0 
    // request.body.likes = request.body.like || 0

    // add user 
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url, 
      likes: body.likes || 0,
      user: user._id
    })

    // const blog = new Blog(request.body)
    result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    
    response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
    const user = request.user
    const {id} = request.params
    let body = request.body
    
    if (!body.title || !body.url)
        return response.status(400).json({ error: 'title and url required' })

    if(body.likes === undefined)
        body.likes = 0 

    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
    )

    if (!updatedBlog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params

    if (blog.user.toString() !== request.user.id) {
        return response.status(403).json({ error: 'unauthorized' })
    }


    const blog = await Blog.findById(id)
    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    await Blog.findByIdAndDelete(id)
    return response.status(204).end()
})




module.exports = blogsRouter