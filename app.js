const express = require('express')
const path = require('path')
const fs = require('fs')
const ArticalModel = require('./db/model/artical')
const mongoose = require('mongoose')
mongoose.promise = require('bluebird')
const bodyParser = require('body-parser')

const multer = require('multer')
const picPath = 'imgdb'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, picPath)
    }
})

const upload = multer({storage: storage})

const app = express()
const port = 3000
let dbURL = 'mongodb://127.0.0.1/artical'

if(process.env.NODE_ENV == 'production'){
	dbURL = 'mongodb://127.0.0.1:12344/note'
}
mongoose.connect(dbURL,{useMongoClient:true})
app.listen(port)

app.use(express.static(path.join(__dirname)))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true ,limit:1000000}))

function checkArtical(req,res,next){
	const title = req.body.title
	const render = req.body.render
	const regExp = /(<)\s*(script|img|audio|video|iframe|frame)([^>]*src)([^>]*)(>)/g
	const regExpS = /(<)(\s*script[^>]*)(>)/g
	function replace(str,p1,p2,p3,p4,p5){
		const src = p4.substring(p4.lastIndexOf('.'), p4.length) 
		if(src.indexOf('.js') > -1){
			return '&lt;' + p2 + p3 + p4 + '&gt;'
		}else{
			return str
		}
	}
	function replaceS(str,p1,p2,p3){ 
		return '&lt;' + p2 + '&gt;'
	}

	req.body.title = title.trim()
	req.body.ctitle = title.trim().replace(regExp, replace)
	req.body.render = render.trim().replace(regExp, replace)
	
	if(!title){
		return res.send({msg:'title is required',code:1})
	}
	if(!render){
		return res.send({msg:'render is required',code:1})
	}

	next()
}

//文章保存
app.post('/api/add/artical', checkArtical, (req,res,next) => {
	const title = req.body.title
	const ctitle = req.body.ctitle
	const render = req.body.render
	const value = req.body.value
	const id = req.body.id

	if(!id){
		return next()
	}
	
	ArticalModel.findOne({_id:id})
		.then((art)=>{
			if(art){
				return ArticalModel.findOne({title: title})
			}else{
				res.send({msg:'没有这篇文章，无法更新',code:1})
			}
		}).then((art)=>{
			if(art && art._id != id){
				return res.send({msg:'文章标题被占用',code:1})
			}
			art.title = title
			art.ctitle = ctitle
			art.render = render
			art.value = value
			return art.save()
			
		}).then((raw,art) =>{
			res.send({msg:'更新成功',code:0})
		}).catch((err) => {
			res.send({msg:err,code:1})
		})
},(req,res) => {
	const title = req.body.title
	const ctitle = req.body.ctitle
	const render = req.body.render
	const value = req.body.value

	ArticalModel.findByTitle(title,(err,art) => {
		if(err){
			return res.send({msg:err,code:1})
		}

		if(art){
			return res.send({msg:'文章标题已存在',code: 1})
		}

		new ArticalModel({
			title: title,
			ctitle: ctitle,
			render: render,
			value: value
		}).save().then((art) => {
			res.send({msg:'ok',code:0,id:art._id})
		}).catch((err) =>{
			res.send({msg:err, code:1})
		})
	})
})

//文章跟新
/*app.post('/api/update/artical', checkArtical, (req,res) => {
	const title = req.body.title
	const render = req.body.render
	const value = req.body.value

	ArticalModel.findOne({title:title}).then((art) => {
		if(art){
			art.update({
				title: title,
				render: render,
				value: value
			}).then((raw,art) =>{
				res.send({msg:'更新成功',code:0})
			}).catch((err) => {
				res.send({msg:err,code:1})
			})
		}else{
			res.send({msg:'没有这篇文章，无法更新',code:1})
		}
	}).catch((err) => {
		res.send({msg:err,code:1})
	})
})*/

//文章列表
app.get('/api/list',(req,res)=>{
	ArticalModel.find().then((arts)=>{
		res.send({msg:'ok',code:0,data:arts})
	})
})

//文章详情
app.get('/api/detail/:id',(req,res)=>{
	const id = req.params.id
	ArticalModel.findOne({_id:id}).then((art)=>{
		res.send({msg:'ok',code:0,data:art})
	}).catch((err) => {
		res.send({msg:err,code:1})
	})
})

//文章删除
app.get('/api/delete/:id',(req,res)=>{
	const id = req.params.id
	ArticalModel.remove({_id:id}).then(()=>{
		res.send({msg:'ok',code:0})
	}).catch((err) => {
		res.send({msg:err,code:1})
	})
})

//图片上传
app.post('/api/upload/img', upload.single('pic') , (req,res)=>{
    const mimetype = req.file.mimetype.split('/')[1]
    const filename = req.file.filename 
    const destination = req.file.destination

    const oldpath = path.join(__dirname, destination, filename)
    const newFileName = filename + '.' + mimetype
    //改名
    fs.renameSync(oldpath, path.join(__dirname, destination, newFileName))
    
    res.send({msg:'ok',code:0, src: '/imgdb/' + newFileName ,name:req.file.originalname})
})