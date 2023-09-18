const PersonForm=({addperson,newName,handleChange,newNumber,handlenumber})=>{
    return(
        <div>
            <form onSubmit={addperson}>
                <label>Enter Name</label><br/>
                <input value={newName} onChange={handleChange} />
                <br/><br/>
                <label>Enter Number</label><br/>
                <input placeholder="+2547xxxxxxxx" value={newNumber} onChange={handlenumber}/>
                <button type='submit'>Add Contact</button>

            </form>
        </div>
    )
}



export default PersonForm;