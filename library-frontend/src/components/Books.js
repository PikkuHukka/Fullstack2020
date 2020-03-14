import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'




const Books = (props) => {


  const [genre, setGenre] = useState("")
  const result = useQuery(ALL_BOOKS, { variables: genre })



  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  } else {

    var books = result.data.allBooks
    console.log(books)
    console.log(genre)
    books = books.filter(b => {
      if (genre === "") {
        return b
      }
      if (b.genres.filter(g => g.includes(genre)).length > 0) {
        return b
      }
    })

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
        <input value={genre}
          onChange={({ target }) => setGenre(target.value)} ></input>

      </div >
    )
  }
}
export default Books