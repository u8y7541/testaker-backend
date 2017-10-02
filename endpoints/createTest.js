const mongoose = require('mongoose')
const Test = require('../models/Test')
const authenticate = require('../utils/authenticate.js')

// Sets mongoose promises to the native ES6 promise to get rid of
// deprecation warnings
mongoose.Promise = global.Promise

// Function to create a test with questions and test ID given by the request
const create = async (req, res) => {
	const {id, test} = req.body
	// Check if a test with the same ID exists
	let ok = false // True if there's no test with the same ID
	await Test.findOne({"testId": id},
		(err, test1) => {
			if (err) {
				res.send("An error occurred.")
				return handleError(err)
			}

			if (test1 === null) {
				ok = true
				return
			}
		})

	// A test with that ID already exists
	if (!ok) {
		res.send("A test with that ID already exists.")
		return
	}

	const user = authenticate(req)
	console.log(user)

	// Create the test
	Test.create({test: JSON.parse(test), testId: id, createdBy: user},
		(err, test1) => {
			// Logging
			console.log("Saving test:")
			console.log(JSON.stringify(test1, null, 2))
			console.log("Test ID: " + id)
			console.log("Creator: " + user)

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
