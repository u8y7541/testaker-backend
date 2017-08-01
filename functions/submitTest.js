const mongoose = require('mongoose')
const Test = require('../models/Test')
const SessionStorage = require('../classes/SessionStorage')

const setTest = (req, res) => {
	// First check if the request is legit
	if (!(req.query.id in sessions) || 
		(req.query.answers === undefined) ||
		!(sessions[req.query.id].entryExists(req.query.name, req.ip))) {

		res.send(" ") // Saving bandwidth again
		return
	}

	sessions[req.query.id].removeEntry(req.query.name, req.ip)

	Test.findOne({"testId": req.query.id},
		(err, test) => {
			if (err) {
				return handleError(err)
			}

			let result = {}
			const answers = JSON.parse(req.query.answers)
			for ([i, question] of test.test.entries()) {
				if (question.freeResponse) {
					continue
				}
				result["q" + (i+1)] = (question.correctAnswer === answers[i])
			}
			res.send(result)
		})

	console.log("Test graded: " + req.query.id)
	console.log("Name: " + req.query.name)
	console.log("IP: " + req.ip)
	console.log()
}

module.exports = setTest
