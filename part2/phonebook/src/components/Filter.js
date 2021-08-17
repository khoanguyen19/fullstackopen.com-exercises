import React from 'react'

const Filter = ({ filterName, setFilterName }) => {

  const handleFilterChange = (e) => {
    setFilterName(e.target.value);
  }

  return (
    <input value={filterName} onChange={handleFilterChange}/>
  )

}

export default Filter