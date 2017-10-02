const jwt = require('jsonwebtoken')
const body = require('body-parser')

const secretKey = 'lahgjskdj12379198ghqoqwie081e3130rhew08djf48ha13486129346183764'
// ^ ultra secure xD

// JWT authentication check
const authenticate = (req) => {
	const {token} = req.body
	if (token) {
		let user
		try {
			user = jwt.verify(token, secretKey).email
		}
		catch (err) {
			return false
		}
		return user
	}
	return false
}

module.exports = authenticate
