import Part from "./Part"
const Content =()=>{
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
    return(
        <div>
        <Part part1={course.parts[0].name} exercises1={course.parts[0].exercises} />
        <Part part2={course.parts[1].name} exercises2={course.parts[1].exercises} />
        <Part part3={course.parts[2].name} exercises3={course.parts[2].exercises} />

        </div>
    )
}
export default Content;
