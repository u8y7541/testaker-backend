const mongoose = require('mongoose')

// Model for a single student's score on a single test
const Score = mongoose.model('Score', {
	name: String,
	ip: String,
	result: Array,
	testId: String,
	timestamp: Date
}, 'scores')

module.exports = Score
