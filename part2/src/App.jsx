import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if ( persons.some(person => person.name ===newName)){
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const nameObj = {
      name: newName
    }
    setPersons(persons.concat(nameObj))
    // console.log(persons) this doesn't actually display the new one because it doesn't update automatically
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App