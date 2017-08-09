const mongoose = require('mongoose')
const Test = require('../models/Test')
const SessionStorage = require('../classes/SessionStorage')

// Function to take submitted responses, grade them, and send back result
const setTest = (req, res) => {
	// First check if the request is legit
	if (!(req.query.id in sessions) || 
		(req.query.answers === undefined) ||
		!(sessions[req.query.id].entryExists(req.query.name, req.ip))) {

		res.send(" ") // Saving bandwidth again
		return
	}

	// Remove test taker from the SessionStorage
	sessions[req.query.id].removeEntry(req.query.name, req.ip)

	// Find the answer key, there should be only one with the required id
	Test.findOne({"testId": req.query.id},
		(err, test) => {
			if (err) {
				return handleError(err)
			}

			// Grade the test
			let result = {}
			const answers = JSON.parse(req.query.answers)
			for ([i, question] of test.test.entries()) {
				if (question.freeResponse) {
					continue
				}
				result["q" + (i+1)] = (question.correctAnswer === answers[i])
			}
			// Send the result
			res.send(result)
		})

	// Logging
	console.log("Test graded: " + req.query.id)
	console.log("Name: " + req.query.name)
	console.log("IP: " + req.ip)
	console.log()
}

module.exports = setTest