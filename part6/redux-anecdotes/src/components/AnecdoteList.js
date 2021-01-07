import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote_increment } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => { 
       const ans = state.filter !== '' ?  state.anecdotes.filter(anec => anec.content.includes(state.filter)) :  state.anecdotes
        return ans
    })

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(vote_increment(id))
        const likedAnecdote = anecdotes.find(n => n.id === id)
        const content = likedAnecdote.content
        dispatch(addNotification(`Liked: ${content}`, 3))
    }

    return (
        <>
         {
            anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default AnecdoteList