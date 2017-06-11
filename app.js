const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const article = require('./models/article')
const port = process.env.PORT || 3000
const app = express()

mongoose.connect('mongodb://127.0.0.1/article')

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
	res.sendFile('list/list.html',{
	    root: __dirname + '/pages/',
	    dotfiles: 'deny',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
	    }
	})
})

app.get('/add',function(req,res){
	res.sendFile('add/add.html',{
	    root: __dirname + '/pages/',
	    dotfiles: 'deny',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
	    }
	})
})

app.get('/detail',function(req,res){
	res.sendFile('detail/detail.html',{
	    root: __dirname + '/pages/',
	    dotfiles: 'deny',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
	    }
	})
})

app.get('/list',function(req,res){
	res.sendFile('list/list.html',{
	    root: __dirname + '/pages/',
	    dotfiles: 'deny',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
	    }
	})
})

//文章列表接口
app.get('/lists',function(req,res){
	const pageNo = req.query.pageNo || 1
	const pageSize = req.query.pageSize || 20
	article.fetch(function(err,articles){
		res.send({
			meg:'ok',
			code: '0',
			totalPage:Math.ceil(articles.length/pageSize),
			data: articles.splice((pageNo-1)*pageSize,pageSize)
		})
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
		res.status(401).json({msg:'missing title',code:'1'})
	}else if(!req.body.content){
		res.status(400).send({msg:'missing content',code:'1'})
	}else{
		const art = new article({
			title: req.body.title,
			content: req.body.content,
			id:++id
		})
		art.save(function(err,article){
			if(err){console.log(err)}

			res.send({msg:'ok',code:'0',data:article.id})
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