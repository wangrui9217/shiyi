<template>
  <div class="equipment">
    <my-modal ref="childMethod" title="新增门店">
      <div slot="content" class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="上级门店">
            <el-cascader :options="options" v-model="ruleForm.region" @change="handleChange" change-on-select></el-cascader>
          </el-form-item>
          <el-form-item label="门店名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="门店负责人" prop="people">
            <el-input v-model="ruleForm.people"></el-input>
          </el-form-item>
          <el-form-item label="门店电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" prop="location">
            <el-cascader :options="options2" v-model="ruleForm.location" @change="handleChange" change-on-select></el-cascader>
          </el-form-item>
          <el-form-item label="" prop="detail">
            <el-input v-model="ruleForm.detail" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addList('ruleForm','childMethod')" size="small">提交</el-button>
            <el-button @click="resetForm('ruleForm','childMethod')" size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </my-modal>
    <my-modal ref="childMethod2" title="删除门店">
      <div slot="content">
        <div class="delete-contain">
          <p v-if="errorMessage"> { { errorMessage } }
          </p>
          <P v-else>是否删除当前门店</P>
          <div>
            <template v-if="errorMessage">
              <el-button type="primary" @click="closeModal('childMethod2')" size="small">确认</el-button>
              <el-button @click="closeModal('childMethod2')" size="small">取消</el-button>
            </template>
            <template v-else>
              <el-button type="primary" size="small" @click="deleteList2('childMethod2')">确认</el-button>
              <el-button @click="closeModal('childMethod2')" size="small">取消</el-button>
            </template>
          </div>
        </div>
      </div>
    </my-modal>
    <my-modal ref="childMethod3" title="编辑门店">
      <div slot="content" class="form-content">
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="上级门店" prop="region">
            <el-cascader :options="options" v-model="ruleForm2.region" @change="handleChange" :disabled="true" change-on-select></el-cascader>
          </el-form-item>
          <el-form-item label="门店名称">
            <el-input v-model="ruleForm2.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门店负责人" prop="people">
            <el-input v-model="ruleForm2.people"></el-input>
          </el-form-item>
          <el-form-item label="门店电话" prop="phone">
            <el-input v-model="ruleForm2.phone"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" prop="location">
            <el-cascader :options="options2" v-model="ruleForm2.location" @change="handleChange" change-on-select></el-cascader>
          </el-form-item>
          <el-form-item label="" prop="detail">
            <el-input v-model="ruleForm2.detail" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" size="small">提交</el-button>
            <el-button @click="resetForm('ruleForm2','childMethod3')" size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </my-modal>
    <div class="content-top">
      <div class="top-contain">
        <p>门店列表</p>
        <div class="btn-group">
          <el-button type="primary" @click="openModal('childMethod')" size="small">新增门店</el-button>
          <el-button size="small" @click="tableExport">导出数据</el-button>
        </div>
      </div>
      <div class="form-top">
        <div class="search-group">
          <span class="text-left">上级门店:</span>
          <el-cascader :options="options" v-model="searchInfo.parent_name" @change="handleChange" change-on-select></el-cascader>
          <el-input v-model="searchInfo.search_name" placeholder="门店名称/门店负责人/门店电话" ></el-input>
        </div>
        <div>
          <el-button type="primary" size="small" @click="search">查询</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </div>
      </div>
      <div class="tips">共检索出
        <span class="warning">{{totalCount}}</span>条记录
      </div>
    </div>
    <div class="content">
      <el-row class="table-header">
        <el-col :span="4" class="ellipsis">门店名称</el-col>
        <el-col :span="4" class="ellipsis">上级门店</el-col>
        <el-col :span="3" class="ellipsis">门店负责人</el-col>
        <el-col :span="4" class="ellipsis">门店电话</el-col>
        <el-col :span="5" class="ellipsis">门店地址</el-col>
        <el-col :span="4" class="ellipsis">操作</el-col>
      </el-row>
      <div class="table-body">
        <el-row v-for="(item,index) in storeInfo" :key="index">
          <el-col :span="4" class="ellipsis">{{item.store_name}}</el-col>
          <el-col :span="4" class="ellipsis">{{item.parent_name}}</el-col>
          <el-col :span="3" class="ellipsis">{{item.contacts}}</el-col>
          <el-col :span="4" class="ellipsis">{{item.tel}}</el-col>
          <el-col :span="5" class="ellipsis">{{item.store_add}}</el-col>
          <el-col :span="4" class="ellipsis control">
            <el-button size="mini" @click="editStore('childMethod3', item)" type="primary">编辑</el-button>
            <el-button size="mini" @click="deleteList('childMethod2', item)" type="danger">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :page-count="pageTotal" @current-change="handleCurrentChange" :current-page="pageCurrent"></el-pagination>
  </div>
</template>
<script>
import MyModal from '../../components/common/MyModal'
import { validatePhone } from '@/utils/tools'
import {
  getStoreList,
  addStoreList,
  updateStoreList,
  deleteStoreList,
  fetchStoreList
} from '../../service/index'

export default {
  data () {
    return {
      pageSize: 10,
      pageCurrent: 1,
      pageTotal: null,
      totalCount: null,
      storeInfo: '',
      errorMessage: '',
      value: '',
      deleteId: '',
      region: [],
      searchInfo: {
        parent_name: [],
        search_name: ''
      },
      searchInfo2: {
        parent_name: [],
        search_name: ''
      },
      ruleForm: {
        region: [],
        name: '',
        people: '',
        phone: '',
        location: [],
        detail: ''
      },
      ruleForm2: {
        region: [],
        name: '',
        people: '',
        phone: '',
        location: [],
        detail: ''
      },
      rules: {
        region: [
          {
            required: true,
            message: '请选择上级门店名称',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入门店名称',
            trigger: 'blur'
          }
        ],
        people: [
          {
            required: true,
            message: '请输入门店负责人',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            validator: validatePhone,
            message: '请输入门店电话',
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
          }
        ]
      },
      options: [],
      options2: [
        {
          value: '111',
          label: '上海',
          children: [
            {
              value: '222',
              label: '宝山区',
              children: [
                {
                  value: '444',
                  label: '呼兰路'
                }
              ]
            },
            {
              value: '333',
              label: '徐汇区'
            }
          ]
        }
      ]
    }
  },
  components: {
    MyModal
  },
  computed: {},
  mounted () {
    this.initStoreState()
  },
  methods: {
    // 表格导出
    tableExport () {
      if (this.storeInfo.length === 0) {
        return this.$message({
          type: 'info',
          message: '数据为空不能导出'
        })
      }
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['门店名称', '上级门店', '门店负责人', '门店电话', '门店地址']
        const filterVal = ['store_name', 'parent_name', 'contacts', 'store_name', 'tel', 'store_add']
        const list = this.storeInfo
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '门店列表',
          autoWidth: false
        })
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 查询门店信息
    search () {
      let temp = JSON.stringify(this.searchInfo)
      this.searchInfo2 = JSON.parse(temp)
      this.pageCurrent = 1
      this.pageStoreState()
    },
    reset () {
      this.searchInfo = {
        parent_name: [],
        search_name: ''
      }
      this.pageCurrent = 1
      let temp = JSON.stringify(this.searchInfo)
      this.searchInfo2 = JSON.parse(temp)
      this.pageStoreState()
    },
    handleCurrentChange (val) {
      this.pageCurrent = val
      this.pageStoreState()
    },
    // 增
    addList (formName, childMethod) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            parent_id: this.ruleForm.region[this.ruleForm.region.length - 1] || null,
            store_name: this.ruleForm.name,
            contacts: this.ruleForm.people,
            tel: this.ruleForm.phone,
            store_add: this.ruleForm.location.join(),
            // store_add: '111',
            store_add_detail: this.ruleForm.detail
          }
          console.log(params)
          addStoreList(params)
            .then(res => {
              this.$message.success('添加成功')
              this.initStoreState()
              this.closeModal(childMethod)
              this.resetForm(formName, childMethod)
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
    // 删
    deleteList (formName, item) {
      this.openModal(formName)
      this.deleteId = item.id
    },
    deleteList2 (formName) {
      let params = {
        id: this.deleteId
      }
      deleteStoreList(params)
        .then(res => {
          this.closeModal(formName)
          this.initStoreState()
          this.deleteId = null
          this.$message.success('删除成功')
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 改
    editStore (formName, info) {
      this.openModal(formName)
      this.ruleForm2 = {
        region: info.parent_name.split(','),
        name: info.store_name,
        people: info.contacts,
        phone: info.tel,
        location: info.store_add.split(','),
        // location: ['111', '333'],
        detail: info.store_add_detail
      }
      console.log(info, this.ruleForm2)
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateStoreList(this.ruleForm2).then(res => {
            console.log(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 页面刷新
    pageStoreState () {
      let params = {
        'per-page': this.pageSize,
        'page': this.pageCurrent,
        'search[store_name]': this.searchInfo2.search_name
      }
      getStoreList(params)
        .then(res => {
          this.storeInfo = res.items
          this.pageTotal = res._meta.pageCount
          this.totalCount = res._meta.totalCount
          console.log(res)
          // this.storeInfo.map(val => this.$set(val, 'isCheck', false))
          // let temp = this.storeInfo.filter(val => val.isCheck)
        })
        .catch(err => {
          console.log(err)
        })
    },
    initStoreState () {
      this.pageStoreState()
      fetchStoreList().then(res => {
        let headstore = [
          {
            value: res.id,
            label: res.store_name
          }
        ]
        if (res.childs && res.childs.length > 0) {
          headstore[0].children = []
          res.childs.forEach(el => {
            const level1 = {
              value: el.id,
              label: el.store_name
            }
            if (el.childs && el.childs.length > 0) {
              level1.children = []
              el.childs.forEach(ele => {
                const level2 = {
                  value: ele.id,
                  label: ele.store_name
                }
                level1.children.push(level2)
              })
            }
            headstore[0].children.push(level1)
          })
        }
        this.options = []
        this.options.push(...headstore)
        console.log(this.options, 22222, headstore)
      })
    },
    openModal: function (formName) {
      this.$refs[formName].modalOpen()
    },
    closeModal: function (formName) {
      this.$refs[formName].modalClose()
    },

    resetForm (formName, childMethod) {
      this.$refs[formName].resetFields()
      this.$refs[childMethod].modalClose()
    },
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>
<style lang='less' scoped>
.equipment {
  height: 100%;
  flex-grow: 1;
  position: relative;
  text-align: left;
  overflow: auto;
  padding: 250px 20px 70px 20px;
  .content-top{
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    .top-contain {
      padding: 20px 0 15px;
      border-bottom: 1px solid #e9e9e9;
      border-top: 1px solid #e9e9e9;
      text-align: left;
      p {
        font-weight: bold;
        margin-bottom: 9px;
      }
      .btn-group {
        display: flex;
        justify-content: flex-end;
      }
    }
    .form-top {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      .search-group {
        .el-input {
          width: 250px;
        }
      }
      .text-left {
        margin-right: 10px;
      }
    }
    .tips {
      height: 34px;
      width: 100%;
      padding: 0 15px;
      background-color: #c8d1f6;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .warning {
        color: #eb4652;
        margin: 0 3px;
        font-weight: bold;
      }
    }
  }
  .delete-contain {
    text-align: center;
    padding: 89px 0 38px;
    & > p {
      margin-bottom: 68px;
    }
  }
  .el-pagination {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .content {
    background-color: #fff;
    height: 100%;
    padding-top: 50px;
    position: relative;
    .table-header {
      color: #909399;
      font-weight: bold;
      font-size: 14px;
      padding: 14px 0;
      border-bottom: 1px solid #ebeef5;
      position: absolute;
      width: 100%;
      top: 0;
      .ellipsis {
        text-align: center;
      }
    }
    .table-body {
      font-family: "PingFang SC", sans-serif;
      font-size: 14px;
      height: 100%;
      overflow: auto;
      .el-row {
        padding: 14px 0;
        border-bottom: 1px solid #ebeef5;
        display: flex;
        align-items: center;
      }
      .ellipsis {
        text-align: center;
        min-height: 5px;
      }
      .control {
        color: #2c4cd9;
        display: flex;
        justify-content: space-around;
        padding: 0 20px;
      }
    }
  }
}

.form-content {
  padding: 22px 32px 0 0;
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
}
</style>
