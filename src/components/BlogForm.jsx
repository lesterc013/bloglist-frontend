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
      <Input
        type='text'
        name='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <Input
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
      />
      <button type='submit' name='create'>
        Create
      </button>
    </form>
  )
}

export default BlogForm
