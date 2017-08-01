mongoose = require('mongoose')
Test = require('./Test')

const create = async (req, res) => {
	// Check if a test with the same ID exists
	ok = false // True if there's no test with the same ID
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

	if (!ok) {
		res.send("A test with that ID already exists.")
		return
	}

	// Create the test
	Test.create({test: JSON.parse(req.query.test), testId: req.query.id},
		(err, test) => {
			console.log("Saving test:")
			console.log(JSON.stringify(test, null, 2))
			console.log("Test ID: " + req.query.id)
			if (err) {
				res.send("There was an error.")
				console.log("There was an error.")
				console.log()
				return handleError(err)
			}
			res.send("OK")
			console.log("No errors.")
			console.log()
		})
}

module.exports = create
