<!-- <pagination
	:page-size="20"  			//type Number  每一页 显示的数量
	@size-change="sizeChange"	//type Function  当前显示的页码 发生变化时 触发 
	@current-change="currentChange"	//type Function 每一页显示的数量发生变化时 触发 
	:total-record="100"			//type Number (required)  总条数
	:current-page="3"			//type Number 初始化时显示的页码
	:page-sizes="[20,40,60,80]"	//type Array  每一页显示数量的可选数量
></pagination> -->

<template>
	<div v-if="pageCount > 1" class="pagination">
		<div class="page-box">
			<first></first>
			<prev></prev>
			<div class="check-page" @click="toShowList" v-clickoutside="hideList">
				<div class="check-page-btn">
					第{{this.internalCurrentPage}}页
				</div>
				<i :class="{active:showList}"></i>	
				<div v-show="showList" class="page-list">
					<div
					class="page-item"
					:class='[n== internalCurrentPage?"active":""]'
					v-for="n in pageCount"
					@click="change(n)">
						第{{n}}页
					</div>
				</div>
			</div>
			<next></next>
			<last></last>
		</div>

		<div class="pagesize">
			<span class="fl ml10">每页显示</span>	 
			<div class="btn-box fl ml10" v-clickoutside="hideSizeList" @click="toShowSizeList">
				<div class="check-pagesize-btn">
					{{this.internalPageSize}}
				</div>
				<i :class="{active:showSizeList}"></i>
				<div v-show="showSizeList" class="page-size-list">
					<div
					class="page-size-item"
					:class='[n==internalPageSize?"active":""]'
					v-for="n in pageSizes"
					@click="changeSize(n)">
						{{n}}
					</div>
				</div>
			</div>
			<span class="fl ml10">条</span>
		</div>
	</div>
</template>
<script>
import Clickoutside from './clickoutside'
export default {
	name: "Pagination",
	props:{
		pageSize: {
            type: Number,
            default: 20
        },

        totalRecord: Number,

        currentPage: {
            type: Number,
            default: 1
        },

        pageSizes: {
            type: Array,
            default () {
                return [20, 40, 60, 80];
            }
        }
	},
	data(){
		return {
			internalCurrentPage:1,
			internalPageSize: 20,
			showList:false,
			showSizeList:false
		}
	},
	computed:{
		pageCount(){
			if(!this.totalRecord){
				console.error("Pagination: total-record is required")
				return 1;
			}
			const total = parseInt(this.totalRecord,10)
			if(isNaN(total) || total < 1){
				console.error("Pagination: total-record is not Number")
				return 1;
			}
			
			return Math.ceil(total / this.pageSize)
		}
	},
	directives:{
		Clickoutside
	},
	created(){
		console.log(this)
	},
	methods:{
		changeSize(size){
			this.internalPageSize = size
		},
		hideSizeList(){
			this.showSizeList = false
		},
		toShowSizeList(){
			this.showSizeList = !this.showSizeList
		},
		hideList(){
			this.showList = false
		},
		toShowList(){
			this.showList = !this.showList
		},
		first(){
			const newVal = 1;
            this.internalCurrentPage = this.getValidCurrentPage(newVal);
		},
		prev(){
			const newVal = this.internalCurrentPage - 1;
            this.internalCurrentPage = this.getValidCurrentPage(newVal);
		},
		next(){
			const newVal = this.internalCurrentPage + 1;
            this.internalCurrentPage = this.getValidCurrentPage(newVal);
		},
		last(){
			const newVal = this.pageCount;
            this.internalCurrentPage = this.getValidCurrentPage(newVal);
		},
		change(n){
			const newVal = n;
            this.internalCurrentPage = this.getValidCurrentPage(newVal);
		},
		getValidCurrentPage(value) {
            value = parseInt(value, 10);

            const havePageCount = typeof this.pageCount === 'number';

            let resetValue;
            if (!havePageCount) {
                if (isNaN(value) || value < 1) resetValue = 1;
            } else {
                if (value < 1) {
                    resetValue = 1;
                } else if (value > this.pageCount) {
                    resetValue = this.pageCount;
                }
            }

            if (resetValue === undefined && isNaN(value)) {
                resetValue = 1;
            } else if (resetValue === 0) {
                resetValue = 1;
            }

            return resetValue === undefined ? value : resetValue;
        }
	},
	components:{
		first: {
			render(h){
				return (<button 
					class={
						['page-button',{disable: this.$parent.internalCurrentPage <=1}]
					}
					on-click ={
						this.$parent.first
					}
					>首页</button>);
			}
		},
		prev:{
			render(h){
				return (<button
					class={
						['page-button',{disable: this.$parent.internalCurrentPage <=1}]
					}
					on-click={
						this.$parent.prev
					}
					>上一页</button>);
			}
		},
		next: {
			render(h){
				return (<button 
					class={
						['page-button',{disable: this.$parent.internalCurrentPage >= this.$parent.pageCount}]
					}
					on-click ={
						this.$parent.next
					}
					>下一页</button>);
			}
		},
		last:{
			render(h){
				return (<button
					class={
						['page-button',{disable: this.$parent.internalCurrentPage >= this.$parent.pageCount}]
					}
					on-click={
						this.$parent.last
					}
					>末页</button>);
			}
		}
	},
	watch:{
		currentPage:{
			immediate: true,
			handler(val) {
                this.internalCurrentPage = val;
            }
		},
		pageSize: {
            immediate: true,
            handler(val) {
                this.internalPageSize = val;
            }
        },
		internalCurrentPage(newVal, oldVal){
			if(newVal !== oldVal){
				this.$emit('current-change',this.internalCurrentPage)
			}
		},
		internalPageSize(newVal, oldVal){
			if(newVal !== oldVal){
				this.$emit('size-change',this.internalPageSize)
			}
		}
	}
}
</script>
<style lang="scss" scoped>
	.pagination{
		position: relative;
        width:100%;
        height:28px;
        font-size: 12px;
		color:#999;
		background: #fff;
		.fl{
			float: left;
		}
		button{
			cursor: pointer;
		}
		.ml10{
			margin-left:10px;
		}
		.page-box{
			width: 350px;
			margin: 0 auto;
		}
		.page-button{
	        display: block;
	        float:left;
	        padding:5px 10px;
	        margin-left: 10px;
            background-color: #fff;
        	color: #999;
        	font-size: 12px;
			border: 1px solid #d9dadc;
		}
		.page-button.disable{
			color: #e5e5e5;
		}

		.check-page{
			position: relative;
			display: block;
			float:left;
			width:88px;
			height:28px;
			margin-left: 10px;
			box-sizing: border-box;
			border:1px solid #d9dadc;
			background: #fff;
			font-size: 12px;
			cursor: pointer;
		}
		.check-page-btn{
			float:left;
			width:57px;
			height:100%;
			text-align: center;
			line-height: 28px;
		}
		i{
			position: relative;
			float:right;
			display: block;
			width:28px;
			height:100%;
			border-left:1px solid #d9dadc;
			box-sizing: border-box;
			&:after{
				content:"";
				position: absolute;
				top:11px;
				left:9px;
				width:0px;
				height:0px;
				border:5px solid #999;
				border-color:#999 transparent transparent transparent;
			}
		}
		i.active:after{
			top:6px;
			border-color:transparent transparent #999 transparent;
		}
		.page-list{
			position: absolute;
			bottom:27px;
			left:-1px;
			width:88px;
			max-height:267px;
			background: #fff;
			color:#999;
			border:1px solid #d9dadc;
			box-sizing: border-box;
			overflow-y: auto;
		}
		.page-item{
			display: block;
			width:100%;
			height:24px;
			line-height: 24px;
			white-space: nowrap;
    		text-overflow: ellipsis;
    		overflow: hidden;
    		cursor: pointer;
    		&:hover{
    			background-color: #4590e4;
    			color: #fff;
    		}
		}
		.page-item.active{
			background-color: #4590e4;
    		color: #fff;
		}

		.pagesize{
			display:block;
			float: right;
			height: 28px;
			line-height: 28px;
		}
		.btn-box{
			position: relative;
			display: inline-block;
			width:66px;
			height:28px;
			border:1px solid #d9dadc;
			box-sizing: border-box;
			background: #fff;
			cursor: pointer;
		}
		.check-pagesize-btn{
			width:36px;
			height:28px;
			float: left;
		}
		.page-size-list{
			position: absolute;
			bottom:27px;
			left:-1px;
			width:66px;
			max-height: 267px;
			background: #fff;
			border:1px solid #d9dadc;
			box-sizing: border-box;
		}
		.page-size-item{
			height: 24px;
			text-indent: 15px;
			text-align: left;
			&:hover{
				background-color: #4590e4;
    			color: #fff;
			}
		}
		.page-size-item.active{
			background-color: #4590e4;
    		color: #fff;
		}
	}
</style>