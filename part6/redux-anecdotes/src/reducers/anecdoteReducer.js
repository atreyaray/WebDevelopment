// const anecdotesAtStart = [
// 'If it hurts, do it more often',
// 'Adding manpower to a late software project makes it later!',
// 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 'Premature optimization is the root of all evil.',
// 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
import noteService from '../services/notes'

const reducer = (state = [], action) => {
  switch (action.type){
    case 'VOTE_INCREMENT': {
      const changedAnecdote = action.data
      const changedState = state.map(anecdote => anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote)
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
  return async dispatch => {
    const response = await noteService.updateLikes(id)
    dispatch ({
      type: 'VOTE_INCREMENT',
      data: response
    })
  }
} 

export const new_note = (content) => {
  return async dispatch => {
    const note = await noteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: note
    })
  }
}

export const initAnecdotes = () => {
 return async dispatch =>{
   const data = await noteService.getAll()
   const sortedData = data.sort((a, b) => b.votes - a.votes)
   dispatch ({
     type: 'INIT_ANECDOTES',
     data: sortedData
   }) 
 }
}

export default reducer