mongoose = require('mongoose')
Test = require('../models/Test')

// Sets mongoose promises to the native ES6 promise to get rid of
// deprecation warnings
mongoose.Promise = global.Promise

// Function to create a test with questions and test ID given by the request
const create = async (req, res) => {
	// Check if a test with the same ID exists
	let ok = false // True if there's no test with the same ID
	await Test.findOne({"testId": req.query.id},
		(err, test) => {
			if (err) {
				res.send("An error occurred.")
				return handleError(err)
			}

			if (test === null) {
				ok = true
				return
			}
		})

	// A test with that ID already exists
	if (!ok) {
		res.send("A test with that ID already exists.")
		return
	}

	// Create the test
	Test.create({test: JSON.parse(req.query.test), testId: req.query.id},
		(err, test) => {
			// Logging
			console.log("Saving test:")
			console.log(JSON.stringify(test, null, 2))
			console.log("Test ID: " + req.query.id)

			// Handle errors with creating the test
			if (err) {
				res.send("There was an error.")
				console.log("There was an error.")
				console.log()
				return handleError(err)
			}

			res.send("OK")
			// Logging again
			console.log("No errors.")
			console.log()
		})
}

module.exports = create
