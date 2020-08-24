require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const { request } = require('express')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

// const password = process.env.MONGODB_URI_PASSWORD
const mongoUrl = process.env.MONGODB_URI
console.log('url is', mongoUrl,)
mongoose.connect(mongoUrl, { useNewUrlParser: true , useUnifiedTopology:true})
    .then(result => console.log('connected to MONGODB'))
    .catch(error => console.log('error',error))

app.use(cors())
app.use(bodyParser.json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.get('/api/blogs/:id', (request,response) => {
    const id = request.params.id
    Blog
        .findById(id)
        .then(blogs => response.json(blogs))
        .catch(error => console.log(error,))
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
    console.log('blog',blog)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})