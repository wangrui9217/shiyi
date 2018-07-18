<!--策略管理-->
<template>
  <div class="equipment">
    <new-strategy ref="add" :ruleOption="ruleOption" :storeOption="storeOption" :tagIntroduce="tagIntroduce"></new-strategy>
    <risk-detail ref="detail"></risk-detail>
    <common-title title="策略管理"></common-title>
    <div class="search-group">
      <el-select v-model="search.type" placeholder="请选择策略类型" size="small">
        <el-option
          v-for="item in ruleOption"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="search.desc" placeholder="策略描述" size="small"></el-input>
      <el-date-picker
        size="small"
        v-model="search.date"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" size="small" @click="searchList">搜索</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
    </div>
    <head-operation :right="setting" className="noBackground"></head-operation>
    <div class="container">
      <!--<my-table :tableData="riskInfo" :fields="fields"></my-table>-->
      <table-component :tableData="riskInfo" :fields="fields"></table-component>
    </div>
    <div class="bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        :total="pageTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  riskStrategy,
  dataDict,
  getUserStoreList
} from '../../service/index'
import newStrategy from './NewStrategy'
import riskDetail from './riskDetail'
export default {
  data () {
    return {
      tagIntroduce: [],
      search: {
        type: '',
        desc: '',
        date: []
      },
      storeOption: '',
      currentPage: 1,
      ruleOption: [],
      riskInfo: [],
      value1: '',
      options: [],
      pageTotal: null,
      pageSize: 12,
      setting: [{label: '新增策略', func: this.addNewStrategy, icon: 'add', iconScale: '2.5'}, {label: '导出', func: this.pageExport, icon: 'export', iconScale: 1.8}],
      fields: [
        {type: 4, span: 1},
        {header: {label: '策略名称', icon: 'device'}, type: 1, span: 3, content: [{name: 'name'}]},
        {header: {label: '策略类型', icon: 'car'}, type: 1, span: 3, content: [{name: 'type_name'}]},
        {header: {label: '当前状态', icon: 'period'}, type: 1, span: 3, content: [{name: 'status_name'}]},
        {header: {label: '策略规则', icon: 'device-status'}, type: 1, span: 3, content: [{name: 'condition'}]},
        {header: {label: '策略描述', icon: 'device-status'}, type: 1, span: 2, content: [{name: 'description'}]},
        {header: {label: '应用范围', icon: 'device-belong'}, type: 1, span: 3, content: [{name: 'available'}]},
        {header: {label: '创建时间', icon: 'device-status'}, type: 1, span: 3, content: [{name: 'create_time'}]},
        {type: 3, span: 3, content: [{label: '编辑', func: this.editRiskInfo, param: null}, {label: '位置', func: this.getMoreInfo, param: null}]}
        // {type: 4, span: 1},
        // {header: {label: '策略名称', icon: 'count'}, type: 1, span: 3, content: [{name: 'name'}]},
        // {header: {label: '策略类型', icon: 'count'}, type: 1, span: 3, content: [{name: 'type_name'}]},
        // {name: ['name'], label: '策略名称', span: 2, icon: 'count'},
        // {name: ['type_name'], label: '策略类型', span: 2, icon: 'count'},
        // {name: ['status_name'], label: '当前状态', span: 2, icon: 'cart'},
        // {name: ['condition'], label: '策略规则', span: 2, icon: 'concats'},
        // {name: ['description'], label: '策略描述', span: 3, icon: 'concats'},
        // {name: ['available'], label: '应用范围', span: 3, icon: 'concats'},
        // {name: ['create_time'], label: '创建时间', span: 2, icon: 'concats'},
        // {name: [{icon: 'edit', label: '编辑'}, {icon: 'location', label: '位置'}],
        //   type: 'control2',
        //   params: [null, null],
        //   span: 5,
        //   icon: '',
        //   control: [this.editRiskInfo, this.getMoreInfo]}
      ]
    }
  },

  components: {
    newStrategy,
    riskDetail
  },

  computed: {},

  mounted () {
    this.getIntoeduceTag()
    this.getRuleOption().then(res => {
      this.initState()
    })
    this.initStoreList()
  },

  methods: {
    getIntoeduceTag () {
      let search = {
        'group_name': 'tb_rule_tags'
      }
      dataDict(search).then(res => {
        this.tagIntroduce = res
      })
    },
    searchList () {
      this.initState('', this.search.type, this.search.desc, this.search.date ? this.search.date[0] : '', this.search.date ? this.search.date[1] : '')
    },
    reset () {
      this.search = {
        type: '',
        desc: '',
        date: []
      }
      this.initState()
    },
    getMoreInfo (info) {
      this.$refs.detail.modalOpen(info)
    },
    initStoreList () {
      getUserStoreList().then(res => {
        this.storeOption = res.items
        console.log(res, '该用户所有门店')
      })
    },
    editRiskInfo (item) {
      console.log(item, 888)
      this.$refs.add.modalOpen(this, item)
    },
    getRuleOption () {
      return new Promise((resolve, reject) => {
        let search = {
          'group_name': 'tb_rule_type'
        }
        dataDict(search).then(res => {
          this.ruleOption = res
          console.log(res, '策略选项列表')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getTypeNmae (type) {
      let temp = ''
      this.ruleOption.map(value => {
        if (value.value === type) {
          temp = value.name
        }
      })
      return temp
    },
    initState (page, type, description, begindate, enddate) {
      if (!page) {
        this.currentPage = 1
      }
      let params = {
        'per-page': this.pageSize,
        'page': page || 1,
        'search[type]': type,
        'search[description]': description,
        'search[begin_date]': begindate,
        'search[end_date]': enddate
      }
      riskStrategy(params).then(res => {
        console.log(res, '风控策略列表')
        this.pageTotal = res.pagination.totalCount
        this.riskInfo = res.items
        this.riskInfo.map(value => {
          this.$set(value, 'type_name', this.getTypeNmae(value.type))
          this.$set(value, 'status_name', value.status === 1 ? '开启' : '关闭')
          this.$set(value, 'isCheck', false)
        })
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.initState(val, this.search.type, this.search.desc, this.search.date ? this.search.date[0] : '', this.search.date ? this.search.date[1] : '')
    },
    addNewStrategy () {
      this.$refs.add.modalOpen(this)
    },
    pageExport () {
      alert(111)
    }
  }
}

</script>
<style lang='less' scoped>
  /deep/.table-content>div:nth-child(1)>div{
    padding: 0 20px;
  }
  @style-color:#4F6FFF;
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
    .bottom{
      height: 54px;
      display: flex;
      font-size: 14px;
      color: #333;
      align-items: center;
      justify-content: flex-end;
      /deep/.el-pager li{
        background: none;
      }
      /deep/.el-pagination .btn-next, /deep/.el-pagination .btn-prev{
        background: none;
      }
      /deep/.el-pagination button:disabled{
        background:none;
      }
    };
    /deep/.my-table{
      text-align: center;
    }
    .container{
      flex: 1;
      font-size: 14px;
      overflow-y: scroll;
      background-color: #fff;
    }
    .search-group{
      display: flex;
      align-items: center;
      .el-input{
        width: 160px;
      }
      .el-input+.el-input{
        margin-left: 20px;
      }
      .el-input+.el-date-editor{
        margin-left: 20px;
      }
      .el-select{
        width: 160px;
      }
      .el-select+.el-input{
        margin-left: 20px;
      }
      .middle{
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
      }
      .el-button{
        margin-left: 20px;
        background-color: @style-color;
        border-color: @style-color;
        padding: 0 16px;
        height: 28px;
        line-height: 28px;
        border-radius: 3px;
        color: #fff;
      }
    }
  }
</style>
