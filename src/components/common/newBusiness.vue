<!--新增业务编辑业务-->
<template>
  <div>
    <my-form ref="childMethod" :width="805" :title="title" @modalConfirm="modalConfirm" @modalClose="initData">
      <div slot="content">
        <div class="add-work">
          <div class="add-title">{{ruleForm.business_names}}</div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div class="form-content">
              <el-form-item label="所属门店:" prop="store_id">
                <el-cascader
                  v-model="ruleForm.store_id"
                  placeholder="请选择所属门店"
                  size="small"
                  :props="props"
                  :options="store_option"
                  change-on-select
                ></el-cascader>
              </el-form-item>
              <el-form-item label="业务员:" prop="salesman_name">
                <el-input v-model="ruleForm.salesman_name" placeholder="请输入业务员名称" size="small"></el-input>
              </el-form-item>
              <el-form-item label="贷款金额:" prop="loan_amount">
                <el-input v-model="ruleForm.loan_amount" placeholder="请输入贷款金额" size="small"></el-input>
              </el-form-item>
              <el-form-item label="业务电话:" prop="salesman_phone">
                <el-input v-model="ruleForm.salesman_phone" placeholder="请输入业务电话" size="small"></el-input>
              </el-form-item>
              <el-form-item label="联系人:" prop="contact_name">
                <el-input v-model="ruleForm.contact_name" placeholder="请输入联系人" size="small"></el-input>
              </el-form-item>
              <el-form-item label="联系电话:" prop="contact_phone">
                <el-input v-model="ruleForm.contact_phone" placeholder="请输入联系电话" size="small"></el-input>
              </el-form-item>
              <el-form-item label="开始日期:" prop="start_time">
                <el-date-picker v-model="ruleForm.start_time" placeholder="请输入开始日期" size="small" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="截止日期:" prop="end_time">
                <el-date-picker v-model="ruleForm.end_time" placeholder="请输入截止日期" size="small" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="合同号:" prop="contract_num">
                <el-input v-model="ruleForm.contract_num" placeholder="请输入合同号" size="small"></el-input>
              </el-form-item>
              <el-form-item label="备注信息:" prop="remark">
                <el-input v-model="ruleForm.remark" placeholder="请输入备注信息" size="small"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="label">
            <div class="left">标签:</div>
            <div class="right">
              <el-tag
                v-for="(tags, index) in ruleForm.tag"
                :key="index"
                closable
                @close="handleClose(tags)"
              >
                {{tags}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新建标签</el-button>
            </div>
          </div>
          <!--<div class="label">-->
            <!--<div class="left"></div>-->
            <!--<div class="right tag-box">-->
              <!--<div class="my-tag" v-for="tags in tagOptions" :key="tags.id" @click="addTags(tags)" :class="{disabled: isInTag(ruleForm.tag,tags)}">-->
                <!--{{tags.tag_name}}-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </my-form>
  </div>
</template>

<script>
import { validatePhone } from '@/utils/tools'
import {
  getStoreTreeList,
  addBusiness,
  upBusiness
  // addTag,
  // showTag
} from '../../service/index'
export default {
  data () {
    var validateTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入结束时间'))
      } else if (this.timeJudge(this.ruleForm.start_time, value)) {
        callback(new Error('截止日期不能早于开始日期!'))
      } else {
        callback()
      }
    }
    var validateTime2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入开始时间'))
      } else {
        this.$refs.ruleForm.validateField('end_time')
        callback()
      }
    }
    return {
      props: {
        value: 'id',
        label: 'name',
        children: 'level'
      },
      inputVisible: false,
      inputValue: '',
      tagOptions: [],
      that: null,
      car_id: null,
      isAdd: null,
      title: '',
      // 门店选项
      options: [],
      store_option: [],
      rules: {
        store_id: [
          {
            required: true,
            message: '请选择所属门店',
            trigger: 'change'
          }
        ],
        salesman_name: [
          {
            required: true,
            message: '请输入业务员名称',
            trigger: 'blur'
          }
        ],
        loan_amount: [
          {
            required: true,
            message: '请输入贷款金额',
            trigger: 'blur'
          }
        ],
        salesman_phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: validatePhone,
            message: '请输入正确格式的电话',
            trigger: 'blur'
          }
        ],
        contact_phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: validatePhone,
            message: '请输入正确格式的电话',
            trigger: 'blur'
          }
        ],
        start_time: [
          {
            validator: validateTime2,
            trigger: 'blur'
          }
        ],
        end_time: [
          {
            validator: validateTime,
            trigger: 'blur'
          }
        ],
        contact_name: [
          {
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          }
        ],
        contract_num: [
          {
            required: true,
            message: '请输入合同号',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: '请输入备注信息',
            trigger: 'blur'
          }
        ]
      },
      ruleForm: {
        business_names: '',
        store_id: null,
        store_name: '',
        business_id: '',
        business: '',
        salesman_name: '',
        salesman_phone: '',
        contract_num: '',
        start_time: '',
        end_time: '',
        loan_amount: '',
        tag_info: [],
        tag: []
      },
      callback: null,
      parentIdList: []
    }
  },
  methods: {
    // 判断是否存在标签
    isInTag (options, tag) {
      let flag = false
      try {
        options.map(value => {
          if (value.id === tag.id && value.tag_name === tag.tag_name) {
            flag = true
          }
        })
        return flag
      } catch (e) {
        console.log(e)
      }
    },
    // 初始化门店选择菜单
    initTreeData () {
      getStoreTreeList().then(res => {
        this.store_option = this.filterEmptyArray(res)
        console.log(res, '门店树信息', this.store_option)
        // this.getTreeOption(tree)
      })
    },
    filterEmptyArray (array) {
      array.map(value => {
        if (value.level.length === 0) {
          delete value.level
        } else {
          this.filterEmptyArray(value.level)
        }
      })
      return array
    },
    getParentId (obj, id, parent) {
      if (obj.id === id) {
        this.parentIdList.unshift(id)
        if (parent) {
          this.store_option.map(value => {
            this.getParentId(value, parent.id)
          })
        }
      } else if (obj.level) {
        obj.level.map(value => {
          this.getParentId(value, id, obj)
        })
      }
    },
    // 反向递归获取门店id
    getReturnTreeidObject (id) {
      this.parentIdList = []
      this.store_option.map(value => {
        this.getParentId(value, id)
      })
      return this.parentIdList
    },
    // end
    // 初始化标签
    // initTag () {
    //   showTag().then(res => {
    //     this.tagOptions = res
    //   })
    // },
    addTags (tag) {
      if (!this.isInTag(this.ruleForm.tag, tag)) {
        this.ruleForm.tag.push(tag)
      }
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        // let params = {
        //   tag_name: inputValue
        // }
        // addTag(params).then(res => {
        //   console.log(res)
        //   this.initTag()
        // })
        if (this.ruleForm.tag.indexOf(inputValue) === -1) {
          this.ruleForm.tag.push(inputValue)
        } else {
          this.$message.error('标签已存在')
        }
        console.log(this.ruleForm.tag, 999)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleClose (tag) {
      this.ruleForm.tag.splice(this.ruleForm.tag.indexOf(tag), 1)
    },
    getTagId (arry) {
      let temp = ''
      try {
        arry.map(res => {
          if (!temp) {
            temp = res.id
          } else {
            temp = res.id + ',' + temp
          }
        })
      } catch (e) {}
      return temp
    },
    // 标签end
    modalOpen (commond, carid, _this) {
      this.that = _this
      this.car_id = carid
      this.title = '编辑业务'
      this.isAdd = false
      this.ruleForm = JSON.parse(JSON.stringify(commond))
      this.ruleForm.name = commond.business_names
      this.ruleForm.store_id = this.getReturnTreeidObject(commond.store_id)
      this.$set(this.ruleForm, 'tag', commond.tag ? commond.tag.split(',') : [])
      console.log(this.ruleForm, '传进来的参数')
      this.$refs.childMethod.modalOpen()
    },
    modalOpen2 (commond, carid, _this) {
      this.that = _this
      this.car_id = carid
      this.title = '新增业务'
      this.isAdd = true
      this.ruleForm = JSON.parse(JSON.stringify(commond))
      this.ruleForm.name = commond.business_names
      this.$set(this.ruleForm, 'tag', [])
      this.$refs.childMethod.modalOpen()
    },
    modalConfirm (obj) {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.ruleForm))
          // params.tag_type = 1
          params.car_id = this.car_id
          params.tag_info = this.getTagId(params.tag)
          params.store_id = params.store_id.pop().toString()
          params.tag = params.tag.join()
          params.table_name = 'CarLoan'
          console.log(params, '传的参数')
          if (this.isAdd) {
            // 增加业务
            addBusiness(params).then(res => {
              console.log(res)
              this.that.initState()
              obj.modalClose()
              this.$message.success('添加成功')
            })
          } else {
            // 业务编辑
            upBusiness(this.ruleForm.id, params).then(res => {
              console.log(res, '编辑信息')
              this.that.initState()
              obj.modalClose()
              this.$message.success('编辑成功')
            })
          }
        } else {
          return false
        }
      })
    },
    timeJudge (start, end) {
      let startT = Number(new Date(start))
      let endT = Number(new Date(end))
      if (startT > endT) {
        return true
      } else {
        return false
      }
    },
    initData () {}
  },
  mounted () {
    this.initTreeData()
    // this.initTag()
  },
  components: {
  },
  filters: {},
  computed: {
  },
  watch: {}
}
</script>

<style scoped lang="less">
  .my-tag{
    background-color: rgba(64,158,255,.1);
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409EFF;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .my-tag + .my-tag {
    margin-left: 10px;
  }
  .add-work{
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .demo-ruleForm{
      padding: 0 40px;
      display: flex;
      .form-content{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .el-form-item{
          width: 40%;
        }
        .el-form-item:nth-child(odd){
          margin-right: 15%;
        }
      }
    }
    font-size: 14px;
    .add-title{
      color: #5E6D82;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 13px;
    }
    .label{
      display: flex;
      padding: 0 40px;
      min-height: 40px;
      .left{
        width: 100px;
        line-height: 32px;
        padding-right: 12px;
        text-align: right;
        color: #606266;
      }
      .right{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        /*align-items: center;*/
        /deep/.el-tag{
          margin-bottom: 10px;
        }
        .disabled {
          cursor: not-allowed;
          color: #c0c4cc;
          cursor: not-allowed;
        }
      }
      .tag-box{
        padding-top: 30px;
        /deep/.el-tag .el-icon-close:before{
          transform: rotate(45deg);
        }
      }
    }
  }

</style>
