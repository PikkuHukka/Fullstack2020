import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'




const Books = (props) => {

  const [filterInput, setFilterInput] = useState("")
  const [genreFilter, setGenreFilter] = useState("")
  var result = useQuery(ALL_BOOKS, { variables: { genreFilter: genreFilter } })

  const handleFilter = () => {
    setGenreFilter(filterInput)
  }
  console.log(result.data)

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  } else {
    var books = result.data.allBooks

    return (
      <div>
        <h2>books</h2>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
            </th>
              <th>
                published
            </th>
            </tr>
            {books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>

        <p>Genre Filter</p>
        <input value={filterInput}
          onChange={({ target }) => setFilterInput(target.value)} ></input>
        <button onClick={handleFilter}>set genre</button>
      </div >
    )
  }
}
export default Books