/*
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'olli ojala',
      username: 'pikkuhukka',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })


  it('user can login', function () {
    cy.get('#username').type('pikkuhukka')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('olli ojala logged in')
  })

  it('fails with wrong credentials', function () {
    cy.get('#username').type('pikkuhukka')
    cy.get('#password').type('epasalainen')
    cy.get('#login-button').click()
    cy.contains('wrong credentials')
  })
})

describe('When logged in', function () {
  beforeEach(function () {

    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'olli ojala',
      username: 'pikkuhukka',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')

    cy.get('#username').type('pikkuhukka')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
  })

  it('A blog can be created', function () {
    cy.contains('new blog').click()
    cy.get('#title').type('kuinka koodaa')
    cy.get('#author').type('arto')
    cy.get('#url').type('www.artonblogi.fi')
    cy.get('#submit').click()
    cy.contains('kuinka koodaa')
  })
  it('A blog can be liked', function () {
    cy.contains('new blog').click()
    cy.get('#title').type('kuinka koodaa')
    cy.get('#author').type('arto')
    cy.get('#url').type('www.artonblogi.fi')
    cy.get('#submit').click()
    cy.contains('Show more').click()
    cy.get('#like-button').click()
    cy.contains('Likes: 1').click()
  })
})
*/
describe('With more test data', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'olli ojala',
      username: 'pikkuhukka',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)


    cy.login({ username: 'pikkuhukka', password: 'salainen' })

    cy.createBlog({
      title: 'arton blogi',
      author: 'Arto Vihavainen',
      url: "ekablogi.fi"
    })
    cy.createBlog({
      title: 'luken blogi',
      author: 'Matti Luukkainen',
      url: "tokablogi.fi"
    })
    cy.createBlog({
      title: 'antin blogi',
      author: 'Antti Laaksonen',
      url: "kolmasblog.fi"
    })

  })

  it('Liking a blog moves it in blog list', function () {
    cy.get('#showmore0').click()
    cy.get('#showmore2').click()
    cy.get('#like-button2').click()
    cy.get('#remove2').click()
    cy.get('#showmore1').click()
    cy.get('#remove1').click()
    cy.contains("Author: Antti Laaksonen")
  })
})

