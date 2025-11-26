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
    // version without lodash

    // counts = {}
    // blogs.forEach(blog => {
    //     counts[blog.author] = (counts[blog.author] || 0 ) + 1
    // })
    
    // let topAuthor = null
    // let maxBlogs = 0

    // for (const author in counts) {
    //     if (counts[author] > maxBlogs) {
    //     maxBlogs = counts[author]
    //     topAuthor = author
    //     }
    // }

    // return {
    //     author: topAuthor,
    //     blogs: maxBlogs
    // }

    // if we use lodash 
    const grouped = _.groupBy(blogs, 'author')
    const authorWithMost = _.maxBy(
        Object.keys(grouped),
        author => grouped[author].length
    )

    return {
        author: authorWithMost,
        blogs: grouped[authorWithMost].length
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    counts = {}
    blogs.forEach(blog => {
        counts[blog.author] = (counts[blog.author] || 0 ) + blog.likes
    })
    
    let topAuthor = null
    let maxLikes = 0

    for (const author in counts) {
        if (counts[author] > maxLikes) {
            maxLikes = counts[author]
            topAuthor = author
        }
    }


    // const grouped = _.groupBy(blogs, 'author')
    // console.log(grouped)
    // const authorWithMost = _.maxBy(
    //     Object.keys(grouped),
    //     author => _.sumBy(grouped[author], 'likes')
    // )

    return {
        author: topAuthor,
        likes: maxLikes
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}