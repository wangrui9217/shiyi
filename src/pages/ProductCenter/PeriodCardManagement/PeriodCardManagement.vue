<template>
  <div class="periodcard-management">
    <el-row style="margin-top:10px">
      <el-col :sapn="24">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" align="left" ref="searchForm">
          <el-form-item>
            <el-select v-model="searchForm.stores" placeholder="请选择门店" size="small">
              <el-option label="门店一" value="1"></el-option>
              <el-option label="门店一" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.LicensePlateNumber" placeholder="车牌号" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.deviceNumberv" placeholder="设备号" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.state" placeholder="状态" size="small">
              <el-option label="状态一" value="1"></el-option>
              <el-option label="状态一" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="开始日期" size="small">
          </el-date-picker>
          <el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="结束日期" size="small">
          </el-date-picker>
          <el-form-item>
            <el-button type="primary" size="small">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="resetForm(searchForm)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col align="right">
        <span style="padding-right:20px">导出</span>
      </el-col>
    </el-row>
    <el-row class="table h100">
      <!-- <el-col class="h100">
        <el-table ref="table" :data="tableData" style="width: 100%" height="100%">
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column property="deviceNumber" align="left" label="设备号">
          </el-table-column>
          <el-table-column property="deviceState" align="left" label="设备状态">
          </el-table-column>
          <el-table-column property="cardNumber" align="left" label="年期卡号">
          </el-table-column>
          <el-table-column property="timeLength" align="left" label="年期时长">
          </el-table-column>
          <el-table-column property="carName" align="left" label="车辆名称">
          </el-table-column>
          <el-table-column property="carOwner" align="left" label="车主">
          </el-table-column>
          <el-table-column property="telephone" label="开通日期（上）/到期日期（下）" align="left">
          <template slot-scope="scope">
              <p>
                <span class="redRound"></span>
                <span style="vertical-align:middle">2017.10.20</span>
              </p>
              <p>
                <span class="greenRound"></span>
                <span style="vertical-align:middle">2018.10.08</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column property="activeDate" align="left" label="激活日期">
          </el-table-column>
          <el-table-column property="state" align="left" label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="CheckDetails(scope.row.id)">
                详情
              </el-button>
              <el-button size="mini" type="danger">
                发指令
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col> -->
      <el-col :span="24">
        <el-row class="el-table-header">
          <el-col class="cell" :span="2">序号</el-col>
          <el-col class="cell" :span="2">设备号</el-col>
          <el-col class="cell" :span="2">设备状态</el-col>
          <el-col class="cell" :span="2">年期卡号</el-col>
          <el-col class="cell" :span="2">年期时长</el-col>
          <el-col class="cell" :span="2">车辆名称</el-col>
          <el-col class="cell" :span="2">车主</el-col>
          <el-col class="cell" :span="4">
            <span class="redRound"></span>
            开通日期
            <span class="greenRound"></span>
            到期日期
          </el-col>
          <el-col class="cell" :span="2">状态</el-col>
          <el-col class="cell" :span="4">操作</el-col>
        </el-row>
        <el-row class="el-table-content">
          <el-col :span="2"></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-pagination :background="true" @current-change="pageChange" :page-size="searchForm.pageSize" :current-page="3" layout="total,prev, pager, next" :total="searchForm.pageTotal">
    </el-pagination>
  </div>
</template>
<script>
// import { purchaseOrderListRequest } from '@/service/index'
export default {
  data () {
    return {
      searchForm: {
        stores: '',
        LicensePlateNumber: '',
        deviceNumber: '',
        state: '',
        startTime: '',
        endTime: '',
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 1000
      }, // 搜索表单
      tableData: [
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        },
        {
          deviceNumber: 'qqq',
          deviceState: '11',
          cardNumber: '222',
          timeLength: '22',
          carName: 'ee',
          carOwner: 'ee',
          startDate: 'ee',
          endDate: 'ee',
          activeDate: 'ee'
        }
      ] // 表格的数据
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    search () {
      alert(1)
    }, // 搜索
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }, // 重置表单
    CheckDetails (id) {
      alert('查看详情')
    }, // 查看详情
    pageChange (val) {
      alert(val)
      this.searchForm.pageIndex = val
      this.search()
    } // 分页查询
  }
}
</script>
<style>
.periodcard-management {
  /* width: 100%; */
  height: 100%;
  padding: 10px 10px 80px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-x: scroll;
}
.periodcard-management .table {
  flex: 1 1 auto;
  overflow: hidden;
  background: #fff;
}
.periodcard-management .table .el-table-header{
  padding:12px 0;
  border-bottom: 1px solid #ebeef5;
  min-width: 760px;
  display: flex;
  align-items: center;
}
.periodcard-management .table .el-table-header .cell{
  padding:0 10px;
  word-wrap: normal;
  text-overflow: ellipsis;
  box-sizing: border-box;
}
.periodcard-management .el-input {
  width: 140px;
}
.periodcard-management .el-form-item__content {
  line-height: 1;
}
.periodcard-management .use-state-logo {
  display: inline-block;
  width: 5px;
  height: 10px;
  background: green;
}
.h100 {
  height: 100%;
}
.el-pagination {
  position: absolute;
  right: 0;
  bottom: 15px;
}
.periodcard-management .el-pagination.is-background .btn-next,
.periodcard-management .el-pagination.is-background .btn-prev,
.periodcard-management .el-pagination.is-background .el-pager li {
  background: #fff;
}
.periodcard-management .el-button--mini,
.periodcard-management .el-button--mini.is-round {
  padding: 5px;
}
.periodcard-management .redRound{
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f779c3;
  vertical-align: middle;
}
.periodcard-management .greenRound{
   display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #42b2fc;
  vertical-align: middle;
}
</style>
