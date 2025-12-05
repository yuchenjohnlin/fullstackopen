import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNotify } from '../NotificationContext'
import { useUserValue } from '../UserContext'
import { useLikeBlog, useDeleteBlog, useCommentBlog } from '../hooks/useBlogs'

const BlogDetail = ({ blogs = [] }) => {
  const { id } = useParams()
  const blog = blogs.find((b) => b.id === id)
  const currentUser = useUserValue()
  const notifyWith = useNotify()
  const [commentText, setCommentText] = useState('')

  const likeMutation = useLikeBlog()
  const deleteMutation = useDeleteBlog()
  const commentMutation = useCommentBlog()

  if (!blog) {
    return <div className="card">loading blog...</div>
  }

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

  const canRemove = blog.user && currentUser && blog.user.username === currentUser.username
  const handleAddComment = (event) => {
    event.preventDefault()
    if (!commentText.trim()) return
    commentMutation.mutate(
      { id: blog.id, comment: commentText.trim() },
      {
        onSuccess: () => setCommentText(''),
        onError: () => notifyWith('failed to add comment', 'error'),
      }
    )
  }

  return (
    <div className="card">
      <h2 className="section-title">{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div style={{ margin: '8px 0' }}>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user?.name || blog.user?.username}</div>
      {canRemove && <button onClick={handleDelete}>remove</button>}
      <h3 className="section-title" style={{ marginTop: '16px' }}>comments</h3>
      <form onSubmit={handleAddComment} className="form-grid">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="add a comment"
        />
        <div>
          <button type="submit" disabled={commentMutation.isLoading}>add comment</button>
        </div>
      </form>
      <ul>
        {blog.comments?.map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetail
