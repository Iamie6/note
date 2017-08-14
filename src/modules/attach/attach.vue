<template>
	<div class="attach-content">
		<a @click="update">我是考勤部分</a>
		<ul v-if="test.length > 0">
			<li v-for="item in test">
				{{ item }}
			</li>
		</ul>
	</div>
</template>
<script>
	
	export default {
		created () {
			this.$http.get('/approve/setting/flow/list?companyId=1')
				.then((res) => {
					this.list = res
				}, (err) => {
					console.log(err)
				})
		},
		data () {
			return {
				list: {},
				test: [
					'hehe',
					'haha'
				]
			}
		},
		methods: {
			update () {
				this.test = [
					'哈哈',
					'呵呵'
				]
			}
		}
	}
</script>
<style scoped>
	.attach-content {
		margin-top: 100px;
	}
</style>