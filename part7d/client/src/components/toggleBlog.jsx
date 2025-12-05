import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotify } from '../NotificationContext'
import { useUserValue } from '../UserContext'
import { useLikeBlog, useDeleteBlog } from '../hooks/useBlogs'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const currentUser = useUserValue()
  const notifyWith = useNotify()

  const likeMutation = useLikeBlog()
  const deleteMutation = useDeleteBlog()

  const handleLike = () => {
    const userId = blog.user?.id || blog.user?._id || blog.user
    const updated = { ...blog, likes: blog.likes + 1, user: userId }
    likeMutation.mutate(
      { id: blog.id, newObject: updated },
      {
        onError: () => notifyWith('failed to like blog', 'error')
      }
    )
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!confirmDelete) return

    deleteMutation.mutate(blog.id, {
      onSuccess: () => notifyWith('blog removed', 'success'),
      onError: () => notifyWith('failed to remove blog', 'error')
    })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleLabel = showDetails ? 'hide' : 'view'
  const canRemove = blog.user && currentUser && blog.user.username === currentUser.username

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}{' '}</Link>
        
        <button onClick={() => setShowDetails(!showDetails)}>{toggleLabel}</button>
      </div>
      {showDetails && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name || blog.user?.username}</div>
          {canRemove && <button onClick={handleDelete}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
