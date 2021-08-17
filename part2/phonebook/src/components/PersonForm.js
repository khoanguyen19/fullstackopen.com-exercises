import React, { useState } from 'react'
import personsServices from '../services/persons'

const PersonForm = ({persons, setPersons, setMessage, setStatus}) => {
    
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');

    const addPerson = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber
        }

        const foundObj = persons.find(person => person.name === newPerson.name);

        if(foundObj === undefined) {
            personsServices
                .create(newPerson)
                .then(person => {
                    setPersons(persons.concat(person));
                    setMessage(
                        `Added ${newPerson.name}`
                    )
                    setStatus('success')
                })
        } else {
            const result = window.confirm(`${foundObj.name} is already added to phonebook. Replace the old number with a new one?`);
            
            if(result) {
                const updatedPerson = {...foundObj, ...newPerson};
                const id = foundObj.id;

                personsServices
                    .update(id, updatedPerson)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
                        setMessage(
                            `Number of '${updatedPerson.name}' has been changed`
                        )
                        setStatus('warning')
                    })
                    .catch(err => {
                        setMessage(
                            `Information of ${updatedPerson.name}  ${id} has been removed from server`
                        )
                        setStatus('error')
                    })
                
            }
        }
        console.log(persons);

        setTimeout(() => {
            setMessage(null);
            setStatus('');
        }, 5000)

        setNewName('');
        setNewNumber('');
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    }
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm