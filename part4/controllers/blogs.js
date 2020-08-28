const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        const blogObjects = await blogs.map(blog => blog.toJSON())
        response.json(blogObjects)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.get('/:id', async (request, response, next) => {
    try{
        const blog = await Blog.findById(request.params.id)
        if (blog){
            response.json(blog.toJSON())
        }else{
            response.status(404).end()
        }
    }catch(exception){
        next(exception)
    }
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    try{
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())
    }catch(exception){
        next(exception)
    }
})

module.exports = blogRouter