import anecdoteService from '../services/anecdotes'

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
    const response = await anecdoteService.updateLikes(id)
    dispatch ({
      type: 'VOTE_INCREMENT',
      data: response
    })
  }
} 

export const new_note = (content) => {
  return async dispatch => {
    const note = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: note
    })
  }
}

export const initAnecdotes = () => {
 return async dispatch =>{
   const data = await anecdoteService.getAll()
   const sortedData = data.sort((a, b) => b.votes - a.votes)
   dispatch ({
     type: 'INIT_ANECDOTES',
     data: sortedData
   }) 
 }
}

export default reducer