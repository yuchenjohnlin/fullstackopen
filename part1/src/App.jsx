import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => {

  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Statistics = ({text, number, unit}) => {
  return (
    <div>
      <p> 
        {text} {number} {unit}
      </p>
    </div>
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
  const all = good + bad + neutral
  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={clickHandler(setGood, good)} text="good" />
      <Button handleClick={clickHandler(setNeutral, neutral)} text="neutral" />
      <Button handleClick={clickHandler(setBad, bad)} text="bad" />
      <Title text="statistics" />
      <Statistics text="good" number={good} />
      <Statistics text="neutral" number={neutral} />
      <Statistics text="bad" number={bad} />
      <Statistics text="all" number={all} />
      <Statistics text="average" number={(good-bad) / all} />
      <Statistics text="positive" number={(good / all)*100} unit={'%'}/>
    </div>
  )
}

export default App