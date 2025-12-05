import { useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'
import { useNotify } from './NotificationContext'
import { useUserValue, useUserDispatch } from './UserContext'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import BlogList from './components/BlogList.jsx'
import BlogDetail from './components/BlogDetail.jsx'
import UserList from './components/UserList.jsx'
import Togglable from './components/Togglable.jsx'
import { useUsers } from './hooks/useUsers.js'
import { useBlogs, useCreateBlog } from './hooks/useBlogs'
import User from './components/User.jsx'

const App = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  console.log(user)
  const queryClient = useQueryClient()

  const notifyWith = useNotify()

  const blogFormRef = useRef()
  const LoginFormRef = useRef()

  const blogResult = useBlogs({enabled: !!user})
  const userResult = useUsers()

  const blogs = blogResult.data || []
  const users = userResult.data || []


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      notifyWith(`${user.name} is successfully logged in !`, 'success')

      userDispatch({ type: 'LOGIN', payload: user })
    } catch {
      notifyWith('wrong credentials', 'error')
    }
  }

  const newBlogMutation = useCreateBlog(
    (returnedBlog) => {
      notifyWith(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
      blogFormRef.current?.toggleVisibility()
    },
    () => {
      notifyWith('failed to add blog', 'error')
    }
  )

  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser') // clear stored user/token
    blogService.setToken(null) // drop Authorization header
    userDispatch({ type: 'LOGOUT' })
    notifyWith(`${user.name} is successfully logged out !`, 'success')
    queryClient.removeQueries({ queryKey: ['blogs'] })
  }
  const logoutForm = () => (
    <div>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={LoginFormRef}>
      <LoginForm onLogin={handleLogin} />
    </Togglable>
  )
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div className="app-container">
      <Notification />
      <nav className="top-nav">
        <div className="nav-links">
          <Link to="/">blogs</Link>
          <Link to="/users">users</Link>
        </div>
        <div className="nav-auth">
          {user ? (
            <>
              <span className="nav-username">{user.name} logged in</span>
              <button onClick={handleLogout}>logout</button>
            </>
          ) : (
            loginForm()
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <BlogList blogs={[...blogs].sort((a, b) => b.likes - a.likes)} />
              {user && blogForm()}
            </>
          }
        />
        <Route path="/blogs/:id" element={<BlogDetail blogs={blogs} />} />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
      </Routes>
    </div>
  )
}

export default App
