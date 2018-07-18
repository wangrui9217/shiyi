<template>
  <div class="equipment">
    <div class="top-actions">
      <common-title :title="'设备列表'"></common-title>
      <!-- <div class="other-btns">
        <button><icon name="renew" scale="1.5"></icon> 续费</button>
        <button @click="showTransfer()"><icon name="batch-transfer" scale="1.5"></icon> 批量转移</button>
        <button><icon name="export" scale="1.2"></icon> 导出</button>
      </div> -->
      <div style="background: #fff;border:1px solid #eee">
        <head-operation left="" :right="[{label: '续费',  icon: 'renew', iconScale: 1.7},
          {label: '批量操作', func: this.showTransfer, icon: 'batch-transfer', iconScale: 1.5},{label: '导出', icon: 'export', iconScale: 1.3}]">
          <div class="search" slot="left-content">
          <select-store @changeMode="changeMode" @selectStore="selectStore"></select-store>
          <!-- <el-input
            class="select-store"
            v-model="storeId"
            placeholder="请选择门店"
            size="small"
            disabled
          ></el-input> -->
          <!-- <el-select
            v-model="deviceModel"
            placeholder="设备型号"
            size="small"
          >
            <el-option v-for="(item,index) in deviceModelState" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select> -->
          <el-select
            v-model="deviceType"
            placeholder="设备类型"
            size="small"
          >
            <el-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <!-- <el-select
            v-model="battery"
            placeholder="电量范围"
            size="small"
          >
            <el-option v-for="(item,index) in batteryRange" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select> -->
          <el-select
            v-model="deviceStatus"
            placeholder="使用状态"
            size="small"
          >
            <el-option v-for="(item,index) in deviceStatusList" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <el-input
            v-model="deviceNum"
            placeholder="设备号"
            size="small"
          ></el-input>
          <button @click="getDeviceList()">搜索</button>
          <button>重置</button>
        </div>
        </head-operation>

      </div>
    </div>
    <div class="content table">
      <my-table ref="MyTable" :tableData="deviceList" :fields="fields"></my-table>
      <el-pagination
        layout="prev, pager, next"
        :page-size="page_size"
        :total="totalNum"
        @current-change="currentPageChange"
        >
      </el-pagination>
    </div>
    <equipment-detail ref="detail"></equipment-detail>
    <transition name="fade">
      <batch-transfer v-if="show_batch_transfer" @close="closeTransfer()"></batch-transfer>
    </transition>
    <transition name="fade">
      <layer v-if="show_layer"></layer>
    </transition>
  </div>
</template>

<script>
import EquipmentDetail from '../../components/equipment/DeviceDetails'
import BatchTransfer from '../../components/equipment/BatchTransfer'
import Layer from '../../components/common/layer'
import SelectStore from '../../components/SelectStore'
import CommonTitle from '@/components/common/title'
import MyTable from '@/components/common/MyTable/MyTable'
import {fetchDeviceList, dataDict} from '../../service/index'
export default {
  data () {
    return {
      isIncludeChild: 0,
      storeId: null,
      carInfo: '',
      deviceNum: null,
      startTime: '',
      endTime: '',
      equipmentId: null,
      show_equipment_detail: false,
      show_batch_transfer: false,
      show_layer: false,
      deviceList: [],
      batteryRange: [],
      battery: null,
      deviceModelState: [],
      deviceModel: null,
      deviceStatusList: [],
      deviceStatus: null,
      deviceTypeList: [],
      deviceType: null,
      page_size: 4,
      currentPageNo: 1,
      totalCount: 0,
      totalPageCount: 0,
      // fields: [
      //   {name: ['code', 'name'], label: '设备信息', span: 3, icon: 'device'},
      //   {name: ['car_owner_name', 'car_id_view'], label: '车辆信息', span: 3, icon: 'car'},
      //   {name: ['service_type', 'product_time'], label: '年期信息', span: 3, icon: 'period', isCenter: true},
      //   {name: ['install_status_view'], label: '安装状态', span: 3, icon: 'device-status', isCenter: true},
      //   {name: ['running_status_view', 'elect_percent'], label: '设备情况', span: 3, icon: 'device-status', isCenter: true},
      //   {name: ['store_id_view'], label: '设备归属', span: 3, icon: 'device-belong', isCenter: true},
      //   {name: ['status_view'], label: '维护状态', span: 3, icon: 'device-status', isCenter: true},
      //   {name: [{icon: 'detail', name: '详情'}, {icon: 'instructions', name: '指令'}, {icon: 'location', name: '位置'}, {icon: 'trajectory', name: '轨迹'}], type: 'control3', params: ['id'], span: 3, icon: '', control: [this.showEquipmentDetail]}
      // ]
      fields: [
        {type: 4, span: 1},
        {header: {label: '设备信息', icon: 'device'}, type: 1, span: 3, content: [{name: 'code'}, {name: 'name'}]},
        {header: {label: '车辆信息', icon: 'car'}, type: 1, span: 3, content: [{name: 'car_owner_name'}, {name: 'car_id_view'}]},
        {header: {label: '年期信息', icon: 'period'}, type: 1, span: 3, content: [{name: 'service_type'}, {name: 'product_time'}]},
        {header: {label: '安装状态', icon: 'device-status'}, type: 1, span: 3, content: [{name: 'install_status_view'}]},
        {header: {label: '设备情况', icon: 'device-status'}, type: 1, span: 2, content: [{name: 'running_status_view'}, {name: 'elect_percent'}]},
        {header: {label: '设备归属', icon: 'device-belong'}, type: 1, span: 3, content: [{name: 'store_id_view'}]},
        {header: {label: '维护状态', icon: 'device-status'}, type: 1, span: 3, content: [{name: 'status_view'}]},
        {type: 3, span: 3, content: [{label: '设备详情', func: this.showEquipmentDetail, param: 'id'}]},
        {type: 5, content: [{name: 'tags'}]}
      ]
    }
  },

  components: {
    EquipmentDetail,
    Layer,
    SelectStore,
    BatchTransfer,
    CommonTitle,
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

  mounted () {
    this.getDocumentHeight()
    this.getDeviceParams()
    this.getDeviceList()
  },

  methods: {
    getDeviceParams () {
      const typeParams = {
        group_name: 'tb_driver_model'
      }
      dataDict(typeParams).then(res => {
        res.forEach(el => {
          const deviceTypeTip = {
            value: el.value,
            label: el.name
          }
          this.deviceTypeList.push(deviceTypeTip)
        })
      })
      const stateParams = {
        group_name: 'tb_driver_use_status'
      }
      dataDict(stateParams).then(res => {
        res.forEach(el => {
          const deviceStatusTip = {
            value: el.value,
            label: el.name
          }
          this.deviceStatusList.push(deviceStatusTip)
        })
      })
    },
    getDeviceList () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255,255, 0.7)'
      })
      const params = {
        'search[store_id]': this.storeId,
        // 'search[is_include_child]': this.isIncludeChild,
        'search[device_model]': this.deviceModel,
        'search[type]': this.deviceType,
        'search[code]': this.deviceNum,
        'search[use_status]': this.deviceStatus,
        'page': this.currentPageNo,
        'per-page': this.page_size
      }
      fetchDeviceList(params).then(res => {
        this.totalCount = res.pagination.totalCount
        this.deviceList = res.items
        this.deviceList.forEach(el => {
          const timeRange = `${el.service_indate.substr(0, 10)} 至 ${el.expired_time.substr(0, 10)}`
          this.$set(el, 'product_time', timeRange)
          this.$set(el, 'elect_percent', el.elect ? el.elect + '%' : '-')
        })
        // res.items.forEach(el => {
        //   const device = {
        //     deviceNum: el.device_num,
        //     deviceName: el.device_name,
        //     deviceType: el.device_type_view,
        //     deviceModel: el.device_model_view,
        //     deviceStatus: el.device_status_view,
        //     storeName: el.store_name_view,
        //     carLicense: el.car_license_view,
        //     carFrame: el.car_frame_view,
        //     carOwner: el.car_owner_view,
        //     inTime: el.in_time,
        //     id: el.id,
        //     yearCard: el.year_card_view,
        //     yearCardStart: el.year_card_start_time,
        //     yearCardEnd: el.year_card_end_time
        //   }
        //   this.deviceList.push(device)
        // })
        this.$nextTick(function () {
          loading.close()
        })
      }).catch((err) => {
        this.$message.error(err)
        loading.close()
      })
    },
    showEquipmentDetail (equipmentId) {
      this.$refs.detail.modalOpen(equipmentId)
    },
    showTransfer () {
      this.show_layer = true
      this.show_batch_transfer = true
      console.log(this.$refs.MyTable.selected_items)
    },
    changeMode (value) {
      this.isIncludeChild = value ? 1 : 0
    },
    selectStore (value) {
      this.storeId = value
    },
    closeDetail () {
      this.show_layer = false
      this.show_equipment_detail = false
    },
    closeTransfer () {
      this.show_layer = false
      this.show_batch_transfer = false
    },
    getDocumentHeight () {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const List = h - 295
      this.page_size = Math.floor(List / 90)
      console.log(this.page_size)
    },
    currentPageChange (page) {
      this.currentPageNo = page
      this.getDeviceList()
    }
  }
}

</script>
<style lang='less' scoped>
.equipment{
  height: 100%;
  flex-grow: 1;
  padding: 15px;
  padding-top: 111px;
  padding-bottom: 70px;
  position: relative;
}
.top-actions{
  font-size: 0;
  position: absolute;
  top: 0;
  left: 15px;
  right: 15px;
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
  .other-btns{
    text-align: right;
    font-size: 0;
    margin-bottom: 10px;
    button{
      // width: 18px;
      vertical-align: bottom;
      height: 18px;
      line-height: 18px;
      margin-right:20px;
      background: transparent;
      color: #4365FC;
      svg{
        vertical-align: middle;
      }
    }
    button:last-of-type{
      margin-right: 0;
    }
  }
}
.content{
  font-size: 14px;
  height: 100%;
  overflow: auto;
  background: #fff;
  border: 1px solid #eee;
  /deep/.table-content{
    .column:first-of-type,.column:last-of-type{
      .column-header,.column-item{
        padding: 0 20px;
      }
    }
  }
  // .table-body{
    .operation{
      cursor: pointer;
    }
  //   .el-row:hover{
  //     box-shadow: 0 5px 10px #eee;
  //     .operation{
  //       span{
  //         color: #4f6ffe;
  //       }
  //     }
  //   }
  // }
  // .plate-number{
  //   line-height: 30px;
  // }
  .el-pagination{
    position: absolute;
    right: 20px;
    bottom: 20px;
    /deep/.btn-next, /deep/.btn-prev, /deep/.el-pager li{
      background: transparent;
    }
  }
}
.pink-point,.blue-point{
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.pink-point{
  background: #f779c3;
}
.blue-point{
  background: #42b2fc;
}
</style>
