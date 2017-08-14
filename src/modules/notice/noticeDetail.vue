<template>
	<div :class="{'hide': !show}" class="dialog">
		<span class="close" @click="close">X</span>
		<div class="preview-box">
			<div class="preview-title">
				<span>{{list.title}}</span>
			</div>
			<div class="notice-msg clearfix">
				<span class="collect-img" @click.stop="collectNotice(list.id)">收藏</span>
				<span>{{list.sendtime}}</span>
				<span>{{list.author}}</span>
			</div>
			<div id="notice-contain" class="notice-contain" v-html="list.text">
				<!--<span style="text-align: center;font-size: 24px;font-weight: 600;display: block;padding-top: 215px;">由于您已变更部门，该公告无法查看</span>-->
			</div>
		</div>
	</div>
</template>
<script>
	import { fetchNoticeCollect } from '@/api/notice'
	export default {
		name: 'noticeDetail',
		data () {
			return {
				show: false,
				list: null
			};
		},
		methods: {
			close () {
				this.show = false;
			},
			collectNotice (id) {
				console.log('collectNotice  not  ' + id);
				fetchNoticeCollect(id);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.hide {
		display: none;
	}
	.dialog {
		position: fixed;
		background-color: #FFF;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		top: 0px;
		left: 0px;
		z-index: 1;
		.close {
			position: absolute;
			display: block;
			width: 60px;
			height: 60px;
			line-height: 60px;
			right: 50px;
			top: 40px;
			font-size: 36px;
			cursor: pointer;
		}
		.preview-box{
			padding-bottom:40px;
			width:840px;
			margin:0 auto;
			position:relative;
			.preview-title {
				text-align: left;
				width: 840px;
				margin: 0 auto;
				color: #333;
				font-size: 20px;
				padding: 40px 0 24px;
				background-color: #fff;
				border-bottom: 1px solid #E8E8E8;
				span{
					display: block;
					margin-right:90px;
				}
			}
		}
		.notice-msg{
			position: relative;
			span{
				margin-top: 20px;
				font-size: 14px;
				color: #999;
				float: left;
				margin-right: 10px;
				margin-bottom: 40px;
			}
			.read{
				float: right;
			}
			.collect-img {
				display: inline-block;
				width: 50px;
				height: 54px;
				background-color: #F9F9F9;
				box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.20);
				position: absolute;
				margin: 0px;
				left: -82px;
				top: 24px;
				color: #666;
				font-size: 12px;
				text-align: center;
				cursor: pointer;
				&:before {
					content: ' ';
					display: inline-block;
					width: 100%;
					height: 31px;
				}
			}
		}            
		.notice-contain{
			word-wrap: break-word;
			font-size: 16px;
			color: #333333;
			text-align: left;
			ul li,ol li{
				list-style-type: inherit;
			}
		}
	}

</style>