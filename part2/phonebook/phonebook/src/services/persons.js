import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
const deleteperson = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
  const update = (person, newNumber) => {
    const updateUrl = `${baseUrl}/${person.id}`
    const newObject = {...person, number: newNumber}

    const request = axios.put(updateUrl, newObject)
    return request.then(response => response.data)
}
  

export default { getAll,create,update,deleteperson } 

