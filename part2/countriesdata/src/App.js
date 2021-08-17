import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country'

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ filterCountry, setFilterCountry ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const handleInputChange = (e) => {
    setFilterCountry(e.target.value)
  }

  return (
    <div>
      <span>Find countries</span>
      <input value={filterCountry} onChange={handleInputChange}/>
      <Country 
        countries={countries}
        filterCountry={filterCountry}
        setFilterCountry={setFilterCountry}
      />
    </div>
  )
}  

export default App;
