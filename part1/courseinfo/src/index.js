import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return (

    <p>
      {props.p} {props.ex}
    </p>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course_name}</h1>
    </>
  )
}

const Content = (props) => {
  const [first, second, third] = props.parts
  console.log(first)
  return (
    <div>
      <Part p={first.name} ex={first.exercises} />
      <Part p={second.name} ex={second.exercises} />
      <Part p={third.name} ex={third.exercises} />
    </div>
  )
}

const Total = (props) => {
  const [first, second, third] = props.parts
  return (
    <>
      <p>Number of exercises {first.exercises + second.exercises + third.exercises}</p>
    </>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course_name={course.name} />
      <Content parts={course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
