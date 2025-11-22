// const Header = (props) => {
//   return <h1>{props.course}</h1>
// }

// Destructured version of Header component, which is equivalent to
// const course = props.course
const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = (props) => {
  return (
  <div>
    <p>{props.part1} {props.exercise1}</p>
    <p>{props.part2} {props.exercise2}</p>
    <p>{props.part3} {props.exercise3}</p>
  </div>
  )
};

const Total = ({ex1,ex2,ex3}) => { 
  <p>Number of exercises {ex1 + ex2 + ex3}</p>
};

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />

      <Content 
        part1={part1.name} exercise1={part1.exercises}
        part2={part2.name} exercise2={part2.exercises}
        part3={part3.name} exercise3={part3.exercises}
      />
      <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises} />
      
    </div>
  )
}

export default App