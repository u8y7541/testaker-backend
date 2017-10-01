const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const body = require('body-parser')
const User = require('../models/User')

const secretKey = 'lahgjskdj12379198ghqoqwie081e3130rhew08djf48ha13486129346183764'
// ^ ultra secure xD

// Logs in a user
const login = (req, res) => {
	const {email, password} = req.body
	let valid = false // whether login is valid or not
	User.findOne({'email': email}, (err, user) => {
		if (!user) {
			console.log("User not found, email: " + email)
			res.send("User not found")
			return;
		}
		if (err) {
			console.log(err)
			return;
		}

		valid = bcrypt.compareSync(password, user.password)

		// Send them the authentication token if it's valid
		if (valid) {
			const token = jwt.sign({id: user._id}, secretKey)
			res.send({token})

			// Logging
			console.log("User logged in: ", email)
		}
		else {
			res.send({token: "Invalid"})
			
			// Logging
			console.log("Invalid login: ", email)
			console.log("Password: ", password)
		}
	})
}

module.exports = login
