import { useState } from "react"

const ToggleVisibility = (props) => {
  const [visible, setVisible] = useState(false)

  // Need to hold the display properties based on visible
  const hideWhenVisible = visible ? { display: "none" } : { display: "" }
  const showWhenVisible = visible ? { display: "" } : { display: "none" }
  const switchVisible = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={switchVisible}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={switchVisible}>cancel</button>
      </div>
    </>
  )
}

export default ToggleVisibility
