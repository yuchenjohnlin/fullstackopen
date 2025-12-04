import Blog from './Blog'

const BlogList = ({ blogs, onLike, onDelete, currentUser }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={onLike}
          onDelete={onDelete}
          currentUser={currentUser}
        />
      ))}
    </>
  )
}

export default BlogList
