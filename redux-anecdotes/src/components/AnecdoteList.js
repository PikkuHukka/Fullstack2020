import React from 'react'
import { connect } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'
import { createVoteNotification, cancelNotification } from '../reducers/notificationReducer'

var timeOut
const clickHandler = (props, id, content) => {
  props.newVote(id)
  props.createVoteNotification(content)

  clearTimeout(timeOut)
  timeOut = setTimeout(() => {
    props.cancelNotification()
  }, 3000)

}

const AnecdoteList = (props) => {
  return (
    <ul>
      {props.filteredAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          content={anecdote}
          handleClick={() =>
            clickHandler(props, anecdote.id, anecdote.content)
          }
        />
      )}
    </ul>
  )
}



const anecdotesFilter = ({ anecdotes, filter }) => {
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
  createVoteNotification,
  cancelNotification
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)