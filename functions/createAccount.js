const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const body = require('body-parser')
const User = require('../models/User')
const mongoose = require('mongoose')

// Creates a user account
const createAccount = (req, res) => {
	const data = Object.assign({}, req.body)
	data.password = bcrypt.hashSync(data.password, 10)
	const user = new User(data)

	user.save().then(() => res.send("Ok"))
}

module.exports = createAccount
