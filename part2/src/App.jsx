import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '000000000' }
  ]) 
  const [newName, setName] = useState('')
  const [newPhone, setPhone] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setPhone(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if ( persons.some(person => person.name ===newName)){
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const nameObj = {
      name: newName,
      phone: newPhone
    }
    setPersons(persons.concat(nameObj))
    console.log(persons) // this doesn't actually display the new one because it doesn't update automatically
    setName('')
    setPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          phone number: <input value={newPhone} onChange={handlePhoneChange}/>
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