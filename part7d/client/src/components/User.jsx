import { useParams } from 'react-router-dom'

const User = ({ users = [] }) => {
  const { id } = useParams()
  const user = users.find((u) => u.id === id)

  if (!user) {
    return <div className="card">user not found</div>
  }

  return (
    <div className="card">
      <h2 className="section-title">{user.name}</h2>
      <h3 className="section-title">added blogs</h3>
      <ul>
        {user.blogs?.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
