const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const blog = require('../models/blog')
const middeware = require('../utils/middleware')
const { json } = require('express')

beforeEach(async () => {
    jest.setTimeout(20000);
    await Blog.deleteMany({})

    const blogObjects = helper.blogsList
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('correct numbers of blog posts are returned', async () => {
        const response = await api.get('/api/blogs')
                                   .expect(200)
                                   .expect('Content-Type',/application\/json/)
        expect(response.body.length).toBe(helper.blogsInDb.length)
})

test('verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    console.log('response',response.body[0].id)
    for (var x of response.body){
        expect(x.id).toBeDefined()
    }
})

test('A valid blog is succesfully added', async () => {
    const newBlog = {
        title : 'Third Blog',
        author : 'Vaishali',
        url : 'www.com.com',
        likes :  7
    }
    await api
             .post('/api/blogs')
             .send(newBlog)
             .expect(200)
             .expect('Content-Type',/application\/json/)

    const blogsAtEnd = await helper.blogsInDb()    

    expect(blogsAtEnd.length).toBe(helper.blogsList.length+1)                 
    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain('Third Blog')
})

afterAll(() => {
    console.log('closing the connection',)
    mongoose.connection.close()
})