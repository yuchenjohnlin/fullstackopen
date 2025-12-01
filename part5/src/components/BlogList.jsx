import Blog from './Blog'

const BlogList = ({
    blogs
}) => {
    return (
    <>
        <h2>blogs</h2>
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>URL</th>
                <th>Likes</th>
            </tr>
            </thead>
            <tbody>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
            </tbody>
        </table>
    </>
    )
}

export default BlogList