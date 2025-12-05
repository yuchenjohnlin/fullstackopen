import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2 className="section-title">blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default BlogList
