import fetch from '@/config/fetch'
import urls from './urls.js'

export let fetchNoticelist = (options) => {
	let res = fetch.get(urls.noticeList, options)
	return res
}

export let fetchNoticeDetail = (options) => {
	let res = fetch.get(urls.noticedetail + options.id, options)
	return res
}

export let fetchNoticeCollect = (options) => {
	let res = fetch.get(urls.noticeCollect, options)
	return res
}