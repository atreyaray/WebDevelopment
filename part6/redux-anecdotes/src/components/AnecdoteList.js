import React from 'react'
import { connect } from 'react-redux'
import { vote_increment } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const vote = (id) => {
        props.vote_increment(id)
        const likedAnecdote = props.anecdotes.find(n => n.id === id)
        const content = likedAnecdote.content
        props.addNotification(`Liked: ${content}`, 3)
    }

    return (
        <>
         {
            props.anecdotes.map(anecdote =>
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

const mapStateToProps = state => {
    return  {
        anecdotes: state.filter !== '' ? state.anecdotes.filter(anec => anec.content.includes(state.filter)) : state.anecdotes
    }
}

const mapDispatchToProps = {
    addNotification,
    vote_increment
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps

)(AnecdoteList)
export default ConnectedAnecdoteList