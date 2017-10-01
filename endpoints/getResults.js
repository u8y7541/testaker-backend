const mongoose = require('mongoose')
const Score = require('../models/Score')

// Get saved test results given 
const getResults = (req, res) => {
	let results = []
	Score.find({testId: req.query.id}, (err, scores) => {
		if (err) {
			return handleError(err)
		}

		if (scores === []) {
			res.send("Invalid")
			return
		}

		results = scores.map((item) => {delete item.ip; return item})
	})

	(results !== []) ? res.send(results):null
}

module.exports = getResults
