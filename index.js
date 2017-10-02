const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const SessionStorage = require('./classes/SessionStorage')

sessions = {} // Holds one SessionStorage per test session
// Import api endpoint code from separate files
const getTest = require('./endpoints/getTest')
const submitTest = require('./endpoints/submitTest')
const createTest = require('./endpoints/createTest')
const createAccount = require('./endpoints/createAccount')
const login = require('./endpoints/login')
const getResults = require('./endpoints/getResults')

// Connecting to db
mongoose.connect('mongodb://localhost:27017/tests', {useMongoClient: true})

// Initialize app
const app = express()
const io = require('socket.io')(require('http').Server(app, 3001))
app.set('trust proxy', 'loopback')
app.use(bodyParser.json())

// Setting up endpoints
app.post('/api/getTest', getTest)
app.post('/api/submitTest', submitTest)
app.post('/api/createTest', createTest)
app.post('/api/createAccount', createAccount)
app.post('/api/login', login)
app.post('/api/getResults', getResults)
 
// Setting up WebSockets
io.on('connection', (socket) => {
	socket.emit('Hello World')
})

// Start node server on port 3000
app.listen(3000, () => {
	console.log("Listening");
})
