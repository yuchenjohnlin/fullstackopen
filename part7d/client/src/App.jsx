import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import BlogList from './components/BlogList.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: '' })
  // the reason notification is null is if it is '' then the block will appear

  const blogFormRef = useRef()
  const LoginFormRef = useRef()

  const notifyUser = (text, type) => {
    setNotification({ message: text, type: type })
    setTimeout(() => {
      setNotification({ message: null, type: '' })
    }, 5000) // disappear after 3 seconds
  }

  useEffect(() => {
    if (!user) return

    blogService.getAll().then((blogs) => setBlogs([...blogs].sort((a, b) => b.likes - a.likes)))
  }, [user])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      notifyUser(`${user.name} is successfully logged in !`, 'success')

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      notifyUser('wrong credentials', 'error')
    }
  }
  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs((prev) => prev.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
        notifyUser(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
        blogFormRef.current?.toggleVisibility()
      })
      .catch(() => {
        notifyUser('failed to add blog', 'error')
      })
  }
  const handleLike = (blog) => {
    const userId = blog.user?.id || blog.user?._id || blog.user
    const updated = { ...blog, likes: blog.likes + 1, user: userId }
    blogService
      .update(blog.id, updated)
      .then((returnedBlog) => {
        setBlogs((prev) =>
          prev
            .map((b) => (b.id === blog.id ? { ...returnedBlog, user: blog.user } : b))
            .sort((a, b) => b.likes - a.likes)
        )
      })
      .catch(() => notifyUser('failed to like blog', 'error'))
  }

  const handleDelete = (blog) => {
    const confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!confirmDelete) return

    blogService
      .remove(blog.id)
      .then(() => {
        setBlogs((prev) => prev.filter((b) => b.id !== blog.id))
        notifyUser(`removed ${blog.title}`, 'success')
      })
      .catch(() => notifyUser('failed to remove blog', 'error'))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser') // clear stored user/token
    blogService.setToken(null) // drop Authorization header
    setUser(null)
    notifyUser(`${user.name} is successfully logged out !`, 'success')
  }
  const logoutForm = () => (
    <div>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={LoginFormRef}>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {/* {errorMessage && <div>{errorMessage}</div>} */}
      <Notification notification={notification} />
      {!user && loginForm()}

      {user && logoutForm()}
      <BlogList
        blogs={[...blogs].sort((a, b) => b.likes - a.likes)}
        onLike={handleLike}
        onDelete={handleDelete}
        currentUser={user}
      />
      {user && blogForm()}
    </div>
  )
}

export default App
