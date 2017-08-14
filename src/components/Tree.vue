<template>
	<ul class="dept-tree-content" v-if="model">
		<label @click.stop="selectDept(model.id)" :class="{ 'selected-node': currentId === model.id }" :style="{ paddingLeft: depth + 'px' }">
			<a @click.stop.self="toggle" :class="[direction]"></a>
			<span class="dept-name">
				{{ model.deptName }}
			</span>
			<span class="dept-num">
				({{ model.deptNum }})
			</span>
		</label>
		<template v-if="isRecurrence">
			<tree :currentId="currentId" v-show="show" v-for="(child, index) in model.children" :model="child" key="index" :depth="realDepth"></tree>
		</template>
	</ul>
</template>
<script>
	import { mapMutations } from 'vuex'
	export default {
		name: 'tree',
		props: {
			model: {
				type: Object,
				default () {
					return {

					}
				}
			},
			depth: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data () {
			return {
				show: false,
				realDepth: (this.depth + 20),
				isRecurrence: this.model.children.length > 0
			}
		},
		methods: {
			toggle () {
				this.show = !this.show
			},
			selectDept (id) {
				console.log(id)
				if(this.isRecurrence && this.currentId === id) {
					this.toggle()
				}
				this.CHANGE_SELECTEDID(id)
			},
         ...mapMutations([
         	'CHANGE_SELECTEDID'
         ])
		},
		computed: {
			direction () {
				if(this.isRecurrence) {
					return this.show ? 'extened' : 'collapsed'
				} else {
					return 'none'
				}				
			},
			currentId () {
				return this.$store.state.treeSelectedId
			}
		}
	}
</script>
<style lang="scss" scoped>
.dept-tree-content {
   list-style: none;
   padding: 0;
   width: 300px;
   border: none;
   .selected-node {
   	background-color: #e4e4e4 !important;
   }
   label {
   	overflow: hidden;
	   text-overflow: ellipsis;
	   cursor: pointer;
	   position: relative;
	   height: 42px;
	   display: block;
   	line-height: 42px;
   	font-size: 13px;
   	font-family: "microsoft yahei";
   }
   a {
		width: 10px;
		height: 15px;
		padding: 14px 3px 14px 7px;
		float: left;
		background-image: url('../assets/imgs/icons.png');
   	background-repeat:  no-repeat;
   	background-clip: content-box;
   }
   a.none {
   	background: none;
   }
   a.collapsed {
   	background-position:  -246px -9px;
   }
   a.extened {
   	background-position: -260px -11px;
   }
   span.dept-name {
		display: inline-block;
		height: 42px;
		line-height: 42px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #333333;
		float: left;
		position: relative;
    	text-indent: 16px;
    	max-width: 209px;
   }
   span.dept-name:before {
		content: '';
		width: 11px;
		height: 8px;
		background: url('../assets/imgs/icons.png') no-repeat -235px -26px;
		position: absolute;
		top: 17px;
		left: 2px;
   }
   span.dept-num {
		display: inline-block;
		height: 42px;
		line-height: 42px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		float: left;
		color: #999999;
   	margin-left: 2px;
	}
}
</style>