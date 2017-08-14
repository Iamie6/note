import fetch from '@/config/fetch'
import urls from './urls.js'

export let fetchDeptlist = (options) => {
	let res = fetch.get(urls.deptList, options)
	return res
}

export let fetchStafflist = (options) => {
	let res = fetch.get(urls.staffList, options)
	return res
}

export let searchStaffList = (options) => {
	let res = fetch.post(urls.staffList, options)
	return res
}