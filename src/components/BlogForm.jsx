import Input from "./Input"

const BlogForm = ({
  handleCreateBlog,
  title,
  author,
  blogUrl,
  setTitle,
  setAuthor,
  setBlogUrl,
}) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <Input
        type="text"
        name="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <Input
        type="text"
        name="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <Input
        type="text"
        name="url"
        value={blogUrl}
        onChange={({ target }) => setBlogUrl(target.value)}
      />
      <button type="submit" name="create">
        Create
      </button>
    </form>
  )
}

export default BlogForm
