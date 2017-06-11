const mongoose = require('mongoose')
const articleSchema = new mongoose.Schema({
	title:String,
	content:String,
	id:{
		type:Number,
		default:0
	},
	data:{
		createAt:{
			type:Date,
			default: +Date.now()
		}
	}
})

articleSchema.pre('save',function(next){
	if(this.isNew){
		this.data.createAt = +Date.now()
	}
	next()
})

articleSchema.statics = {
	fetch: function(cb){
		return this.find()
			.sort("data.createAt")
			.exec(cb)
	},
	sortById: function(cb){
		return this.find()
			.sort({id:'-1'})
			.exec(cb)
	},
	findById: function(id,cb){
		return this
			.findOne({id:id})
			.exec(cb)
	}
}
module.exports = articleSchema






