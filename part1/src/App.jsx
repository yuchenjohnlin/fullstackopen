import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => {

  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const StatisticLine = ({text, number, unit}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{number} {unit}</td>
      </tr>
  )
}

const StatBlock = ({good, bad, neutral}) => {
  const all = good + bad + neutral
  if (all === 0 )
    return (
      <div>
        No feedback given
      </div>
    )
  
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" number={good} />
          <StatisticLine text="neutral" number={neutral} />
          <StatisticLine text="bad" number={bad} />
          <StatisticLine text="all" number={all} />
          <StatisticLine text="average" number={(good-bad) / all} />
          <StatisticLine text="positive" number={(good / all)*100} unit={'%'}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandler = (setter, value) => {
    const func = () => setter(value + 1)
    return func
  }
  // const clickHandler = (setter) => () => setter(prev => prev + 1)
  // This can be simplified to const makeClickHandler = (value, setter) => () => setter(value + 1)
  
  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={clickHandler(setGood, good)} text="good" />
      <Button handleClick={clickHandler(setNeutral, neutral)} text="neutral" />
      <Button handleClick={clickHandler(setBad, bad)} text="bad" />
      <Title text="statistics" />
      <StatBlock good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App