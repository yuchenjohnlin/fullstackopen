import { useState } from 'react'

const Blog = ({ blog, onLike, onDelete, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleLabel = showDetails ? 'hide' : 'view'
  const canRemove = blog.user && currentUser && blog.user.username === currentUser.username

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)}>{toggleLabel}</button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={() => onLike(blog)}>like</button>
          </div>
          <div>{blog.user?.name || blog.user?.username}</div>
          {canRemove && <button onClick={() => onDelete(blog)}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
