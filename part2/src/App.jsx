import { useState , useEffect} from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import Phonebook from './components/Phonebook.jsx'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setName] = useState('')
  const [newPhone, setPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  // react uses null to not render 
  const [notification, setNotification] = useState({message: null, type: ''})

  //Render phase (must be pure) ↓ Commit phase (update DOM) ↓ Effect phase (run useEffects)
  // Well useEffect is to not have side effects that would interfere with the render process although I can't picture what side effects are
  useEffect( () => {
    personService
      .getAll()    
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

  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name} ?`))
      personService
        .del(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
  }
  const notifyUser = (text, type) => {
    setNotification({message: text, type: type})
      setTimeout(() => {
        setNotification({message: null, type: ''})
      }, 1500)   // disappear after 3 seconds
  }

  const addPerson = (event) => {
    // need to handle new id
    event.preventDefault()

    const nameObj = {
      name: newName,
      number: newPhone,
      // let server add the id
      // id: String (persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1 )
    }

    // if ( persons.some(person => person.name ===newName)){ some returns true false
    const existing = persons.find(p => p.name === newName)
    if( existing ){
      const confirm = window.confirm(`${newName} is already added to the phonebook - Replace the old number with the new one ?`)
      if(!confirm){
        return
      }
      else{
        // use put to update the phonenumber 
        const updatedPerson = {
          ...existing,
          number: newPhone
        }
        personService
          .update(existing.id, updatedPerson) // can't use nameObj here because the serverrecognizes that they are different so won't overwrite
          // I would have to wait for the response to get it (mostly because the id issue but here we actually defined the ids ourselves)
          .then(response => {
            // update via server not just the input user gave
            setPersons(persons.map(p =>
              p.id !== existing.id ? p : response.data
            ))
            console.log(response.data)
          }).catch(error => {
            notifyUser(`Information of ${updatedPerson.name} has already been removed from server`, 'error')
            setPersons(persons.filter(p => p.id !== updatedPerson.id))
          })

        notifyUser(`Updated ${updatedPerson.name}'s phone number to ${updatedPerson.number}`, 'success')
        return
      }
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
    personService
      .create(nameObj)
      // I would have to wait for the response to get it (mostly because the id issue but here we actually defined the ids ourselves)
      .then(response => {
        // because it became a [] 
        setPersons(persons.concat(response.data) )
        console.log(response.data)
        notifyUser(`Added ${newName}`, "success")
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterName={filterName} handleFilterNameChange={inputHandler(setFilterName)}/>
      <h2>add a new</h2>
      <PersonForm addName={addPerson} newName={newName} newPhone={newPhone} handleNameChange={inputHandler(setName)} handlePhoneChange={inputHandler(setPhone)} />
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={filterName} deletePerson={deletePerson}/>
    </div>
  )
}

export default App