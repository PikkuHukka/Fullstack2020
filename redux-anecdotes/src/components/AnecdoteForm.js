import React from 'react'
import { useDispatch } from 'react-redux'

import { createNotification, cancelNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

import anecdoteService from '../services/anecdotes'



const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''


    dispatch(createAnecdote(content))





    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(cancelNotification(content))
    }, 5000)

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm