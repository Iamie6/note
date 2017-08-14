const path = require('path')
const config = require('./config')
const jsonServer = require('json-server')
const dbfile = require(config.DB_FILE)
const rules = require('./routes')
const bodyParser = require('body-parser')
const superagent = require('superagent')
const url = require('url')

const ip = config.SERVER
const port = config.PORT

const server = jsonServer.create()
const router = jsonServer.router(dbfile())
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
	extended: false
}))



/*
server.use((req, res, next) => {
	res.header('X-Hello', 'World')
	next()
})
*/

/*
const rewriteParams = require('./rewriteParams')
server.use((req, res , next) => {
	let method = req.method.toLowerCase()
	let obj = rewriteParams(req)
	if(method === 'get') {
		let search = ''
		for(let key in obj) {
			search += `&${key}=${obj[key]}`
		}
		req.originalUrl = encodeURI(req.path + '?' + search.slice(1))
	} else if(method === 'post') {
		req.body.params = obj
	}
	next()
})
*/

server.use(middlewares)

/*
 * 处理POST方式查询员工列表
 */
server.post('/api/v1/staff/list', (req, res) => {
	let url = `http://${ip}:${port}` + req.originalUrl
	let query = req.body
	superagent.get(url)
	.query(query)
	.end((err, response) => {
		res.jsonp(response.body)
	})
})

/*
 * 处理POST方式员工登录
 */
server.post('/api/v1/login', (req, res) => {
	let query = req.body
	if(/^11\d{9}/g.test(query.username)) {
		res.jsonp({"code": 12001, "msg": "手机号与密码不匹配，请重新输入", "data": {}})
	} else if(/^12\d{9}/g.test(query.username)) {
		res.jsonp({"code": 12002, "msg": "手机号码不存在，请重新输入", "data": {}})
	} else {
		res.jsonp({"code": 0, "msg": "OK", "data": {}})
	}
})

/*
 * 处理包装分页等特殊响应报文内容
 */
router.render = (req, res) => {
	let url = req.originalUrl
	console.log('**************** ' + url + ' ****************');
	let obj = res.locals.data
	if (/api\/notice\/queryNoticeStaffInfo/gi.test(url.split('?')[0])) {
		let pageNo = url.match(/_page=(\d+)/)[1] || 1;
		let pageSize = url.match(/_limit=(\d+)/)[1] || 20;
		let _hascollect = url.match(/hascollect=(\d+)/);
		let hascollect = _hascollect && _hascollect[1];
		let list = obj.list.filter(function(item){
			console.log('hascollect=============== ' + hascollect);
			return hascollect ? item.hascollect : true;
		});
		let total = list.length;
		let pageCount =  Math.ceil(total / pageSize);
		let start = pageSize * (pageNo - 1);
		console.log('***************************');
		console.log(url);
		console.log(pageNo);
		console.log('***************************');

		obj = {
			"pageSize": pageSize,
	        "total": total,
	        "currentPage": pageNo,
	        "start": start,
	        "totalCount": total,
	        "pageCount": pageCount,
	        "list": list.slice(start, start + 20)
	    };
	} else if (/_page/gi.test(url)) {
		//获取默认的页码和页容量
		let noList = url.match(/_page=(\d+)/)
		let pageNo = noList && noList.length > 0 && noList[1]
		let sizeList = url.match(/_limit=(\d+)/)
		let pageSize = sizeList && sizeList.length > 0 && sizeList[1]
		//获取条件检索的总数量
   	let totalRecord = parseInt(JSON.stringify(res._headers['x-total-count']))
		let totalPage = Math.ceil(totalRecord / 20)
		obj = {
			"code": 0,
			"msg": "OK",
			"data": {
				"page": {
					"pageNo": pageNo,
					"pageSize": pageSize,
					"totalRecord": totalRecord,
					"totalPage": totalPage,
					"paraJson": "{}",
					"paraListJson": "{}"
				},
				"list": res.locals.data
			}
		}
	}
	if(/approve\/act\/view/gi.test(url)){
		//获取参数
		obj = {
			"code": 0,
			"msg": "OK",
			"data" : res.locals.data[0]
		}
	}
	res.jsonp(obj)
}

// server.use("/api",router)
server.use(jsonServer.rewriter(rules))
server.use(router)

server.listen({
	host: ip,
	port: port,
}, function() {
	console.log(`JSON Server is running in http://${ip}:${port}`)
})