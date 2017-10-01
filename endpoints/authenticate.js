const jwt = require('jsonwebtoken')
const body = require('body-parser')

const secretKey = 'lahgjskdj12379198ghqoqwie081e3130rhew08djf48ha13486129346183764'
// ^ ultra secure xD

// JWT authentication check
const authenticate = (req) => {
	const token = req.get('Token')
	if (token) {
		try {
			const user = jwt.verify(token, secretKey)
		}
		catch {
			return false
		}
		return user
	}
	return false
}
