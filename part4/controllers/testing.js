const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
    console.log('testing route reached')
    await Blog.deleteMany({})
    await User.deleteMany({})
    return response.status(204).end()
})

module.exports = testingRouter
