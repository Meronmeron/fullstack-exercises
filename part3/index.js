require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))


let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello there</h1>')
  
})
app.get('/info',(request, response) =>{
  const date= new Date().toLocaleString()
  response.send(`<p>Phone book has info for 2 people</p> <p>${date}</p>`)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  if (!request.body || Object.keys(request.body).length === 0) {
    return response.status(400).json({ 
      error: 'Empty request body' 
    });
  }

  try {
    const body = JSON.parse(request.body);

    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'Content missing' 
      });
    }

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,  
    }

    persons = persons.concat(person);

    response.json(person);
  } catch (error) {
    return response.status(400).json({ 
      error: 'Invalid JSON format' 
    });
  }
});
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name ==='CastError'){
      return res.status(400).send({error: 'malformatted id'})
  } else if (error.name ==='ValidationError'){
      return res.status(400).send({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const unknownEndPoint = (req, res) => {
  res.status(500).json({error: 'Something went wrong'})
}

app.use(unknownEndPoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})