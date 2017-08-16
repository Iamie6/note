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
const port = 11111
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
	console.log('adsf')
	const title = req.body.title
	const render = req.body.render
	const regExp = /<|>/g
	function replace(str){
		if(str == '<'){
			return '&lt;'
		}else if(str == '>'){
			return '&gt;'
		}
	}

	req.body.title = title.trim().replace(regExp, replace)
	req.body.render = render.trim()
	
	if(!title){
		return res.send({msg:'title is required',code:1})
	}
	if(!content){
		return res.send({msg:'content is required',code:1})
	}

	next()
}

//文章保存
app.post('/api/add/artical', checkArtical, (req,res) => {
	const title = req.body.title
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
			content: content,
			value: value
		}).save().then((art) => {
			res.send({msg:'ok',code:0,id:art._id})
		}).catch((err) =>{
			res.send({msg:err, code:1})
		})
	})
})

//文章跟新
app.post('/api/update/artical', checkArtical, (req,res) => {
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
})

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