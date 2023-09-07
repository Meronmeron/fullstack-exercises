const Course = (props) =>{
    const total = props.course.parts.reduce((s,p)=>{
      return p.exercises + p.exercises;
    })
  
    return (
      <div>
        <h1>{props.course.name}</h1>
        <ul>
          {props.course.parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
          
        </ul>
        <p>total of {total} exercises</p>
  
      </div>  
    )
  }

  export default Course;