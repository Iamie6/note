const mongoose = require('mongoose')
mongoose.promise = require('bluebird')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

const ArticalSchema = new Schema({
	title:String,
	render: String,
	ctitle:String,
	value:String,
	user:{
		type:String,
		default:''
	},
	meta:{
		created:{
			type:Number,
			default: Date.now()
		},
		updated:{
			type:Number,
			default: Date.now()
		}
	}
})

ArticalSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.updated = this.meta.created = Date.now()
	}else{
		this.meta.updated = Date.now()
	}
	next()
})

ArticalSchema.pre('update',function(next){
	this.meta.updated = Date.now()
	next()
})

ArticalSchema.static("findByTitle",function(title, cb){
	return this.findOne({title:title}).exec(cb)
})

module.exports = ArticalSchema