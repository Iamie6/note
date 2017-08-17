const mongoose = require('mongoose')
mongoose.promise = require('bluebird')
const ArticalShema = require('../schema/artical')

const ArticalModel = mongoose.model('artical', ArticalShema)


module.exports = ArticalModel