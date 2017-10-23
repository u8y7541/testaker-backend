const mongoose = require('mongoose')
const Score = require('../models/Score')
const Test = require('../models/Test')
const authenticate = require('../utils/authenticate')

// Get saved test results
const getResults = async (req, res) => {
	// Check if authorized

	let authorized = false
	const user = authenticate(req)
	let test = await Test.findOne({testId: req.query.id})

	// Check if test exists
	if (test==null) {
		res.send("Invalid test ID")
		return
	}

	authorized = (test.createdBy === user)
	if (!authorized) {
		res.send("Not authorized")
		return
	}

	// Get the scores
	let results = []
	Score.find({testId: req.query.id}, (err, scores) => {
		if (err) {
			return handleError(err)
		}

		// Check if there are no scores
		if (scores.length === 0) {
			res.send("No scores")
			return
		}

		// Remove IPs before sending
		results = scores.map((item) => {delete item.ip; return item})
		res.send(results)
	})
}

module.exports = getResults
