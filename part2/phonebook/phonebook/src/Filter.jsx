const Filter = ({value,handleSearchChange,filteredNames}) =>{
    return(
        <div>
            <input placeholder="search" value={value} onChange={handleSearchChange} />
            <ul>
           {filteredNames.map((person, index) => (
            <li key={index}>{person.content} {person.number}</li>
        ))}
      </ul>
        </div>
    )
}
export default Filter;