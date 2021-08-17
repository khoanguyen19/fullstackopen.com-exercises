const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Content = (props) => {
  const parts = props.parts;
  const renderAssignment = parts.map((part, index) => {
    const { name, exercises } = part;
    return (
      <p key={index}>
        {name} {exercises}
      </p>
    )
  });
  return (
    <>
      {renderAssignment}
    </>
  )
}

const Footer = (props) => {
  const parts = props.parts;
  const totalExercises = parts.reduce((total, assignment) => {
    return total + assignment.exercises;
  }, 0);
  return (
    <p>
      Number of exercises {totalExercises}
    </p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]

  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Footer parts={course.parts}/>
    </div>
  )

}

export default App;
