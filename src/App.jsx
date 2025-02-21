import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Input from './components/Input'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import ToggleVisibility from './components/ToggleVisibility'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  /**
   * HOOKS
   */
  const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [createdBlogNotification, setCreatedBlogNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [timeoutId, setTimeoutId] = useState(undefined)

  // Get Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setBlogs(await blogService.getAll())
    }
    fetchBlogs()
  }, [])

  // Check if user is logged in during re-renders
  useEffect(() => {
    const jsonUser = window.localStorage.getItem('loggedInUser')
    if (jsonUser) {
      const parsedUser = JSON.parse(jsonUser)
      setUser(parsedUser)
    }
  }, [])

  // blogFormRef
  const blogFormRef = useRef()

  /**
   * HANDLERS
   */
  // Login Handler
  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password,
    }

    try {
      const returnedUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(returnedUser))
      setUser(returnedUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      handleErrorNotificationProcess('invalid username or password')
    }
  }

  // Logout Handler
  const handleLogout = async (event) => {
    window.localStorage.clear()
    setUser(null) // Need to do this because this will cause App re-render
  }

  // Create Blog Handler
  // This is now only responsible to make POST request
  const handleCreateBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog, user.token)
      setBlogs(await blogService.getAll())
      setCreatedBlogNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      )
      setNotificationType('success')
      // Need to "clear" the error notification because it is possible that we create a blog WITHIN 5s of making an error post i.e. setTimeout to setErrorNotification to null would not get called and we will end up with issues; vice versa is applicable in the handleErrorNotification helper function
      setErrorNotification(null)
      // Clears the current timeoutId, and then sets a new one for every notification message
      clearTimeout(timeoutId)
      setTimeoutId(
        setTimeout(() => {
          setCreatedBlogNotification(null)
          setNotificationType(null)
        }, 5000)
      )
      blogFormRef.current.switchVisible()
    } catch (error) {
      // Errors are when title and/or url is not provided
      handleErrorNotificationProcess('Blog title or url must be provided')
    }
  }

  const handleLikes = async (blog) => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    try {
      await blogService.update(updateBlog, user.token)
      setBlogs(await blogService.getAll())
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog, user.token)
        setBlogs(await blogService.getAll())
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * HELPERS
   */
  const loginFormRender = () => (
    <div>
      <h2>log in to application</h2>
      <Notification
        message={errorNotification}
        notificationType={notificationType}
      />
      <form onSubmit={handleLogin}>
        <Input
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <Input
          type='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type='submit' name='login'>
          Login
        </button>
      </form>
    </div>
  )

  const blogsRender = () => (
    <div>
      <h2>blogs</h2>
      <Notification
        message={errorNotification || createdBlogNotification}
        notificationType={notificationType}
      />
      <p data-testid='loggedIn'>
        {user.name} logged in
        <button type='submit' name='logout' onClick={handleLogout}>
          Logout
        </button>
      </p>
      <ToggleVisibility buttonLabel='a new blog' ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </ToggleVisibility>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikes={handleLikes}
            handleRemove={handleRemove}
            user={user}
          />
        ))}
    </div>
  )

  const handleErrorNotificationProcess = (desiredNotification) => {
    clearTimeout(timeoutId)
    // Must also set createdBlogNotification to null if not it will linger -- and vice versa for createdBlog timeout
    setCreatedBlogNotification(null)
    setErrorNotification(desiredNotification)
    setNotificationType('error')
    setTimeoutId(
      setTimeout(() => {
        setErrorNotification(null)
        setNotificationType(null)
      }, 5000)
    )
  }

  /**
   * RENDERING
   */
  // To allow blog's useEffect to run when blogs initial state null
  if (!blogs) {
    return
  }

  return <div>{!user ? loginFormRender() : blogsRender()}</div>
}

/**
 * COMPONENT BUILDING AREA
 */

export default App
