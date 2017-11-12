const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

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
app.options('*', cors())
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
const fs = require('fs')
const https = require('https')
const server = https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/www.testaker.com/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/www.testaker.com/cert.pem'),
}, app)
const io = require('socket.io')(server)
server.listen(3001)

// Import websocket events
const auth = require('./socketevents/auth')
const getStatus = require('./socketevents/getStatus')

io.on('connection', (socket) => {
	console.log('Someone connected')
	console.log()
	
	let user = false
	let testID = null
	socket.on('auth', (...args) => auth(socket, ...args))
	socket.on('status', (...args) => getStatus(socket, ...args))
})

// Start node server on port 3000
app.listen(3000, () => {
	console.log("Listening");
})
