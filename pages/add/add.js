$(function(){
	var form = $('form')[0];
	form.onsubmit = function(){
		var title = $('input')[0].value;
		var content = $('textarea')[0].value;
		$.ajax({
			url:'/add',
			data:{
				title:title,
				content:content
			},
			method:'post',
			success:function(data){
				console.log('ok',data)
				if(data.code ==0){
					alert('添加成功')
					$('input')[0].value = '';
					$('textarea')[0].value = '';
				}
				if(data.code == 1){
					alert("标题不能为空")
				}
				if(data.code == 2){
					alert("内容不能为空")
				}
				if(data.code == 3){
					alert(data.msg)
				}
			},
			error:function(data){
				console.log('err',data)
			}
		})
		return false;
	}
})