const mongoose = require('mongoose')

const Test = mongoose.model('Test', {
	test: Array,
	testId: String
}, 'tests')

// IMPORTANT: This model is not actually being used right now.
// It is there as documentation for the structure of a question object.
// I will probably actually implement the code using this model later.
const Question = mongoose.model('Question', {
	question: String,
	answerChoices: Array,
	correctAnswer: String,
	freeResponse: Boolean
})

module.exports = Test
