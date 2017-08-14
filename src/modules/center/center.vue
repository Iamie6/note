<template>
	<div class="center">
		<div class="slide">
			<div class="inside"></div>
			<div class="outside"></div>
		</div>
		<div class="personal-information clearfix">
			<span class="name" :style="{backgroundColor:color,boxShadow:shadow}">{{msg.shortName}}</span>
			<div class="more-msg">
				<p>{{msg.staffName}}</p>
				<ul>
					<li>
						<span class="title">电话：</span>
						<span>{{msg.mobile}}</span>
					</li>
				</ul>
			</div>
			<a href="javascript:;">修改密码</a>
		</div>
		<div class="company-information">
			<p>企业信息</p>
			<ul>
				<li class="clearfix">
					<span class="name">公司名称：</span>
					<span>{{msg.staffName}}</span>
				</li>
				<li class="clearfix">
					<span class="name">姓名：</span>
					<span>{{msg.staffName}}</span>
				</li>
				<li class="clearfix">
					<span class="name">所在部门：</span>
					<span>{{msg.deptName}}</span>
				</li>
				<li class="clearfix">
					<span class="name">职务：</span>
					<span>{{msg.dutyName}}</span>
				</li>
				<li class="clearfix">
					<span class="name">电子邮箱：</span>
					<span>{{msg.email}}</span>
				</li>
				<li class="clearfix">
					<span class="name">电话：</span>
					<span>{{msg.mobile}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { userDetail } from "@/api/gome-header"
export default {
	data(){
		return {
			msg:{}
		}
	},
	computed:{
		color(){
			return this.randomColor(this.msg.id)
		},
		shadow(){
			return "0px 7px 8px " + this.hexToRgba(this.color, 40).rgba
		}
	},
	created(){
		this.getUserDetail()
	},
	methods:{
		async getUserDetail(){
			const id = 3512
			const res = await userDetail({
				params:{
					id:id
				}
			})
			let name = res.data.data.staffName
			name = name?name.substring(name.length-2):''
			res.data.data.shortName = name
			
			this.msg = res.data.data
		},
		hexToRgba(hex, al) {
            let hexColor = /^#/.test(hex) ? hex.slice(1) : hex,
                alp = hex === 'transparent' ? 0 : Math.ceil(al),
                r, g, b;
            hexColor = /^[0-9a-f]{3}|[0-9a-f]{6}$/i.test(hexColor) ? hexColor : 'fffff';
            if (hexColor.length === 3) {
                hexColor = hexColor.replace(/(\w)(\w)(\w)/gi, '$1$1$2$2$3$3');
            }
            r = hexColor.slice(0, 2);
            g = hexColor.slice(2, 4);
            b = hexColor.slice(4, 6);
            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
            return {
                hex: '#' + hexColor,
                alpha: alp,
                rgba: 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (alp / 100).toFixed(2) + ')'
            };
        }
	}
}
</script>
<style lang="scss" scoped>
	.center{
		position: absolute;
		top:0;
		left:0;
		width:100%;
		height: 100%;
		min-width: 700px;
		overflow: auto;
		font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;
		text-align: left;
		.slide{
			position: fixed;
			top:0px;
			left:0;
			z-index: 1;
			width:100%;
			height: 230px;
			overflow: hidden;
			background: #4B84F9;
			background: -prefix-linear-zgradient(top,#4B84F9 75px, #6573FD); 
			background:-webkit-linear-gradient(top,#4B84F9 75px, #6573FD);
			div{
				width:200%;
				position: absolute;
				top:0;
			}
			.inside{
				height:100%;
				left:-280px;
				background: url(../../assets/imgs/water2.png) repeat-x left bottom;
		        animation:3s linear water2 infinite paused;
			}
			.outside{
				height: 100%;
				left:0;
				background: url(../../assets/imgs/water1.png) repeat-x left bottom;
		        animation:7s linear water1 infinite paused;
			}
		}
		.slide:hover .outside{
		    animation-play-state:running;
		}
		.slide:hover .inside{
		    animation-play-state:running;
		}
		@keyframes water1{
		    0%{
		        left:0;
		    }
		    100%{
		        left:-500px;
		    }
		}
		@keyframes water2{
		    0%{
		        left:-280px;
		    }
		    100%{
		        left:-840px;
		    }
		}
		.personal-information{
			position: relative;
			z-index: 2;
			width:680px;
			margin:50px auto 20px;
			padding: 40px 50px 40px 70px;
			background:#ffffff;
			&>a{
				float:right;
				color:#4B84F9;
				font-size: 12px;
				&:hover{
					color:#2B67E4;
				}
				&:active{
					color:#2B67E4;
				}
			}
			.name{
				float:left;
				width: 90px;
				height: 90px;
				background: #F693BF;
				color: #ffffff;
				text-align: center;
				line-height: 90px;
				border-radius: 8px;
				font-size: 22px;
				box-shadow: 0px 7px 8px #F693BF;
			}
		}
		.more-msg{
			float:left;
			padding:6px 20px;
			color:#333333;
			p{
				font-size: 16px;
				margin-bottom: 20px;
			}
			ul li{
				line-height: 14px;
				margin-bottom: 16px; 
				span{
					font-size:14px;
		            float: left;
				}
				span.title{
					color:#666666;
					width:42px;
					margin-right:5px;
				}
			}
		}
		.company-information{
			position: relative;
			z-index: 2;
			padding:60px 60px 60px 70px;
			width:670px;
			margin:auto;
			background: #ffffff;
			margin-bottom: 60px;
			color:#333333;
			&>p{
				font-size: 20px;
			}
			&>ul{
				margin-top:30px;
				font-size: 14px;
				li{
					line-height: 18px;
					margin-bottom: 15px;
				}
			}
			span{
				width:590px;
				float: left;
		    	line-height: 24px;
			}
			span.name{
			    width: 70px;
			    color: #666666;
			    margin-right: 5px;
			}
		}
	}
</style>