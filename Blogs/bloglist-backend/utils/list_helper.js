var lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, currentObject) => {
    return sum + currentObject.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (best, currentObject) => {
    if (currentObject.likes > best) {
      return currentObject.likes
    } else {
      return best
    }
  }
  return blogs.reduce(reducer, 0)
}



const mostBlogs = (blogs) => {
  var myArray = []

  for (var blog of blogs) {
    if (lodash.some(myArray, { 'author': blog.author })) {
      for (var arrayEntry of myArray) {
        if (arrayEntry.author === blog.author) {
          arrayEntry.blogs = arrayEntry.blogs + 1
        }
      }

    } else {
      myArray.push({ 'author': blog.author, 'blogs': 1 })
    }
  }


  var mostBlogs = 0
  var mostAuthor = ''

  for (var author of myArray) {
    if (arrayEntry.blogs > mostBlogs) {
      mostBlogs = author.blogs
      mostAuthor = author.author
    }
  }


  return mostAuthor
}

const mostLikesByAuthor = (blogs) => {
  var myArray = []

  for (var blog of blogs) {
    if (lodash.some(myArray, { 'author': blog.author })) {
      for (var arrayEntry of myArray) {
        if (arrayEntry.author === blog.author) {
          arrayEntry.blogs = arrayEntry.blogs + blog.likes
        }
      }

    } else {
      myArray.push({ 'author': blog.author, 'blogs': blog.likes })
    }
  }


  var mostBlogLikes = 0
  var mostAuthor = ''

  for (var author of myArray) {
    if (arrayEntry.blogs > mostBlogLikes) {
      mostBlogLikes = author.blogs
      mostAuthor = author.author
    }
  }


  return mostAuthor
}



module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikesByAuthor
}