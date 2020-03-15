import { gql } from '@apollo/client'


const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published 
    author {
      name 
      born
    }
    genres
  }
`


export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`


export const ALL_BOOKS = gql`
  query getAllBooks($genreFilter: String) {
   allBooks(genreFilter: $genreFilter) {
      title
      author {
        name
        born
      }
      published
      genres
      id
  }
}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      books
    }
  }
`
export const ME = gql`
  query {
    me  {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $publishedAsNumber: Int!, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $publishedAsNumber,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
    }
  }
  `

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!,$bornToAsNumber: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $bornToAsNumber
       ) {
      name
      born
    }
  }
  `
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
