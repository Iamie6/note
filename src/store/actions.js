import axios from 'axios'
import {
	CHANGE_STAFF_LIST
}
from './mutation-types'
export default {
	//获取员工列表
	async getStaffList ({ commit, state }, options) {
		try {
			const res = await axios.get('/v1/staff/list', options)
			commit(CHANGE_STAFF_LIST, res.data.data)
		} catch (err) {
			console.error(err)
		}
	}
}