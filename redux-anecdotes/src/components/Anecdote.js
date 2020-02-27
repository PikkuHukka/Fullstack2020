import React from 'react'

const Anecdote = ({ content, handleClick }) => {
  return (
    <div>
      <li> {content.content}</li>
      <li> likes: {content.votes}</li>
      <button onClick={handleClick}>Like</button>
    </div>


  )
}

export default Anecdote