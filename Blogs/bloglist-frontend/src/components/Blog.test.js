import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'



test('renders content', () => {
  const blog = {
    title: 'Titteli',
    author: 'Component testing is done with react-testing-library',
    url: "random url",
    user: {
      username: 'Esko'
    }
  }


  const user = {
    username: 'Esko',
  }
  const component = render(
    <Blog blog={blog} user={user} />
  )




  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Titteli',
    author: 'Component testing is done with react-testing-library',
    url: "random url",
    user: {
      username: 'Esko'
    }
  }
  const user = {
    username: 'Esko',
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandler} user={user} />
  )
  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)


  expect(mockHandler.mock.calls.length).toBe(2)
})

test('find url after click', () => {
  const blog = {
    title: 'Titteli',
    author: 'Component testing is done with react-testing-library',
    url: "random url",
    user: {
      username: 'Esko'
    }
  }
  const user = {
    username: 'Esko',
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )
  const button = component.getByText('Show more')
  fireEvent.click(button)

  const element = component.getByText(
    'URL: random url'
  )
  expect(element).toBeDefined()
})