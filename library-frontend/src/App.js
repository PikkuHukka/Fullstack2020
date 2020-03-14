

import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import LoginForm from './components/LoginForm'

import {
  useQuery, useMutation, useSubscription, useApolloClient
} from '@apollo/client'
import Recommended from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS } from './queries'



const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null) // hightlight-line
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    console.log("added book", addedBook)
    const includedIn = (set, object) => {
      set.map(p => {
        p.id.includes(object.id)
      })
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Tilaus:', subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })





  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }



  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => setPage('addBook')}>add book</button>
        <button onClick={() => setPage('editAuthor')}>edit author</button>
        <button onClick={logout}>Logout</button>

      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'addBook'}
        updateCacheWith={updateCacheWith}
      />
      <EditAuthor
        show={page === 'editAuthor'}
      />
      <Recommended
        show={page === 'recommended'}
      />

    </div>
  )
}

export default App