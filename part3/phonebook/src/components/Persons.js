import React from 'react'

const Number = ({ person , handleDeletion}) => {
    const {name,number,id} = person
    return (
        <li>{name} {number}<button onClick={()=> handleDeletion(id)}>delete</button></li>
    )
}


const Persons = ({ newFilter, persons, handleDeletion }) => {
    const personsToShow =
        (newFilter.length === 0)
            ? persons
            : persons.filter(person => person.name.toLowerCase().slice(0, newFilter.length) === newFilter)

    return(
        <div>
            <ul>
                {personsToShow.map(person =>{
                    return(
                        <>
                        <Number key={person.name} person={person} handleDeletion={handleDeletion} />
                        </>)
                    })
                }

            </ul>
        </div>
    )
}

export default Persons