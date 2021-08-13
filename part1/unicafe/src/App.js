import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, sum }) => {
  if(sum > 0) {
    return (
      <table>
        <StatisticsLine text='Good' value={good}/>
        <StatisticsLine text='Neutral' value={neutral}/>
        <StatisticsLine text='Bad' value={bad}/>
        <StatisticsLine text='All' value={sum}/>
        <StatisticsLine text='Average' value={(good - bad) / sum}/>
        <StatisticsLine text='Positive' value={good / sum * 100 + '%'}/>
      </table>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const App = () => {

  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);
  const [ sum, setSum ] = useState(good + bad + neutral);

  const handleClick = ( setValue, newValue ) => () => {
    setValue(newValue);
    setSum(sum + 1);
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button 
        onClick={handleClick( setGood, good + 1)} 
        text='Good'
      />
      <Button 
        onClick={handleClick( setNeutral, neutral + 1)} 
        text='Neutral'
      />
      <Button 
        onClick={handleClick( setBad, bad + 1)} 
        text='Bad'
      />
      <h2>Statistics</h2>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        sum={sum}
      />
    </div>

  )

}

export default App;
