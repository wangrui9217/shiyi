<template>
  <div class="purchase-order">
    <el-row style="margin-top:10px">
      <el-col :sapn="24">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" align="left" ref="searchForm">
          <el-form-item>
            <el-select v-model="searchForm.region" placeholder="请选择门店" size="small">
              <el-option label="门店一" value="1"></el-option>
              <el-option label="门店一" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.orderNumber" placeholder="订单号" size="small"></el-input>
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
      <el-col class="h100">
        <el-table ref="table" :data="tableData" style="width: 100%" height="100%">
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column property="orderNumber" align="left" label="订单编号">
          </el-table-column>
          <el-table-column property="procurementStores" align="left" label="采购门店">
          </el-table-column>
          <el-table-column property="orderTime" align="left" label="下单时间">
          </el-table-column>
          <el-table-column property="orderDetails" align="left" label="订单明细">
          </el-table-column>
          <el-table-column property="OperationPeople" align="left" label="操作人">
          </el-table-column>
          <el-table-column property="telephone" align="left" label="联系电话">
          </el-table-column>
          <el-table-column property="state" align="left" label="状态" width="80">
          </el-table-column>
          <el-table-column property="state" align="left" label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="CheckDetails(scope.row.id)">
                详情
              </el-button>
              <el-button size="mini" type="danger">
                取消订单
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
        orderNumber: '',
        state: '',
        startTime: '',
        endTime: '',
        pageIndex: '',
        pageSize: 10,
        pageTotal: 1000
      }, // 搜索表单
      tableData: [
        {
          orderNumber: '123',
          orderDetails: 'g17100台g17100台g17100台g17100台g17100台g17100台g17100台g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        },
        {
          orderNumber: '123',
          orderDetails: 'g17100台',
          orderTime: '123',
          procurementGoods: 'ddfd',
          procurementStores: '123',
          OperationPeople: 'www',
          telephone: '22222222',
          state: '待付款'
        }
      ] // 表格的数据
    }
  },

  components: {
  },

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
    }// 分页查询

  }
}
</script>
<style>
.purchase-order {
  /* width: 100%; */
  height: 100%;
  padding: 10px 10px 80px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-x: scroll;
}
.purchase-order .table {
  flex: 1 1 auto;
  overflow: hidden;
}
.purchase-order .el-input {
  width: 140px;
}
.purchase-order .el-form-item__content {
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
.purchase-order .el-pagination.is-background .btn-next,
.purchase-order .el-pagination.is-background .btn-prev,
.purchase-order .el-pagination.is-background .el-pager li {
  background: #fff;
}
.purchase-order .el-button--mini, .purchase-order .el-button--mini.is-round{
  padding:5px;
}
</style>
