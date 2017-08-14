<template>
	<div class="container">
		<div class="gomeplus-header">
            <div class="nav clearfix">
                <div class="nav-left clearfix">
                    <div class="company">
                        <div class="current-company" :title="companyList[companyIndex].companyName">{{ companyList[companyIndex].companyName }}</div>
                        <div class="company-list">
                            <div v-for='company in companyList'>{{company.companyName}}</div>
                            <span class="comp-arrow"></span>
                        </div>
                    </div>
                </div>
                <div class="nav-center">
                    <div class="clearfix mail-list" :class="[select == 'contact'?'selected':'']" @click="toContact"><span>通讯录</span></div>
	                <div class="clearfix examine-box"
	                	v-clickoutside="hideApp"
						:class="[select == 'examine'?'selected':'']"
	                	@click='toggleAppList'>
	                	<a href="javascript:;" class="triangle"
	                	:class='{active:appShow}'
	                	>应用</a>
	                </div>
	                <div class="clearfix popup" v-if="examineList.length" v-show="appShow">
	                	<div class="btnBox">
	                		<div class="app-btn" v-for="examine in examineList" @click="toModle(examine.routerName)">
	                			<div :class="[examine.backgroundClass]"></div>
	                			<span>{{examine.name}}</span>
	                			<i class="tip-num" v-show="examine.msgNum">{{examine.msgNum}}</i>
	                		</div>
	                	</div>
	                </div>
                </div>
                <div class="nav-right clearfix">
                	<span class="admin-enter" v-if="is_admin">
                		<a target="_blank" href="../admin/index.html">管理员入口</a>
                	</span>
                    <span class="msg" style="visibility: hidden;width:0px;margin-left:0px;">
                        这个span 目前版本不需要上线，如果上线 只需删掉行间样式
                    </span>
                    <a class="nav-menu" href="javascript:;"s>
                    	<span class="short-name"
						@click="toggleCenter"
						v-clickoutside='hideCenter'
                    	>{{short_name}}</span>
                    	<div class="menu-list" v-show="centerShow">
                    		<i></i>
	                    	<ul>
	                    		<li class="line" @click="toCenter()">个人中心</li>
	                    		<li @click="toLogout">安全退出</li>
	                    	</ul>
                    	</div>
                    </a>
                </div>
            </div>
        </div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Clickoutside from './clickoutside'
	import { userInfo, accessAuthorize, noticeNum, logout} from '../api/gome-header'
	export default {
		data(){
			return {
				companyList:[
				{
					/*companyId: 1,
					companyName: "国美互联网生态（分享）科技公司",
					email: "luchunyan@gomeplus.com",
					id: 3512,
					isAdmin: 0,
					mobile: "13521512787",
					staffName: "鲁春艳",
					staffNo: "21218"*/
				}],   //公司列表
				companyIndex:0,	//显示的公司索引
				examineList:[      //权限列表
					/*{
						nameEN:'approval',
						name:'审批',
						routerName:'approval',
						msgNum: 0,
						backgroundClass:'approval-img'
					},
					{
						nameEN:'notice',
						name:'公告',
						routerName:'notice',
						msgNum: 99,
						backgroundClass:'notice-img'
					}*/
				],
				appShow:false,   // 应用下拉 开关
				centerShow: false, // 个人中心头像 下拉 开关
				is_admin: false  //是否是管理员
			}
		},
		directives: { Clickoutside },
		computed:{
			select(){
				if(this.$route.path.indexOf('/contact') == 0){
					return 'contact'
				}else if(this.$route.path.indexOf('/center') == 0){
					return false
				}else{
					return 'examine'
				}
			},
			short_name(){
				const name = this.companyList[this.companyIndex].staffName
				return name?name.substring(name.length-2):''
			}
		},
		created(){
			this.getUserInfo()
			this.getAccessAuthorize()
		},
		methods:{
			toContact(){
				this.$router.push({path:'/contact'})
			},
			toCenter(){
				this.$router.push({path:'/center'})
			},
			toModle(path){
				this.$router.push({path:path})
			},
			async getAccessAuthorize(){
				const res = await accessAuthorize()

				const roles = res.data.data.roles
				const modules = res.data.data.modules

				for(let i=0; i<roles.length; i++){
					if(roles[i].roleCode.indexOf('admin')>-1){
						this.is_admin = true
						break;
					}
				}

				for(let i=0; i<modules.length; i++){
					if(modules[i] === '0001'){
						this.examineList.push({
							nameEN:'approval',
							name:'审批',
							routerName:'/approval',
							msgNum: 0,
							backgroundClass:'approval-img'
						})
					}
					if(modules[i] === '0002'){
						const notice = {
							nameEN:'notice',
							name:'公告',
							routerName:'/notice',
							msgNum: 0,
							backgroundClass:'notice-img'
						}
						notice.msgNum = (await noticeNum()).data.data.count
						this.examineList.push(notice)
					}
				}
			},
			async getUserInfo(){
				const res = await userInfo()
				this.companyList = res.data.data.staffs
			},
			async toggleAppList(){
				this.appShow = !this.appShow
				if(this.appShow){
					for(let i=0; i<this.examineList.length; i++){
						if(this.examineList[i].nameEN == "notice"){
							this.examineList[i].msgNum = (await noticeNum()).data.data.count
						}
					}
				}
			},
			hideApp(){
				this.appShow = false
			},
			hideCenter(){
				this.centerShow = false
			},
			toggleCenter(){
				this.centerShow = !this.centerShow
			},
			async toLogout(){
				const res = await logout()
				//this.$router.push({path:"/login"})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.gomeplus-header{
		top: 0px;
		left: 0px;
		width: 100%;
		height: 70px;
		background-color: #4B84F9;
		border: none;
		min-width: 1024px;
		position: relative;
		font-family: "Helvetica Neue", Helvetica, "Microsoft Yahei", Arial, "Hiragino Sans GB", "\5b8b\4f53", sans-serif;
		z-index: 101;

		.nav-left{
			display:block;
			float:left;
			padding-left:20px;
			font-size:16px;
			min-width: 280px;

			a{
				color:#f8f9fc;
				cursor:pointer;

				&:hover{
					color:#f5f7f9;
				}
				&:active{
					color: #ecffe5;
				}
			}
		}
		.nav-center{
			float: left;
			position: relative;
			height: 70px;

			.mail-list,
			.triangle{
				float: left;
				color: #fff;
				width: auto;
				margin-right:10px;
				padding:0px 15px;
				height: 70px;
				line-height: 70px;
				cursor: pointer;
				text-align: center;
				font-size:18px;
			}

			.triangle{
				padding-right: 24px;
				position: relative;
				&:after{
					content:"";
					position:absolute;
					top:27px;
					right:4px;
					width:8px ;
					height:16px;
					transform: rotate(-90deg);
					background:url(../assets/imgs/icons.png) no-repeat -75px -74px;
				}
			}
			.triangle.active{
				&:after{
					content:"";
					position:absolute;
					top:27px;
					right:4px;
					width:8px ;
					height:16px;

					transform: rotate(-90deg);
					background:url(../assets/imgs/icons.png) no-repeat -62px -74px;
				}
			}

			.examine-box{
				float: left;
				&:hover{
					background: rgba(0,0,0,0.1);
				}
			}
			.selected{
				background-color: #3C69C7;
			}

			.popup{
				width: 550px;
				height: 160px;
				position: absolute;
				top: 70px;
				left:90px;
				float: left;
				font-size: 14px;
				background: #FFFFFF;
				border: 1px solid #F0F0F0;
				box-shadow: 0 2px 4px 0 rgba(153,153,153,0.40);
				border-radius: 0 0 4px 4px;
			}
		}

		.nav-right{
			float:right;
			margin-right: 20px;
			height: 70px;
			line-height: 70px;
			.msg{
				width:24px;
				height:100%;
				float:left;
				margin:0 20px 0 20px;
				cursor:pointer;
			}

			.nav-menu{
				position: relative;
				float:left;
				width:34px;
				height:64px;
				outline: none;
			}
			.short-name{
				display: block;
				margin-top:18px;
				width:35px;
				height:35px;
				line-height:35px;
				background:#ffffff;
				font-size: 13px;
				color: #7BB4F2;
				text-align: center;
				border-radius: 4px;
			}
		}
		.menu-list{
			width: 146px;
			position: absolute;
			top:65px;
			right: 0px;
			border:1px solid #F0F0F0;
			border-radius: 4px;
			background:#FFFFFF;
			box-shadow: 0px 2px 4px 0px rgba(153,153,153,0.4);

			i{
				position: absolute;
				top:-16px;
				left:125px;
				width:0px;
				height:0px;
				border:8px solid #fff;
				border-color: transparent transparent #fff transparent;
			}
			li{
				height: 48px;
				line-height: 48px;
				font-size: 14px;
				color:#666666;
				text-indent: 20px;
				cursor: pointer;
				text-align: left;
				&:hover{
					color: #2B67E4;
				}
			}
			li.line{
				border-bottom: 1px solid #F0F0F0;
			}
		}
		.admin-enter{
			font-size:14px;
			float: left;
		}
		.admin-enter>a{
			outline:none;
			color:#ffffff;
		}

		.company {
			position:relative;
			float:left;
			color:#f8f9fc;

			.current-company{
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				width: 270px;
				line-height: 70px;
				font-size: 16px;
				text-align: left;
			}
		}
		.company-list{
			display:none;
			position:absolute;
			left:0;
			top:54px;
			background:#fff;
			border-radius:5px;
			z-index:10;
			padding-top:10px;
			width:300px;
			height:150px;

			div{
				height:26px;
				padding:10px 0 0 20px;
				font-size:16px;
				color:#000;
				cursor:pointer;

				&:hover{
					background-color:#d9dadc;
				}

				&:active{
					background-color:#4590e4;
					color:#fff;
				}
			}

			.comp-arrow{
				top:-16px;
				left:20px;
				position:absolute;
				width:0px;
				height:0px;
				border:8px solid #fff;
				border-color: transparent transparent #fff transparent;
			}
		}
		.btnBox{
			margin: 30px 0 0 30px;
			height: 130px;
		}
		.app-btn{
			position: relative;
			width: 70px;
			height: 100px;
			text-align: center;
			border-radius: 4px;
			cursor: pointer;
			margin-right:10px;
			float: left;

			div{
				width: 50px;
				height: 50px;
				display: inline-block;
				margin:10px;
				border-radius: 4px;
			}
			&:hover{
				background-color: rgba(225,225,225,0.5);
			}
			.approval-img{
				background:url(../assets/imgs/approve.png) no-repeat center #FF700A;
			}
			.notice-img{
				background:url(../assets/imgs/notice.png) no-repeat center #3BC577;
			}
			.tip-num{
				position: absolute;
			    display: block;
			    font-size: 12px;
			    height: 14px;
			    line-height: 14px;
			    background-color: #F41935;
			    color: #FFF;
			    top: 0px;
			    right: 0px;
			    padding: 0px 3.5px;
			    border-radius: 7px 7px 7px 0px;
			}
		}
	}
	.content {
		position: absolute;
		width: 100%;
		margin: 0 auto;
		top: 70px;
		bottom: 0;
	}
</style>