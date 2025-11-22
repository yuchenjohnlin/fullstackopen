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
  const list = parts.map(value => <p key={value.id}>{value.name} {value.exercises}</p>)
  // console.log(list)
  
  // inline version is more idiomatic ? 
  // because precomputed will require a key for each child element for the <p>
  return (
    <div>
      {/* {parts.map(value => <p key={value.id}>{value.name} {value.exercises}</p>)} */}
      {list}
    </div>
  )
};

const Total = ({parts}) => { 
  // let sum = 0
  // parts.forEach(p => {sum += p.exercises || 0})

  // we don't need return because whatever is after => is automatically returned - implicit return
  let sum = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <b>total of {sum} exercises</b>
    </div>
  )
    
};
const Course = ({course}) => {

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}  />
    </>
  )
}

export default Course