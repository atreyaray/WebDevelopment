const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { json } = require('express')

mongoose.set('useFindAndModify', false);

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        jest.setTimeout(20000);
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('Invalid users are not created', () => {
    test('Invalid user without name or username is not created', async () => {
        const newUser = {
            username: '',
            name: 'Matti Luukkainen',
            password: '',
        }
        const initialBlogs = await helper.usersInDb()
        const res = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        expect(res.body).toStrictEqual({"error" : 'Invalid username or password'})
        const currentBlogs = await helper.usersInDb()
        expect(currentBlogs.length).toBe(initialBlogs.length)
                
    })
})

afterAll(() => {
    mongoose.connection.close()
})
