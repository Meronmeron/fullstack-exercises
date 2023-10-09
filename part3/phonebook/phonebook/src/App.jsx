import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import  personService from './services/persons'
import Notification from './component/Notification'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [successMessage,setSuccess] = useState(null) 
  const [errorMessage,setError] = useState(null) 
  useEffect(() => {
    personService
    .getAll()
    .then(initialpersons=>{setPersons(initialpersons)})
  }, [])

  const addperson = (event) => {
    event.preventDefault()
    // console.log(event.target)
    // console.log(persons, newName)
    const person = persons.find(person => person.name === newName)
    if (person){
      if (!confirm(`${person.name} is already added to phonebook, replace the old number with a new one`)){
        return
      }
      const id = person.id
      personService 
      .update(person, newNumber)
      .then(
        returnedResult => {
          setSuccess(`phone number of ${person.name} is updated succesfully`)
          setPersons(
            persons
            .map(
              p => p.id != id ? p : returnedResult
              )
            )
          setTimeout(() => {
            setSuccess(null)
          }, 5000)
        } 
      )
      .catch(error => {
          setError(`The data of '${person.name}' is already removed from server`)
          setTimeout(() => {
            setError(null)
          }, 5000)
          setPersons(persons.filter(p => p.id != person.id))
        }
      )
    } else{
      const newPerson = {name: newName, number: newNumber}
      // console.log("newPerson:",newPerson)
      personService 
      .create(newPerson) 
      .then( 
        returnedResult => {
          // console.log('returned',returnedResult)
          setSuccess(`${newName} is added succesfully`)
          setPersons(persons.concat(returnedResult))
          setTimeout(() => {
            setSuccess(null)
          }, 5000)
        }
      )
      .catch( 
        error => {
          setError(`Error creating ${newName}`)
          setTimeout(() => {
            setError(null)
          }, 5000)
        }
      )
    }
  }

  const handleChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
   
  }
  const handlenumber = (event) =>{
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  // const addperson = (event) => {
  //   event.preventDefault()
  //   console.log('button clicked', event.target)
  //   console.log(newName, newNumber);
  //   const personObject = {
  //     content: newName,
  //     number: newNumber,
  //     important: Math.random() < 0.5,
  //     id: persons.length + 1,
  //   }
  //   if (newName.trim() === '') {
  //     return;
  //   }

  //   if (persons.some((person) => person.content === newName)) {
  //     alert(`${newName} is already added to phonebook`);
  //     return;
  //   }
    
  //   setPersons(persons.concat(personObject))
  //   setNewName('')
  //   setNewNumber('')  
  // }

  
  
  const handleSearchChange = (event) => {
    const target = event.target.value 
    // console.log(target)
    setSearchQuery(target)  
}
console.log(persons)
const length = searchQuery.length
  const personsToShow = length != 0 
    ? persons.filter(person => person.name.slice(0, length).toLowerCase() === searchQuery.toLowerCase()) 
    : persons; 
// const filteredNames = persons.filter((person) =>
//   person.content.toLowerCase().includes(searchQuery?.toLowerCase() || '')
// ); filter component filteredNames={filteredNames}

 return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {errorMessage} isSuccess = {false}/>
      <Filter  value={searchQuery} handleSearchChange={handleSearchChange} />
      <Notification message = {successMessage} isSuccess = {true}/>

     <h3>Add a new</h3> 
     <PersonForm
     addperson={addperson}
     newName={newName}
     newNumber= {newNumber}
     handleChange={handleChange}
     handlenumber={handlenumber}/>
      <h2>Numbers</h2>
      <Persons
      persons={personsToShow}
      setPersons={setPersons} 
      setSuccess={setSuccess}
      />
    </div>
  )
}

export default App