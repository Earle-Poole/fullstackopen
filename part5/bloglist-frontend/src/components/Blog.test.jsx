import React from "react"
import { render, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

test("renders stuff", () => {
  const blog = {
    title: "titleous maximous",
    author: "authorious verillious",
    url: "earle",
    likes: 44934,
    userid: "5dae1948a5d2f352c02ae89a",
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('titleous maximous')

  const element = component.getByText('titleous maximous')

  expect(element).toBeDefined()

  const div = component.container.querySelector('.blog')

  expect(div).toHaveTextContent('titleous maximous')
})


describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show login">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show login')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})



test('clicks button, calling event handler', () => {
  const blog = {
    title: "titleous maximous",
    author: "authorious verillious",
    url: "earle",
    likes: 44934,
    userid: "5dae1948a5d2f352c02ae89a",
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} incrementLikes={mockHandler} getBlogs={mockHandler} />
  )

  const button = getByText('likes')

  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})

//exercise 5.15
test('test blog has name and author by default, and expands on click', () => {
  const blog = {
    title: "titleous maximous",
    author: "authorious verillious",
    url: "earle",
    likes: 44934,
    userid: "5dae1948a5d2f352c02ae89a",
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} incrementLikes={mockHandler} getBlogs={null} />
  )

  const likes = component.container.querySelector('.likes')
  const author = component.container.querySelector('.author')
  const title = component.container.querySelector('.title')
  const details = component.container.querySelector('.details')

  expect(details).toHaveStyle('display: none')

  expect(likes).toHaveTextContent('44934')
  expect(author).toHaveTextContent('authorious verillious')
  expect(title).toHaveTextContent('titleous maximous')

  fireEvent.click(title)

  expect(details).not.toHaveStyle('display: none')
})
