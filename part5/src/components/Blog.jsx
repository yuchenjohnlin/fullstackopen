const Blog = ({ blog }) => (
    <tr>
      <td>{blog.title}</td>
      <td>{blog.author}</td>
      <td>{blog.url}</td>
      <td>{blog.likes}</td>
    </tr>
)

export default Blog
