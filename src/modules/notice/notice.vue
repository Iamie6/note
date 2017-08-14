<template>
	<div class="notice">
		<div class="notice-content">
			<div class="tab-btns">
				<router-link to="/notice/allNotice" class="tab-btn allNotice" @click.native="changeNotices('all')">全部公告</router-link>
				<router-link to="/notice/collectNotice" class="tab-btn collectNotice" @click.native="changeNotices('collect')">收藏公告</router-link>
			</div>
			<div class="notice-list">
				<router-view :lists="lists"></router-view>
			</div>
		</div>
		<notice-detail></notice-detail>
	</div>	
</template>
<script>
	import { fetchNoticelist, fetchNoticeDetail } from '@/api/notice'
	import noticeDetail from './noticeDetail.vue'
	import page from '@/components/pagination.vue'
	export default {
		name: 'notice',
		data () {
			return {
				lists: null
			}
		},
		created () {
			this.getNotices();
		},
		components: {
			noticeDetail
		},
		methods: {
			async getNotices () {
				let opt = {params:{'pageNo': 1, 'pageSize': 20, 'hascollect': ''}};
				let noticeData = null;
				let route = this.$route.path;
				if (route.search('collectNotice') >= 0) {
					opt.params.hascollect = 1;
				}
				noticeData = await fetchNoticelist(opt);
				this.lists = noticeData.data.list;
			},
			async changeNotices (flag) {
				let opt = {params:{'pageNo': 1, 'pageSize': 20, 'hascollect': ''}};
				let noticeData = null;
				let route = this.$route.path;
				if (route.search('collectNotice') >= 0) {
					opt.params.hascollect = 1;
				}
				noticeData = await fetchNoticelist(opt);
				this.lists = noticeData.data.list;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.notice {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background-color: #FFF;
	}
	.notice-content {
		text-align: left;
		width: 940px;
		height: 100%;
		margin: auto;
		background-color: #FFF;
	}
	.tab-btns {
		padding-top: 20px;
		border-bottom: 1px solid #E8E8E8;
	}
	.tab-btn {
		display: inline-block;
		line-height: 68px;
		text-decoration: none;
		height: 68px;
		min-width: 82px;
		text-align: left;
		border: none;
		font-size: 20px;
		color: #999;
		/*float: left;*/
		margin-left: 20px;
	}
	.tab-btn.router-link-active {
		color: #333;
	}
</style>