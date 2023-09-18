const Filter = ({value,handleSearchChange}) =>{
    return(
        <div>
            <label>⚲ </label>
            <input placeholder="Search" value={value} onChange={handleSearchChange} />
            
        </div>
    )
}
export default Filter;