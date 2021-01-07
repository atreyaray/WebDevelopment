import React from 'react'
import { useDispatch } from 'react-redux'
import { new_note } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import noteService from '../services/notes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newNote = await noteService.createNew(content)
        dispatch(new_note(newNote))
        dispatch(addNotification(content))
        setTimeout(() => dispatch(removeNotification()), 3000)
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
export default AnecdoteForm


