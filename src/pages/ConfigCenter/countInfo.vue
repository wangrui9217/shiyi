<template>
  <div>
    <my-form ref="childMethod" :title="title" @modalConfirm="modalConfirm">
      <div slot="content" >
        <el-form :model="editOrAddForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="form-content">
            <el-form-item label="登录账号:" prop="username">
              <el-input v-model="editOrAddForm.username" placeholder="请输入登录账号" size="small" :disabled="!this.isAdd"></el-input>
            </el-form-item>
            <el-form-item label="登录密码:" prop="password" >
              <el-input v-model="editOrAddForm.password" placeholder="请输入登录密码" size="small"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" prop="name">
              <el-input v-model="editOrAddForm.name" placeholder="请输入联系人" size="small"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="phone">
              <el-input v-model="editOrAddForm.phone" placeholder="请输入联系电话" size="small"></el-input>
            </el-form-item>
            <el-form-item label="设置角色:" prop="role">
              <el-select v-model="editOrAddForm.role" placeholder="请选择角色类型" size="small">
                <el-option :label="statusItem.name" :value="statusItem.id" v-for="statusItem in options" :key="statusItem.id" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号状态:" prop="status">
              <el-select v-model="editOrAddForm.status" placeholder="请选择账号状态" size="small">
                <el-option :label="statusItem.name" :value="statusItem.id" v-for="statusItem in options3" :key="statusItem.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </my-form>
  </div>
</template>

<script>
import {validatePhone} from '@/utils/tools'
import {
  addAccountRequest,
  updateAccountDetailRequest
} from '../../service/index'
export default {
  data () {
    var validatePass4 = (rule, value, callback) => {
      let temp = value.trim().replace(/\s/g, '')
      if (temp === '') {
        callback(new Error('请输入登录名'))
      } else {
        let temp2 = value.trim().split(' ')
        if (temp2.length !== 1) {
          callback(new Error('登录名中不能包含空格'))
        }
        if (temp.length < 4) {
          callback(new Error('登录名最少4位'))
        }
        if (temp.length > 20) {
          callback(new Error('登录名最多20位'))
        }
        callback()
      }
    }
    var validatePass5 = (rule, value, callback) => {
      let temp = value.trim().replace(/\s/g, '')
      if (temp === '') {
        callback(new Error('请输入联系人'))
      } else {
        if (temp.length > 20) {
          callback(new Error('最多输入20个字符'))
        }
        callback()
      }
    }
    var validatePass6 = (rule, value, callback) => {
      let temp = value.trim().replace(/\s/g, '')
      if (temp === '') {
        this.isAdd ? callback(new Error('请输入登录密码')) : callback()
      } else {
        if (temp.length > 20) {
          callback(new Error('最多输入20个字符'))
        }
        if (temp.length < 8) {
          callback(new Error('最少输入8个字符'))
        }
        if (!isNaN(temp)) {
          callback(new Error('密码不能为纯数字'))
        }
        callback()
      }
    }
    return {
      isAdd: '',
      that: '',
      title: '',
      rules2: {
        username: [
          {
            required: true,
            message: '请输入登录账号',
            trigger: 'blur'
          },
          {
            validator: validatePass4,
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          },
          {
            validator: validatePass5,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: validatePass6,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          },
          {
            validator: validatePhone,
            message: '请输入正确格式的电话',
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: '请设置角色',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择角色状态',
            trigger: 'blur'
          }
        ]
      },
      editOrAddForm: {
        store_id: '', // 门店的id
        username: '', // 登陆账号
        password: '', // 密码
        contacts_name: '', // 联系人
        phone: '', // 手机号
        role: '11', // 角色
        status: '' // 状态
      } // 编辑或者添加的表单
    }
  },
  methods: {
    // 新增账号初始化
    openModalInit () {
      this.editOrAddForm = {
        username: '', // 登陆账号
        password: '', // 密码
        name: '', // 联系人
        phone: '', // 手机号
        role: '11', // 角色
        status: 10 // 状态
      }
      // 角色暂无
    },
    addLoginAccount () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.editOrAddForm.store_id = this.that.chooseId
          this.editOrAddForm.name = this.editOrAddForm.name.trim().replace(/\s/g, '')
          this.editOrAddForm.customer_id = this.that.customer_id
          console.log(this.editOrAddForm, '新增表单参数')
          addAccountRequest(this.editOrAddForm)
            .then(res => {
              this.$message({
                type: 'success',
                message: '新增账号成功'
              })
              this.that.searchCountInfo()
              this.$refs.childMethod.modalClose()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    modalOpen (_this, flag, item) {
      if (!flag) {
        this.isAdd = true
        this.title = '新增账号'
        this.openModalInit()
      } else {
        this.isAdd = false
        this.title = '编辑登录账号'
        this.editOrAddForm = JSON.parse(JSON.stringify(item))
        this.editOrAddForm.customer_id = parseInt(item.id)
        this.editOrAddForm.store_id = this.chooseId
        this.editOrAddForm.password = ''
        this.editOrAddForm.role = '11'
        this.editOrAddForm.status = '11'
      }
      this.that = _this
      this.$refs.childMethod.modalOpen()
    },
    // 修改
    updataLoginAccountDetail () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let temp = JSON.parse(JSON.stringify(this.editOrAddForm))
          temp.name = temp.name.trim().replace(/\s/g, '')
          temp.customer_id = this.that.customer_id
          console.log(temp)
          updateAccountDetailRequest(temp)
            .then(res => {
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.that.searchCountInfo()
              this.$refs.childMethod.modalClose()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        }
      })
    },
    modalConfirm () {
      this.isAdd ? this.addLoginAccount() : this.updataLoginAccountDetail()
    }
  },
  mounted () {
  },
  components: {},
  filters: {},
  computed: {},
  watch: {},
  props: {
    options: [], // 角色选项
    options3: null
  }
}
</script>

<style scoped lang="less">
  .form-content {
    padding: 22px 70px 37px 70px;
    /*border-bottom: 1px solid #e9e9e9;*/
    .el-select {
      width: 100%;
    }
    .el-cascader {
      width: 100%;
    }
    .el-form-item:nth-last-child(1){
      margin-bottom: 0;
    }
  }
</style>
