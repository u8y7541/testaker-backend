const mongoose = require('mongoose')
const Test = require('../models/Test')
const SessionStorage = require('../classes/SessionStorage')

// Function to get a test from the database and send it back to the client
const getTest = (req, res) => {
	// Logging
	console.log("Request for id: " + req.query.id)
	console.log("Name: " + req.query.name)
	console.log("IP: " + req.ip)
	console.log()

	// Find the test, there should only be one test with the required id
	Test.findOne({"testId": req.query.id},
		(err, test) => {
			if (err) {
				return handleError(err)
			}

			// Check if test doesn't exist
			if (test === null) {
				res.send(" ") // Saving bandwidth
				return 
			}

			// Remove correct answers from test before sending
			let response = test.test.map((question) =>
				{delete question.correctAnswer; return question})
			// Send the test
			res.send(response)

			// Add the test taker to the SessionStorage for the test session; create
			// the SessionStorage if it doesn't exist yet
			if (!(req.query.id in sessions)) {
				sessions[req.query.id] = new SessionStorage(req.query.id)
			}
			sessions[req.query.id].addEntry(req.query.name, req.ip)
		})
}

module.exports = getTest
