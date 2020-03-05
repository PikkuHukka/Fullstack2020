import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const successStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 5,
    borderColor: 'green'

  }
  const errorStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 5,
    borderColor: 'red'
  }

  if (!notification) {
    return (
      <div></div>
    )
  } else {
    return (
      <div>
        {notification.type === 'error' ?

          < div style={errorStyle}>
            {notification.message}
          </div>
          :

          < div style={successStyle}>
            {notification.message}
          </div>
        }
      </div>
    )
  }

}

export default Notification