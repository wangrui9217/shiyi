<template>
  <div class="login-account-manage">
    <el-row style="margin-top:10px" class="search-form">
      <el-col :sapn="24">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" align="left" ref="searchForm">
          <el-form-item>
            <el-cascader size="small" :options="storesOptions" v-model="searchForm.stores" placeholder="请选择门店" @change="getSelectedStoreId1" filterable change-on-select>
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.role" placeholder="请选择角色" size="small">
              <el-option :label="rolesItem.name" :value="rolesItem.id" v-for="rolesItem in rolesOptions" :key="rolesItem.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.status" placeholder="请选择账号状态" size="small">
              <el-option :label="statusItem.name" :value="statusItem.id" v-for="statusItem in accountStatusOptions" :key="statusItem.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.key" placeholder="用户名称/登陆账号/联系人/联系电话" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="resetForm('searchForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="padding-bottom:8px;">
      <el-col align="right">
        <el-button type="primary" size="small" @click="clickAddAccount">新增账号</el-button>
        <span style="padding-right:20px" @click="tableExport">导出</span>
      </el-col>
    </el-row>
    <el-row class="table h100">
      <el-col class="h100">
        <el-table ref="table" :data="tableData" style="width: 100%" height="100%">
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column property="username" align="left" label="登陆账号">
          </el-table-column>
          <el-table-column property="contacts_name" align="left" label="联系人">
          </el-table-column>
          <el-table-column property="phone" align="left" label="联系电话">
          </el-table-column>
          <el-table-column property="store_name" align="left" label="所属门店">
          </el-table-column>
          <el-table-column property="role" align="left" label="所属角色">
          </el-table-column>
          <el-table-column property="status" align="left" label="账号状态">
          </el-table-column>
          <el-table-column align="left" label="操作" width="250">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="isResetPassword(scope.row.id)">
                重置密码
              </el-button>
              <el-button size="mini" type="primary" @click="clickEdit(scope.row.id)">
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="isdeleteAccount(scope.row.id)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-pagination :background="true" @current-change="pageChange" :page-size="searchForm.pageSize" :current-page="searchForm.pageIndex" layout="total,prev, pager, next" :total="searchForm.pageTotal">
    </el-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="editOraddLoginAccountDialog" align="left" top="3%">
      <el-form :model="editOrAddForm" :rules="editOrAddRules" ref="editOrAddForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="所属门店：" prop="stores">
          <el-cascader :options="storesOptions" v-model="editOrAddForm.stores" placeholder="请选择门店" @change="getSelectedStoreId" filterable change-on-select>
          </el-cascader>
        </el-form-item>
        <el-form-item label="登陆账号：" prop="username">
          <el-input v-model="editOrAddForm.username"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码：" prop="password">
          <el-input v-model="editOrAddForm.password" :minlength="6" :maxlength = "7"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contacts_name">
          <el-input v-model="editOrAddForm.contacts_name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input v-model="editOrAddForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="设置角色：" prop="role">
          <el-select v-model="editOrAddForm.role" placeholder="请选择角色">
            <el-option :label="rolesItem.name" :value="rolesItem.id" v-for="rolesItem in rolesOptions" :key="rolesItem.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态：" prop="status">
          <el-select v-model="editOrAddForm.status" placeholder="请选择账号状态">
            <el-option :label="statusItem.name" :value="statusItem.id" v-for="statusItem in accountStatusOptions" :key="statusItem.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditOrAddForm('editOrAddForm')">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  loginAccountOptionsRequest,
  addAccountRequest,
  loginAccountListRequest,
  loginAccountDetailRequest,
  updateAccountDetailRequest,
  resetPasswordRequest,
  deleteAccountRequest
} from '@/service/index'
import { validatePhone } from '@/utils/tools'
// 手机号验证
export default {
  data () {
    return {
      searchForm: {
        stores: [],
        store_id: '',
        role: '',
        status: '',
        key: '',
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 10
      }, // 搜索表单
      tableData: [], // 表格的数据
      editOraddLoginAccountDialog: false, // 编辑或者添加登陆账号的弹窗
      editOrAddForm: {
        stores: [],
        store_id: '', // 门店的id
        username: '', // 登陆账号
        password: 'ty12345678', // 密码
        contacts_name: '', // 联系人
        phone: '', // 手机号
        role: '', // 角色
        status: '10' // 状态
      }, // 编辑或者添加的表单
      editOrAddRules: {
        stores: [{ required: true, message: '请选择门店', trigger: 'blur' }],
        username: [
          { required: true, message: '登陆账号不能为空', trigger: 'blur' }
        ],
        contacts_name: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        phone: [
          {
            required: true,
            validator: validatePhone,
            trigger: ['blur', 'change']
          }
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        status: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      }, // 校验编辑和添加的规则
      edit: false,
      dialogTitle: '新增登陆账号',
      optionsLoading: false, // 选项数据的加载
      storesOptions: [], // 门店的选项数据
      rolesOptions: [], // 角色的选项数据
      accountStatusOptions: [], // 账户状态
      tableListLoading: true

    }
  },

  components: {},

  computed: {},
  created () {},
  mounted () {
    this.getOptionsData()
    this.search()
  },

  methods: {
    search () {
      const params = {
        'search[store_id]': this.searchForm.store_id,
        'search[username]': this.searchForm.key,
        'search[contacts_name]': this.searchForm.key,
        'search[phone]': this.searchForm.key,
        'search[role]': this.searchForm.role,
        'search[status]': this.searchForm.status,
        'per-page': this.searchForm.pageSize,
        page: this.searchForm.pageIndex
      }
      loginAccountListRequest(params).then(res => {
        this.tableData.splice(0)
        if (res._meta) {
          this.searchForm.pageTotal = parseInt(res._meta.totalCount) || 0
          this.searchForm.pageTotal = parseInt(res.count) || 0
        }
        if (res.items && res.items.length > 0) {
          this.tableData.push(...res.items)
        }
      })
    }, // 搜索
    resetForm (formName) {
      this.searchForm = {
        stores: [],
        store_id: '',
        role: '',
        status: '',
        key: '',
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 10
      }
    }, // 重置表单
    pageChange (val) {
      this.searchForm.pageIndex = val
      this.search()
    }, // 分页查询
    editOraddLoginAccount () {
      this.editOraddLoginAccountDialog = true
    }, // 编辑或者添加登陆账号
    submitEditOrAddForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.edit) {
            this.updataLoginAccountDetail(this.editOrAddForm)
          } else {
            this.addLoginAccount(this.editOrAddForm)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }, // 提交
    resetPassword (id) {
      const params = {
        customer_id: parseInt(id)
      }
      resetPasswordRequest(params).then(res => {
        this.$message({
          type: 'success',
          message: '重置密码成功'
        })
        this.search()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    }, // 重置密码
    deleteAccount (id) {
      const params = {
        customer_id: parseInt(id)
      }
      deleteAccountRequest(params).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功~'
        })
        this.search()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    }, // 删除账户
    isdeleteAccount (id) {
      var _this = this
      this.showdialog({
        title: '删除账号',
        content: '确认删除当前登陆账号？',
        callback: function (id) {
          _this.deleteAccount(id)
        }
      }, id)
    }, // 删除用户
    showdialog (obj, id) {
      this.$confirm(obj.content, obj.title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (obj.callback) {
            obj.callback(id)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }, // 展示对话框//{title:title,content:content,successMessage:successMessage,callback:callback}
    isResetPassword (id) {
      let _this = this
      this.showdialog({
        title: '重置密码',
        content: '确认将密码重置为：ty12345678？',
        callback: function (id) {
          _this.resetPassword(id)
        }
      }, id)
    }, // 重置密码
    getOptionsData () {
      loginAccountOptionsRequest()
        .then(res => {
          // eslint-disable-next-line
          this.storesOptions.splice(0);
          this.accountStatusOptions.splice(0)
          this.rolesOptions.splice(0)
          if (res.store && res.store instanceof Object) {
            this.storesOptions.push(...this.objHandle(res.store))
            console.log(this.storesOptions)
            // this.storesOptions = this.objHandle(res.store);
          }
          if (res.status && res.status instanceof Object) {
            // this.accountStatusOptions = this.jsonToArray(res.status);
            this.accountStatusOptions.push(...this.jsonToArray(res.status))
            console.log(this.accountStatusOptions)
          }
          if (res.role && res.role instanceof Object) {
            this.rolesOptions.push(...this.jsonToArray(res.role))
            // this.rolesOptions = this.jsonToArray(res.role);
          }
        })
    }, // 获得门店/角色/状态的选项的数据
    clickAddAccount () {
      this.edit = false
      this.dialogTitle = '新增登陆账号'
      this.editOraddLoginAccountDialog = true
      this.editOrAddForm = {
        stores: [],
        store_id: '', // 门店的id
        username: '', // 登陆账号
        password: 'ty12345678', // 密码
        contacts_name: '', // 联系人
        phone: '', // 手机号
        role: 1, // 角色
        status: '' // 状态
      }
    }, // 点击新增登陆用户
    clickEdit (id) {
      this.edit = true
      this.dialogTitle = '编辑登陆账号'
      this.getLoginAccountDetail(parseInt(id))
      this.editOrAddForm.customer_id = parseInt(id)
    }, // 点击编辑
    addLoginAccount (params) {
      this.editOraddLoginAccountDialog = false
      addAccountRequest(params)
        .then(res => {
          this.$message({
            type: 'success',
            message: '新增账号成功'
          })
          this.search()
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    }, // 添加登陆账号
    // getLoginAccountListData() {
    //   loginAccountListRequest().then(res => {
    //     this.tableData.splice(0)
    //     if(res.items && res.items.length > 0){
    //       this.tableData.push(...res.items)
    //     }
    //   });
    // }, //获得登陆用户列表的数据
    // tableExport(){
    //   const params = {
    //     "search[store_id]" : this.searchForm.store_id,
    //     "search[username]": this.searchForm.key,
    //     "search[contacts_name]": this.searchForm.key,
    //     "search[phone]": this.searchForm.key,
    //     "search[role]": this.searchForm.role,
    //     "search[status]": this.searchForm.status,
    //      "per-page":this.searchForm.pageSize,
    //      page:this.searchForm.pageIndex
    //   }
    //   tableExportRequest(params).then(res => {
    //    alert(res)
    //   }).catch(err => {

    //   })
    // }, // 导出表格
    tableExport () {
      if (this.tableData.length === 0) {
        return this.$message({
          type: 'info',
          message: '数据为空不能导出'
        })
      }
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['登陆账号', '联系人', '联系电话', '所属门店', '所属角色', '账号状态']
        const filterVal = ['username', 'contacts_name', 'phone', 'store_name', 'role', 'status']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'haha',
          autoWidth: true
        })
      })
    }, // 表格导出
    getLoginAccountDetail (id) {
      const params = {
        id: id
      }
      loginAccountDetailRequest(params)
        .then(res => {
          if (res) {
            this.editOrAddForm.store_id = res.store_id || ''
            this.editOrAddForm.username = res.username || ''
            this.editOrAddForm.password = res.password || ''
            this.editOrAddForm.contacts_name = res.contacts_name || ''
            this.editOrAddForm.phone = res.phone || ''
            this.editOrAddForm.role = res.role || ''
            this.editOrAddForm.status = res.status || ''
            this.editOrAddForm.stores.push(res.store_id)
            this.editOraddLoginAccountDialog = true
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    }, // 获得登陆用户的详情
    updataLoginAccountDetail (params) {
      updateAccountDetailRequest(params)
        .then(res => {
          this.editOraddLoginAccountDialog = false
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.search()
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    }, // 更新用户的信息
    cancel () {
      this.editOraddLoginAccountDialog = false
    }, // 取消
    jsonToArray (json) {
      var arr = []
      for (var k in json) {
        var itemObj = {
          id: parseInt(k),
          name: json[k]
        }
        arr.push(itemObj)
      }
      return arr
    }, // json转化为数组
    objHandle (obj) {
      let newArray = []
      let newObj = {
        value: obj.id,
        label: obj.store_name,
        children: []
      }
      if (obj.childs && obj.childs.length > 0) {
        obj.childs.forEach(el => {
          const level1 = {
            value: el.id,
            label: el.store_name,
            children: []
          }
          if (el.childs && el.childs.length > 0) {
            el.childs.forEach(ele => {
              const level2 = {
                value: ele.id,
                label: ele.store_name
              }
              level1.children.push(level2)
            })
          }
          newObj.children.push(level1)
        })
      }
      newArray.push(newObj)
      return newArray
    }, // 对象处理针对级联选择器
    getSelectedStoreId (val) {
      if (val && val.length > 0) {
        this.editOrAddForm.store_id = parseInt(val[val.length - 1])
      }
    },
    getSelectedStoreId1 (val) {
      if (val && val.length > 0) {
        this.searchForm.store_id = parseInt(val[val.length - 1])
      }
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return v[j]
        } else {
          return v[j]
        }
      }))
    } // 导出excel表格用到的
  }
}
</script>
<style>
.login-account-manage {
  /* width: 100%; */
  height: 100%;
  padding: 10px 10px 60px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-x: scroll;
}
.login-account-manage .table {
  flex: 1 1 auto;
  overflow: hidden;
}
.login-account-manage .search-form .el-input {
  width: 140px;
}
.login-account-manage .search-form .el-form-item__content {
  line-height: 1;
}
.h100 {
  height: 100%;
}
.el-pagination {
  position: absolute;
  right: 0;
  bottom: 15px;
}
.login-account-manage .el-pagination.is-background .btn-next,
.login-account-manage .el-pagination.is-background .btn-prev,
.login-account-manage .el-pagination.is-background .el-pager li {
  background: #fff;
}
.login-account-manage .el-button--mini,
.login-account-manage .el-button--mini.is-round {
  padding: 5px;
}
.login-account-manage .el-cascader {
  display: block;
}
.login-account-manage .el-select {
  display: block;
}
.login-account-manage .el-dialog__body {
  padding-left: 6%;
  padding-right: 20%;
}
</style>
