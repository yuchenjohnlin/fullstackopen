const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const sum = array => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return array.length === 0 
        ? 0
        : array.reduce(reducer, 0)
}

const totalLikes = (blogs) => {
    return sum(blogs)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, item) => {
        return max.likes < item.likes ? item : max
    }

    // return blogs.reduce(reducer, -1)
    // we shouldn't set max = -1, it wouldn't break because comparing two different objects 
    // will return false anyways, so the comparison is always false
    // if we don;t have this condition then we will be doping reduce on an empty list,
    // error : Reduce of empty array with no initial value
    return blogs.length === 0
        ? null
        : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    // return the author of the most blogs
    // so we have to maybe use reduce to get
    // a list of the authos with its blog count
    if (blogs.length === 0) return null

    blogs.forEach(blog => {
        authors[blog.author] = (authors[blog.author] || 0 ) + 1
    })
    
    let topAuthor = null
    let maxBlogs = 0

    for (const author in counts) {
        if (counts[author] > maxBlogs) {
        maxBlogs = counts[author]
        topAuthor = author
        }
    }

    return {
        author: topAuthor,
        blogs: maxBlogs
    }
    // if we use lodash 
    // const grouped = _.groupBy(blogs, 'author')
    // const authorWithMost = _.maxBy(
    //     Object.keys(grouped),
    //     author => grouped[author].length
    // )

    // return {
    //     author: authorWithMost,
    //     blogs: grouped[authorWithMost].length
    // }


}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}