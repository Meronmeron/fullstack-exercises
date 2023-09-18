const Persons=({persons,setPersons,setSuccess})=>{
    const onDelete = (id) => {
        console.log("on delete")
        const person = persons.find(person => person.id === id)
        if (confirm(`Delete ${person.name} ?`)){
        personService
        .deletePerson(id)
        .then(
          response => {
            console.log(response)
            setSuccess(`${person.name} is removed from the db succesfully`)
            setPersons(persons.filter(person => person.id !== id))
            setTimeout(() => {
              setSuccess(null);
            }, 5000)
          }
        )
        .catch( 
          error => {
            setError(`Error removing ${person.name}`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          }
        )
        }
      }
    return(
        <div className="container">
            <ul>
                {
                    persons.map(person=>
                        <div>
                        <li key = {person.id} >{person.name} {person.number}</li> 
                        <button onClick = {() => onDelete(person.id)}>Delete</button>
                        </div>
                     )
                     }     
            </ul>
       

        </div>
    )
}

export default Persons;