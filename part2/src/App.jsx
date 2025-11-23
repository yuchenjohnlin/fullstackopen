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

  //Render phase (must be pure) ↓ Commit phase (update DOM) ↓ Effect phase (run useEffects)
  // Well useEffect is to not have side effects that would interfere with the render process although I can't picture what side effects are
  useEffect( () => {
    axios
      .get('http://localhost:3001/persons')      
      .then(response => {        
        console.log('promise fulfilled')        
        setPersons(response.data)      
      })
  }, [])  

  // if only 1 parameter then you can ignore the ()
  // arrows can implicit ignore returns
  const inputHandler = setter => event => {
  // const inputHandler = setter => {
    // return (event) => {
    // console.log(event.target.value)
    setter(event.target.value)
    // }
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
      number: newPhone,
      id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1
    }
    // setPersons(persons.concat(nameObj))
    console.log(persons) // this doesn't actually display the new one because it doesn't update automatically
    setName('')
    setPhone('')

    // have to add the new content to the backend
    // However, we shouldn't put effects in functions because hooks have to run on every render and functions are only activated sometimes
    // and thing is that React loses track of it and it breaks the order -> invalid hook call
    // it is because I copied that above in to this function, thinking that it might need it 
    // but hooks are for side Effects that should run because of rendering Not because of clicking a button 
    // Effects = things that reach outside of the React world:
    axios
      .post('http://localhost:3001/persons', nameObj)
      // I would have to wait for the response to get it (mostly because the id issue but here we actually defined the ids ourselves)
      .then(response => {
        // because it became a [] 
        setPersons(persons.concat(response.data) )
        console.log(response.data)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterNameChange={inputHandler(setFilterName)}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newPhone={newPhone} handleNameChange={inputHandler(setName)} handlePhoneChange={inputHandler(setPhone)} />
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={filterName} />
    </div>
  )
}

export default App