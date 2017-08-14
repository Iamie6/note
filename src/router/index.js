import Vue from 'vue'
import Router from 'vue-router'
const login = () => import('@/modules/entry/login')
const home = () => import('@/components/Layout')
const contact = () => import('@/modules/contact/Contact')
const attach = () => import('@/modules/attach/attach')
const notice = () => import('@/modules/notice/notice')
const noticeTest = () => import('@/modules/notice/detail/test')
const approve = () => import('@/modules/approve/Approve')
const approveForm = () => import('@/modules/approve/newApprove/Form')
const archive = () => import('@/modules/approve/archive/Archive')
const draft = () => import('@/modules/approve/draft/Draft')
const myApprove = () => import('@/modules/approve/myApprove/MyApprove')
const myFinishedTask = () => import('@/modules/approve/myFinishedTask/MyFinishedTask')
const waitApprove = () => import('@/modules/approve/waitApprove/WaitApprove')
const center = () => import('@/modules/center/center')
const allNotice = () => import('@/modules/notice/allNotice')
const collectNotice = () => import('@/modules/notice/collectNotice')
Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			component: login
		},
		{
			path: '/',
			component: home,
			children: [
				{
					path: '',
					redirect: 'contact'
				},
				{
					path: 'contact',
					component: contact
				},
				{
					path: 'attach',
					component: attach
				},
				{
					path: 'notice',
					component: notice,
					children: [
						{
							path: '',
							component: allNotice
						},
						{
							path: 'allNotice',
							component: allNotice
						},
						{
							path: 'collectNotice',
							component: collectNotice
						},
						{
							path: 'test',
							component: noticeTest
						}
					]
				},
				{
					path: 'approval',
					component: approve,
					children: [
						{
							path: 'form',
							component: approveForm
						},
						{
							path: 'waitApprove',
							component: waitApprove
						},
						{
							path: 'myFinishedTask',
							component: myFinishedTask
						},
						{
							path: 'myApprove',
							component: myApprove
						},
						{
							path: 'draft',
							component: draft
						},
						{
							path: 'archive',
							component: archive
						}
						
					]
				},
				{
					path: 'center',
					component: center
				}			
			]
		}
	]
})
