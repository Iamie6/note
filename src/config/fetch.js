import axios from 'axios'
//请求之前拦截处理
axios.interceptors.request.use((req) => {
	if(process.env.NODE_ENV === 'development') {
		req.url = '/api' + req.url

		let params = null
		let method = req.method.toLowerCase()
		if(method === 'get') {
			params = req.params
		} else if( method === 'post') {
			params = req.data
		}
		if(!params) {
			return req
		}
		//处理Json-server需要识别的字段
		let obj = rewriteField(params, req)
		if(method === 'get') {
			req.params = obj
		} else if( method === 'post') {
			req.data = obj
		}
	}
	return req
}, (err) => {
	return Promise.reject(err)
})
//响应之后拦截处理
axios.interceptors.response.use((res) => {
	return res
}, (err) => {
	return Promise.reject(err)
})

/*
 *修改Json-server识别的字段
 *params {Object} 传递的参数
 *req {Object} 请求报文对象
 *return 返回处理后的对象
 */
function rewriteField(params, req) {
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

export default axios