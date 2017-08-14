const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const article = require('./models/article')
const crypto = require('crypto')
const port = process.env.PORT || 3000
const app = express()
const env = process.env.NODE_ENV || "development"
let dbUrl = 'mongodb://127.0.0.1:12344/article'

if(env === 'development'){
	dbUrl = 'mongodb://127.0.0.1/article'
}

mongoose.connect(dbUrl)

app.listen(port)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,'pages/')))
console.log('server stared on port'+port)

let id = 0
if(id == 0){
	article.sortById(function(err,articles){
		if(articles.length>0){
			id = articles[0].id
		}
	})
}

app.get('/',function(req,res){
	console.log('ok')
	res.sendFile('list/list.html',{
	    root: __dirname + '/pages/'
	})
})
//test 创建文件
app.get('/create/:name',function(req,res){
	console.log('ok')
	const name = req.params.name;
	
	res.send({msg:'ok'})
})


//文章列表接口
app.get('/lists',function(req,res){
	const pageNo = req.query.pageNo || 1
	const pageSize = req.query.pageSize || 20
	article.fetch(function(err,articles){
		console.log(articles)
		if(articles.length == 0){
			res.send({
				meg:'ok',
				code: '0',
				totalPage:1,
				data: []
			})
		}else{
			res.send({
				meg:'ok',
				code: '0',
				totalPage:Math.ceil(articles.length/pageSize),
				data: articles.splice((pageNo-1)*pageSize,pageSize)
			})
		}
	})
})

//文章详情接口
app.get('/details',function(req,res){
	const id = req.query.id

	article.findById(id,function(err,article){
		if(err){
			console.log(err)
		}
		console.log(article)
		res.send({
			meg:'ok',
			code: '0',
			data:article
		})
	})
})
//添加文章接口
app.post('/add',function(req,res){
	console.log(req.body)
	if(!req.body.title){
		res.json({msg:'missing title',code:'1'})
	}else if(!req.body.content){
		res.json({msg:'missing content',code:'2'})
	}else{
		const hash = crypto.createHmac('sha256', req.body.title).digest('hex');
		article.findByKey(hash,function(err,art){
			if(err){
				console.log(err)
			}
			console.log(art)
			if(art == null){
				new article({
					title: req.body.title,
					content: req.body.content,
					id:++id,
					hash: hash
				}).save(function(err,article){
					if(err){console.log(err)}
					res.send({msg:'ok',code:'0',data:article})
				})
			}else{
				res.send({msg:'文章标题已存在',code:'3',data:article})
			}
		})
	}
})
//删除文章接口
app.delete('/admin/remove',function(req,res){
	const id = req.query.id
	article.remove({id:id},function(err,article){
		if(err){console.log(err)}
		res.send({msg:'ok',code:'0'})
	})
})