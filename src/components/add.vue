<template>
	<div class="form">
		<el-form label-width="80px">
			<el-form-item label="笔记标题">
				<el-input v-model="title"></el-input>
			</el-form-item>
			<el-form-item label="笔记内容" class="editor">
				<mavon-editor ref="editor" style="height: 100%;text-align:left"
					@save="save"
					v-model="value"
                    @imgAdd="imgAdd">
					</mavon-editor>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
//@imgAdd="imgAdd"
//@imgDel="imgDel"
import { mavonEditor } from 'mavon-editor'
//const mavonEditor = () => import('./list.vue')
import 'mavon-editor/dist/css/index.css'
import axios from "axios"
export default {
	data(){
		return {
			title:'',
			value:'',
            id:''
		}
	},
	components: {
        mavonEditor
    },
    created(){
        this.id = this.$route.query.id
        if(this.id){
            axios.get('/api/detail/'+this.id)
                .then((data)=>{
                    const res = data.data
                    if(res.code !==0){
                        return 
                    }
                    this.title = res.data.title
                    this.value = res.data.value
                }).catch((err)=>{
                    console.log(err)
                })
        }
    },
    methods:{
    	save(value, render){
            const _this = this
            render = render.trim()
    		const title = this.title.trim()
            if(!title){
                this.$message.error({
                    type:'error',
                    message:'标题为空',
                    showClose: false,
                    duration: 2000
                })
                return
            }
            if(!render){
                this.$message({
                    type:'error',
                    message:'笔记内容为空',
                    showClose: false,
                    duration: 2000
                })
                return
            }
            
    		axios.post('/api/add/artical',{
    			title: title,
    			render: render,
                value: value,
                id: this.id
    		}).then((data) => {
                const res = data.data
    			if(res.code !== 0 ){
                    this.$message({
                        type:'error',
                        message: res.msg,
                        showClose: false,
                        duration: 2000
                    })
                    return
                }
    			this.$message({
                    type:'success',
                    message:'保存成功',
                    showClose: false,
                    duration: 2000,
                    onClose:function(){
                        _this.title = ''
                        _this.value = ''
                    }
                })
    		}).catch((err) => {
    			this.$message({
                    type:'error',
                    message: err,
                    showClose: false,
                    duration: 2000
                })
    		})
    	},
    	imgAdd(index, file){
            const _this = this
            const  formData = new FormData()

            formData.append('pic', file)

            axios({
                    url: '/api/upload/img',
                    data: formData,
                    method:'post',
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((data) => {
                    const res = data.data
                    if(res.code !== 0){
                        _this.$refs.toolbar_left.$imgDelByFilename(index)
                        return
                    }
                    console.log(res)

                    _this.$refs.editor.$img2Url(index,res.src)
                })
                .catch((err)=>{
                    console.log(err)
                })

    	},
        imgDel(index){
            console.log('del: ', index)
        }
    }
}
</script>
<style scoped>
	.form{
		padding:60px 30px;
	}
    .editor .el-form-item__content{
        height: 500px;
    }
    .editor .loading{
        font-size: 40px;
        margin-top: 105px;
        color: #8492a6;
    }
</style>