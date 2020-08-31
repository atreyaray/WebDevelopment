const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { request } = require('express')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user',{username:1,name:1,id:1})
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
    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if(!request.token || !decodedToken.id ){
            response.status(401).json({error: 'token invalid or missing'})
        }
        const user = await User.findById(decodedToken.id)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id,
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    }catch(exception){
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    try{
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    }catch(exception){
        next(exception)
    }
})

blogRouter.put('/:id', async (request,response,next) => {
    const id = request.params.id
    const body = request.body
    try{
        const newBlog = {
            likes : body.likes
        }
        const result = await Blog.findByIdAndUpdate(id,newBlog,{new:true})
        response.json(result.toJSON())
    }catch(exception){
        next(exception)
    }
})

module.exports = blogRouter