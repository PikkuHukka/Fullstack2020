import anecdoteService from '../services/anecdotes'



const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      state.sort(function (a, b) {
        if (b.id === id) {
          return (b.votes + 1) - a.votes
        } else if (a.id === id) {
          return b.votes - (a.votes + 1)
        } else
          return b.votes - a.votes
      })
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}



export const newVote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const id = 0
    anecdotes.sort(function (a, b) {
      if (b.id === id) {
        return (b.votes + 1) - a.votes
      } else if (a.id === id) {
        return b.votes - (a.votes + 1)
      } else
        return b.votes - a.votes
    })

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer