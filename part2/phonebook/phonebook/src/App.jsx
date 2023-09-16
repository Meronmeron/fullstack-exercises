import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('');


  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
   
  }
  const handlenumber = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const addperson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(newName, newNumber);
    const personObject = {
      content: newName,
      number: newNumber,
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }
    if (newName.trim() === '') {
      return;
    }

    if (persons.some((person) => person.content === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')  
  }

  
  
  const handleSearchChange = (event) => {
    const target = event.target.value 
    console.log(target)
    setSearchQuery(target)  
}

const filteredNames = persons.filter((person) =>
    person.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
 return (
    <div>
      <h2>Phonebook</h2>
      <Filter  value={searchQuery} handleSearchChange={handleSearchChange} filteredNames={filteredNames}/>
     <h3>Add a new</h3> 
     <PersonForm
     addperson={addperson}
     newName={newName}
     newNumber= {newNumber}
     handleChange={handleChange}
     handlenumber={handlenumber}/>
      <h2>Numbers</h2>
      <Persons
      newName={newName}
      newNumber={newNumber}
      />
    </div>
  )
}

export default App