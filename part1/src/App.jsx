// const Header = (props) => {
//   return <h1>{props.course}</h1>
// }

// Destructured version of Header component, which is equivalent to
// const course = props.course
const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = ({parts}) => {
  console.log(parts)
  // const list = parts.map(value => <p>{value.name} {value.exercises}</p>)
  // console.log(list)

  // inline version is more idiomatic ? and because precomputed will require a key for each child element for the <p>
  return (
    <div>
      {parts.map(p => (
        <p key={p.name}>{p.name} {p.exercises}</p>
      ))}
      {/* {list} */}
    </div>
  )
};

const Total = ({parts}) => { 
  let sum = 0
  parts.forEach(p => {sum += p.exercises || 0})

  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
    
};

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  const list = parts.map(part => part.exercises)

  return (
    <div>
      <Header course={course} />

      <Content parts={parts}/>
      <Total parts={parts}  />
      
    </div>
  )
}

export default App