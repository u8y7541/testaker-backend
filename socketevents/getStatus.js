// Sends test status update to client after request
const getStatus = (socket) => {
	if (!user) {
		socket.emit('auth', 'Not authorized')
		return
	}
	socket.emit('status', 
		{
			taking: sessions[testID].storage, 
			finished: sessions[testID].removed
		}
	)
}

module.exports = getStatus
