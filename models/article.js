const mongoose = require('mongoose')
const articleShema = require('../schemas/articles')
const Article = mongoose.model('Article',articleShema)

module.exports = Article
