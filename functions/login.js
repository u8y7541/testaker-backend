const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const body = require('body-parser')
const User = require('../models/User')
const mongoose = require('mongoose')

const secretKey = 'lahgjskdj12379198ghqoqwie081e3130rhew08djf48ha13486129346183764'
// ^ ultra secure xD

// Logs in a user
const login = (req, res) => {
	const {email, password} = req.body
	const valid = false // whether login is valid or not
	User.findOne({email}, (err, user) => {
		valid = bcrypt.compareSync(password, user.password)

		if (valid) {
			const token = jwt.sign({id: user._id}, secretKey)
			res.send({token})
		}
		else {
			res.send("Invalid")
		}
	})
}

module.exports = login
