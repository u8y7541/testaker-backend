const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const SessionStorage = require('./classes/SessionStorage')
const Test = require('./models/Test')

sessions = {} // Holds one SessionStorage per test session
// Import api endpoint code from separate files
const getTest = require('./endpoints/getTest')
const submitTest = require('./endpoints/submitTest')
const createTest = require('./endpoints/createTest')
const createAccount = require('./endpoints/createAccount')
const login = require('./endpoints/login')

// Connecting to db
mongoose.connect('mongodb://localhost:27017/tests', {useMongoClient: true})

const app = express()
app.set('trust proxy', 'loopback')
app.use(bodyParser.json())

// Setting up endpoints
app.post('/getTest', getTest)
app.post('/submitTest', submitTest)
app.post('/createTest', createTest)
app.post('/createAccount', createAccount)
app.post('/login', login)
 
// Start node server on port 3000
app.listen(3000, function () {
	console.log("Listening");
})
