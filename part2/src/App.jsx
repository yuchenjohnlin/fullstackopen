import { useState } from 'react'

const Phonebook = ({persons, filter}) => {
  const filterPersons = persons.filter(p => p.name.toLowerCase().startsWith(filter) )
  console.log(filterPersons)
  const list = filterPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)

  return (
    <div>
      {list}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setName] = useState('')
  const [newPhone, setPhone] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setPhone(event.target.value)
  }
  const handleFilterNameChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
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
        <div>
          name: <input value={filterName} onChange={handleFilterNameChange}/>
        </div>
      <h2>add a new</h2>
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
      <Phonebook persons={persons} filter={filterName} />
    </div>
  )
}

export default App