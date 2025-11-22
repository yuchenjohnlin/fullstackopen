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
export default Phonebook