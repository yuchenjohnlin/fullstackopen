import { useState , useEffect} from 'react'
import axios from 'axios'
import PersonForm from './PersonForm.jsx'
import Filter from './Filter.jsx'
import Phonebook from './Phonebook.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setName] = useState('')
  const [newPhone, setPhone] = useState('')
  const [filterName, setFilterName] = useState('')


  useEffect( () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')      
      .then(response => {        
        console.log('promise fulfilled')        
        setPersons(response.data)      
      })
  }, [])  
  console.log('render', persons.length, 'persons')


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
    // need to handle new id
    event.preventDefault()
    console.log('button clicked', event.target)
    if ( persons.some(person => person.name ===newName)){
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const nameObj = {
      name: newName,
      phone: newPhone,
      id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1
    }
    setPersons(persons.concat(nameObj))
    console.log(persons) // this doesn't actually display the new one because it doesn't update automatically
    setName('')
    setPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={filterName} />
    </div>
  )
}

export default App