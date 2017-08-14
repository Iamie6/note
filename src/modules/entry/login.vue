<template>
	<div class="login-container">
		<div class="login-header">
			
		</div>
		<form method="post" autocomplete="on" class="login-content">
			<div class="login-tip">
				<a href="javascript:;" class="login-tip-logo"></a>
				<span class="login-tip-txt">一个账号，享受各平台服务</span>
			</div>
			<div class="login-form">
				<div class="login-form-item">
					<div class="login-form-input-wrap">
						<input @blur="usernameCheck" @focus="inputFocus('activeUsername')" v-model="username" type="text" :class="['login-form-input', { 'warn-input': !usernameValid }]" autocomplete="off" />
					</div>
					<span :class="['login-form-tip', { 'login-form-tip-focus': activeUsername, 'warn-msg': !usernameValid }]">{{ usernameMsg }}</span>
				</div>
				<div class="login-form-item">
					<div class="login-form-input-wrap">
						<input @blur="passwordCheck" @focus="inputFocus('activePassword')" v-model="password" type="password" :class="['login-form-input', { 'warn-input': !passwordValid }]" autocomplete="off" />
					</div>
					<span :class="['login-form-tip', { 'login-form-tip-focus': activePassword, 'warn-msg': !passwordValid }]">{{ passwordMsg }}</span>
				</div>
				<div class="login-form-remember">
					<div class="remember-user">
						<el-checkbox v-model="remember">记住账号</el-checkbox>
					</div>
					<div class="forget-password">
						<a class="forget-link" href="javascript:;">忘记密码?</a>
					</div>
				</div>
				<input type="submit" @click.prevent="login" class="login-submit" value="登录" />
				<div class="login-active">
					<div class="login-active-tip">
						<span class="login-active-txt">第一次使用，你需要</span>
						<a class="login-active-link" href="javascript:;">激活</a>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
	import { userLogin } from '@/api/entry'
	export default {
		data () {
			return {
				username: '',
				usernameMsg: '请输入手机号码',
				usernameValid: true,
				password: '',
				passwordMsg: '请输入密码',
				passwordValid: true,
				remember: false,
				activeUsername: false,//记录是否首次激活用户名文本框
				activePassword: false,//记录是否首次激活密码文本框
			}
		},
		created () {
			if(this.username) {
				this.activeUsername = true
				this.activePassword = true
			}
		},
		methods: {
			inputFocus (key) {
				!this[key] && (this[key] = true)
			},
			usernameCheck () {
				//判断是否为空
				if(!this.username) {
					this.usernameMsg = '请输入手机号码'
					this.usernameValid && (this.usernameValid = false)
					return false
				}
				//判断是否为手机号
				if(!/^1\d{10}/g.test(this.username)) {
					this.usernameMsg = '请输入正确的手机号码'
					this.usernameValid && (this.usernameValid = false)
					return false
				}
				!this.usernameValid && (this.usernameValid = true)
				return true
			},
			passwordCheck () {
				if(!this.password) {
					this.passwordMsg = '请输入密码'
					this.passwordValid = false
					return false
				}
				this.passwordValid = true
				return true
			},
			async login () {
				let usernameValid = this.usernameCheck()
				let passwordValid = this.passwordCheck()
				if(!usernameValid || !passwordValid) {
					this.inputFocus('activeUsername')
					this.inputFocus('activePassword')
					return false
				}
				
				let res = await userLogin({
					username: this.username,
					password: this.password,
					remember: this.remember
				})
				let code = res && res.data && res.data.code
				if(code === 0) {
					this.$router.push('/contact')
					return false
				} else if(code === 12001) {
					this.usernameMsg = '手机号与密码不匹配，请重新输入'
				} else if(code === 12002) {
					this.usernameMsg = '手机号码不存在，请重新输入'
				} else {
					this.usernameMsg = '登录未知异常'
				}
				this.usernameValid = false
				this.passwordValid = true
			}
		}
	}
</script>
<style lang="scss" scoped>
$img-path: '../../assets/imgs';
@mixin font-style {
	font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;
}
@mixin fl {
	float: left;
}
@mixin fr {
	float: right;
}
.login-container {
	.login-header{
		height: 70px;
	}
	.login-content {
		width: 540px;
		height: 610px;
		margin: 50px auto;
		border-radius: 4px;
		text-align: center;
		background-color: #fff;
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
	}
	.login-tip {
		height: 167px;
		padding-top: 43px;
		background: #FBFBFB;
		border-radius: 4px 4px 0 0;
	}
	.login-tip-logo {
		width: 65px;
		height: 74px;
		margin: 0 auto;
		margin-bottom: 26px;
		display: block;
		background: url("#{$img-path}/logo-big.png") no-repeat;
		background-size: contain;
		cursor: pointer;
	}
	.login-tip-txt {
		@include font-style;
		font-size: 16px;
		color: #666666;
	}
	.login-form {
		width: 340px;
		margin: 0 auto;
		padding-top: 30px;
		background-color: #FFF;
	}
	.login-form-item {
		position: relative;
		margin-top: 30px;
	}
	.login-form-input-wrap {
		position: relative;
		z-index: 100;
	}
	.login-form-input {
		width: 100%;
		height: 34px;
		margin-top: 4px;
		display: block;
		border: none;
		border-bottom: 1px solid #E5E5E5;
		font-size: 14px;
		z-index: 2;
		background: transparent;
	}
	.login-form-tip {
		@include font-style;
		position: absolute;
		left: 0;
		top: 10px;
		font-size: 14px;
		color: #CCC;
		transition: 0.3s linear;
		z-index: 2;
	}
	.login-form-tip-focus {
		top: -12px;
		font-size: 12px;
	}
	.login-form-remember {
		margin-top: 15px;
		height: 50px;
		line-height: 16px;
	}
	.remember-user {
		@include fl;
		font-size: 12px;
	}
	.forget-password {
		@include fr;
	}
	.forget-link {
		color: #999;
		font-size: 12px;
	}
	.login-submit {
		width: 100%;
		height: 45px;
		font-size: 16px;
		color: #FFF;
		background-color: #4B84F9;
		box-shadow: 0 4px 6px 0 rgba(74, 131, 249, 0.5);
		border: none;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
      	background-color: #2B67E4;
      }
	}
	.login-active {
		margin-top: 15px;
	}
	.login-active-tip {
		@include fr;
		line-height: 16px;
		font-size: 12px;
	}
	.login-active-txt {
		color: #999;
	}
	.login-active-link {
		color: #4B84F9;
	}
	.warn-input {
		border-bottom: 1px solid #F41935;
	}
	.warn-msg {
		color: #F41935;
	}
}
</style>
<style lang="scss">
.login-container {
	.el-checkbox__label {
		color: #999;
		font-size: 12px;
	}
}
</style>
