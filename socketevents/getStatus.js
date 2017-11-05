// Sends test status update to client after request
const getStatus = (socket) => {
	if (typeof user === 'undefined') {
		socket.emit('auth', 'Not authorized')
		return
	}
	if (!sessions.hasOwnProperty(testID)) {
		socket.emit('status', 'Test not being taken')
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
