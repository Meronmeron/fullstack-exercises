import { useState } from 'react'
const Button = (props) =>{
  return (<button onClick={props.handleClick}>
    {props.text}
    </button>)
}
const StaticsLine=(props)=>{
  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Total</th>
            <th>Average</th>
            <th>Positive %</th>
          </tr>
        </thead>
        <tbody>
              <tr key={props.name}>
                <td>{props.name}</td>
                <td>{props.value}</td>
                <td>{props.good + props.bad + props.neutral}</td>
                <td>{props.good/3 + props.bad/3 + props.neutral/3}</td>
                <td>{props.good + props.neutral * 1/100} %</td>
              </tr>
         
        </tbody>
      </table>
    </div>
  )
}
// const Statstics = (props) =>{
  
//   return(
//     <div>
    

//     </div>
   
//       )
// };
const App = () => {
  // save clicks of each button to its own state
  const[good,setGood] = useState(0)
  const[neutral,setNeutral] = useState(0)
  const[bad,setBad] = useState(0)

 
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <h1>Statics</h1>
      
      {good || bad || neutral? (
      <div>
      <StaticsLine value={good} name='Good' good={good} bad={bad} neutral={neutral} /> 
      <StaticsLine value={bad} name='Bad' good={good} bad={bad} neutral={neutral} />
      <StaticsLine value={neutral} name='Neutral' good={good} bad={bad} neutral={neutral} />
      </div>
      ): (<h2>No feed backgiven</h2>) }
    </div>
  )
}


export default App