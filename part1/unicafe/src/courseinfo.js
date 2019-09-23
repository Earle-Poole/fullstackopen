import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  )
}

const Content = (props) => {
  console.log(props);
  const parts = props.parts;
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises}/>
      <Part part={parts[1].name} exercise={parts[1].exercises}/>
      <Part part={parts[2].name} exercise={parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  let parts = props.parts;

  return (
    <>
      <p>
        Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    </>
  )
}

const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age 

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old!
      </p>
      <p>
        So you were probably born in {bornYear()}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      }, {
        name: 'Using props to pass data',
        exercises: 7,
      }, {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  }

  const name = 'Earle'
  const age = 30

  return (
    <div>
      {/* <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/> */}
      <h1>Greetings</h1>
      <Hello name="Maya" age ={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
