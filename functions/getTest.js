const mongoose = require('mongoose')
const Test = require('../models/Test')
const SessionStorage = require('../classes/SessionStorage')

const getTest = (req, res) => {
	console.log("Request for id: " + req.query.id)
	console.log("Name: " + req.query.name)
	console.log("IP: " + req.ip)
	console.log()

	Test.findOne({"testId": req.query.id},
		(err, test) => {
			if (err) {
				return handleError(err)
			}

			if (test === null) {
				res.send(" ") // Saving bandwidth
				return 
			}

			let response = test.test.map((question) =>
				{delete question.correctAnswer; return question})
			res.send(response)

			if (!(req.query.id in sessions)) {
				sessions[req.query.id] = new SessionStorage(req.query.id)
			}
			sessions[req.query.id].addEntry(req.query.name, req.ip)
		})
}

module.exports = getTest
