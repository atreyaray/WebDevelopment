const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const blog = require('../models/blog')
const middeware = require('../utils/middleware')
const { json } = require('express')

mongoose.set('useFindAndModify', false);

beforeEach(async () => {
    jest.setTimeout(20000);
    await Blog.deleteMany({})

    const blogObjects = helper.blogsList
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('Requesting a post', () => {
    test('correct numbers of blog posts are returned', async () => {
        const response = await api.get('/api/blogs')
                                   .expect(200)
                                   .expect('Content-Type',/application\/json/)
        const currentBlogs = await helper.blogsInDb()                            
        expect(response.body.length).toBe(currentBlogs.length)
    })
    test('verifies that the unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        console.log('response',response.body[0].id)
        for (var x of response.body){
            expect(x.id).toBeDefined()
        }
    })
})

describe('Creating a new post', () => {
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
        const contents = blogsAtEnd.map(blog => blog.title)

        expect(blogsAtEnd.length).toBe(helper.blogsList.length + 1)     
        expect(contents).toContain('Third Blog')
    })
    test('If likes property is missing from the request, it defaults to 0', async () => {
        const newBlog = {
            title : 'Blog with no likes',
            author : 'Mr not popular',
            url : 'www.nolikes.com',
        }
        await api 
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type',/application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.blogsList.length+1)
        expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
    })
    test('A test without title and url returns status code 400', async () => {
        const newBlog = {
            author : 'anonymous',
            likes: 1000
        }
        await api  
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
    })
})

describe('Deleting a post', () => {
    test('should return correct status code', async() =>{
        const initialBlogs = await helper.blogsInDb()
       await api
               .del('/api/blogs/5a422aa71b54a676234d17f8')
               .expect(204)
    })
    test('should reduce the number of total blog posts by one',async () => {
        const initialBlogs = await helper.blogsInDb()
        await api
            .del('/api/blogs/5a422aa71b54a676234d17f8')
        const currentBlogs = await helper.blogsInDb()
        expect(currentBlogs.length).toBe(initialBlogs.length-1)
    })
    test('remaining blogs should not contain title from deleted blog', async () => {
        const blogToBeDeleted = await api.get('/api/blogs/5a422aa71b54a676234d17f8')
        const deletedTitle = blogToBeDeleted.title
        await api.del('/api/blogs/5a422aa71b54a676234d17f8')
        const currentBlogs = await helper.blogsInDb()
        const currentTitles = currentBlogs.map(blog => blog.title)
        expect(currentBlogs).not.toContain(deletedTitle)
    })
})

describe('Updating a post', () => {
    test('expect correct status code', async () => {
        const newLikes = {
            likes: 6
        }
        await api
            .put('/api/blogs/5a422aa71b54a676234d17f8')
            .send(newLikes)
            .expect(200)
            .expect('Content-Type',/application\/json/)
    })
    test('should change the number of likes', async () => {
        const newLikes = {
            likes : 6
        }
        await api
                .put('/api/blogs/5a422aa71b54a676234d17f8')
                .send(newLikes)
        const currentBlogs = await api.get('/api/blogs/5a422aa71b54a676234d17f8')
        expect(currentBlogs.body.likes).toBe(newLikes.likes)
    })
})



afterAll(() => {
    console.log('closing the connection',)
    mongoose.connection.close()
})