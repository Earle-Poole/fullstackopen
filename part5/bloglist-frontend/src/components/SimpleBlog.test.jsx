import React from 'react'
import { render, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  test("renders stuff", () => {
    const blog = {
      title: "titleous maximous",
      author: "authorious verillious",
      likes: 44934,
    }

    const component = render(
      <SimpleBlog blog={blog} />
    )

    const likes = component.container.querySelector('.likes')
    const author = component.container.querySelector('.author')
    const title = component.container.querySelector('.title')

    expect(likes).toHaveTextContent('44934')
    expect(author).toHaveTextContent('authorious verillious')
    expect(title).toHaveTextContent('titleous maximous')
  })

  test("like button pressed twice triggers event twice", () => {
    const blog = {
      title: "titleous maximous",
      author: "authorious verillious",
      likes: 44934,
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
