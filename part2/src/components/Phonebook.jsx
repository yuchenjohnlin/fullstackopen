const Phonebook = ({persons, filter, deletePerson}) => {
    // if a person doesn't have a name (not inputed) then it cannopt do lowercase and will return error
    console.log("Persons", persons)
    console.log("filter", filter)
  const filterPersons = persons.filter(p => p.name && p.name.toLowerCase().startsWith(filter) )
    console.log("filterPersons", filterPersons)

  

  const list = filterPersons.map(
    person => 
    // we need to wrap the html like code with <></> (which is actually jx ? or something) so that babel can recognize and compile it
    <div key={person.id}>
      {person.name} {person.number}
      {/* // we don't use form for deleting because it doesn't need input data to send, it just needs to trigger
      // but then we wouldn't have it as type submit */}
      <button key={person.id} type="button" onClick={() => deletePerson(person)}>delete</button>
    </div> 
    )

  return (
    <div>
      {list}
    </div>
  )
}
export default Phonebook