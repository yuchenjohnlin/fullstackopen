const Phonebook = ({persons, filter}) => {
    // if a person doesn't have a name (not inputed) then it cannopt do lowercase and will return error
    console.log("Persons", persons)
    console.log("filter", filter)
  const filterPersons = persons.filter(p => p.name && p.name.toLowerCase().startsWith(filter) )
    console.log("filterPersons", filterPersons)
  const list = filterPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)

  return (
    <div>
      {list}
    </div>
  )
}
export default Phonebook