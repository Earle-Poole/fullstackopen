import React from 'react'

const Footer = () => (
  <div className="p-3 px-md-4 mb-3 bg-white shadow-sm">
    <span>
      {'Blog app for '}
      <a href="https://courses.helsinki.fi/fi/tkt21009">
        {'Full Stack Open - Earle Poole. '}
      </a>
    </span>
    <span>
      {'See '}
      <a href="https://github.com/Earle-Poole/fullstackopen/tree/master/part7/routed-anecdotes">
        {'https://github.com/Earle-Poole/fullstackopen/tree/master/part7/routed-anecdotes'}
      </a>
      {' for the source code.'}
    </span>
  </div>
)

export default Footer
