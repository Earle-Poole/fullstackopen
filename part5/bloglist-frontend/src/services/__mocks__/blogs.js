const blogs = [
  {
    id: "5da7431c052e073d3cd98e55",
    title: "A Journey in New Shoes 1",
    author: "J P Hudson",
    url: "www.google.com",
    likes: 16892871,
    userid: {
      blogs: [
        "5da4d487bb75311188960b85",
        "5da7431c052e073d3cd98e55",
        "5db0a887b56a540e740eb974",
        "5db0ab29b56a540e740eb975",
        "5db0ad91b56a540e740eb976",
        "5db0b52d0f73a327f8374dca",
        "5db0b7680f73a327f8374dcb",
        "5db0bb020f73a327f8374dcc",
        "5db0bb0e0f73a327f8374dcd",
        "5db1db790f73a327f8374dce"
      ],
      username: "Earle123",
      name: "Earle",
      id: "5dadc34f5a9e642118f4779d"
    },
  },
  {
    id: "5da86fe416e2d92f78a82cb0",
    title: "A Journey in New Shoes 2",
    author: "J P Hudson",
    url: "www.google.com",
    likes: 16892857,
    userid: {
      blogs: [
        "5da86fe416e2d92f78a82cb0",
        "5dae24d17e444d4284f7f098"
      ],
      username: "Sonny123",
      name: "Sonny",
      id: "5dae1948a5d2f352c02ae89a"
    },
  },
  {
    id: "5dae24d17e444d4284f7f098",
    title: "Don't.. No.. Please!",
    author: "Him",
    url: "www.667.com",
    likes: 6715124,
    userid: {
      blogs: [
        "5da86fe416e2d92f78a82cb0",
        "5dae24d17e444d4284f7f098"
      ],
      username: "Sonny123",
      name: "Sonny",
      id: "5dae1948a5d2f352c02ae89a"
    },
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
