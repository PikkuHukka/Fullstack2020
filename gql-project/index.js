const { ApolloServer, UserInputError, gql, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const pubsub = new PubSub()
const DataLoader = require('dataloader')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)


const MONGODB_URI = config.MONGODB_URI

const JWT_SECRET = config.SECRET

console.log('connecting to', MONGODB_URI)


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const BOOK_DETAILS = gql`
  fragment BookDetails on Person {
    id
    title
    author{
      name
      born
    } 
    published
    genres

  }
`

const typeDefs = gql`
  type Author {
    name: String!
    born: String
    id: ID!
    books: Int
  }

type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author
    published: Int!
    genres: [String]
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(genreFilter: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    addAuthor(
      name: String!
      born: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token 
  }

  type Subscription {
  bookAdded: Book!
}
`
const resolvers = {

  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
  },

  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: async (root) => {
      const author = await Author.findOne(root.author)
      return author
    },
    genres: (root) => root.genres,
    id: (root) => root.id
  },

  Query: {
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    allBooks: async (root, args, context) => {
      var filteredBooks = await Book.find({})
      if (args.genreFilter !== undefined) {

        if (args.genreFilter === "") {
          return filteredBooks
        }

        filteredBooks = filteredBooks.filter(b => {
          if (b.genres.filter(g => g.includes(args.genreFilter)).length > 0) {
            return b
          }
        }
        )
      }
      return filteredBooks
    }
    ,
    allAuthors: async () => {
      var authors = await Author.find({})
      const books = await Book.find({})
      for (var i = 0; i < authors.length; i++) {
        if (authors[i].books === undefined) {
          authors[i].books = 0
        }
        for (var j = 0; j < books.length; j++) {
          if (String(books[j].author) === String(authors[i].id)) {
            authors[i].books = authors[i].books + 1
          }
        }
      }
      console.log(authors)
      return authors

    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },


  Mutation: {
    addAuthor: async (root, args, context) => {


      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (args.name.length < 3) {
        throw new UserInputError("Author name too short.")
      }

      const author = new Author({ ...args })

      const currentUser = context.currentUser



      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },

    addBook: async (root, args, context) => {

      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (args.author.length < 3) {
        throw new UserInputError("Author name too short.")
      }
      if (args.title.length < 3) {
        throw new UserInputError("Title name too short.")
      }


      var author = await Author.findOne({ name: args.author })
      if (author === null) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

      }
      args.author = author


      const book = new Book({ ...args })

      const currentUser = context.currentUser


      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })


      return book
    },

    editAuthor: async (root, args, context) => {


      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },

    createUser: (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)

})

