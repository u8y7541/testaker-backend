const mongoose = require('mongoose')
const Test = require('../models/Test')
const authenticate = require('../utils/authenticate')

// Websocket event code for "auth" event
// Takes token and requested test ID and authorizes
const auth = async (socket, token, id) => {
	// Check if token is valid
	user = authenticate({body:{token}})
	if (!user) {
		socket.emit('auth', "Not authorized")
		return
	}

	// Check if user created the test
	let authorized = false;
	await Test.findOne({testId: id}, (err, test) => {
		// Handle errors
		if (err) {
			handleErrors()
		}
		// Check if test exists
		if (!test) {
			return
		}
		authorized = (test.createdBy === user)
	})

	if (!authorized) {
		socket.emit('auth', "Not authorized")
		user = false
		return
	}

	socket.emit('auth', "Authorized")
	testID = id;
	// Logging
	console.log('Websocket connection authorized:', user)
	console.log('Test ID:', id)
	console.log()
}

module.exports = auth
