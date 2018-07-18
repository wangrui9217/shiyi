<template>
  <div>
    <my-form ref="childMethod" :title="title" @modalConfirm="modalConfirm">
        <div slot="content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div class="form-content">
              <el-form-item label="门店名称:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入门店名称" size="small" :disabled="!this.that.parent_id&&this.isUpdate"></el-input>
              </el-form-item>
              <el-form-item label="门店负责人:" prop="people" >
                <el-input v-model="ruleForm.people" placeholder="请输入门店负责人" size="small"></el-input>
              </el-form-item>
              <el-form-item label="门店电话:" prop="phone" >
                <el-input v-model="ruleForm.phone" placeholder="请输入门店电话" size="small"></el-input>
              </el-form-item>
              <el-form-item label="门店地址:" prop="location">
                <el-cascader :options="options2" v-model="ruleForm.location"  change-on-select placeholder="请选择省市区" size="small" :props="props"></el-cascader>
              </el-form-item>
              <el-form-item label="" prop="detail">
                <el-input v-model="ruleForm.detail" placeholder="详细地址" size="small"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
    </my-form>
  </div>
</template>

<script>
import {validatePhone} from '@/utils/tools'
import {locationOption} from '@/utils/location'
import {
  addStoreList,
  updateStoreList
} from '../../service/index'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      let temp = value.toString().trim().replace(/\s/g, '')
      if (temp === '') {
        callback(new Error('请输入门店名称'))
      } else {
        if (temp.length > 20) {
          callback(new Error('最多输入20个字符'))
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      let temp = value.toString().trim().replace(/\s/g, '')
      if (temp === '') {
        callback(new Error('请输入门店负责人'))
      } else {
        if (temp.length > 20) {
          callback(new Error('最多输入20个字符'))
        }
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      let temp = value.toString().trim().replace(/\s/g, '')
      if (temp === '') {
        callback(new Error('请输入门店详细地址'))
      } else {
        if (temp.length > 50) {
          callback(new Error('最多输入50个字符'))
        }
        callback()
      }
    }
    return {
      title: '',
      options2: locationOption,
      isUpdate: '',
      props: {
        value: 'label',
        children: 'children'
      },
      that: '',
      ruleForm: {
        name: '',
        people: '',
        phone: '',
        location: [],
        detail: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入门店名称',
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        people: [
          {
            required: true,
            message: '请输入门店负责人',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入门店电话',
            trigger: 'blur'
          },
          {
            validator: validatePhone,
            message: '请输入正确格式的门店电话',
            trigger: 'blur'
          }
        ],
        location: [
          {
            required: true,
            message: '请选择门店地址',
            trigger: 'blur'
          }
        ],
        detail: [
          {
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          },
          {
            validator: validatePass3,
            trigger: 'blur'
          },
          {
            max: 50,
            message: '最多输入50个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 新增门店
    addList () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            parent_id: this.that.chooseId,
            name: this.ruleForm.name.trim().replace(/\s/g, ''),
            contacts: this.ruleForm.people.trim().replace(/\s/g, ''),
            phone: this.ruleForm.phone,
            address: this.ruleForm.location.join(),
            store_add_detail: this.ruleForm.detail.trim().replace(/\s/g, ''),
            // customer_id: 7
            customer_id: this.that.storeInfo.customer_id
          }
          console.log(params)
          addStoreList(params)
            .then(res => {
              this.$message.success('添加成功')
              this.$refs.childMethod.modalClose()
              // this.resetForm(formName, childMethod)
              this.that.initTreeData(this.that.chooseId)
            })
            .catch(err => {
              console.log(err)
              this.$message.error(err)
            })
        } else {
          return false
        }
      })
    },
    // 编辑门店
    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            id: this.ruleForm.id,
            name: this.ruleForm.name,
            contacts: this.ruleForm.people,
            phone: this.ruleForm.phone,
            address: this.ruleForm.location.join(),
            store_add_detail: this.ruleForm.detail,
            customer_id: this.that.storeInfo.customer_id
          }
          updateStoreList(params.id, params).then(res => {
            // console.log(res)
            this.$message.success('编辑成功')
            this.$refs.childMethod.modalClose()
            this.that.pageStoreState(this.that.chooseId)
            this.that.initTreeData(this.that.chooseId)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    modalOpen (_this, flag) {
      this.that = _this
      this.$refs.childMethod.modalOpen()
      if (flag) {
        this.title = '编辑门店'
        this.isUpdate = true
        this.editStore()
      } else {
        this.title = '添加下级'
        this.isUpdate = false
        this.ruleForm = {}
      }
    },
    // 打开修改门店参数
    editStore () {
      this.ruleForm = {
        id: this.that.storeInfo.id,
        name: this.that.storeInfo.name.trim().replace(/\s/g, ''),
        people: this.that.storeInfo.contacts,
        phone: this.that.storeInfo.phone,
        location: this.getLocation(this.that.storeInfo.address),
        detail: this.that.storeInfo.store_add_detail
      }
      console.log(this.ruleForm, '传进来的参数')
    },
    modalConfirm () {
      this.isUpdate ? this.submitForm() : this.addList()
    },
    getLocation: (val) => {
      if (val) return val.split(',')
      else {
        return []
      }
    }
  },
  mounted () {},
  components: {},
  filters: {},
  computed: {},
  watch: {}
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
