const mongoose = require('mongoose')
const Score = require('../models/Score')

// Get saved test results given 
const getResults = (req, res) => {
	let results = []
	Score.find({testId: req.query.id}, (err, scores) => {
		if (err) {
			return handleError(err)
		}

		// Check if there are no scores
		if (scores === []) {
			res.send("Invalid")
			return
		}

		// Remove IPs before sending
		results = scores.map((item) => {delete item.ip; return item})
		res.send(results)
	})
}

module.exports = getResults
