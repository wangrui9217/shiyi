<template>
  <div class="vehicle-management">
    <CommonTitle class="common-title" :title="'车辆管理'"></CommonTitle>
    <!-- <div align="left" class="vehicle-management-top">
      <CommonTitle class="common-title" :title="'车辆管理'"></CommonTitle>
      <storeSelect class="storeSelectBox" ref="storeSelectBox" @changeSelectStore="getChangeSelectStore"></storeSelect>
    </div> -->
    <!-- <el-row class="search-form">
      <el-col :sapn="24">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" align="left" ref="searchForm">
          <el-form-item>
            <el-input v-model="searchForm.vehicleKey" placeholder="车牌号/车架号" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.ownerType" placeholder="车主类型" size="small">
              <el-option :label="item.name" :value="item.id" v-for="item in ownerTypeArr" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.peopleKey" placeholder="车主/证件号码" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="search">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row> -->
    <div style="background: #fff;border:1px solid #eee">
      <head-operation left="" :right="[{label: '新增', func: this.addVehicle, icon: 'add', iconScale: 2.3},
            {label: '导出', func: this.tableExport, icon: 'export', iconScale: 1.7}]">
        <div class="search" slot="left-content">
          <!-- <select-store @changeMode="changeMode" @selectStore="selectStore"></select-store> -->
          <el-input
            v-model="searchForm.vehicleKey"
            placeholder="车牌号/车架号"
            size="small"
          >
          </el-input>
          <el-select v-model="searchForm.ownerType" placeholder="车主类型" size="small">
            <el-option :label="item.name" :value="item.id" v-for="item in ownerTypeArr" :key="item.id"></el-option>
          </el-select>
          <el-input v-model="searchForm.peopleKey" placeholder="车主/证件号码" size="small"></el-input>
          <button @click="search">搜索</button>
          <button @click="resetForm">重置</button>
        </div>
      </head-operation>
    </div>
    <div class="table h100">
      <my-table :tableData="tableData" :fields="fields"></my-table>
      <!-- <el-pagination
        layout="prev, pager, next"
        :page-size="page_size"
        :total="totalNum"
        @current-change="currentPageChange"
        >
      </el-pagination> -->
    </div>
          <!-- <el-form-item>
            <el-input v-model="searchForm.salesmanOrContractNumber" placeholder="业务员/合同号" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.serviceStates" placeholder="业务状态" size="small">
              <el-option :label="item.name" :value="item.id" v-for="item in serviceStatesArr" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.startDeviceNum" placeholder="设备数量" size="small"></el-input>
          </el-form-item> -->
          <!-- <el-form-item>
            <el-select v-model="searchForm.vehicleState" placeholder="车辆状态" size="small">
              <el-option :label="item.name" :value="item.id" v-for="item in vehicleStateArr" :key="item.id"></el-option>
            </el-select>
          </el-form-item> -->
    <!-- <div align="right" class="button-box">
      <span class="item-button" @click="addVehicle">
        <icon name="add" scale="2.1"></icon>
        <span class="button-text">新增</span>
      </span>
      <span class="item-button" @click="tableExport">
        <icon name="export" scale="1.9"></icon>
        <span class="button-text">导出</span>
      </span>
    </div> -->
    <!-- <el-row class="table h100">
      <el-col class="h100">
        <el-table ref="table" :data="vehicleListData" style="width: 100%;height:100%" height="100%" v-loading="tableloading">
          <el-table-column align="left" label="车辆" :render-header="renderHeader1">
            <template slot-scope="scope">
              <p>{{scope.row.license_plate}}</p>
              <p>
                <span class="vinmark">VIN</span>
                <span style="font-size:12px;color:#9CA8B3">{{scope.row.vin_code}}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" align="left" label="新增时间" sortable :render-header="renderHeader2">
          </el-table-column>
          <el-table-column align="left" label="车主信息" :render-header="renderHeader3">
            <template slot-scope="scope">
              <p>{{scope.row.car_owner_type}}</p>
              <p>{{scope.row.owner_name}}</p>
              <p>{{scope.row.id_card}}</p>
            </template>
          </el-table-column>
          <el-table-column align="left" label="业务信息" :render-header="renderHeader4">
            <template slot-scope="scope" v-if="scope.row.business_name&&scope.row.business_name.length > 0">
              <el-tag :key="index" v-for="(item,index) in (scope.row.business_name.length>3?scope.row.business_name.slice(0,3):scope.row.business_name)" size="small" style="margin-right:5px;margin-bottom:5px;">
                {{item}}
              </el-tag>
              <span v-if="scope.row.business_name.length >3">...</span>
            </template>
          </el-table-column>
          <el-table-column prop="driver_num" align="left" label="设备数量" sortable :render-header="renderHeader5">
          </el-table-column>
          <el-table-column align="left" label="车辆状态" :render-header="renderHeader6">
            <template slot-scope="scope">
              <p v-if="scope.row.status">
                <span class="vsmark" :class="scope.row.status === '在线'?'online':'offline'"></span>
                <span style="vertical-align:middle;line-height:1">{{scope.row.status}}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column align="left">
            <template slot-scope="scope">
              <div>
                <span class="operate" @click="vehicleDetail(scope.row.id)">
                  <icon name="details" scale="2"></icon>
                  <span class="operate-text">车辆详情</span>
                </span>
              </div>
              <div>
                <span class="operate" @click="bindEquipment(scope.row)">
                  <icon name="binding" scale="2"></icon>
                  <span class="operate-text">绑定</span>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row> -->
    <el-pagination @current-change="pageChange" :page-size="pageInfo.pageSize" :current-page="pageInfo.pageIndex" layout="total,prev, pager, next" :total="pageInfo.pageTotal">
    </el-pagination>
  </div>
</template>
<script>
import { vehicleListRequest } from '@/service/index'
import CommonTitle from '@/components/common/title'
import storeSelect from '@/components/common/storeSelect'
import MyTable from '@/components/common/MyTable'
// import Column from '@/components/common/column'
export default {
  components: {
    CommonTitle,
    storeSelect,
    MyTable
    // Column
  },
  data () {
    return {
      tableloading: false,
      storeId: '', // 门店的id
      storeName: '', // 门店的id
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 0
      },
      searchForm: {
        vehicleKey: '', // 车的关键字 车架号、车牌号
        ownerType: '', // 车主类型
        peopleKey: '' // 人的关键字  车主、证件号码
        // salesmanOrContractNumber: '', // 业务员或者合同号
        // serviceStates: '', // 业务状态
        // startDeviceNum: '', // 开始的设备数量
        // endDeviceNum: '', // 结束的设备数量
        // vehicleState: '' // 车辆的状态
      }, // 搜索表单
      ownerTypeArr: [{ name: '个人', id: 0 }, { name: '企业', id: 1 }], // 车主类型
      serviceStatesArr: [{ name: '未结清', id: 1 }, { name: '已结清', id: 2 }], // 业务状态
      vehicleStateArr: [{ name: '离线', id: 1 }, { name: '在线', id: 0 }], // 车辆状态
      selectStoreId: [], // 选择的门店id
      vehicleListData: [], // 车辆列表数据
      hasLowerLevel: false, // 门店是否包含下级
      vehicleBasicInfo: {
        'vin_code': '',
        'license_plate': '',
        'owner_name': '',
        'store_name': ''
      },
      tableData: [],
      fields: [
        {name: ['license_plate', 'vin_code'], label: '车辆', span: 4, icon: 'car'},
        {name: ['create_time'], label: '新增时间', span: 3, icon: 'increase-time'},
        {name: ['owner_name', 'id_card'], label: '车主信息', span: 3, icon: 'owner-info', isCenter: true},
        {name: ['business_name'], type: 'tags', label: '业务信息', span: 4, icon: 'business-info'},
        {name: ['driver_num'], label: '设备数量', span: 4, icon: 'device', isCenter: true},
        {name: ['status'], label: '车辆状态', span: 4, icon: 'vehicle-status', isCenter: true},
        {name: ['车辆详情'], type: 'control', params: ['id'], span: 2, icon: '', control: [this.vehicleDetail]}
        // {name: ['车辆详情', '绑定'], type: 'control', params: ['id'], span: 2, icon: '', control: [this.vehicleDetail, this.bindEquipment]}
      ]
    }
  },
  mounted () {
    this.search()
    this.localSaveVehicleInfo()
  },
  computed: {},
  methods: {
    ChangeSelectStore (val) {
      this.storeId = val.storeId
      this.storeName = val.storeName
      this.hasLowerLevel = val.hasLowerLevel
      this.selectStoreId = val.selectStoreId
    }, // 从子组件获取选择门店的id
    search () {
      let params = {
        'search[license_plate]': this.searchForm.vehicleKey,
        'search[vin_code]': this.searchForm.vehicleKey,
        'search[car_owner_type]': this.searchForm.ownerType,
        'search[id_card]': this.searchForm.peopleKey,
        'search[owner_name]': this.searchForm.peopleKey,
        'search[car_state]': this.searchForm.vehicleState,
        'search[store_id]': this.selectStoreId.toString(),
        'search[store_type]': this.hasLowerLevel ? 1 : 0,
        'per-page': this.pageInfo.pageSize,
        page: this.pageInfo.pageIndex
      }
      vehicleListRequest(params).then(res => {
        this.tableData = []
        this.tableData = res.items
        this.vehicleListData.splice(0)
        if (res.pagination) {
          this.pageInfo.pageTotal = res.pagination.totalCount || 0
        }
        if (res.items && res.items.length > 0) {
          this.vehicleListData.push(...res.items)
        }
      })
    }, // 搜索
    resetForm () {
      this.searchForm = {
        vehicleKey: '', // 车的关键字 车架号、车牌号
        ownerType: '', // 车主类型
        peopleKey: '', // 人的关键字  车主、证件号码
        salesmanOrContractNumber: '', // 业务员或者合同号
        serviceStates: '', // 业务状态
        startDeviceNum: '', // 开始的设备数量
        endDeviceNum: '', // 结束的设备数量
        vehicleState: '' // 车辆的状态
      }
    }, // 重置
    addVehicle () {
      // this.$router.push({name: 'AddVehicle'})
      this.$router.push({ path: '/vehiclecenter/addvehicle' })
    }, // 添加车辆
    bindEquipment (val) {
      var _this = this
      this.vehicleBasicInfo.vin_code = val.vin_code
      this.vehicleBasicInfo.license_plate = val.license_plate
      this.vehicleBasicInfo.owner_name = val.owner_name
      this.vehicleBasicInfo.store_name = this.storeName
      this.localSaveVehicleInfo(function () {
        _this.$router.push({
          name: 'bindquipment',
          query: { id: val.id }
        })
      })
    }, // 绑定设备
    vehicleDetail (id) {
      this.$router.push({
        name: 'vehicleDetail',
        query: { id: id, storeId: this.storeId }
      })
    }, // 车辆详情
    pageChange (val) {
      this.pageInfo.pageIndex = val
      this.search()
    }, // 分页查询
    tableExport () {
    },
    localSaveVehicleInfo (callback) {
      sessionStorage.setItem('selectVehicleInfo', JSON.stringify(this.vehicleBasicInfo))
      if (callback) {
        callback()
      }
    } // 本地保存车辆的信息
    // tableExport () {
    //   if (this.vehicleListData.length === 0) {
    //     return this.$message({
    //       type: 'info',
    //       message: '数据为空不能导出'
    //     })
    //   }
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = [
    //       '车架号',
    //       '车牌号',
    //       '新增时间',
    //       '车主类型',
    //       '车主名称',
    //       '车主证件号',
    //       '业务信息',
    //       '设备数量',
    //       '车辆状态'
    //     ]
    //     const filterVal = [
    //       'car_frame',
    //       'car_license',
    //       'car_time',
    //       'car_owner_type',
    //       'car_owner_name_view',
    //       'car_owner_certificate_no',
    //       'business_name_string',
    //       'device_num_view',
    //       'car_state'
    //     ]
    //     const list = this.vehicleListData
    //     const data = this.formatJson(filterVal, list)
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: '车辆管理列表',
    //       autoWidth: true
    //     })
    //   })
    // }, // 表格导出
    // formatJson (filterVal, jsonData) {
    //   return jsonData.map(v =>
    //     filterVal.map(j => {
    //       if (j === 'timestamp') {
    //         return v[j]
    //       } else {
    //         return v[j]
    //       }
    //     })
    //   )
    // } // 导出excel表格用到的
  }
}
</script>

<style lang="less" scoped>
@style-color: #4f6ffe;
.vehicle-management {
  height: 100%;
  padding: 0px 15px 60px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-x: scroll;
  .el-input{
    width: 140px;
    margin-right: 10px;
  }
  .el-select{
    width: 110px;
    margin-right: 10px;
  }
  .search{
    text-align: left;
    // height: 46px;
    // line-height: 46px;
    // border-bottom: 1px solid #eee;
    // padding-left: 20px;
    /deep/.el-input .el-input__inner{
      background: #fff;
      cursor: pointer;
    }
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
  .floor-title-box{
    border-bottom: none;
  }
  .vehicle-management-top {
    flex: 0 0 auto;
    .common-title{
      display: inline-block;
      margin-right: 10px;
    }
    .storeSelectBox{
      display: inline-block;
    }
  }
  .search-form {
    flex: 0 0 auto;
    /deep/.el-input {
      width: 130px;
    }
  }
  .button-box {
    flex: 0 0 auto;
    color: @style-color;
    font-size: 14px;
    margin-bottom: 10px;
    .item-button {
      margin-right: 20px;
      vertical-align: middle;
      cursor: pointer;
      .button-text {
        vertical-align: middle;
      }
      /deep/svg {
        vertical-align: middle;
        path {
          fill: @style-color;
        }
      }
    }
  }
  .table {
    flex: 1 1 auto;
    overflow: hidden;
    font-size: 14px;
    border: 1px solid #eee;
    border-top: none;
    background:#fff;
    /deep/.table-content{
      .column:first-of-type,.column:last-of-type{
        .column-header,.column-item{
          padding: 0 20px;
        }
      }
    }
    /deep/.el-table .sort-caret.ascending {
      top: 6px;
    }
    /deep/.el-table .sort-caret.descending {
      bottom: 6px;
    }
    /deep/.el-table th {
      background: #f8f8fc;
      /deep/svg {
        vertical-align: middle;
        path {
          fill: #555555;
        }
      }
    }
    /deep/.el-table tr {
      background: transparent;
    }
    /deep/.el-table tr:hover {
      -webkit-box-shadow: 0 5px 10px #eee;
      box-shadow: 0 5px 10px #eee;
    }
    /deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
      background: transparent;
    }
    .operate {
      color: @style-color;
      cursor: pointer;
      vertical-align: middle;
      .operate-text {
        vertical-align: middle;
      }
      /deep/svg {
        vertical-align: middle;
        path {
          fill: @style-color;
        }
      }
    }
    .vinmark {
      display: inline-block;
      padding: 2.5px 4px;
      background: #909090;
      color: #fff;
      font-size: 8px;
      line-height: 1;
    }
    .vsmark {
      display: inline-block;
      width: 4px;
      height: 12px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .vsmark.online {
      background: #1ae423;
    }
    .vsmark.offline {
      background: #fa2722;
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
  .h100 {
    height: 100%;
  }
}
</style>
