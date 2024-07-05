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

  useEffect(() => {
    const fetchBlogs = async () => {
      setBlogs(await blogService.getAll())
    }
    fetchBlogs()
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
      setUser(returnedUser)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      console.log(error)
      console.log(error.response.data)
    }
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
      <p>{user.name} logged in</p>
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