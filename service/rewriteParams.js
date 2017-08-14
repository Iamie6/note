/*
 *修改Json-server识别的字段
 *req {Object} 请求报文对象
 *return 返回处理后的对象
 */
module.exports = function (req) {
	let method = req.method.toLowerCase()
	let params = null
	if(method === 'get') {
		params = req.query
	} else if(method === 'post') {
		params = req.body.params
	}
	let obj = {}
	let staffFlag = req.url.indexOf('staff/list') > -1
	for(let key in params) {
		if(key === 'pageNo') {
			obj['_page'] = params[key]
		} else if (key === 'pageSize') {
			obj['_limit'] = params[key]
		} else if(staffFlag && key === 'deptId') {
			obj[key + 's_like'] = ',' + params[key] + ','
		} else if(staffFlag && key === 'staffName') {
			obj[key + '_like'] = params[key]
		} else {
			obj[key] = params[key]
		}
	}
	return obj
}