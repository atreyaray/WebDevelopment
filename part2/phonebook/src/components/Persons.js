import React from 'react'

const Number = ({ name, number }) => {
    return (
        <li>{name} {number}</li>
    )
}


const Persons = ({ newFilter, persons }) => {
    const personsToShow =
        (newFilter.length === 0)
            ? persons
            : persons.filter(person => person.name.toLowerCase().slice(0, newFilter.length) === newFilter)

    return(
        <div>
            <ul>
                {console.log(newFilter, newFilter.length - 1)}
                {console.log(persons.map(person => person.name.toLowerCase().slice(0, newFilter.length)))}
                {personsToShow.map(person =>
                    <Number key={person.name} name={person.name} number={person.number} />)}
            </ul>
        </div>
    )
}

export default Persons