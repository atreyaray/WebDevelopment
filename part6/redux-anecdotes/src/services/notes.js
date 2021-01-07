import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const getId = () => (100000 * Math.random()).toFixed(0)
    const asObject = (anecdote) => {
        return {
            content: anecdote,
            id: getId(),
            votes: 0
        }
    }
    const newNote = asObject(content)
    const response = await axios.post(baseUrl, newNote)
    return response.data
}

const updateLikes = async (id) => {
    const anecdotes = await axios.get(baseUrl)
    const anecdote = anecdotes.data.find(anecdote => id === anecdote.id)
    const changedAnecdote = {...anecdote, votes: anecdote.votes+1}
    const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
    return response.data
}

export default { getAll, createNew, updateLikes }