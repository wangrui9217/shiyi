<!--报警列表-->
<template>
  <div class="equipment">
    <alarm-calendar ref="calendar"></alarm-calendar>
    <common-title title="报警列表"></common-title>
    <div class="search-group">
      <el-input v-model="value1" placeholder="车牌号/车架号/车主" size="small"></el-input>
      <el-select v-model="value1" placeholder="请选择策略类型" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        size="small"
        v-model="value1"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" size="small">搜索</el-button>
      <el-button type="primary" size="small">重置</el-button>
    </div>
    <head-operation :right="[{label: '导出', func: this.pageExport, icon: 'export', iconScale: 1.8}]" className="noBackground"></head-operation>
    <div class="container">
      <table-component :tableData="warnList" :fields="fields"></table-component>
    </div>
    <div class="bottom">
      <p></p>
      <el-pagination
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
        :total="pageTotal"
        :current-page="pageCurrent"
        :page-size="pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import alarmCalendar from './alarmCalendar'
import {
  getWarnMessage
} from '../../service/index'
export default {
  data () {
    return {
      pageSize: 12,
      warnList: [],
      value1: '',
      options: [],
      pageTotal: null,
      pageCurrent: 1,
      fields: [
        {type: 4, span: 1},
        {header: {label: '车辆', icon: 'car'}, type: 1, span: 2, content: [{name: 'car'}]},
        {header: {label: '所属门店', icon: 'car'}, type: 1, span: 3, content: [{name: 'store'}]},
        {header: {label: '策略名称', icon: 'period'}, type: 1, span: 2, content: [{name: 'rule_type_view'}]},
        {header: {label: '策略类型', icon: 'device-status'}, type: 1, span: 2, content: [{name: 'rule_type'}]},
        {header: {label: '报警设备', icon: 'device'}, type: 1, span: 2, content: [{name: 'description'}]},
        {header: {label: '时间(报警、发生时间)', icon: 'todo'}, type: 1, span: 3, content: [{name: 'alarm_time'}]},
        {header: {label: '持续时长', icon: 'todo'}, type: 1, span: 2, content: [{name: 'time_span'}]},
        {header: {label: '敏感点', icon: 'device-status'}, type: 1, span: 3, content: [{name: 'create_time'}]},
        {header: {label: '报警位置', icon: 'location'}, type: 1, span: 2, content: [{name: 'create_time'}]},
        {header: {label: '其他', icon: 'device-status'}, type: 3, span: 2, content: [{label: '报警日历', func: this.calendarModalOpen, param: null}]}
      ]
    }
  },

  components: {
    alarmCalendar
  },

  computed: {},

  mounted () {
    this.getWarnMessageList()
    // this.$refs.calendar.modalOpen()
  },

  methods: {
    getWarnMessageList (page) {
      let params = {
        'per-page': this.pageSize,
        'page': page || 1
      }
      getWarnMessage(params).then(res => {
        this.warnList = res.items
        this.pageTotal = res.pagination.totalCount
        console.log(res, 555)
      })
    },
    handleCurrentChange (val) {
      console.log(val)
      this.getWarnMessageList(val)
    },
    addNewStrategy () {
      this.$refs.add.modalOpen()
    },
    pageExport () {
    },
    calendarModalOpen () {
      this.$refs.calendar.modalOpen()
    }
  }
}
</script>
<style lang='less' scoped>
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
      justify-content: space-between;
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
    .container{
      flex: 1;
      font-size: 14px;
      overflow-y: scroll;
      text-align: center;
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
      .el-select{
        width: 160px;
      }
      .el-select+.el-input{
        margin-left: 20px;
      }
      .el-select + .el-date-editor{
        margin-left: 20px;
      }
      .el-input+.el-select{
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
