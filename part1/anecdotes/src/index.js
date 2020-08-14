import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

let max = 0
let anec = anecdotes[0]


const MaxVotes = ({findMax}) => <p>has {findMax()} votes</p>
const BestAnec = ({findAnec}) => <p>{findAnec()}</p>

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  
  const handleClick = () => setSelected(Math.floor(Math.random() * 5))

  const addVotes = () => {
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
  }
  
  const findMax = () => {
    if (max < votes[selected])
      max = votes[selected]
    return max
  }
  
  const findAnec = () => {
    if (max < votes[selected])
      anec = props.anecdotes[selected]
    return anec
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick = {addVotes} > vote </button>
      <button onClick = {handleClick} >
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1> 
      <BestAnec findAnec = {findAnec}/>
      <MaxVotes findMax = {findMax} />
      </>
  )
}




ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
