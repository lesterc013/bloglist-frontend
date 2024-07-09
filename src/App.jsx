import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import ToggleVisibility from "./components/ToggleVisibility"
import blogService from "./services/blogs"
import loginService from "./services/login"
import login from "./services/login"
import "./index.css"

const App = () => {
  /**
   * HOOKS
   */
  const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [blogUrl, setBlogUrl] = useState("")
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
    const jsonUser = window.localStorage.getItem("loggedInUser")
    if (jsonUser) {
      const parsedUser = JSON.parse(jsonUser)
      setUser(parsedUser)
    }
  }, [])

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
      window.localStorage.setItem("loggedInUser", JSON.stringify(returnedUser))
      setUser(returnedUser)
      setUsername("")
      setPassword("")
    } catch (error) {
      handleErrorNotificationProcess("invalid username or password")
    }
  }

  // Logout Handler
  const handleLogout = async (event) => {
    window.localStorage.clear()
    setUser(null) // Need to do this because this will cause App re-render
  }

  // Create Blog Handler
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url: blogUrl,
    }

    try {
      const createdBlog = await blogService.create(newBlog, user.token)
      setTitle("")
      setAuthor("")
      setBlogUrl("")
      setBlogs(await blogService.getAll())
      setCreatedBlogNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      )
      setNotificationType("success")
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
    } catch (error) {
      // Errors are when title and/or url is not provided
      handleErrorNotificationProcess("Blog title or url must be provided")
    }
  }

  const handleLikes = async (blog) => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    console.log("whole updateBlog", updateBlog)
    try {
      const returnedBlog = await blogService.update(updateBlog, user.token)
      setBlogs(await blogService.getAll())
    } catch (error) {
      console.log(error)
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
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <Input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit" name="login">
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
      <p>
        {user.name} logged in
        <button type="submit" name="logout" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <ToggleVisibility buttonLabel="a new note">
        <BlogForm
          handleCreateBlog={handleCreateBlog}
          title={title}
          author={author}
          blogUrl={blogUrl}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setBlogUrl={setBlogUrl}
        />
      </ToggleVisibility>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />
      ))}
    </div>
  )

  const handleErrorNotificationProcess = (desiredNotification) => {
    clearTimeout(timeoutId)
    // Must also set createdBlogNotification to null if not it will linger -- and vice versa for createdBlog timeout
    setCreatedBlogNotification(null)
    setErrorNotification(desiredNotification)
    setNotificationType("error")
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
