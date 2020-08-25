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

module.exports = {
    dummy, 
    totalLikes
}