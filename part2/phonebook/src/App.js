import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'




const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])


    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

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

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(persons,newName)
        const nameObject = { name : newName, number: newNumber}
        console.log(persons.includes( nameObject))
        const idx = persons.map(person=>person.name).includes(newName)
        idx  
            ? window.alert(`${newName} is already added to phonebook`)
            : setPersons(persons.concat(nameObject))  
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
            
            <h3>add a new</h3>
            <PersonForm 
                handleSubmit = {handleSubmit}
                newName = {newName}
                handleInputChange = {handleInputChange}
                newNumber = {newNumber}
                handleNumberChange = {handleNumberChange}/>
                
            <h2>Numbers</h2>
            <Persons newFilter={newFilter} persons={persons} />
        </div>
    )
}

export default App
