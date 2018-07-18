<template>
  <div class="equipment">
    <!--账号增加修改组件-->
    <count-info ref="countInfo" :options3="options3"></count-info>
    <!--门店增加修改组件-->
    <store-info ref="storeInfo"></store-info>
    <common-title :title="'门店账号管理'"></common-title>
      <div class="content">
        <div class="left">
          <div class="left-top">
            <el-select
              v-model="filterText"
              filterable
              remote
              :clearable="true"
              reserve-keyword
              placeholder="门店名称"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="left-bottom">
            <div class="tree-content">
              <el-tree
                class="filter-tree"
                node-key="id"
                :data="data2"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree"
                :highlight-current="true"
                :expand-on-click-node="false"
                @node-click="nodeClick"
              >
              </el-tree>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-content" ref="rightContent">
            <div class="top" v-if="!isTopLeval">
              <head-operation left="门店基础信息" :right="[{label: '添加下级', func: this.addStore, icon: 'add', iconScale: 2.5},
              {label: '编辑门店', func: this.updateStore, icon: 'write'},{label: '删除门店', func: this.delStore, icon: 'delete'}]"></head-operation>
              <div class="info-content">
                <div>
                  <div>名称</div>
                  <div>{{storeInfo.name}}</div>
                </div>
                <div>
                  <div>负责人</div>
                  <div>{{storeInfo.contacts}}</div>
                </div>
                <div>
                  <div>电话</div>
                  <div>{{storeInfo.phone}}</div>
                </div>
                <div>
                  <div>地址</div>
                  <div :title="storeInfo.address + storeInfo.store_add_detail">{{storeInfo.address}}:{{storeInfo.store_add_detail}}</div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <template v-if="!isTopLeval">
              <head-operation left="门店账号列表"  :right="[{label: '新增账号', func: this.addCount, icon: 'add', iconScale: 2.5}]"></head-operation>
              </template>
              <template v-else>
                <head-operation left="门店账号列表"></head-operation>
              </template>
              <div class="select">
                <div>
                  <el-checkbox v-model="search.checked">包含下级数据</el-checkbox>
                </div>
                <div class="group">
                  <div>所属角色:</div>
                  <el-select v-model="search.roleValue" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="search-btn">
                  <el-input placeholder="登录账号/联系人/联系电话" v-model="search.key" class="input-with-select" size="small" clearable>
                  </el-input>
                  <i class="el-icon-search"></i>
                  </div>
                </div>
              </div>
              <div class="form-info" v-loading="isLoading">
                <my-table :tableData="countInfo" :fields="fields"></my-table>
              </div>
            </div>
          </div>
          <el-pagination  layout="prev, pager, next" :page-count="pageTotal" @current-change="handleCurrentChange" :current-page="pageCurrent"></el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
import storeInfo from './storeInfo'
import countInfo from './countInfo'
import CommonTitle from '@/components/common/title'
import {
  // fetchStoreList,
  getStoreList,
  deleteStoreList,
  loginAccountOptionsRequest,
  loginAccountListRequest,
  deleteAccountRequest,
  resetPasswordRequest,
  getStoreTreeList,
  fetchUserInfo
} from '../../service/index'
export default {
  data () {
    return {
      isTopLeval: false,
      isLoading: false,
      //
      options4: [],
      value9: [],
      list: [],
      loading: false,
      states: [],
      //
      pageSize: 10,
      pageTotal: null,
      pageCurrent: 1,
      // 账号
      search: {
        key: '',
        roleValue: '',
        checked: true,
        pageIndex: 1
      },
      options: [], // 角色选项
      options3: [], // 状态选项
      countInfo: [],
      selectCountId: null,
      // 账号
      errorMessage: '',
      storeInfo: '',
      filterText: '',
      parent_id: null,
      data2: [],
      defaultProps: {
        children: 'level',
        id: 'id',
        label: 'name'
      },
      chooseId: null,
      submitValue: '',
      customer_id: '',
      fields: [
        {name: ['username'], label: '登录账号', span: 4, icon: 'count'},
        {name: ['store_view'], label: '所属门店', span: 4, icon: 'cart'},
        {name: ['name', 'phone'], label: '联系人', span: 4, icon: 'concats'},
        {name: ['use_status_view'], label: '角色', span: 3, icon: 'role', isCenter: true},
        {name: [{icon: 'edit', label: '修改'}, {icon: 'reset', label: '重置密码'}, {icon: 'delete', label: '删除'}],
          type: 'control2',
          params: [null, 'id', 'id'],
          span: 9,
          icon: '',
          control: [this.updataLoginAccountDetail, this.resetPassword, this.deleteCount]}
      ]
    }
  },

  components: {
    CommonTitle,
    storeInfo,
    countInfo
  },

  mounted () {
    this.initTreeData()
    this.getCountOption()
  },

  methods: {
    // 门店信息增
    addStore () {
      this.$refs.storeInfo.modalOpen(this)
    },
    // 门店信息改
    updateStore () {
      this.$refs.storeInfo.modalOpen(this, true)
    },
    // 门店信息删
    delStore () {
      this.$confirm('是否删除当前门店?', '删除门店', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteStoreList(this.storeInfo.id)
          .then(res => {
            this.deleteId = null
            this.$message.success('删除成功')
            this.initTreeData(this.parent_id)
          })
          .catch(err => {
            this.$message.error(err)
          })
      }).catch(() => {
      })
    },
    // 新增账号
    addCount () {
      this.$refs.countInfo.modalOpen(this)
    },
    // 筛选出智能提示的选项
    remoteMethod (query) {
      if (query !== '') {
        try {
          this.options4 = this.states.filter(item => {
            return item.label.toLowerCase().toString()
              .indexOf(query.toLowerCase()) > -1
          })
        } catch (e) {
          // console.log(e)
          this.options4 = []
        }
      } else {
        this.options4 = []
      }
    },
    // 分页
    handleCurrentChange (val) {
      this.pageCurrent = val
      this.searchCountInfo()
    },
    // 修改
    updataLoginAccountDetail (item) {
      this.$refs.countInfo.modalOpen(this, true, item)
    },
    // json转化为数组
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
    },
    // 查询用户选择
    getCountOption () {
      loginAccountOptionsRequest().then(res => {
        if (res.role && res.role instanceof Object) {
          this.options.push(...this.jsonToArray(res.role))
          // this.rolesOptions = this.jsonToArray(res.role);
        }
        if (res.status && res.status instanceof Object) {
          this.options3.push(...this.jsonToArray(res.status))
        }
        // console.log(res, 'option选项')
      })
    },
    // 搜索
    searchCountInfo () {
      const params = {
        'search[is_all]': this.search.checked ? 1 : 0,
        'search[store_id]': this.chooseId,
        'searchs': this.search.key,
        'search[role]': this.search.roleValue,
        'per-page': this.pageSize,
        'page': this.pageCurrent
      }
      this.isLoading = true
      loginAccountListRequest(params).then(res => {
        console.log(res)
        this.countInfo = res.items
        this.pageTotal = res.pagination.pageCount
        this.isLoading = false
        // this.$refs.rightContent.scrollTop = 0
        console.log(res, '查询的账户数据')
      })
    },
    // 重置密码
    resetPassword: function (countId) {
      this.$confirm('确认将密码重置为：ty12345678', '重置密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPasswordRequest(countId).then(res => {
          console.log(res)
          this.$message.success('重置密码成功')
          this.searchCountInfo()
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
      })
    },
    // 删除账号
    deleteCount: function (countId) {
      this.$confirm('是否删除当前登录账号？', '删除账号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAccountRequest(countId).then(res => {
          this.$message.success('删除成功')
          this.searchCountInfo()
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
      })
    },
    openModal: function (formName, title, content, index) {
      this.$refs[formName].modalOpen(title, content, index, function () {
        return 12
      })
    },
    closeModal: function (formName) {
      this.$refs[formName].modalClose()
    },
    resetForm (formName, childMethod) {
      this.$refs[formName].resetFields()
      this.$refs[childMethod].modalClose()
    },
    nodeClick (data) {
      this.chooseId = data.id
    },
    filterNode (value, data) {
      if (!value) return true
      return data.id.indexOf(value) !== -1
    },
    // 初始化树形菜单
    initTreeData (val) {
      fetchUserInfo().then(res => {
        let temp = res
        getStoreTreeList().then(res => {
          this.customer_id = temp.customer_id
          this.data2 = [{name: temp.name, customer_id: temp.customer_id, level: res, id: ''}]
          this.getTreeOption(res)
          this.list = this.states.map(item => {
            return {
              value: item.label,
              label: item.label
            }
          })
          console.log(this.list, '门店树相关表单数据', this.states, this.data2)
          // console.log(res, '查询的门店列表树形菜单')
          if (val) {
            this.chooseId = val
            this.$nextTick(() => { this.$refs.tree.setCurrentKey(val) })
          } else {
            this.chooseId = this.data2[0].id
            this.$nextTick(() => { this.$refs.tree.setCurrentKey(this.chooseId) })
          }
        })
      })
    },
    getStoreName (id) {
      let name = ''
      this.states.map(value => {
        if (value.value === id) {
          name = value.label
        }
      })
      return name
    },
    // 生成树形选项
    getTreeOption (obj) {
      if (obj) {
        obj.map(value => {
          let temp = {
            value: value.id,
            label: value.name
          }
          this.states.push(temp)
          if (value.level.length > 0) {
            this.getTreeOption(value.level)
          }
        })
      }
    },
    // 页面刷新
    pageStoreState (val) {
      getStoreList(val)
        .then(res => {
          // console.log(res, '门店信息')
          this.storeInfo = res
          this.parent_id = res.parent_id
          this.customer_id = res.customer_id
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
  },

  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
      if (val) {
        // console.log(this.states, 'this.states')
        this.states.map(value => {
          if (val === value.value) {
            this.chooseId = value.value
          }
        })
      } else {
        this.chooseId = this.data2[0].id
      }
      this.$nextTick(() => { this.$refs.tree.setCurrentKey(this.chooseId) })
    },
    chooseId (curVal, oldVal) {
      this.searchCountInfo()
      if (curVal) {
        this.pageStoreState(curVal)
        this.isTopLeval = false
      } else {
        this.isTopLeval = true
      }
    },
    'search.checked' (curVal, oldVal) {
      this.pageCurrent = 1
      this.searchCountInfo()
    },
    'search.roleValue' (curVal, oldVal) {
      this.pageCurrent = 1
      this.searchCountInfo()
    },
    'search.key' (curVal, oldVal) {
      this.pageCurrent = 1
      this.searchCountInfo()
    }
  },
  filters: {
  }
}

</script>
<style lang='less' scoped>
  @style-color: #4f6ffe;
  @border-line-color: #f2f5fa;
  /deep/.el-pager li.active{
    color: @style-color;
  }
  .el-button--primary{
    background-color: @style-color;
    border-color: @style-color;
    color: #fff;
  }
  .el-button--small, .el-button--small.is-round{
    padding: 10px 36px;
  }
  .el-button--default{
    border-color: @style-color;
    color: @style-color;
  }
  .el-pagination {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  /deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #ECF5FF;
    color: @style-color;
  }
  /deep/.el-tree{
    span{
      user-select:none;
    }
  }
  /deep/.el-tree-node__content{
    height: 40px;
  }
  .delete-contain {
    text-align: center;
    padding: 89px 0 38px;
    & > p {
      margin-bottom: 68px;
    }
  }
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
  .form-bottom{
    display: flex;
    justify-content: center;
    padding: 18px 0;
    .el-button+.el-button{
      margin-left: 35px;
    }
    .el-form-item{
      margin-bottom: 0;
    }
  }
  .search-btn{
    position: relative;
    width: 220px;
    &>i{
      position: absolute;
      padding: 9px 9px;
      top: 0;
      left: 0;
    }
    /deep/.el-input__inner{
      padding: 0 32px;
    }
  }

  .equipment{
    background-color: #f4f4fe;
    height: 100%;
    flex-grow: 1;
    position: relative;
    text-align: left;
    overflow: auto;
    padding: 0px 15px 20px 15px;
    text-align: left;
    display: flex;
    flex-direction: column;
    .content{
      flex: 1;
      display: flex;
      background-color: #fff;
      border: 1px solid #e6e6e6;
      justify-content: space-between;
      .left{
        border-right: 1px solid #e9e9e9;
        height: 100%;
        flex: 190;
        padding-top: 50px;
        position: relative;
        .left-top{
          width: 100%;
          height: 50px;
          position: absolute;
          top: 0;
          padding: 0 15px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f2f5fa;
          .el-select{
            width: 100%;
          }
        }
        ::-webkit-scrollbar
        {
          width: 10px;
          height: 10px;
        }
        .left-bottom{
          height: 100%;
          width: 100%;
          position: relative;
          overflow: auto;
          .tree-content{
            position: absolute;
            min-width: 100%;
            height: 100%;
            padding: 10px 0px;
          }
        }
      }
      .right{
        font-size: 14px;
        height: 100%;
        flex: 850;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        padding-bottom: 60px;
        .right-content{
          overflow: scroll;
        }
        .top{
          display: flex;
          flex-direction: column;
          .info-content{
            height: 100px;
            color: #606266;
            flex: 1;
            display: flex;
            padding: 0 30px;
            align-items: center;
            &>div{
              width: 20%;
              line-height: 1;
              color: #333;
              &>div:nth-child(1){
                color: #9CA8B3;
                margin-bottom: 10px;
              }
              &>div:nth-child(2){
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
          }
            &>div:nth-last-child(1){
              width: 40%;
            }
          }
        }
        .bottom{
          flex: 1;
          display: flex;
          flex-direction: column;
          .select{
            display: flex;
            justify-content: space-between;
            padding: 10px 30px;
            align-items: center;
            /deep/.el-checkbox__inner:hover{
              border-color: @style-color;
            }
            /deep/.el-checkbox__input.is-checked+.el-checkbox__label{
              color: @style-color;
            }
            /deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
              background-color: @style-color;
              border-color: @style-color;
            }
            .group{
              display: flex;
              align-items: center;
              .el-select{
                margin: 0 15px;
                width: 160px;
              }
            }
          }
          .form-info{
            flex: 1;
            display: flex;
            padding: 0 20px;
            flex-direction: column;
            position: relative;
            /deep/.table-content{
              .column:first-of-type,.column:last-of-type{
                .column-header,.column-item{
                  padding: 0 20px;
                }
              }
            }
            .form-title{
              display: flex;
              padding: 0 10px 0 60px;
              height: 50px;
              background-color: #f8f8fc;
              color: #666;
              &>div{
                height: 100%;
                display: flex;
                align-items: center;
                width: 20%;
                justify-content: flex-start;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &>span{
                  margin-left: 5px;
                }
              }
            }
            .form-content2{
              display: flex;
              flex: 1;
              flex-direction: column;
              position: relative;
              .form-content3{
                .content-detail{
                  &:hover{
                    box-shadow: 0 5px 10px #eee;
                  }
                  border-bottom: 1px solid @border-line-color;
                  display: flex;
                  height: 60px;
                  color: #333;
                  position: relative;
                  /*margin-bottom: 10px;*/
                  padding: 0 10px 0 60px;
                  &>div{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    width: 20%;
                    justify-content: flex-start;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                  &>div:nth-last-child(1){
                    width: 25%;
                  }
                  &>div:nth-last-child(2){
                    width: 15%;
                  }
                  .concat{
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    line-height: 1;
                    &>div:nth-child(1){
                      color: #2F2F2F;
                      margin-bottom: 8px;
                    }
                    &>div:nth-child(2){
                      color: #9CA8B3;
                      font-size: 12px;
                    }
                  }
                  .btn-group{
                    justify-content: space-between;
                    cursor: pointer;
                    color: @style-color;
                    &>div{
                      display: flex;
                      align-items: center;
                      &>span{
                        margin-left: 6px;
                      }
                    }
                    /deep/svg{
                      path{
                        fill:@style-color;
                      }
                    }
                  }
                  .icon{
                    position: absolute;
                    left: 0;
                    top: 0;
                    display: none;
                    /deep/svg{
                      fill: #BFB6B5;
                    }
                  }
                }
                .content-disabled{
                  background-color: #fafafa;
                  .icon{
                    display: inline-block;

                  }
                  /*color: #9CA8B3;*/
                  /*.concat{*/
                    /*&>div:nth-child(1){*/
                      /*color: #9CA8B3;*/
                    /*}*/
                  /*}*/
                  /*.btn-group{*/
                    /*color: #9CA8B3;*/
                    /*/deep/svg{*/
                      /*path{*/
                        /*fill:#9CA8B3 ;*/
                      /*}*/
                    /*}*/
                  /*}*/
                }
              }
            }
          }
        }
        .title-content{
          height: 50px;
          border-bottom: 1px solid @border-line-color;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          .title{
            font-size: 16px;
            color: #656565;
          }
          .title-right{
            display: flex;
            cursor: pointer;
            color: @style-color;
            &>div{
              margin-left: 30px;
              img{
                vertical-align: middle;
                margin-right: 3px;
              }
            }
            /deep/svg{
              vertical-align: middle;
              path{
                fill:@style-color;
              }
            }
          }
        }
      }
    }
  }
</style>
