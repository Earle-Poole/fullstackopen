import React from 'react'

const Total = ({course}) => {
  const total = course.parts.reduce((s,p) => {
    return typeof s === 'object' ?
    s.exercises + p.exercises :
    s + p.exercises;
  })
  
  return (
    <strong>
      total of {total} exercises
    </strong>
  );
}

export default Total