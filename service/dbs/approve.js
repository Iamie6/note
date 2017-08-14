module.exports={
	"approveFormElements": [
		{
	        "process": {
	            "keyId": "process-1-3512-1493023798014",
	            "userTasks": [
	                {
	                    "id": "usertask1",
	                    "name": "部门负责人",
	                    "assigneeType": "deptLeader",
	                    "assignee": "",
	                    "isPromoterDelete": true,
	                    "isAssigneeChoice": true
	                },
	                {
	                    "id": "usertask2",
	                    "name": "上级部门负责人",
	                    "assigneeType": "deptLeader",
	                    "assignee": "2027",
	                    "isPromoterDelete": true,
	                    "isAssigneeChoice": true
	                },
	                {
	                    "id": "usertask3",
	                    "name": "中心/事业部负责人",
	                    "assigneeType": "assignee",
	                    "assignee": "",
	                    "isPromoterDelete": true,
	                    "isAssigneeChoice": true
	                },
	                {
	                    "id": "usertask4",
	                    "name": "分管副总裁",
	                    "assigneeType": "assignee",
	                    "assignee": "",
	                    "isPromoterDelete": true,
	                    "isAssigneeChoice": true
	                },
	                {
	                    "id": "usertask5",
	                    "name": "中心考勤员",
	                    "assigneeType": "assignee",
	                    "assignee": "",
	                    "isPromoterDelete": false,
	                    "isAssigneeChoice": false
	                }
	            ]
	        },
	        "flowId": 124
	    },
	    {
	        "formId": 391,
	        "id": 391,
	        "typeName": "所有表单元素",
	        "approveForms": {
	            "id": 391,
	            "formName": "所有表单元素",
	            "des": "",
	            "cid": 1,
	            "ctime": 1500633948582,
	            "utime": 1500633948582,
	            "deleted": true
	        },
	        "elements": [
	            {
	                "id": 14360,
	                "formId": 391,
	                "elementId": 3,
	                "title": "单选框",
	                "placeholder": "请输入",
	                "isMust": 1,
	                "format": "yyyy-MM-dd",
	                "orderCode": 3,
	                "typeName": "radio",
	                "items": [
	                    {
	                        "id": 503,
	                        "formElementId": 14360,
	                        "item": "选项1",
	                        "rule": ""
	                    },
	                    {
	                        "id": 504,
	                        "formElementId": 14360,
	                        "item": "选项2",
	                        "rule": ""
	                    },
	                    {
	                        "id": 505,
	                        "formElementId": 14360,
	                        "item": "选项3",
	                        "rule": ""
	                    }
	                ],
	                "formElementCode": "",
	                "elementRule": "",
	                "extra1": ""
	            },
	            {
	                "id": 14361,
	                "formId": 391,
	                "elementId": 4,
	                "title": "复选框",
	                "placeholder": "请输入",
	                "isMust": 1,
	                "format": "yyyy-MM-dd",
	                "orderCode": 4,
	                "typeName": "checkbox",
	                "items": [
	                    {
	                        "id": 506,
	                        "formElementId": 14361,
	                        "item": "选项1",
	                        "rule": ""
	                    },
	                    {
	                        "id": 507,
	                        "formElementId": 14361,
	                        "item": "选项2",
	                        "rule": ""
	                    },
	                    {
	                        "id": 508,
	                        "formElementId": 14361,
	                        "item": "选项3",
	                        "rule": ""
	                    }
	                ],
	                "formElementCode": "",
	                "elementRule": "",
	                "extra1": ""
	            },
	            {
	                "id": 14358,
	                "formId": 391,
	                "elementId": 1,
	                "title": "单行文本框",
	                "placeholder": "表单元素1",
	                "isMust": 1,
	                "format": "yyyy-MM-dd",
	                "orderCode": 1,
	                "typeName": "text",
	                "items": [],
	                "formElementCode": "",
	                "elementRule": "",
	                "extra1": ""
	            },
	            {
	                "id": 14359,
	                "formId": 391,
	                "elementId": 2,
	                "title": "多行文本框",
	                "placeholder": "表单元素2",
	                "isMust": 1,
	                "format": "yyyy-MM-dd",
	                "orderCode": 2,
	                "typeName": "textarea",
	                "items": [],
	                "formElementCode": "",
	                "elementRule": "",
	                "extra1": ""
	            },
	            {
	                "id": 14362,
	                "formId": 391,
	                "elementId": 6,
	                "title": "日期-无时间",
	                "placeholder": "请输入",
	                "isMust": 1,
	                "format": "yyyy-MM-dd",
	                "orderCode": 5,
	                "typeName": "date",
	                "items": [],
	                "formElementCode": "",
	                "elementRule": "",
	                "extra1": ""
	            },
	            {
	                "id": 14363,
	                "formId": 391,
	                "elementId": 6,
	                "title": "日期-有时间",
	                "placeholder": "请输入",
	                "isMust": 1,
	                "format": "yyyy-MM-dd HH:mm",
	                "orderCode": 6,
	                "typeName": "date",
	                "items": [],
	                "formElementCode": "",
	                "elementRule": "",
	                "extra1": ""
	            },
	            {
	                "id": 14364,
	                "formId": 391,
	                "elementId": 8,
	                "title": "日期组件-无时间",
	                "placeholder": "请输入",
	                "isMust": 1,
	                "format": "yyyy-MM-dd",
	                "orderCode": 7,
	                "typeName": "groupDate",
	                "items": [],
	                "formElementCode": "",
	                "elementRule": "",
	                "extra1": ""
	            },
	            {
	                "id": 14365,
	                "formId": 391,
	                "elementId": 8,
	                "title": "日期组件-有时间",
	                "placeholder": "请输入",
	                "isMust": 1,
	                "format": "yyyy-MM-dd HH:mm",
	                "orderCode": 8,
	                "typeName": "groupDate",
	                "items": [],
	                "formElementCode": "",
	                "elementRule": "",
	                "extra1": ""
	            },
	            {
	                "id": 14366,
	                "formId": 391,
	                "elementId": 9,
	                "title": "数字框",
	                "placeholder": "请输入",
	                "isMust": 1,
	                "format": "yyyy-MM-dd",
	                "orderCode": 9,
	                "typeName": "number",
	                "items": [],
	                "formElementCode": "",
	                "elementRule": "",
	                "extra1": "{\"unit\":\"元\"}"
	            }
	        ]
	    },
	    {
	        "approveId": 1045,
	        "approves": {
	            "id": 1045,
	            "procInstId": "",
	            "formId": 293,
	            "formName": "婚假申请",
	            "typeId": 124,
	            "typeName": "婚假申请",
	            "code": "",
	            "status": 0,
	            "ownerId": 3512,
	            "ownerName": "鲁春艳",
	            "cid": 1,
	            "ctime": 1501232067494,
	            "utime": 1501232067494,
	            "deleted": true,
	            "curApprovers": "",
	            "summary": ""
	        },
	        "approveFlow": {
	            "id": 124,
	            "name": "婚假申请",
	            "formId": 293,
	            "formName": "婚假申请",
	            "procdefId": "process-1-3512-1493023798014",
	            "typeId": 39,
	            "typeName": "请假",
	            "icon": "icon_marry_leave",
	            "cid": 1,
	            "ctime": 1471418623718,
	            "utime": 1493354854355,
	            "deleted": true,
	            "summary": "",
	            "status": true,
	            "orderCode": 4656,
	            "enableTime": 1493354841783,
	            "disableTime": "",
	            "isDeployed": true
	        },
	        "approveFlowTypes": {
	            "id": 39,
	            "name": "请假",
	            "cid": 1,
	            "ctime": 1471414015550,
	            "utime": 1493102125810,
	            "deleted": true,
	            "icon": "icon_leave",
	            "status": true,
	            "orderCode": 9674,
	            "enableTime": 1493102125810,
	            "disableTime": "",
	            "isBind": true
	        },
	        "approveForms": {
	            "id": 293,
	            "formName": "婚假申请",
	            "des": "",
	            "cid": 1,
	            "ctime": 1493354854356,
	            "utime": 1493354854356,
	            "deleted": true
	        },
	        "values": [
	            {
	                "formId": 293,
	                "elementId": 8,
	                "title": "起止时间",
	                "placeholder": "请输入",
	                "isMust": 1,
	                "format": "yyyy-MM-dd",
	                "orderCode": 1,
	                "valueId": 2968,
	                "approveId": 1045,
	                "formElementId": 14023,
	                "value": "{\"beginDate\":\"20170728\",\"beginTime\":\"0000\",\"endDate\":\"20170729\",\"endTime\":\"0000\",\"days\":\"1\",\"hours\":0,\"minutes\":0}",
	                "typeName": "groupDate",
	                "items": [],
	                "formElementCode": "totalTime",
	                "extra1": ""
	            },
	            {
	                "formId": 293,
	                "elementId": 6,
	                "title": "结婚登记日期",
	                "placeholder": "登记一年内有效",
	                "isMust": 1,
	                "format": "yyyy-MM-dd",
	                "orderCode": 2,
	                "valueId": 2969,
	                "approveId": 1045,
	                "formElementId": 14024,
	                "value": "1501171200000",
	                "typeName": "date",
	                "items": [],
	                "formElementCode": "enroll-date",
	                "extra1": ""
	            },
	            {
	                "formId": 293,
	                "elementId": 2,
	                "title": "请假事由",
	                "placeholder": "在这里填写请假事由...",
	                "isMust": 1,
	                "format": "yyyy-MM-dd",
	                "orderCode": 3,
	                "valueId": 2970,
	                "approveId": 1045,
	                "formElementId": 14025,
	                "value": "",
	                "typeName": "textarea",
	                "items": [],
	                "formElementCode": "reason",
	                "extra1": ""
	            }
	        ],
	        "notes": [],
	        "assigneeInfo": {
	            "id": 1048,
	            "approveId": 1045,
	            "assigneeInfo": "[{\"name\":\"部门负责人\",\"assignee\":\"${usertask1}\",\"isPromoterDelete\":true,\"isAssigneeChoice\":true,\"taskId\":\"usertask1\",\"value\":\"1225\"},{\"name\":\"上级部门负责人\",\"assignee\":\"${usertask2}\",\"isPromoterDelete\":true,\"isAssigneeChoice\":true,\"taskId\":\"usertask2\",\"value\":\"2027\"},{\"name\":\"中心/事业部负责人\",\"assignee\":\"${usertask3}\",\"isPromoterDelete\":true,\"isAssigneeChoice\":true,\"taskId\":\"usertask3\",\"value\":\"3502\"},{\"name\":\"分管副总裁\",\"assignee\":\"${usertask4}\",\"isPromoterDelete\":true,\"isAssigneeChoice\":true,\"taskId\":\"usertask4\",\"value\":\"2980\"},{\"name\":\"中心考勤员\",\"assignee\":\"${usertask5}\",\"isPromoterDelete\":true,\"isAssigneeChoice\":true,\"taskId\":\"usertask5\",\"value\":\"3\"}]"
	        }
	    }
	]
}