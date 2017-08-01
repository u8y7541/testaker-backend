const express = require('express')
const mongoose = require('mongoose')
const SessionStorage = require('./classes/SessionStorage')
const Test = require('./models/Test')

sessions = {} // Holds one SessionStorage per test session
const getTest = require('./functions/getTest')
const submitTest = require('./functions/submitTest')
const createTest = require('./functions/createTest')

mongoose.connect('mongodb://localhost:27017/tests', {useMongoClient: true})

const app = express()

app.post('/getTest', getTest)

app.post('/submitTest', submitTest)

app.post('/createTest', createTest)
 
app.listen(3000, function () {
	console.log("Listening");
})
