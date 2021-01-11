import React from 'react'
import { connect } from 'react-redux'
import { new_note } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.new_note(content)
        props.addNotification(`New anecdote: ${content}`, 5)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>     
        </>
    )
}
const mapDispatchToProps = {
    addNotification,
    new_note
}
const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
export default ConnectedAnecdoteForm


