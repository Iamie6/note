<template>
	<div class="approve-fr-box">
		<!--表单上面按钮-->
		<div class="form-btns">
			<el-button type="text">返回</el-button>
			<div class="btns-right">
				<el-button>保存</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			</div>
		</div>
		<!--表单内容-->
		<div class="form-contens">
			<!--表单名-->
			<div class="form-title">
				<p class="title">{{approveForm.formName}}</p>
				<p class="form-owner">xxx<span class="form-owner-sup">( 前端研发部 - 前端开发工程师 )</span></p>
			</div>
			<!--表单项-->
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
				<el-form-item v-for="(element,index) in formElements" :label="element.title" :prop="element.id" key="element.id">
			    	<!--文本输入框-->
			    	<el-input v-if="element.typeName=='text'" :placeholder="element.placeholder" v-model="ruleForm[element.id]"></el-input>
					<!--数字输入框-->
					<el-input v-if="element.typeName=='number'" :placeholder="element.placeholder" v-model="ruleForm[element.id]"></el-input>
					<!--文本域-->
					<el-input v-if="element.typeName=='textarea'" type="textarea" :rows="5" :placeholder="element.placeholder" v-model="ruleForm[element.id]">
					</el-input>
					<!--单选框-->
					<el-radio-group v-if="element.typeName=='radio'" v-model="ruleForm[element.id]">
					    <el-radio v-for="item in element.items" :label="item.id.toString()" >{{item.item}}</el-radio>
					</el-radio-group>
					<!--多选框-->
					<el-checkbox-group v-if="element.typeName=='checkbox'" v-model="ruleForm[element.id]">
					    <el-checkbox v-for="item in element.items" :label="item.id" >{{item.item}}</el-checkbox>
					  </el-checkbox-group>
					<!--单日历-->
					<!--单日历-无时间-->
					<el-date-picker v-if="element.typeName=='date' && element.format=='yyyy-MM-dd'" type="date"  :placeholder="element.placeholder" :format="element.format" :editable="false" class="size" v-model="ruleForm[element.id]">
				    </el-date-picker>
				    <!--单日历-有时间-->
				    <el-date-picker v-if="element.typeName=='date' && element.format=='yyyy-MM-dd HH:mm'" type="datetime"
				      :placeholder="element.placeholder" :format="element.format" :editable="false" class="size" v-model="ruleForm[element.id]">
				    </el-date-picker>
					<!--双日历-->
					<!--双日历-无时间-->
					<el-date-picker v-if="element.typeName=='groupDate' && element.format=='yyyy-MM-dd'" type="daterange" :placeholder="element.placeholder" :editable="false" class="size" range-separator="    至    " :format="element.format" v-model="ruleForm[element.id]"></el-date-picker>
					<!--双日历-有时间-->
					<el-date-picker v-if="element.typeName=='groupDate' && element.format=='yyyy-MM-dd HH:mm'" type="datetimerange" :placeholder="element.placeholder"  :editable="false" class="size" range-separator="    至    " :format="element.format" v-model="ruleForm[element.id]"></el-date-picker>
				</el-form-item>
			</el-form>
			<!--流程节点-->
			<div class="form-flows">
				<p class="title">审批流程<span class="supplement">( 审批人显示为该员工的主部门职务 )</span></p>
				<div v-for="(flow,index) in flows" class="flow">
					<div class="flow-contents">
						<p class="flow-name">{{flow.name}}</p>
						<p class="flow-info">请添加审批人</p>
						<!-- <div class="flow-dot">
						</div> -->
					</div>
					<div class="flow-btns">
						<template v-if="flow.assignee == ''">
							<el-button class="flow-btn">添加</el-button>
						</template>
						<template v-else>
							<el-button :disabled="flow.isAssigneeChoice ? false : true " class="flow-btn">编辑</el-button>
						</template>
						
						<el-button :disabled="flow.isPromoterDelete ? false : true " class="flow-btn">删除</el-button>
					</div>
					<p class="under-line" :class="index+1==flows.length ? 'line-hide': ''"></p>
					<div class="flow-icon">
						<div :class="index==0 ? 'up-line' : ''"></div>
						<div class="flow-dot"></div>
						<div :class="index+1==flows.length ? 'down-line' : ''"></div>
					</div>

				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import dateRangeValue from './mixins/dateRangeValue'
	import { fetchApproveFormElements, fetchApproveFormFlows } from '@/api/approve'
	export default {
		mixins:[dateRangeValue],
		created(){
			this.formId=this.$route.query.formId || ''
			this.approveId=this.$route.query.approveId || ''
			this.flowId=this.$route.query.flowId || ''
			this.getFormElements();
			this.getFormFlows()
		},
		data(){
			return {
				formElements:[],
				flows:[],//审批流程节点数组
				approveForm:{},//表单的值
				rules:{},//form表单的验证规则
				ruleForm:{},//存取form表单值
				formId:'',//新建审批单时的表单id
				approveId:'',//草稿编辑时的审批单id
				assignInfo:'',//审批单编辑时流程节点内容
			}
		},
		mounted(){
		},
		methods:{
			//新建或编辑表单获取表单元素数据
			async getFormElements() {
				let formElements
				if(this.formId){
					formElements = await fetchApproveFormElements({
		            	params : {
		            		formId : this.formId
		            	}
		            	
		            })
		            this.formElements = formElements.data.data.elements;
	            	this.approveForm = formElements.data.data.approveForms;
				}
				if(this.approveId){
					formElements = await fetchApproveFormElements({
		            	params : {
		            		approveId : this.approveId
		            	}
		            	
		            })
		            this.formElements = formElements.data.data.values;
	            	this.approveForm = formElements.data.data.approves;
				} 
	            this.formElementsInit()
	        },
	        //获取审批流程节点
	        async getFormFlows(){
	        	let flows
	        	if(this.flowId){
					flows = await fetchApproveFormFlows({
						params : {
							flowId : this.flowId
						}
					})
					this.flows=flows.data.data.process.userTasks
				}

	        },
		    //对表单元素数据的处理
		    formElementsInit(){
	        	//对元素按照orderCode进行排序
				this.formElements.sort(function(element1,element2) {
					return element1.orderCode-element2.orderCode
				})

				for(let i=0,length=this.formElements.length;i<length;i++){
					let formElement=this.formElements[i]
					formElement.id=formElement.id.toString();
					//如果元素的extral存在转换为json格式
					if(formElement.extra1){
						formElement.extra1=JSON.parse(formElement.extra1)
					}
					//根据表单元素创建表单验证规则对象
					let rule=[],ruleObj={};
					if(formElement.isMust){
						ruleObj.required=true;
					}else{
						ruleObj.required=false;
					}
					ruleObj.trigger="change";
					//对于输入框设置
					if(formElement.typeName=="text" || formElement.typeName=="textarea" || formElement.typeName=="number"){
						ruleObj.message="请输入"+formElement.title;
						this.$set(this.ruleForm, formElement.id, '');
						if(formElement.value){
							this.$set(this.ruleForm, formElement.id, formElement.value);
						}else{
							this.$set(this.ruleForm, formElement.id, '');
						}
					}
					//对于radio的设置
					if(formElement.typeName=="radio"){
						ruleObj.message="请选择"+formElement.title;
						if(formElement.value){
							this.$set(this.ruleForm, formElement.id, formElement.value);
						}else{
							this.$set(this.ruleForm, formElement.id, '');
						}
					}
					//对于checkbox的设置
					if(formElement.typeName=="checkbox"){
						ruleObj.message="请至少选择一个"+formElement.title;
						ruleObj.type="array"
						this.$set(this.ruleForm, formElement.id, []);
						if(formElement.value){
							this.$set(this.ruleForm, formElement.id, formElement.value.split(","));
						}else{
							this.$set(this.ruleForm, formElement.id, []);
						}
					}
					//对于单日历的设置
					if(formElement.typeName=="date"){
						ruleObj.message="请选择"+formElement.title;
						ruleObj.type="date"
						if(formElement.value){
							this.$set(this.ruleForm, formElement.id, new Date(this.formElement.value));
						}else{
							this.$set(this.ruleForm, formElement.id, '');
						}
					}
					//对于双日历的设置
					if(formElement.typeName=="groupDate"){
						ruleObj.message="请选择"+formElement.title;
						ruleObj.type="array"
						if(formElement.value){
							this.$set(this.ruleForm, formElement.id, this.jsonToTime(JSON.parse(formElement.value)));
						}else{
							this.$set(this.ruleForm, formElement.id, []);
						}
					}
					rule.push(ruleObj);
					this.rules[formElement.id]=rule;
				}
	        },
	    	//处理并封装表单元素数据
	    	getElementsValue(){
	    		for(let i=0,length=this.formElements.length;i<length;i++){
	    			let formElement=this.formElements[i]
	    			if(formElement.typeName="checkbox"){
	    				formElement.value=this.ruleForm[formElement.id].toString()
	    			}else if(formElement.typeName="date"){
	    				formElement.value=this.ruleForm[formElement.id].getTime()
	    			}else if(formElement.typeName="groupDate"){
	    				formElement.value=this.timeToJson(this.ruleForm[formElement.id])
	    			}else{
	    				formElement.value=this.ruleForm[formElement.id]
	    			}
	    			formElement.id=Number(formElement.id)
	    		}
	    	},
		    //提交按钮对表单数据验证
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
		        	if (valid) {
		            //封装数据并发送请求
		            this.getElementsValue()
		        	} else {
		        		return false;
		        	}
		        });
		    },
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	@mixin size($width:auto,$height:auto){
		width:$width;
		height:$height;
	}
	.approve-fr-box{
		position: relative;
		width:100%;
		height:100%;
		text-align:left;
		min-width: 724px;
		.form-btns{
			position:absolute;
			width:100%;
			height:60px;
		    border-bottom: 1px solid #D2D2D2;
		    background-color: #F7F7F7;
		    font: 14px/1.4 "Microsoft YaHei";
		    .btns-right{
		    	float: right;
		    	margin: 14px 16px;
		    }
		}
		//表单样式
		.form-contens{
			position:absolute;
			overflow-y:auto;
			width:100%;
			top:61px;
			bottom:0;
			padding:0 50px 0 50px;
			box-sizing:border-box;
			.form-title{
				margin:50px 0 56px;
				.title{
					margin-bottom: 26px;
					font-size: 22px;
				    font-weight: bold;
				}
			}
			.form-owner{
				font-size: 16px;
			    color: #333333;
			    font-weight: bold;
				.form-owner-sup{
					padding-left: 15px;
					font-size: 14px;
				    color: #999;
				}
			}
		}
		//覆写element ui的checkbox等样式
		.el-form-item{
			margin-bottom:48px;
			.el-checkbox{
				width: 100%
			}
			.size{
				width: 355px;
			}
			.el-checkbox+.el-checkbox {
			    margin-left: 0;
			}
		}
		//流程节点样式
		.form-flows{
			margin-bottom: 100px;
			border-bottom: 1px solid #e8e8e8;
			.title{
				height: 40px;
				border-bottom: 1px solid #d2d2d2;
				font-size: 16px;
				font-weight: bold;
				color: #333;
				.supplement{
					color: #999;
					font-weight: 100;
					padding-left: 5px;
					font-size: 14px;
				}
			}
			.flow{
				position: relative;
				overflow: hidden;
				height: 100%;
				// border-left: 1px solid #d2d2d2;
			}
			.flow-contents{
				width: 77%;
				float: left;
				padding: 27px 0 24px;
				position: relative;
				z-index: 49;
				margin-left: 7px;
				.flow-name{
					margin-left: 27px;
				    font-size: 18px;
				    color: #333;
				    margin-bottom: 13px;
				}
				.flow-info{
					line-height: 24px;
				    color: #666;
				    /* margin-bottom: 30px; */
				    font-size: 14px;
				    margin-left: 27px;
				    word-break: break-all;
				}
				// .flow-dot{
				// 	position: absolute;
				//     background-color: red;
				//     // left: -6px;
				//     top: 34px;
				//     height: 9px;
				//     width: 9px;
				//     // border-radius: 50%;
				//     // border: solid 2px #CCCCCC;
				//     z-index: 50;
				// }
				
			}
			.flow-btns{
				position: absolute;
				top: 50%;
				right: 0;
				margin-top: -17px;
				.flow-btn{
					width: 100px;
					height: 34px;
					padding: 0;
					background: #f7f7f7;
					border-color: #d9dadc;
    				color: #666666;
    				&:hover{
    					background: #fff;
    				}
				}
				.is-disabled:hover{
					background: #f7f7f7;
				}
			}
			.under-line{
				float: left;
				width: 100%;
				margin-left: 27px;
				height: 1px;
				background: #e8e8e8
			}
			.line-hide{
				display: none;
			}
			.flow-icon{
				width: 20px;
				height: 100%;
				position: absolute;
				top: 0;
				left: 6px;
				bottom:0;
				border-left: 1px solid #d2d2d2;
				.flow-dot{
					position: absolute;
				    background-color: #ffffff;
				    left: -7px;
				    top: 34px;
				    height: 9px;
				    width: 9px;
				    border-radius: 50%;
				    border: solid 2px #CCCCCC;
				    z-index: 50;
				}
				.up-line{
					width: 1px;
					height: 34px;
					background: #fff;
					margin-left: -1px;
				}
				.down-line{
					width: 1px;
					position: absolute;
					top:41px;
					bottom: 0;
					background: #fff;
					margin-left: -1px;
				}
			}
		}
		
	}
</style>
<style lang="scss">
	.approve-fr-box{
		.el-form-item__label{
			width: 100%;
			margin-bottom: 10px;
			text-align: left;
			font-size: 16px;
			font-weight: bold;
			color: #333;
		}
	}
</style>
