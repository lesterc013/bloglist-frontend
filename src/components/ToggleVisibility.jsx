import { useState, forwardRef, useImperativeHandle } from 'react'
import PropType from 'prop-types'

const ToggleVisibility = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  // Need to hold the display properties based on visible
  const hideWhenVisible = visible ? { display: 'none' } : { display: '' }
  const showWhenVisible = visible ? { display: '' } : { display: 'none' }
  const switchVisible = () => {
    setVisible(!visible)
  }

  // To give the ref ability to call the switchVisible function from outside this component
  useImperativeHandle(ref, () => {
    return {
      switchVisible,
    }
  })

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
})

ToggleVisibility.propTypes = {
  buttonLabel: PropType.string.isRequired,
}

export default ToggleVisibility
