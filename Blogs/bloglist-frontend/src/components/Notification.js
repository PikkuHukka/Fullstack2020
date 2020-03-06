import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

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

          <div className="container">
            {(notification.message &&
              <Alert variant="danger">
                {notification.message}
              </Alert>
            )}
          </div>
          :

          <div className="container">
            {(notification.message &&
              <Alert variant="success">
                {notification.message}
              </Alert>
            )}
          </div>
        }
      </div>
    )
  }

}

export default Notification