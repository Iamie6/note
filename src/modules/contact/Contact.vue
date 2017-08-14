<template>
	<div class="contact-content">
		<div class="contact-left">
			<div class="bar-search">
            <div class="search-wrap">
               <div class="search">
                  <input type="text" class="search-input" v-model="searchName" @keyup.enter="searchStaff" placeholder="搜索员工" />
                  <div class="search-icon" @click="searchStaff"></div>
               </div>
            </div>
         </div>
         <div class="deft-list-wrap" v-if="deptInfo">
            <tree :model='model' v-for='(model, index) in deptInfo.children' key="index"></tree>
         </div>
		</div>
		<div class="contact-right">
			<div class="contact-breadcrumb clearfix">
            <label class="search-result">
               <template v-if="isSearch">
                  搜索"<span style="color:#5aacec">{{ searchText }}</span>"结果（共{{ staffInfo.page.totalRecord }}条）
               </template>
               <template v-else v-for="(link, index) in breadLinks">
                  <a class="search-link" v-if="index !== breadLinks.length - 1">
                     <span @click="selectDept(link.deptId)">{{ link.deptName }}</span>
                     <span class="next-icon"></span>
                  </a>
                  <span v-else class="curr-title">
                     {{ link.deptName }}
                  </span>
               </template>
            </label>
            <div v-if="staffInfo && staffInfo.list.length > 0" class="paging-turning">
               <simple-page @current-change="pageChange" :current-page="options.pageNo" :page-size="options.pageSize" :total-record="staffInfo.page.totalRecord"></simple-page>
            </div>
         </div>
         <div class="clearfix">
            <ul class="contact-head">
               <li class="list-staffName list-staffName-mg">
                  <span>姓名</span>
               </li>
               <li class="list-active">&nbsp;</li>
               <li class="list-deptName">
                  <span>部门</span>
               </li>
               <li class="list-dutyName">
                  <span>职务</span>
               </li>
               <!-- <li class="list-mobile">
                  <span>手机号</span>
               </li> -->
               <li class="list-email">
                  <span>邮箱</span>
               </li>
               <hr/>
            </ul>
         </div>
         <div class="staff-list-wrap">
            <div id="staffInfo" class="clearfix">
               <template v-if="staffInfo && staffInfo.list.length > 0">
                  <ul class="staff-item" v-for="(staff, index) in staffInfo.list">
                     <li :title="staff.staffName" :class="[activeClass(staff.activated)]">
                        <span class="staff-col">
                           <div :style="colorName(staff.id)">{{ staff.staffName.slice(-2) }}</div>
                           <span v-if="staff.isLeader" class="leader-icon"></span>
                           <template v-if="isSearch">
                              {{ showName(staff.staffName)[0] }}<span style="color:#5aacec">{{ showName(staff.staffName)[1] }}</span>{{ showName(staff.staffName)[2] }}
                           </template>
                           <template v-else>
                              {{ staff.staffName }}
                           </template>
                        </span>
                     </li>
                     <li v-if="staff.activated === 1" class="list-active">
                        <label>(未激活)</label>
                     </li>
                     <li :title="deptClass(staff.deptId)" class="list-deptName">
                        <span class="staff-col">
                           {{ staff.deptName }} 
                        </span>
                     </li>
                     <li :title="staff.dutyName" class="list-dutyName">
                        <span class="staff-col">
                           <span v-if="staff.partTime" class="parttime-icon">兼</span>
                           {{ staff.dutyName }}
                        </span>
                     </li>
                     <!-- <li :title="staff.mobile" class="list-mobile">
                        <span>
                           {{ staff.mobile }}
                        </span>
                     </li> -->
                     <li :title="staff.email" class="list-email">
                        <span class="staff-col">
                           {{ staff.email }}
                        </span>
                     </li>
                     <hr/>
                  </ul>
                  <div class="page-box">
                     <pagination @size-change="sizeChange" @current-change="pageChange" :current-page="options.pageNo" :page-size="options.pageSize" :total-record="staffInfo.page.totalRecord"></pagination>
                  </div>
               </template>
               <div v-else class="nodata">
                  <img v-if="isSearch" src="../../assets/imgs/nosearch.png" alt="暂无搜索结果">
                  <img v-else src="../../assets/imgs/nomember.png" alt="暂无成员">
               </div>
            </div>
         </div>
		</div>
	</div>
</template>
<script>
   import { mapActions, mapMutations } from 'vuex'
   import Tree from '@/components/Tree'
   import SimplePage from '@/components/SimplePage'
   import Pagination from '@/components/pagination'
   import { fetchDeptlist, fetchStafflist, searchStaffList } from '@/api/contact'
   export default {
      created () {
         this.getDeptList()
      },
      components: {
         Tree,
         SimplePage,
         Pagination
      },
      data () {
         return {
            isRender: false,
            deptInfo: null,
            deptList: null,
            staffInfo: null,
            options: {
               pageNo: 1,
               pageSize: 20,
               companyId: 1
            },
            breadLinks: [],
            searchName: '',
            searchText: '',
            isSearch: false            
         }
      },
      methods: {
         async getDeptList () {
            let options = {
               params: {
                  companyId: this.options.companyId,
                  tag: new Date().getTime()
               }
            }
            let res = await fetchDeptlist(options)
            let dept = res.data.data.dept
            //存储部门树到sessionStorage
            sessionStorage.setItem('deptList', JSON.stringify(res.data))

            //改造Tree对象为正常JSON对象
            let obj = {}
            obj[dept.id] = {
               deptId: dept.id,
               deptName: dept.deptName
            }
            ;(function deptDegree(list) {
               for(let i = 0, length = list.length; i < length; i++) {
                  let item = list[i]
                  obj[item.id] = item
                  let tmpList = item.children
                  if(tmpList && tmpList.length > 0) {
                     deptDegree(tmpList)
                  }
               }
            })(dept.children);
            this.deptList = obj
            this.deptInfo = dept

            //初始化面包屑导航条对象
            this.breadLinks = this.deptLinks(dept.id)

            //初始化部门选中Id
            this.CHANGE_SELECTEDID(dept.id)
            await this.getStaffList()
            this.isRender = true
         },
         async getStaffList() {
            let params = this.staffParams()
            let staffInfo = await fetchStafflist({
               params: params
            })
            this.staffInfo = staffInfo.data.data
         },
         async getSearchStaffList () {
            let params = this.staffParams(this.searchName)
            let staffInfo = await searchStaffList(params)
            this.staffInfo = staffInfo.data.data
            this.searchText = this.searchName
            if(!this.isSearch) {
               this.CHANGE_SELECTEDID(-1)
               this.isSearch = true
            }
         },
         staffParams (name) {
            let options = this.options
            let params = {
               companyId: options.companyId,
               pageNo: options.pageNo,
               pageSize: options.pageSize
            }
            if(name) {
               params.staffName = name
            } else {
               params.deptId = this.selectedId
            }
            return params
         },
         colorName (id) {
            return {
               backgroundColor: this.randomColor(id)
            }
         },
         activeClass (flag) {
            return flag === 1 ? 'list-staffName' : 'list-staffName-active'
         },
         pageChange (pageNo) {
            this.options.pageNo = pageNo
            this.pageStaffList()
         },
         sizeChange (pageSize) {
            this.options.pageNo = 1
            this.options.pageSize = pageSize
            this.pageStaffList()
         },
         pageStaffList () {
            if(this.isSearch) {
               this.getSearchStaffList()
            } else {
               this.getStaffList()
            }
         },
         /*
         deptClass (deptId) {
            //先存储该部门Id到其隶属根部门的信息，然后依次找
            let depts = []
            if(deptId === 1) {
               let tmpDept = this.deptInfo
               depts.push({
                  deptId: tmpDept.id,
                  deptName: tmpDept.deptName
               })
               return depts
            }            
            (function deptTree(list) {
               let current = null
               let reg = new RegExp('[,{]{1}\"id\":' + deptId + '[,}]{1}', 'ig');
               for(let i = 0, length = list.length; i < length; i++) {
                  let item = list[i]
                  let temp = JSON.stringify(item)
                  if(reg.test(temp)) {
                     current = item
                     break
                  }
               }
               if(!current) {
                  return false
               }
               depts.push({
                  deptId: current.id,
                  deptName: current.deptName
               })
               if(current.id === deptId) {
                  return false
               }
               if(current.children && current.children.length > 0) {
                  deptTree(current.children)
               }
            })(this.deptInfo.children)
            return depts
         },
         */
         deptClass (deptId) {
            if(!this.deptList) {
               return false
            }
            let dept = this.deptList[deptId]
            if(deptId === 1) {
               return dept.deptName
            }
            let depts = this.deptClassList(dept)
            let names = []
            depts.forEach((item) => {
               names.push(item.deptName)
            })
            return names.join('-')
         },
         deptLinks (deptId) {
            if(!this.deptList) {
               return false
            }
            let all = {
               deptId: 1,
               deptName: '全体成员'
            }
            let dept = this.deptList[deptId]
            if(deptId === 1) {
               return [all]
            }
            let depts = this.deptClassList(dept)
            depts.unshift(all)
            return depts
         },
         deptClassList (dept) {
            let depts = []
            let that = this
            ;(function tempDepts(tmpDept) {
               let tmpId = tmpDept.parentId
               depts.unshift({
                  deptId: tmpDept.id,
                  deptName: tmpDept.deptName
               })
               if(tmpId !== 1) {
                  tempDepts(that.deptList[tmpId])
               }
            })(dept);
            return depts
         },
         selectDept (deptId) {
            this.CHANGE_SELECTEDID(deptId)
         },
         searchStaff () {
            if(!this.searchName) {
               return false
            }
            this.options.pageNo = 1
            this.getSearchStaffList()
         },
         showName (name) {
            let start = name.indexOf(this.searchText)
            let end = start + this.searchText.length
            return [
               name.slice(0, start),
               name.slice(start, end),
               name.slice(end)
            ]
         },
         ...mapMutations([
            'CHANGE_SELECTEDID'
         ])
      },
      computed: {
         pageParams () {
            return this.staffInfo ? this.staffInfo.page : null
         },
         selectedId () {
            return this.$store.state.treeSelectedId
         }
      },
      watch: {
         selectedId (curVal, oldVal) {
            if(!this.isRender || curVal < 1) {
               return false
            }
            //更新面包屑导航条对象
            this.breadLinks = this.deptLinks(curVal)

            this.options.pageNo = 1
            this.isSearch && (this.isSearch = false)
            this.getStaffList({
               ...this.options,
               deptId: curVal
            })
         }
      },
      filters: {
         deptTitle (deptClass) {
            let title = ''
            deptClass.forEach((item) => {
               title += item.deptName + '-'
            })
            return title.slice(0, title.length - 1)
         }
      }
   }
</script>
<style lang="scss" scoped>
$img-path: '../../assets/imgs';
.contact-content {
   position: relative;
   min-width: 974px;
   margin: 0;
   padding: 0;
   width: 100%;
   height: 100%;
   background-color: #fff;
}
.contact-left {
   float: left;
   position: relative;
   background-color: #f1f1f1;
   width: 300px;
   height: 100%;
   border-right: 1px solid #d2d2d2;
   .bar-search {
      position: relative;
      width: 100%;
      padding-top: 15px;
      height: 45px;
      background-color: #f1f1f1;
      border-bottom: 1px solid #d2d2d2;
      z-index: 50;
      .search-wrap {
         margin-left: 20px;
         position: absolute;
      }
      .search-wrap:hover {
         .search-input {
            border-color: #419ce3;
         }
         .search-icon {
            background-position: -158px -18px;
         }
      }
      .search-input {
         border: 1px solid #c6cfe1;
         padding-left: 10px;
         width: 248px;
         height: 28px;
         list-style: none;
         border-radius: 3px;
         font-family: 'Microsoft YaHei';
         font-size: 12px;
         outline: none;
      }
      .search-icon {
         background-image: url("#{$img-path}/icons.png");
         background-repeat: no-repeat;
         background-position: -133px -18px;
         width: 20px;
         height: 20px;
         position: absolute;
         right: 4px;
         top: 6px;
         cursor: pointer;
      }
   }
   .deft-list-wrap {
      position: absolute;
      top: 60px;
      bottom: 0;
      width: 300px;
      overflow: hidden;
      overflow-y: auto;      
   }
}
.contact-right {
   background-color: #ffffff;
   overflow: hidden;
   height: 100%;
   position: relative;
   .contact-breadcrumb {
      position: relative;
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #d2d2d2;
      background-color: #f7f7f7;
      z-index: 60;
   }
   .search-result {
      color: #333;
      font-size: 14px;
      width: 70%;
      float: left;
      text-align: left;
      margin-left: 20px;
      .search-link {
         margin-right: 20px;
         text-decoration: none;
         cursor: pointer;
         position: relative;         
         display: inline-block;
         color: #999;
         height: 24px;
         line-height: 24px;
         border: 1px solid #F7F7F7;
         border-radius: 3px;
         padding: 0 5px;

         &:visited {
            color: #4590e4;
         }
         &:hover {
            border: 1px solid #ccc;
            background-color: #fff;
            border-radius: 3px;
         }
         .next-icon {
            position: absolute;
            top: 50%;
            right: -15px;
            width: 8px;
            height: 12px;
            margin-top: -6px;
            background: url('#{$img-path}/icons.png') no-repeat -55px -21px;
         }
      }
   }
   .paging-turning {
      float: right;
      padding: 18px 20px 0 0;
   }
   .contact-head li {
      font-family: 'Microsoft Yahei' !important;
      color: #333 !important;
      line-height: 48px !important;
   }
   ul, li {
      list-style: none;
      float: left;
   }
   ul {
      width: 100%;
      position: relative;
      min-width: 720px;
      font-size: 0;
      hr {
         width: 98%;
         border: none;
         border-top: 1px solid #efefef;
         margin-left: 10px;
         float: left;
      }
   }
   li {
      position: relative;
      line-height: 48px;
   }
   .contact-head {
      height: 48px;
      z-index:60;
      background: #FFF;
   }
   .list-staffName-active, .list-active, .list-staffName, .list-id, .list-deptName, .list-dutyName, .list-mobile, .list-email {
      font-size: 13px;     
      overflow-x: hidden;
      text-overflow: ellipsis;
      text-align: left;
   }
   .list-staffName-active, .list-staffName, .list-deptName, .list-dutyName, .list-mobile, .list-email {
      .staff-col {
         white-space: nowrap;
         overflow-x: hidden;
         text-overflow: ellipsis;
      }
   }
   .list-staffName-active, .list-staffName {
      color: #333333;
      font-weight: bold;
      vertical-align: middle;
   }
   .list-deptName, .list-dutyName, .list-mobile, .list-email {
      .staff-col {
         padding-left: 30px;
      }
   }
   .list-staffName-mg span {
      margin-left: 20px;
   }
   .list-staffName div:first-child, .list-staffName-active div:first-child {
      margin-left: 20px;
      margin-right: 10px;
      color: #fff;
      display: inline-block;
      width: 35px;
      height: 35px;
      line-height: 35px;
      font-size: 13px;
      text-align: center;
      font-weight: normal;
      border-radius: 4px;
   }
   .list-staffName-active {
      width: 22%;
      min-width: 165px;
   }
   .list-staffName {
      width: 15%;
      min-width: 112.5px;
   }
   .leader-icon {
      background-image: url(#{$img-path}/staff-icons.png);
      background-repeat: no-repeat;
      background-position: -4px -3px;
      margin-right: 10px;
      width: 16px;
      height: 16px;
      display: inline-block;
      vertical-align: sub;
   }
   .parttime-icon {
      background-color: #f0a522;
      color: #FFF;
      padding: 2px 4px;
      border-radius: 4px;
      margin-right: 10px;
      font-size: 12px;
   }
   .list-active {
      width: 7%;
      min-width: 52.5px;
      color: #CCC;
   }
   .list-deptName, .list-mobile {
      width: 25%;
      min-width: 115px;
   }
   .list-dutyName {
      width: 24%;
      min-width: 123px;
   }
   .list-email {
      width: 25%;
      min-width: 182px;
   }
   .staff-list-wrap {
      width: 100%;
      position: absolute;
      top: 109px;
      bottom: 0;
      overflow: hidden;
      overflow-y: auto;
      .page-box {
         float:left;
         padding:30px 20px 30px 0;
         box-sizing: border-box;
         width: 100%;
      }
      .nodata {
         height: 50px;
         line-height: 50px;
         border: none;
         text-align: center;
         font-size: 16px;
         font-family: "Microsoft Yahei";
         padding-top: 100px;
      }
   }
}
</style>