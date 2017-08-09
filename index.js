const express = require('express')
const mongoose = require('mongoose')
const SessionStorage = require('./classes/SessionStorage')
const Test = require('./models/Test')

sessions = {} // Holds one SessionStorage per test session
// Import api endpoint code from separate files
const getTest = require('./functions/getTest')
const submitTest = require('./functions/submitTest')
const createTest = require('./functions/createTest')
const createAccount = require('./functions/createAccount')
const login = require('./functions/login')

// Connecting to db
mongoose.connect('mongodb://localhost:27017/tests', {useMongoClient: true})

const app = express()
app.set('trust proxy', 'loopback')

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
