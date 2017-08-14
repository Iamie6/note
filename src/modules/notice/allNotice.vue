<template>
	<ul>
		<li v-for="list in lists" @click="showDetail(list)">
			<span class="noticeDetail">{{list.notice.title}}</span>
			<div class="per-det clearfix">
				<span>{{pattern(new Date(list.notice.sendtime), 'yyyy-MM-dd HH:mm')}}</span>
				<span>{{list.notice.author}}</span>
				<span class="operat-btn" v-if="list.hascollect">
					<span class="per-det-right">已收藏</span>
					<span class="per-det-right cancel unCollectNotice" @click.stop="collectNotice(list.notice.id)">取消收藏</span>
				</span>
			</div>
		</li>
	</ul>
</template>
<script>
	import { fetchNoticeDetail, fetchNoticeCollect } from '@/api/notice'
	export default {
		name: 'allNotice',
		props: ['lists'],
		methods: {
			async showDetail (list) {
				let opt = {id: list.notice.id};
				let detail_data = await fetchNoticeDetail(opt);
				let detail = this.$parent.$children.slice(-1)[0];
				detail.show = true;
				detail.list = detail_data.data.data;
				console.log(detail_data.data);
			},
			collectNotice (id) {
				console.log('collectNotice  ' + id);
				fetchNoticeCollect(id);
			},
			pattern (date, fmt) {
				let o = {
					'M+': date.getMonth()+1, //月份
					'd+': date.getDate(), //日
					'h+': date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
					'H+': date.getHours(), //小时
					'm+': date.getMinutes(), //分
					's+': date.getSeconds(), //秒
					'q+': Math.floor((date.getMonth()+3)/3), //季度
					'S': date.getMilliseconds() //毫秒
				};
				let week = ['日', '一', '二', '三', '四', '五', '六'];
				if (/(y+)/.test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
				}
				if (/(E+)/.test(fmt)) {
					fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay()]);
				}
				for (let k in o) {
					if (new RegExp('(' + k + ')').test(fmt)) {
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
					}
				}
				return fmt;
			}
		}
	}
</script>
<style lang="scss" scoped>
	ul li {
		height:85px;
		border-bottom: 1px solid #E8E8E8;
		padding: 30px 20px;
		position: relative;
		cursor: pointer;
		color: #999;
		font-family: "Microsoft Yahei", "微软雅黑";
		.noticeDetail {
			line-height: 26px;
			color: #333;
		}
		&.hasread .noticeDetail {
			color: #666;
		}
		.noticeDetail:hover {
			color: #4B84F9;
		}
		.per-det {
			position: absolute;
			left: 0;
			bottom: 30px;
			padding:0 20px;
			width: 100%;
			box-sizing: border-box;
			span{
				font-size: 14px;
				color:#999;
				display: block;
				margin-right: 10px;
				float: left;
			}
			.operat-btn {
				float: right;
			}
			.per-det-right.unCollectNotice {
				display: none;
			}
		}
		&:hover {
			background:#f9f9f9;
		}
		.operat-btn:hover {
			.per-det-right {
				display: none;
			}
			.per-det-right.unCollectNotice {
				display: block;
			}
		}
	}
</style>