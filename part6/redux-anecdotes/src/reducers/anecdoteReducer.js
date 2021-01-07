// const anecdotesAtStart = [
// 'If it hurts, do it more often',
// 'Adding manpower to a late software project makes it later!',
// 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 'Premature optimization is the root of all evil.',
// 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const reducer = (state = [], action) => {
  switch (action.type){
    case 'VOTE_INCREMENT': {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const changedState = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      const sortedChangedState = changedState.sort((a,b) => b.votes - a.votes )
      return sortedChangedState
    }
    case 'NEW_NOTE': {
      return state.concat(action.data)
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default:
      return state
  }
}

export const vote_increment = (id) => {
  return{
    type: 'VOTE_INCREMENT',
    data: { id }
  }
}

export const new_note = (newNote) => {
  return {
    type: 'NEW_NOTE',
    data: newNote
  }
} 

export const initAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default reducer