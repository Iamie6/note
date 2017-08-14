let contact = require('./dbs/contact')
let notice = require('./dbs/notice')
let gome_header = require('./dbs/gome-header')
let approve = require('./dbs/approve')
module.exports = function() {
	let res = Object.assign(contact, notice, gome_header, approve)
	return res
}