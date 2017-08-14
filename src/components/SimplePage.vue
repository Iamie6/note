<template>
	<div v-if="totalRecord > 0" class="simple-page clearfix">
		<span class="page-note">
			{{ currentPage }}/{{ totalPage }}页
		</span>
		<span class="turning-icon">
			<input @click="prev" type="button" :class="prevClass" />
			<input @click="next" type="button" :class="nextClass" />
		</span>
	</div>
</template>
<script>
	/*
	 * 组件用法
	 * <simple-page
		:page-size="20"						//type Number  每一页 显示的数量
		@current-change="currentChange"	//type Function 每一页显示的数量发生变化时 触发
		:total-record="0"						//type Number (required)  总条数
		:current-page="3"						//type Number 初始化时显示的页码
		></simple-page>
	 */
	export default {
		name: 'SimplePage',
		props: {
			currentPage: {
				type: Number,
				default () {
					return 1
				}
			},
			pageSize: {
				type: Number,
				default () {
					return 20
				}
			},
			totalRecord: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data () {
			return {
				internalpageNo: 1,
				internalpageSize: 20
			}
		},
		methods: {
			prev () {
            if(this.internalpageNo <= 1) {
               return false
            }
            this.internalpageNo -= 1
				this.$emit('current-change', this.internalpageNo)
			},
			next () {
				if(this.internalpageNo >= this.totalPage) {
               return false
            }
            this.internalpageNo += 1
				this.$emit('current-change', this.internalpageNo)
			}
		},
		computed: {
			prevClass () {
				if(this.internalpageNo <= 1) {
					return ['prevable-icon']
				}
				return ['prev-icon']
			},
			nextClass () {
				if(this.internalpageNo >= this.totalPage) {
					return ['nextable-icon']
				}
				return ['next-icon']
			},
			totalPage () {
				return Math.ceil(this.totalRecord / this.pageSize)
			}
		},
		watch: {
			currentPage:{
				immediate: true,
				handler(val) {
               this.internalpageNo = val
          	}
			},
			pageSize: {
            immediate: true,
            handler(val) {
               this.internalpageSize = val
            }
	      }
		}
	}
</script>
<style lang="scss" scoped>
.simple-page {
	span {
		float: left;
		font-size: 14px;
		font-family: 'Microsoft YaHei';
		color: #999;
		height: 20px;
		line-height: 20px;
	}
	.turning-icon {
		float: left;
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		overflow: hidden;
		margin-left: 10px;
		display: inline-block;
		vertical-align: middle;
		input {
			float: left;
			height: 20px;
			background: #FFF;
			cursor: pointer;
			width: 28px;
			border: none;
			background-image: url('../assets/imgs/icons.png');
			background-repeat: no-repeat;
		}
		.prev-icon {
			border-right: 1px solid #e5e5e5;
			background-position: -86px -18px;
		}
		.prevable-icon {
			border-right: 1px solid #e5e5e5;
			background-position: -106px -18px;
		}
		.next-icon {
			background-position: -45px -17px;
		}
		.nextable-icon {
			background-position: -65px -17px;
		}
	}
}
</style>