import React, { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/notes'


const Notification = ({message,color}) => {
    console.log('color', color)
    var error = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (message === null) {
        return null
    }
    return (
        <div style={error}>
            {message}
        </div>
    )
}


const App = () => {
    //state variables
    /*
    persons : hard coded initially, stores the names of all contacts
    newName : new name inputted 
    newNumber : new number inputted
    newFilter : new filter for searching
    */
    const [persons, setPersons] = useState([
        // { name: 'Arto Hellas', number: '040-123456' , id:0},
        // { name: 'Ada Lovelace', number: '39-44-5323523', id:0 },
        // { name: 'Dan Abramov', number: '12-43-234345', id:0 },
        // { name: 'Mary Poppendieck', number: '39-23-6423122',id:0 }
        // { name:'', number:''}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [color, setColor] = useState('green')
    // const [names, setNames] = useState([])

    //hook to pull from the website 
    const hook = () => {
        console.log('effect',)

        noteService
            .getAll()
            .then(data => {
                const newPersons = persons.concat([data])
                console.log('data',data)
                setPersons(persons.concat(data))
            })
    }
    useEffect(hook,[])


    const handleInputChange = (event) => {
        const val = event.target.value
        console.log(val)
        setNewName(val)
    }

    const handleNumberChange = (event) => {
        const val = event.target.value
        console.log(val)
        setNewNumber(val)
    }
    
    const handleFilterChange = (event) => {
        const val = event.target.value
        console.log(val)
        setNewFilter(val)
    }

    const handleDeletion = (id) =>{
        if(window.confirm(`Delete ${persons.filter(p=>p.id === id)[0].name}?`)){
            console.log('deletion id',id)
            noteService
                .remove(id)
            const newPersons = persons.filter(p => p.id !== id)
            setPersons(newPersons)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(persons,newName)
        const nameObject = { name : newName, number: newNumber}
        console.log(persons.includes( nameObject))
        const idx = persons.map(person=>person.name).includes(newName)
        if (idx){
            noteService
                .getOne(persons.filter(person=> person.name === newName)[0].id)
                .then(data => {
                    window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
                    const existingPerson = persons.filter(p => p.name === newName)[0]
                    const newPersons = persons.filter(p => p.name !== newName)
                    const newPerson = { name: newName, number: newNumber, id: existingPerson.id }
                    console.log('existingPerson', existingPerson)
                    console.log('newPerson', newPerson)
                    noteService
                        .update(existingPerson.id, newPerson)
                        .then(data => console.log('updated', data))
                    setPersons(newPersons.concat([newPerson]))
                    setColor('green')
                    setErrorMessage(`Information of ${newName} updated`)
                    setTimeout(() => setErrorMessage(null), 5000)
                })
                .catch(error => {
                    setColor('red')
                    setErrorMessage(`Information of ${newName} has already been removed from the server`)
                    setTimeout(()=>setErrorMessage(null),5000)
                })
            // window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
            // const existingPerson = persons.filter(p => p.name === newName)[0]
            // const newPersons = persons.filter(p => p.name !== newName)
            // const newPerson = {name:newName, number: newNumber, id: existingPerson.id}
            // console.log('existingPerson', existingPerson)
            // console.log('newPerson',newPerson)
            // noteService
            //     .update(existingPerson.id,newPerson)
            //     .then(data => console.log('updated',data ))
            // setPersons(newPersons.concat([newPerson]))
            setNewName('')
            setNewNumber('')
        }
        else{
            console.log('creating',)
            noteService
                .create(newName,newNumber)
                .then( data =>{
                    console.log('data',data)
                    setColor('green')
                    setErrorMessage(`Added ${newName}`)
                    console.log('error message',errorMessage)
                    setNewName('')
                    setNewNumber('')
                    setPersons(persons.concat([data]))
                    setTimeout(() => setErrorMessage(null),5000)
                    console.log('error message', errorMessage)
                })
                .catch(error => {console.log('fail',)
                })
        }
    }

    return (
        <div>
            {console.log('persons',persons)}
            <h2>Phonebook</h2>
            <Notification message={errorMessage} color={color}/>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
            
            <h3>add a new</h3>
            <PersonForm 
                handleSubmit = {handleSubmit}
                newName = {newName}
                handleInputChange = {handleInputChange}
                newNumber = {newNumber}
                handleNumberChange = {handleNumberChange}/>
                
            <h2>Numbers</h2>
            <Persons newFilter={newFilter} persons={persons} handleDeletion={handleDeletion} />
        </div>
    )
}

export default App
