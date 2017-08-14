import fetch from '@/config/fetch'
import urls from './urls.js'

export let userLogin = (options) => {
	let res = fetch.post(urls.userLogin, options)
	return res
}