<template>
 	<div class="energy-box">
		<div class="energy">
			<img class="cover" src="../assets/p16_cover_02.jpg" alt="">
			<p class="name">骑着亚瑟的猪</p>
			<img class="title" src="../assets/p16_title.png" alt="">
			<div class="power-box">
				<img class="power" src="../assets/power.png" alt="">
			</div>
			<div class="piont clearfix">
				<div class="active"></div>
				<div class="active"></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="charge-btn">点击充能</div>
			<div class="list-box">
				<div class="list">
					<div class="detail">
						<p><span class="name">骑着亚瑟的猪</span><span class="summary">为擎天柱注入了能量</span><span>2017/10/25 20:35</span></p>
						<p><span class="name">骑着亚瑟的猪</span><span class="summary">为擎天柱注入了能量</span><span>2017/10/25 20:35</span></p>
						<p><span class="name">骑着亚瑟的猪</span><span class="summary">为擎天柱注入了能量</span><span>2017/10/25 20:35</span></p>
					</div>
				</div>
			</div>
			<div class="btn-box">
				<span>查看排行榜</span>
				<span>了解前因后果</span>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
export default {
	data(){
		return {
			ctitle:"",
			render:""
		}
	},
	created(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth/15 + 'px';
		
	}
}
</script>

<style scoped>
* {
	box-sizing: border-box
}
img {
	vertical-align: top
}
	.energy-box{
			width:100%;
			height: 100%;
			overflow:auto; 
			background: #010101;
			text-align: center;
		}
		.energy .cover{
			width:100%;
		}
		.energy .name{
			width:100%;
			text-align: center;
			color:#fff;
			font-size: .48rem;
		}
		.energy .title{
			width:12.8rem;
			margin:0 auto;
		}
		.energy .power-box{
			width:14.1rem;
			height:22px;
			margin: 0.5rem auto;
			border:2px solid #00c6ff;
			border-radius: 11px;
			text-align: left;
		}
		.power-box .power{
			width: 50%;
			margin-top: 1px;
			margin-left: 1px;
			height: 16px;
			border-radius: 8px;
		}
		.piont{
			width: 14.1rem;
			margin:0.2rem auto;
		}
		.piont>div{
			width:0.6rem;
			height:0.6rem;
			float:left;
			margin-left:0.5rem;
			background: url(../assets/piont_off.png);
			background-size: cover;
		}
		.piont>div.active{
			background-image: url(../assets/piont_on.png);
		}
		.charge-btn{
			width:6.4rem;
			height:1.56rem;
			margin: 1.28rem auto;
			background: url(../assets/change_btn.png);
			background-size: contain;
			text-align: center;
			line-height: 1.56rem;
			font-size: 0.56rem;
			color:#ffe258;
		}
		.list-box{
			width:12.08rem;
			height:4.9rem;
			margin:0 auto;
			overflow: hidden;
			background: url(../assets/p16_list_05.jpg);
			background-size: contain;
		}
		.list-box .list{
			position: relative;
			overflow:auto;
			margin-top:1.56rem;
			width:100%;
			height: 3.34rem;
		}
		.list-box .list .detail{
			color:#999;
			font-size: 0.4rem;
		}
		.detail .name{
			color:#999;
			font-size: 0.4rem;
		}
		.detail p{
			margin:0.5rem 0;
		}
		.detail .summary{
			margin:0 0.6rem;
		}
		.btn-box{
			width:100%;
			color:#ffe258;
			font-size: 0.48rem;
			text-align: left;
			margin-bottom: 2rem;
		}
		.btn-box span{
			display: inline-block;
			border-bottom:1px solid #ffe258;
			padding:0.1rem 0;
			margin-left:20%;
			margin-top: 0.52rem;
		}
</style>