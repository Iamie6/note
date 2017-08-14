<template>
	<div class="main">
		<div class="left">
			<ul class="approve-list" id="approveList">
				<li id="newApprove" class=" active">新建审批</li>
				<!-- <li id="waitApprove">待我审批<div id="waitApp" class="waitApp" style="display: none;">（<span id="waitAppNum"></span>）</div></li>
				<li id="myFinishedTask">我已审批</li>
				<li id="myApprove">我发起的审批</li>
				<li id="draft">审批草稿</li>
				<li id="archive">已归档</li> -->
				<li class="">
					<router-link to="/approval/waitApprove">待我审批</router-link>
				</li>
				<li class="">
					<router-link to="/approval/myFinishedTask">我已审批</router-link>
				</li>
				<li class="">
					<router-link to="/approval/myApprove">我发起的审批</router-link>
				</li>
				<li class="">
					<router-link to="/approval/draft">审批草稿</router-link>
				</li>
				<li class="">
					<router-link to="/approval/archive">已归档</router-link>
				</li>
				<li class="">
					<router-link to="/approval/form?formId=391&flowId=124">审批表单</router-link>
				</li>
			</ul>
		</div>
		<div class="right">
			<router-view></router-view>
		</div>
		
	</div>

</template>
<script>
	
</script>
<style lang="scss" scoped>
	@mixin size($width:auto,$height:auto){
		width: $width;
		height:$height
	}
	.main{
		@include size(100%,100%);
		.left{
			background-color: #f1f1f1;
		    border: none;
		    @include size(300px,100%);
		    border-right: 1px solid #d2d2d2;
		    /* margin-right: -100%; */
		    float: left;
		}
		.right{
			@include size(auto,100%);
			overflow:hidden;
			background-color:#ffffff;
		}
	}
	
</style>