import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => {

  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Statistics = ({text, number}) => {
  return (
    <div>
      <p> 
        {text} {number}
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
  // This can be simplified to const makeClickHandler = (value, setter) => () => setter(value + 1)

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={clickHandler(good, setGood)} text="good" />
      <Button handleClick={clickHandler(neutral, setNeutral)} text="neutral" />
      <Button handleClick={clickHandler(bad, setBad)} text="bad" />
      <Title text="statistics" />
      <Statistics text="good" number={good} />
      <Statistics text="neutral" number={neutral} />
      <Statistics text="bad" number={bad} />
    </div>
  )
}

export default App