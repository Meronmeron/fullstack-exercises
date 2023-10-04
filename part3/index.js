const express = require('express')
const morgan = require('morgan')
const morganBody = require('morgan-body')
const app = express()

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
app.use(morgan('dev'));

morganBody(app, {
  noColors: true,  // Disable color coding
  stream: process.stdout,  // Output to the console
  logReqDateTime: false, // Disable logging request date and time
  logRequestBody: true,  // Enable logging of request body
});
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
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})