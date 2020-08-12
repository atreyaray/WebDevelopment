import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
  return(
      <button onClick = {handleClick}>
        {text}
      </button>
  )
}

const Statistic = ({text, value}) => {
  if (text === "positive")
    return(
      // <p>{text} {value}%</p>
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    // <p>{text} {value}</p>
  )
}

const Statistics = ({good,bad,neutral}) => {
  const setAll = () => (good + bad + neutral)
  let total = setAll()
  const setAverage = () => (good-bad) / total
  const setPostive = () => good / total * 100
  if (total !== 0)
    return (
      <table>
      <tbody>
        <Statistic text = 'good' value = {good}/>
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={setAll()} />
        <Statistic text='average' value={setAverage()} />
        <Statistic text='positive' value={setPostive()} />
      </tbody>
      </table>
    )
  return (
    <p>No feedback given </p>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = ()  => setGood(good + 1)
  const incrementBad = () => setBad(bad + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)

  return (
    <div>
      <h1> give feedback</h1>
      <Button text='good' handleClick={incrementGood}  />
      <Button text='neutral' handleClick={incrementNeutral} />
      <Button text='bad' handleClick={incrementBad} />
      <h1>statistics</h1>
      <Statistics good = {good} bad = {bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)