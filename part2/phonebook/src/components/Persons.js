import React from 'react'
import personsServices from '../services/persons'

const Persons = ({ persons, setPersons, filterName }) => {

  const handleDeleteClick = (id, name) => {
    const result = window.confirm(`Delete ${name}`);
    if(result) {
      personsServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(err => {
          alert(`${name}' number was deleted`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const personsToShow = persons.filter(person => {
    const name = person.name.toUpperCase();
    return name.includes(filterName.toUpperCase());
  })

  return (
    <div>
      {personsToShow.map((person, index) => {
        return(
          <p key={index}>
            {person.name} {person.number}
            <button onClick={() => handleDeleteClick(person.id, person.name)}>Delete</button>
          </p>
        )
      })}
    </div>
  )
}

export default Persons