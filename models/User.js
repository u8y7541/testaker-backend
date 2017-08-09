const mongoose = require('mongoose')

// Model of a user account
const User = mongoose.model('User', {
	email: String,
	password: String
}, 'users')

module.exports = User
