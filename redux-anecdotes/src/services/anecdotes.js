import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {

  console.log('samaContent createNew:ssä:', content)


  const votes = 0
  const object = { content, votes }
  console.log('object:', object)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  const changedAnecdote = await axios.get(`${baseUrl}/${id}`)
  changedAnecdote.data.votes = changedAnecdote.data.votes + 1
  return axios.put(`${baseUrl}/${id}`, changedAnecdote.data)
}

export default { getAll, createNew, voteAnecdote }