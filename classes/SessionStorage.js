// This is just an abstraction from a 2D array
class SessionStorage {
	constructor(testId) {
		this.testId = testId
		this.storage = [] 
	}
 
	addEntry(name, ip) {
		this.storage.push([name, ip])
	}

	// TODO: Make more efficient
	removeEntry(name, ip) {
		this.storage.splice(
			this.storage.map((item) => item[0] + item[1]).indexOf(name + ip),
		1)
	}

	// TODO: Make more efficient
	entryExists(name, ip) {
		return this.storage.find(
			(element) => (element.toString() === [name, ip].toString())
		)
	}
}

module.exports = SessionStorage
