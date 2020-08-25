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

module.exports = {
    dummy, 
    totalLikes,
    favouriteBlog
}