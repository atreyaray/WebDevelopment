const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length <= 0){
        return 0
    }else{
        const reducer = (sum,item) => {
            return sum+item
        }
        return blogs.map(b => b.likes).reduce(reducer,0)
    }
}
const favouriteBlog = (blogs) => {
    let max = -1
    let fav = blogs[0]
    for (var i = 0 ; i < blogs.length ; i++ ){
        if(blogs[i].likes > max){
            max = blogs[i].likes
            fav = blogs[i]
        }
    }
    if (blogs.length === 0)
        return null
    else
        return {title:fav.title, author:fav.author, likes:fav.likes}
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(b => b.author)
    let authorList = new Map()
    for (var i = 0 ; i < authors.length ; i++ ){
        let newAuthor = authors[i]
        
        if (!authorList.has(newAuthor)){
            authorList.set(newAuthor,1)
        }else{
            const blogCount = authorList.get(newAuthor)
            authorList.set(newAuthor, blogCount+1)
        }
    }
    let max = 0
    let bestAuthor = ''
    for (let [key,value] of authorList ){
        if (value > max){
            max = value
            bestAuthor = key
        }
    }
    if (blogs.length === 0)
        return null
    else
        return { author: bestAuthor, blogs: max}
}

const mostLikes = (blogs) => {
    let authorList = new Map()
    for (var i = 0 ; i < blogs.length ; i ++){
        const newAuthor = blogs[i]
        if (authorList.has(newAuthor.author)){
            const likes = authorList.get(newAuthor.author)
            authorList.set(newAuthor.author, likes+newAuthor.likes)
        }else{
            authorList.set(newAuthor.author,newAuthor.likes)
        }
    }
    let max = -1
    let likedAuthor = ''
    for (var [key,value] of authorList){
        if(value > max){
            max = value
            likedAuthor = key
        }
    }
    if (blogs.length === 0)
        return null
    return {author:likedAuthor, likes: max}
}
module.exports = {
    dummy, 
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}