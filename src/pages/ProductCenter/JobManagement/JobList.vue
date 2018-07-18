<template>
  <div class="equipment">
    <div class="top-actions">
      <common-title :title="'工单列表'"></common-title>
      <div class="search">
        <el-select
          v-model="orderStatus"
          placeholder="工单状态"
          size="small"
        >
          <el-option v-for="(item,index) in orderStateList" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
        <el-select
          v-model="orderType"
          placeholder="工单类型"
          size="small"
        >
          <el-option v-for="(item,index) in orderTypeList" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
        <select-store  @selectStore="selectStore"></select-store>
        <!-- <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="开始日期"
          size="small">
        </el-date-picker>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="结束日期"
          size="small">
        </el-date-picker> -->
        <el-input
          v-model="orderNum"
          placeholder="工单编号"
          size="small"
        ></el-input>
        <button @click="getJobOrderList()">搜索</button>
        <button @click="reset()">重置</button>
      </div>
    </div>
    <div class="content clear">
      <my-table :tableData="JobOrderList" :fields="fields"></my-table>
      <el-pagination
        layout="prev, pager, next"
        :page-size="page_size"
        :total="totalNum"
        @current-change="currentPageChange"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {fetchJobOrderList, dataDict} from '../../../service/index'
import SelectStore from '@/components/SelectStore'
// import dateFormat from 'dateformat'
import CommonTitle from '@/components/common/title'
import MyTable from '@/components/common/MyTable'
import Column from '@/components/common/column'
export default {
  data () {
    return {
      orderStateList: [
      ],
      orderStatus: null,
      orderTypeList: [
      ],
      orderType: null,
      orderNum: '',
      JobOrderList: [],
      page_size: 4,
      currentPageNo: 1,
      totalCount: 0,
      totalPageCount: 0,
      startTime: null,
      endTime: null,
      fields: [
        {name: ['code', 'type_view'], label: '工单', span: 5, icon: 'car'},
        {name: ['store_id_view', 'create_time'], label: '下单', span: 5, icon: 'car'},
        {name: ['appointment_time'], label: '上门时间', span: 5, icon: 'car', isCenter: true},
        {name: ['car_num'], label: '车辆数', span: 3, icon: 'car', isCenter: true},
        {name: ['status_view'], label: '订单状态', span: 3, icon: 'car', isCenter: true},
        {name: ['订单详情', '取消订单'], type: 'control', params: ['id', 'id'], span: 3, icon: '', control: [this.goDetail, this.deleteOrder]}
      ]
    }
  },

  components: {
    SelectStore,
    CommonTitle,
    Column,
    MyTable
  },

  computed: {
    totalNum () {
      if (!this.totalCount) {
        return 0
      }
      return this.totalCount
    }
  },

  filters: {
    orderType (value) {
      if (value === 1) {
        return '新装'
      } else if (value === 2) {
        return '拆除'
      } else if (value === 3) {
        return '改装'
      } else if (value === 4) {
        return '维修'
      }
    },
    orderState (value) {
      if (value === 0) {
        return '订单生成'
      } else if (value === 1) {
        return '已派单'
      } else if (value === 2) {
        return '安装师傅已接单'
      } else if (value === 3) {
        return '已预约'
      } else if (value === 4) {
        return '已上门'
      } else if (value === 5) {
        return '已完成'
      } else if (value === 6) {
        return '空单'
      } else if (value === 7) {
        return '退单'
      } else if (value === 8) {
        return '已取消'
      }
    }
  },

  mounted () {
    this.getDocumentHeight()
    this.getOrderParams()
    this.getJobOrderList()
  },

  methods: {
    getOrderParams () {
      const stateParams = {
        group_name: 'tb_order_status'
      }
      dataDict(stateParams).then(res => {
        res.forEach(el => {
          const orderStatusTip = {
            value: el.value,
            label: el.name
          }
          this.orderStateList.push(orderStatusTip)
        })
      })
      const typeParams = {
        group_name: 'tb_order_type'
      }
      dataDict(typeParams).then(res => {
        res.forEach(el => {
          const deviceTypeTip = {
            value: el.value,
            label: el.name
          }
          this.orderTypeList.push(deviceTypeTip)
        })
      })
    },
    getJobOrderList () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255,255, 0.7)'
      })
      const params = {
        'search[code]': this.orderNum,
        'search[type]': this.orderType,
        'search[status]': this.orderStatus,
        'search[store_id]': this.storeId,
        // 'search[start_time]': this.startTime ? dateFormat(this.startTime, 'yyyy-mm-dd HH:MM:ss') : this.startTime,
        // 'search[end_time]': this.endTime ? dateFormat(this.endTime, 'yyyy-mm-dd HH:MM:ss') : this.endTime,
        'page': this.currentPageNo,
        'per-page': this.page_size
      }
      fetchJobOrderList(params).then(res => {
        this.totalCount = res.pagination.totalCount
        this.JobOrderList = []
        console.log(res)
        if (res.items && res.items.length > 0) {
          this.JobOrderList.push(...res.items)
        }
        this.$nextTick(function () {
          loading.close()
        })
      }).catch((err) => {
        console.log(err)
        loading.close()
      })
    },
    selectStore (value) {
      this.storeId = value
    },
    getDocumentHeight () {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const List = h - 70 - 109 - 50 - 60
      this.page_size = Math.floor(List / 60)
      console.log(this.page_size)
    },
    currentPageChange (page) {
      this.currentPageNo = page
      this.getJobOrderList()
    },
    reset () {
      this.orderType = null
      this.orderStatus = null
      this.storeId = null
      this.startTime = null
      this.endTime = null
      this.orderNum = ''
      this.getJobOrderList()
    },
    goDetail (id) {
      this.$router.push(`/productcenter/orderDetail/${id}`)
    },
    deleteOrder (id) {
      this.$confirm('此操作将取消订单，确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const params = {
        //   state: 8
        // }
        // deleteJobOrder(id, params).then(res => {
        //   this.$message({
        //     type: 'success',
        //     message: '取消成功!'
        //   })
        //   this.getJobOrderList()
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '未能成功取消订单，请重试'
        //   })
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消此操作'
        })
      })
    }
  }
}

</script>
<style lang='less' scoped>
.equipment{
  height: 100%;
  flex-grow: 1;
  padding: 15px;
  padding-top: 109px;
  padding-bottom: 70px;
  position: relative;
}
.top-actions{
  font-size: 0;
  position: absolute;
  top: 0;
  left: 15px;
  right: 15px;
  .title{
    font-size: 22px;
    text-align: left;
    font-family: 'MicrosoftYaHei';
    font-weight: normal;
    margin-bottom: 20px;
  }
  .el-input,.el-select{
    width: 140px;
    margin-right: 10px;
  }
  .search{
    text-align: left;
    height: 46px;
    line-height: 46px;
    background: #fff;
    padding-left: 20px;
    border: 1px solid #eee;
    // margin-bottom: 16px;
    button{
      padding: 0 16px;
      height: 28px;
      line-height: 28px;
      border-radius: 3px;
      background: #4f6ffe;
      color: #fff;
      margin-right: 10px;
      &:last-of-type{
        margin-right: 10px;
      }
    }
  }
  .other-btns{
    text-align: right;
    font-size: 0;
    margin-bottom: 10px;
    button{
      width: 18px;
      height: 18px;
      margin-right: 60px;
      background: cyan;
    }
    button:last-of-type{
      margin-right: 0;
    }
  }
}
.content{
  font-size: 14px;
  height: 100%;
  background: #fff;
  border: 1px solid #eee;
  /deep/.table-content{
    .column:first-of-type,.column:last-of-type{
      .column-header,.column-item{
        padding: 0 20px;
      }
    }
  }
  /deep/.el-pagination{
    position: absolute;
    right: 20px;
    bottom: 20px;
    .btn-next, .btn-prev, .el-pager li{
      background: transparent;
    }
  }
}
</style>
