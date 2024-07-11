import Input from './Input'
import { useState } from 'react'

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleBlogFormSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url: blogUrl,
    }
    await handleCreateBlog(newBlog)
    setTitle('')
    setAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={handleBlogFormSubmit}>
      <h2>create new</h2>
      <div>
        title:
        <input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          data-testid='titleInput'
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          data-testid='authorInput'
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={blogUrl}
          onChange={({ target }) => setBlogUrl(target.value)}
          data-testid='blogUrlInput'
        />
      </div>
      {/* <Input
        type='text'
        name='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      /> */}
      {/* <Input
        type='text'
        name='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <Input
        type='text'
        name='url'
        value={blogUrl}
        onChange={({ target }) => setBlogUrl(target.value)}
      /> */}
      <button type='submit' name='create'>
        create
      </button>
    </form>
  )
}

export default BlogForm
