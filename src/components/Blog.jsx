import { useState } from "react"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  const hideWhenView = view ? { display: "none" } : { display: "" }
  const showWhenView = view ? { display: "" } : { display: "none" }

  const switchView = () => {
    setView(!view)
  }

  return (
    <div
      style={{
        whiteSpace: "pre-wrap",
        border: "1px solid",
        margin: "5px",
        padding: "5px",
      }}
    >
      <div style={hideWhenView}>
        {blog.title}, {blog.author}
        <button onClick={switchView}>view</button>
      </div>

      <div style={showWhenView}>
        {blog.title}, {blog.author}
        <button onClick={switchView}>hide</button>
        {"\n"}
        {blog.url}
        {"\n"}
        {blog.likes}
        <button onClick={() => console.log("like pressed")}>like</button>
        {"\n"}
        {blog.user.name}
        {"\n"}
      </div>
    </div>
  )
}

export default Blog
