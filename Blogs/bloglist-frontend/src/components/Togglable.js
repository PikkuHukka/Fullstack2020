import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button id={props.buttonID} onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id={'cancel' + props.buttonID} onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )

}
)

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
