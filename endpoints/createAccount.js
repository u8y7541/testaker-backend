const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Creates a user account
const createAccount = (req, res) => {
	// Check if that user already exists
	let userExists = false
	User.findOne({email: req.body.email}, (err, user) => {
		if (user) {
			res.send("A user with that email already exists.")
			userExists = true

			// Logging
			console.log("Invalid account creation: ", req.body.email)
		}
	})

	if (userExists) {
		return
	}

	// Encrypt the password and save it
	const data = Object.assign({}, req.body)
	data.password = bcrypt.hashSync(data.password, 10)
	const user = new User(data)

	user.save().then(() => res.send("Ok"))

	// Logging
	console.log("Account created: ", req.body.email)
}

module.exports = createAccount
