const listHelper = require('../utils/list_helper')

const blogs = []
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]
const blogsList = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogsList)
        expect(result).toBe(36)
    })

})

describe('favourite blogs', () => {
   
    test('of empty list is null', () => {
        const result = listHelper.favouriteBlog(blogs)
        expect(result).toEqual(null)
    })
    test('when list only has one blog equals to the blog itself', () => {
        const correctResponse = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        const result = listHelper.favouriteBlog(listWithOneBlog)
        expect(result).toEqual(correctResponse)
    })
    test('of a bigger list is given correctly', () => {
        const result = listHelper.favouriteBlog(blogsList)
        const correctResponse = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        expect(result).toEqual(correctResponse)
    })
})

describe('most blogs', () => {

    test('of empty list is null', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(null)
    })

    test('when list has only one blog, the most blogs is by the same author', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({author:listWithOneBlog[0].author, blogs:1})
    })

    test('determine the correct author for a bigger blog list', () => {
        const correctResponse = {
            author: "Robert C. Martin",
            blogs: 3
        }
        result = listHelper.mostBlogs(blogsList)
        expect(result).toEqual(correctResponse)
    })  
})