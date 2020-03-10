import { gql } from '@apollo/client'


export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author
      published
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


export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $publishedAsNumber: Int!, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $publishedAsNumber,
      genres: $genres
    ) {
      title
      author
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