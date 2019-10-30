import React from "react"
import { render, waitForElement, fireEvent } from "@testing-library/react"
import localStorageMock from './setupTests'
import App from "./App"

describe("<App />", () => {
  test("renders all blogs it gets from backend when a user is logged in", async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector(".blog"))

    const blogs = component.container.querySelectorAll(".blog")
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent("A Journey in New Shoes 1")
    expect(component.container).toHaveTextContent("A Journey in New Shoes 2")
    expect(component.container).toHaveTextContent("Don't.. No.. Please!")
  })

  test("when the user is not logged in, the app only shows the login form", async () => {
    const component = render(<App />)
    component.rerender(<App />)
    component.debug()

    const button = component.getByText("logout")
    fireEvent.click(button)
    localStorageMock.clear()

    await waitForElement(() => component.queryByText("show login"))

    const showLogin = component.getByText("show login")

    const blogs = component.container.querySelectorAll(".blog")
    expect(blogs.length).toBe(0)

    fireEvent.click(showLogin)
    const inputs = component.container.querySelectorAll("input")
    expect(inputs.length).toBe(2)
  })
})
