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

module.exports = {
    dummy,
    totalLikes
}