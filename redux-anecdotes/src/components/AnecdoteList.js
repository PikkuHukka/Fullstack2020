import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(newVote(id))
  }

  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote =>
      anecdote.content.includes(state.filter))
  })

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has{anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}


export default AnecdoteList