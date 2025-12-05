import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className="blog card">
      <Link to={`/blogs/${blog.id}`}>
        <strong>{blog.title}</strong> <span className="muted">by {blog.author}</span>
      </Link>
    </div>
  )
}

export default Blog
