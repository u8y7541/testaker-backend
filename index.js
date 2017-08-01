const express = require('express')
const mongoose = require('mongoose')
const SessionStorage = require('./SessionStorage')
const Test = require('./Test')

sessions = {} // Holds one SessionStorage per test session
const getTest = require('./getTest')
const submitTest = require('./submitTest')
const createTest = require('./createTest')

mongoose.connect('mongodb://localhost:27017/tests')

const app = express()

app.post('/getTest', getTest)

app.post('/submitTest', submitTest)

app.post('/createTest', createTest)
 
app.listen(3000, function () {
	console.log("Listening");
})
