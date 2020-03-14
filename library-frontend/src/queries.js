import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
   allBooks {
      title
      author {
        name
        born
      }
      published
      genres
  }
}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCountByAuthor
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
