import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ME } from '../queries'




const Recommended = (props) => {
  const firstResult = useQuery(ME)
  const secondResult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if (firstResult.loading || secondResult.loading) {
    return <div>loading...</div>
  }

  const genre = firstResult.data.me.favoriteGenre
  var books = secondResult.data.allBooks


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
      <h2>Recommended books</h2>
      <h3>Your favorite genre: {genre}</h3>
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

    </div >
  )
}

export default Recommended