import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleRemove, user }) => {
  const [view, setView] = useState(false)

  const hideWhenView = view ? { display: 'none' } : { display: '' }
  const showWhenView = view ? { display: '' } : { display: 'none' }

  const switchView = () => {
    setView(!view)
  }

  // For each Blog component, check if the blog.user.username === user.username since this is a unique field. setRemove based on this
  const removeDisplayStyle =
    blog.user.username === user.username ? { display: '' } : { display: 'none' }

  return (
    <div
      style={{
        whiteSpace: 'pre-wrap',
        border: '1px solid',
        margin: '5px',
        padding: '5px',
      }}
    >
      <div style={hideWhenView} className='initialBlogRender'>
        {blog.title}, {blog.author}
        <button onClick={switchView}>view</button>
      </div>

      <div style={showWhenView} className='viewBlogRender'>
        {blog.title}, {blog.author}
        <button onClick={switchView}>hide</button>
        {'\n'}
        {blog.url}
        {'\n'}
        {blog.likes}
        <button onClick={() => handleLikes(blog)}>like</button>
        {'\n'}
        {blog.user.name}
        {'\n'}
        <button style={removeDisplayStyle} onClick={() => handleRemove(blog)}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
