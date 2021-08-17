import React from 'react'

const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  const renderParts = parts.map(part => {
    return (
      <Part key={part.id} part={part}/>
    )
  });
  
  return (
    <>
      {renderParts}
    </>
  )
}

const Footer = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0)

  return (
    <>
      <h4>Total of {totalExercises} exercises</h4>
    </>
  )
}

const Courses = ({ courses }) => {
  const renderCourses = courses.map(course => {
    return (
      <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Footer parts={course.parts}/>
      </>
    )
  })

  return (
    <div>
      {renderCourses}
    </div>
  )
}

export default Courses