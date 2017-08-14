import fetch from '@/config/fetch'
import urls from './urls.js'

export let fetchApproveFormElements = (options) => {
	let res = fetch.get(urls.approveFormElements, options)
	return res
}
export let fetchApproveFormFlows = (options) => {
	let res = fetch.get(urls.approveFormElements, options)
	return res
}

