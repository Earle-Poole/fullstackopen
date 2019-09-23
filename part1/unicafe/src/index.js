import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ text, onClick }) => {
  return (
    <button onClick={() => onClick()}>
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}: </td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = ((good - bad) / all).toFixed(2)
  const positive = good / all
  const toPercentage = (num) => (num * 100).toFixed(2) + '%'

  if(good || neutral || bad){
    return (
      <table>
      <tbody>
        <Statistic text="Good: " value={good} />
        <Statistic text="Neutral: " value={neutral} />
        <Statistic text="Bad: " value={bad} />
        <Statistic text="Average: " value={average} />
        <Statistic text="Positive: " value={toPercentage(positive)} />
      </tbody>
      </table>
    )
  }

  return (
    <div>
      <p>No feedback given</p>
    </div>

  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" onClick={() => setGood(good + 1)} />
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" onClick={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)