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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />

      <Content 
        part1={part1} exercise1={exercises1}
        part2={part2} exercise2={exercises2}
        part3={part3} exercise3={exercises3}
      />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
      
    </div>
  )
}

export default App