import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import personsServices from './services/persons'
import Notification from './components/Notification';
import './index.css'

const App = () => {

  const [ persons, setPersons ] = useState([]); 
  const [ filterName, setFilterName ] = useState('');
  const [ message, setMessage ] = useState(null);
  const [ status, setStatus ] = useState(null);

  useEffect(() => {
    personsServices
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message}
        status={status}
      />
      <Filter 
        filterName={filterName}
        setFilterName={setFilterName}
      />
      <h3>Add a new phonebook</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setStatus={setStatus}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        filterName={filterName}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App;
