// import User from './User'
import { Link } from 'react-router-dom'

const UserList = ({ users = [] }) => {
  return (
    <div className="card">
      <h2 className="section-title">Users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
