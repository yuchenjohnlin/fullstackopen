import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => {

  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const setRandom = (setter, length, previous) => () => {
  let random = Math.floor(Math.random()*length) 
  console.log(random)
  while(random === previous){
    random = Math.floor(Math.random()*length)
    console.log(random)
  }
  setter( random)
}

const AnectodeDisplay = ({anecdotes, votes, index}) => {

  return (
    <>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index]} votes</p>
    </>
  )
} 


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
   
  const [selected, setSelected] = useState(0)
  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log(copy)
  }

  // Math.max doesn't accept arrays, it accepts individual numbers so use ...vote
  const maxIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Title text="Anecdote of the day"/>
      
      <AnectodeDisplay anecdotes={anecdotes} votes={votes} index={selected}/>
      <div>
        <Button handleClick={setRandom(setSelected, anecdotes.length, selected)} text={"next anectode"}/>
        <Button handleClick={setRandom(addVote, votes.length)} text={"vote"}/>
      </div>
      <Title text="Anecdote with most votes"/>
      <AnectodeDisplay anecdotes={anecdotes} votes={votes} index={maxIndex}/>



    </div>
  )
}

export default App