module.exports = {
	"/api/*": "/$1",
	"/admin/dept/list*": "/contactdeptlist$1",
	"/v1/staff/list*": "/contactstafflist$1",
	"/v1/user/user_info*": "/userInfo$1",
	"/v1/access_authorize*":"/accessAuthorize$1",
	"/notice/queryUserNoticeMsgCount*": '/noticeNum$1',
	"/v1/logout*": "/logout$1",
	"/v1/staff/detail*": "/userDetail$1",
	"/approve/act/view*": "/approveFormElements$1",
    "/notice/queryNoticeStaffInfo*": "/noticelist$1",
    "/notice/queryUserNoticeById/*": "/noticedetail",
    "/notice/collectNotice*": "/collectNotice"
}