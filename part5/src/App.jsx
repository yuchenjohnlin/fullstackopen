import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState({message: null, type: ''})
  // the reason notification is null is if it is '' then the block will appear
  
  const notifyUser = (text, type) => {
    setNotification({message: text, type: type})
      setTimeout(() => {
        setNotification({message: null, type: ''})
      }, 5000)   // disappear after 3 seconds
  }

  const [newBlog, setNewBlog] = useState({
      title: '',
      author: '',
      url: '',
      likes: 0
    }
  )
  useEffect(() => {
    if(!user) return;

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])


  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      
      notifyUser(`${user.name} is successfully logged in !`, 'success')

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      notifyUser('wrong credentials', 'error')
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      ...newBlog
    }
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      // setNewBlog(null)
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
    })
    notifyUser(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
  }

  const handleBlogChange = (e) => {
    // the name and value here corresponds with the attributes in the input
    const { name, value } = e.target;
    setNewBlog(prev => ({ ...prev, [name]: value }));
  };
  const blogForm = () => (
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
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <input name="title" value={newBlog.title} onChange={handleBlogChange} placeholder="title" />
        <input name="author" value={newBlog.author} onChange={handleBlogChange} placeholder="author" />
        <input name="url" value={newBlog.url} onChange={handleBlogChange} placeholder="url" />
        <input name="likes" value={newBlog.likes} onChange={handleBlogChange} placeholder="likes" />
        <button type="submit">save</button>
      </form>
    </>
  )
  

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username: 
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              />
          </label>
        </div>
        <div>
          <label>
            password: 
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser'); // clear stored user/token
    blogService.setToken(null); // drop Authorization header
    setUser(null);
    notifyUser(`${user.name} is successfully logged out !`, 'success')
  }
  const logoutForm = () => (
    <div>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )

  return (
    <div>
      {/* {errorMessage && <div>{errorMessage}</div>} */}
      <Notification notification={notification}/>
      {!user && loginForm()}
      {user && logoutForm()}
      {user && blogForm()}
    </div>
  )
}

export default App