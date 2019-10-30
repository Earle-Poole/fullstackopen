import '@testing-library/jest-dom/extend-expect'
jest.mock("./services/blogs")

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: () => {
    savedItems = {}
  }
}

const loggedUser = {
  name: "Earle",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVhcmxlMTIzIiwiaWQiOiI1ZGFkYzM0ZjVhOWU2NDIxMThmNDc3OWQiLCJpYXQiOjE1NzIyOTQxNzl9.j4HV6rIXDNZALtQFyV_BWFOiD74jAYuaRNHen9ny3XM",
  username: "Earle123"
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

localStorageMock.setItem("loggedBlogAppUser", JSON.stringify(loggedUser))

const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

export default localStorageMock
