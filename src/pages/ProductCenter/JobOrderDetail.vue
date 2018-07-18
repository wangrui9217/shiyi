<template>
  <div class="job-order-detail">
    <div class="store-info">
      <!-- <common-title :title="construction_store_name_view"></common-title> -->
      <common-title :title="code"></common-title>
    </div>
    <!-- 订单进度 -->
    <order-progress v-if="progress && progress.length" :data="progress"></order-progress>
    <!-- 订单基础信息 -->
    <div style="background: #fff;border: 1px solid #eee; margin-bottom: 20px">
      <head-operation left="基础信息" :right="state ? null : [{label: '', func: this.showOrderBaseInfo, icon: 'edit', iconScale: 2}]"></head-operation>
      <!-- <h4 class="title">工单基础信息<icon name="edit" scale="2" v-if="!state" @click.native="showOrderBaseInfo"></icon></h4> -->
      <box-container :data="base_info.data" :isLoading="base_info.isLoading"></box-container>
    </div>
    <!-- <h4 class="title">施工信息<span v-if="!state" class="add-car-btn" @click="showAddCars">新增车辆</span></h4> -->
    <div style="background: #fff;border: 1px solid #eee; margin-bottom: 20px">
      <head-operation left="施工信息" :right="state ? null : [{label: '新增车辆', func: this.showAddCars}]"></head-operation>
      <div class="construction-info-content">
        <h4 class="title">
          安装车辆-共 {{order_detail.length}} 辆
        </h4>
        <el-row class="table-header" type="flex" align="middle">
          <el-col :span="4">车架号</el-col>
          <el-col :span="3">车牌号</el-col>
          <el-col :span="2">车主</el-col>
          <el-col :span="3">车型</el-col>
          <el-col :span="2">车辆颜色</el-col>
          <!-- <el-col :span="2">所属门店</el-col>
          <el-col :span="4">合同号</el-col> -->
          <el-col :span="3">安装状态</el-col>
          <el-col :span="7">操作</el-col>
        </el-row>
        <template v-if="order_detail">
          <!-- 车辆信息 -->
          <div v-for="(item,index) in order_detail" :key="index">
            <el-row v-if="item.car_id" class="table-body" type="flex" align="middle">
              <el-col :span="4">{{item.vin}}</el-col>
              <el-col :span="3">{{item.license_plate}}</el-col>
              <el-col :span="2">{{item.owner_name}}</el-col>
              <el-col :span="3">{{item.car_model}}</el-col>
              <el-col :span="2">{{item.car_color}}</el-col>
              <!-- <el-col :span="2">所属门店名暂缺</el-col>
              <el-col :span="4">合同号暂缺</el-col> -->
              <el-col :span="3">{{item.status_view || '-'}}</el-col>
              <el-col :span="7" class="operation">
                <span @click="showDevice(item)">{{item.show ? '收起安装明细' : '展开安装明细'}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>车辆详情</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="!state" @click="showAddGoods(item)">添加产品</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="!state" @click="deleteCar(item)">删除车辆</span>&nbsp;&nbsp;&nbsp;&nbsp;
              </el-col>
            </el-row>
            <el-row v-else :key="index" class="table-body" type="flex" align="middle">
              <el-col :span="3" style="color:red">{{item.vin}}</el-col>
              <!-- <el-col :span="2">沪A88888</el-col>
              <el-col :span="2">藤原拓海</el-col>
              <el-col :span="3">宝马730</el-col>
              <el-col :span="2">白色</el-col>
              <el-col :span="2">上海宝山门店</el-col>
              <el-col :span="4">2342545645645487894654</el-col>
              <el-col :span="3">安装完成</el-col> -->
              <el-col :span="7" class="operation" :offset="14">
                <span @click="showDevice(item)">{{item.show ? '收起安装明细' : '展开安装明细'}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>车辆详情</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="!state" @click="showAddGoods(item)">添加产品</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="!state" @click="deleteCar(item)">删除车辆</span>&nbsp;&nbsp;&nbsp;&nbsp;
              </el-col>
            </el-row>
            <transition name="fade">
              <div class="sub-row-list" v-if="item.show">
                <el-row v-for="(ele,inx) in item.device_list" :key="inx" class="table-body sub-row" type="flex" align="middle">
                  <el-col :span="7">设备号：{{ele.device_num}}</el-col>
                  <el-col :span="5">设备类型：{{ele.device_type}}</el-col>
                  <el-col :span="6">年期：{{ele.year_card}}</el-col>
                  <el-col :span="3">{{ele.state_view}}</el-col>
                  <el-col :span="3" class="operation"><span v-if="!state" @click="deleteDevice(ele,item)">删除</span>&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
                </el-row>
                <div class="arrow"></div>
              </div>
            </transition>
          </div>
        </template>
      </div>
    </div>
    <div v-if="!state" class="confirm"><button @click="confirm">确认订单</button></div>
    <transition name="fade">
      <add-goods v-if="show_add_goods" :installId="installId" @submit="addGoods" @close="show_add_goods = false ;show_layer = false"></add-goods>
    </transition>
    <transition name="fade">
      <order-base-info v-if="show_order_base_info" @submit="editBaseInfo" @close="show_order_base_info = false ;show_layer = false"></order-base-info>
    </transition>
    <transition name="fade">
      <layer v-if="show_layer"></layer>
    </transition>
    <transition name="fade">
      <add-car v-if="show_add_car" :orderId="orderId" @submit="addCars" @close="show_add_car = false ;show_layer = false"></add-car>
    </transition>
  </div>
</template>

<script>
import {fetchOrderBaseInfo, fetchProgressById, fetchCarInstallById, fetchDeviceByInstallId, deleteCarInstall, deleteDeviceInstall, editOrderBaseInfo, addScheme, orderAddGoods, confirmOrder} from '../../service/index'
// import {fetchOrderDetail, deleteCarByFrame, orderAddGoods, editBaseInfo, deleteDeviceById, addCarsInOrder, confirmOrder} from '../../service/index'
import DetailMessagePart from '../../components/common/DetailMessagePart'
import BoxContainer from '../../components/common/boxContainer'
import Layer from '../../components/common/layer'
import OrderProgress from '../../components/JobManagement/OrderProgress'
import AddGoods from '../../components/JobManagement/AddGoods'
import OrderBaseInfo from '../../components/JobManagement/OrderBaseInfo'
import CommonTitle from '@/components/common/title'
import AddCar from '@/components/JobManagement/AddCar'
export default {
  data () {
    return {
      orderId: this.$route.params.orderid,
      code: null,
      installId: null,
      base_info: {
        data: null,
        isLoading: true
      },
      progress: null,
      order_detail: [],
      show_layer: false,
      show_add_goods: false,
      show_add_car: false,
      show_order_base_info: false,
      carFrame: null,
      state: null
    }
  },

  components: {
    DetailMessagePart,
    BoxContainer,
    OrderProgress,
    AddGoods,
    Layer,
    OrderBaseInfo,
    CommonTitle,
    AddCar
  },

  computed: {},

  mounted () {
    // this.getOrderDetail()
    this.init()
  },

  methods: {
    init () {
      this.getProgressById()
      this.getOrderBaseInfo()
      this.getCarInstallById()
    },
    getProgressById () {
      fetchProgressById(this.orderId).then(res => {
        // console.log(res)
        this.progress = res.items
      })
    },
    getOrderBaseInfo () {
      fetchOrderBaseInfo(this.orderId).then(res => {
        this.code = res.code
        const obj = {
          data: [
            {
              label: '工单类型',
              value: res.type_view,
              width: 9
            },
            {
              label: '现场联系人',
              value: `${res.name || ''}\u0020\u0020\u0020\u0020${res.phone || ''}`,
              width: 9
            },
            // {
            //   label: '下单联系人',
            //   value: res.admin_id,
            //   width: 6
            // },
            {
              label: '上门时间',
              value: res.appointment_time,
              width: 6
            },
            {
              label: '上门地址',
              value: res.district_view + '\u0020\u0020\u0020\u0020' + res.address,
              width: 9
            },
            {
              label: '备注',
              value: res.remark,
              width: 9
            }
          ],
          isLoading: false
        }
        this.base_info = obj
      })
    },
    getCarInstallById () {
      const params = {
        'search[order_id]': this.orderId
      }
      fetchCarInstallById(params).then(res => {
        this.order_detail = res.items
      })
    },
    showDevice (item) {
      const params = {
        'search[install_id]': item.id
      }
      if (item.show === undefined) {
        fetchDeviceByInstallId(params).then(res => {
          this.$set(item, 'device_list', res.items)
        })
        this.$set(item, 'show', true)
      } else {
        if (item.show) {
          this.$set(item, 'show', false)
        } else {
          fetchDeviceByInstallId(params).then(res => {
            console.log(res)
            this.$set(item, 'device_list', res.items)
          })
          this.$set(item, 'show', true)
        }
      }
    },
    showAddGoods (item) {
      this.show_layer = true
      this.show_add_goods = true
      this.installId = item.id
    },
    showAddCars () {
      this.show_layer = true
      this.show_add_car = true
    },
    showOrderBaseInfo () {
      this.show_layer = true
      this.show_order_base_info = true
    },
    addGoods (params) {
      orderAddGoods(params).then(res => {
        this.$message({
          type: 'success',
          message: '新增设备成功！'
        })
        this.show_add_goods = false
        this.show_layer = false
        // this.getOrderDetail()
        this.getCarInstallById()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    addCars (params) {
      // console.log(params)
      addScheme(params).then(res => {
        this.$message({
          type: 'success',
          message: '新增车辆成功！'
        })
        this.show_add_car = false
        this.show_layer = false
        this.getCarInstallById()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    editBaseInfo (params) {
      editOrderBaseInfo(this.orderId, params).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功！'
        })
        this.show_order_base_info = false
        this.show_layer = false
        this.getOrderBaseInfo()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    deleteCar (item) {
      this.$confirm('此操作将从此工单删除该车辆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCarInstall(item.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getCarInstallById()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除失败'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteDevice (ele, item) {
      this.$confirm('此操作将删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDeviceInstall(ele.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // this.getOrderDetail()
          const params = {
            'search[install_id]': item.id
          }
          fetchDeviceByInstallId(params).then(res => {
            console.log(res)
            this.$set(item, 'device_list', res.items)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除失败'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    confirm () {
      this.$confirm('确认后的工单将不可更改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        confirmOrder(this.orderId).then(res => {
          this.$message({
            type: 'success',
            message: '确认成功!'
          })
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}

</script>
<style lang='less' scoped>
@blue:#4365FC;
.job-order-detail{
  width: 86.4%;
  max-width: 1660px;
  margin: 0 auto;
  // padding-top: 30px;
  padding-bottom: 30px;
  position: relative;
}
.store-info{
  text-align: left;
  font-size: 22px;
  color: #000;
  // margin-bottom: 30px;
}
.title{
  height: 18px;
  line-height: 18px;
  text-align: left;
  font-weight: normal;
  color: #333;
  padding-left:10px;
  margin-bottom: 10px;
  position: relative;
  .message{
    color: #cccccc;
    font-size: 12px;
    margin-left: 16px;
  }
  /deep/svg{
    position:absolute;
    right: 10px;
    cursor: pointer;
    path{
      fill: @blue;
    }
  }
  .add-car-btn{
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: @blue;
  }
}
.construction-info-content{
  background: #fff;
  padding: 0 10px;
  height: auto;
  margin-bottom: 20px;
  .title{
    height: 65px;
    line-height: 65px;
    color: #5E6D82;
  }
  .el-row{
    height: 70px;
    padding: 0 10px;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid #f2f5fa;
    .operation{
      color: @blue;
      span{
        cursor: pointer;
      }
    }
  }
  .sub-row-list{
    box-shadow: 0px 0px 50px rgb(210, 216, 243);
    position: relative;
    .arrow{
      position: absolute;
      width: 16px;
      height: 16px;
      transform: rotate(45deg);
      background: #fff;
      top: -8px;
      right: 27%;
    }
  }
  .sub-row{
    height: 50px;
    background: #f8fefa;
  }
}
.floor-container{
  margin-bottom: 20px;
}
.confirm{
  button{
    width: 100px;
    height: 34px;
    border-radius: 3px;
    background: #4f6ffe;
    color: #fff;
    margin-right: 32px;
  }
}
</style>
