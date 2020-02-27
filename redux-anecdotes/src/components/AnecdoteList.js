import React from 'react'
import { connect } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = (props) => {
  return (
    <ul>
      {props.filteredAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          content={anecdote}
          handleClick={() => props.newVote(anecdote.id)}
        />
      )}
    </ul>
  )
}



const anecdotesFilter = ({ anecdotes, filter }) => {
  console.log('filterAne', anecdotes)
  return anecdotes.filter(anecdote =>
    anecdote.content.includes(filter))
}


const mapStateToProps = (state) => {
  return {
    filteredAnecdotes: anecdotesFilter(state)
  }
}
const mapDispatchToProps = {
  newVote,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)