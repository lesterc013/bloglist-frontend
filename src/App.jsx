import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import login from './services/login'

const App = () => {
  /**
   * HOOKS
   */
  const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  /**
   * HANDLERS
   */
  // Login Handler
  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }

    try {
      const returnedUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(returnedUser))
      setUser(returnedUser)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      console.log(error)
      console.log(error.response.data)
    }
  }

  // Logout Handler
  const handleLogout = async (event) => {
    window.localStorage.clear()
    setUser(null) // Need to do this because this will cause App re-render 
  }

  /**
   * HELPERS
   */
  const loginFormRender = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        username
        <input 
          type='text' 
          name='username'
          value={username} 
          onChange={({ target }) => setUsername(target.value)} 
        />
        password
        <input 
          type='password'
          name='password' 
          value={password} 
          onChange={({ target }) => setPassword(target.value)} 
        />
        <button type='submit' name='login'>Login</button>
      </form>
    </div>
  )

  const blogsRender = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button type='submit' name='logout' onClick={handleLogout}>Logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  /**
   * RENDERING
   */
  // To allow blog's useEffect to run when blogs initial state null
  if (!blogs) {
    return
  }

  return (
    <>
      {!user ? loginFormRender() : blogsRender()}
    </>
  )
}
export default App