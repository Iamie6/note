import Vue from 'vue'
import Router from 'vue-router'
const Add = () => import('@/components/add')
const List = () => import('@/components/list')
const Detail = () => import('@/components/detail')

Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
		{
			path: '/',
			component: Add
		},
		{
			path: '/add',
			component: Add
		},
		{
			path: '/list',
			component: List
		},
		{
			path: '/detail',
			component: Detail
		}
	]
})
