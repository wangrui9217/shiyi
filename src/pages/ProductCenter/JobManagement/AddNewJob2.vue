<template>
  <div class="add-new-job">
    <div class="basic-info">
      <!-- <h3 class="title">工单基础信息<span class="message">填写工单基础信息</span></h3> -->
      <common-title :title="'工单基础信息'"><span class="hint-text" slot="hint-text">填写工单基础信息</span></common-title>
      <div class="form-content">
        <div class="rows">
          <div class="item">
            <div class="item-name necessary">工单类型:</div>
            <div class="item-value w400 job-types">
              <div class="job-type" :class="{active: orderType === 1}" @click="orderType = 1">新装</div>
              <div class="job-type" :class="{active: orderType === 2}" @click="orderType = 2">改装</div>
              <div class="job-type" :class="{active: orderType === 3}" @click="orderType = 3">拆除</div>
              <div class="job-type" :class="{active: orderType === 4}" @click="orderType = 4">维修</div>
            </div>
          </div>
          <div class="item">
            <div class="item-name necessary">施工门店</div>
            <div class="item-value">
              <select-store @selectStore="selectStore"></select-store>
            </div>
          </div>
        </div>
        <div class="rows">
          <div class="item">
            <div class="item-name necessary">现场联系人:</div>
            <div class="item-value"><el-input v-model="contactName" size="small"></el-input></div>
          </div>
          <div class="item">
            <div class="item-name necessary">联系电话:</div>
            <div class="item-value"><el-input v-model="contactPhone" size="small"></el-input></div>
          </div>
        </div>
        <div class="rows">
          <div class="item">
            <div class="item-name necessary">上门时间:</div>
            <div class="item-value">
              <el-date-picker
                v-model="time"
                type="datetime"
                placeholder="选择日期时间" size="small">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="rows">
          <div class="item">
            <div class="item-name necessary">上门地址:</div>
            <div class="item-value">
              <region ref="region" :data="address"></region>
            </div>
          </div>
        </div>
        <div class="rows">
          <div class="item">
            <div class="item-name necessary">详细地址:</div>
            <div class="item-value">
              <!-- <el-select placeholder="选择省市区（默认IP地址）" size="small"></el-select> -->
              <textarea v-model="detailed_address" maxlength="200" placeholder="请输入详细地址" class="w400"></textarea>
            </div>
          </div>
        </div>
        <div class="rows">
          <div class="item">
            <div class="item-name">备注:</div>
            <div class="item-value">
              <textarea v-model="remark" maxlength="200" placeholder="请输入备注内容" class="w700"></textarea>
            </div>
          </div>
        </div>
        <div class="submit-btns">
          <!-- <button>保存</button> -->
          <button @click="submitBaseInfo" v-if="!orderId">提交基础信息</button>
        </div>
      </div>
    </div>
    <div class="scheme-info" v-if="orderId">
      <common-title :title="'安装信息编辑'"><span class="hint-text" slot="hint-text">此处可以新建多个安装方案，每个方案需添加所要施工的车辆以及编辑车辆（单车）的安装说明</span></common-title>
      <template v-for="(item,index) in schemeList">
        <div class="scheme-content" :key="index">
          <h4 class="title">安装方案 {{index + 1}}<span class="right" @click="deleteScheme(index)"><i class="delete"></i>删除</span></h4>
          <div class="device-table">
            <el-row class="device-table-header" type="flex" align="middle">
              <el-col :span="11">产品名称</el-col>
              <el-col :span="11">安装数量</el-col>
              <el-col :span="2" class="control">操作</el-col>
            </el-row>
            <!-- 设备方案 -->
            <template v-for="(ele,inx) in item.goods">
              <el-row class="device-table-body" :key="inx" type="flex" align="middle">
                <el-col :span="11">
                  <el-select v-model="ele.product_id" size="small">
                    <el-option v-for="(el,el_index) in deviceList" :key="el_index" :value="el.value" :label="el.label"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="11">
                  <el-input-number v-model="ele.product_num" :min="1" :max="10" label="" size="small"></el-input-number>
                </el-col>
                <el-col :span="2" class="operation control" @click.native="deleteDevice(index,inx)">删除</el-col>
              </el-row>
            </template>
          </div>
          <button class="add-device-btn" @click="addNewDevice(index)">添加产品</button>
          <h4 class="title">施工车辆</h4>
          <div class="car-frame-content">
            <textarea v-model="item.car_vins" placeholder="请输入所要施工车辆的车架号，每行为一个车架号"></textarea>
          </div>
          <!-- <h4 class="title">安装车辆-共<span>{{item.car.length}}</span>辆<span class="right"><span @click="showAddCarInfo(index)"><i class="add-car"></i>新增车辆</span><span><i class="add-cars"></i>批量新增</span></span></h4> -->
          <!-- <div class="vehicle-table">
            <el-row class="vehicle-table-header" type="flex" align="middle">
              <el-col :span="4">车架号</el-col>
              <el-col :span="3">车牌号</el-col>
              <el-col :span="2">车主</el-col>
              <el-col :span="3">车型</el-col>
              <el-col :span="3">车辆颜色</el-col>
              <el-col :span="3">所属门店</el-col>
              <el-col :span="4">合同号</el-col>
              <el-col :span="2">操作</el-col>
            </el-row>
            <template v-for="(car,num) in item.car">
              <el-row class="vehicle-table-body" :key="num" type="flex" align="middle">
                <el-col :span="4">{{car.car_frame}}</el-col>
                <el-col :span="3">{{car.car_license}}</el-col>
                <el-col :span="2">{{car.car_owner_name}}</el-col>
                <el-col :span="3">{{car.car_type}}</el-col>
                <el-col :span="3">{{car.car_color}}</el-col>
                <el-col :span="3">上海宝山门店</el-col>
                <el-col :span="4">{{car.contract_num}}</el-col>
                <el-col :span="2" class="operation"><span @click="showAddCarInfo(index,num,car)">编辑</span>&nbsp;&nbsp;<span @click="deleteCar(index,num)">删除</span></el-col>
              </el-row>
            </template>
          </div> -->
        </div>
      </template>
      <div class="add-scheme" @click="addNewScheme">新增安装方案</div>
      <div class="submit-btns">
        <!-- <button>保存</button> -->
        <button @click="submitScheme">提交方案</button>
      </div>
    </div>
    <transition name="fade">
      <layer v-if="show_layer"></layer>
    </transition>
  </div>
</template>

<script>
import Layer from '../../../components/common/layer'
import SelectStore from '../../../components/SelectStore'
import Region from '@/components/common/Region'
import CommonTitle from '@/components/common/title'
// import {fetchOrderSettingParams, addJobOrderList} from '../../../service/index'
import {addOrderWithBaseInfo, addScheme, fetchProductList, fetchOrderBaseInfo} from '../../../service/index'
import dateFormat from 'dateformat'
import { locationOption } from '@/utils/location'
export default {
  data () {
    return {
      orderId: this.$route.query.orderId,
      orderType: 1,
      storeId: null,
      time: null,
      address: [],
      detailed_address: '',
      contactName: '',
      contactPhone: '',
      remark: '',
      car_frame_type_list: [],
      certificate_type_list: [],
      order_state_list: [],
      order_type_list: [],
      schemeList: [
        {
          car_vins: '',
          goods: [
            {
              product_num: 1,
              product_id: null
            }
          ]
        }
      ],
      num1: null,
      show_add_car_info: false,
      show_add_cars_info: false,
      show_layer: false,
      wiredNum: null,
      wirelessNum: null,
      wiredYearCardId: null,
      wirelessYearCardId: null,
      deviceList: [],
      car: null,
      schemeIndex: null, // 代表当前操作的方案下标
      carIndex: null, // 代表当前操作的车辆下标
      options: locationOption,
      props: {
        value: 'label',
        children: 'children'
      }
    }
  },

  components: {
    Layer,
    SelectStore,
    Region,
    CommonTitle
  },

  computed: {
    appointment_time () {
      return this.time ? dateFormat(this.time, 'yyyy-mm-dd HH:MM:ss') : this.time
    }
  },

  mounted () {
    // this.getSettingParams()
    fetchProductList().then(res => {
      console.log(res)
      res.items.forEach(el => {
        const product = {
          value: el.id,
          label: el.name
        }
        this.deviceList.push(product)
      })
    })
    if (this.orderId) {
      fetchOrderBaseInfo(this.orderId).then(res => {
        this.orderType = res.type
        this.contactName = res.name
        this.contactPhone = res.phone
        this.time = new Date(res.appointment_time)
        const arr = res.district.split(',')
        arr.forEach(el => {
          this.address.push(parseFloat(el))
        })
        this.detailed_address = res.address
        this.remark = res.remark
      })
    }
  },

  methods: {
    deleteScheme (index) {
      if (this.schemeList.length === 1) {
        this.$message({
          message: '最少保留一个安装方案',
          type: 'warning'
        })
        return
      }
      this.schemeList.splice(index, 1)
    },
    deleteDevice (index, inx) {
      if (this.schemeList[index].goods.length === 1) {
        this.$message({
          message: '最少保留一个安装设备',
          type: 'warning'
        })
        return
      }
      this.schemeList[index].goods.splice(inx, 1)
    },
    deleteCar (index, num) {
      this.schemeList[index].car.splice(num, 1)
    },
    addNewScheme () {
      const scheme = {
        car_vins: '',
        goods: [
          {
            product_num: 1,
            product_id: 1
          }
        ]
      }
      this.schemeList.push(scheme)
    },
    addNewDevice (index) {
      const goods = {
        product_num: '',
        product_id: ''
      }
      this.schemeList[index].goods.push(goods)
    },
    selectStore (val) {
      this.storeId = val
    },
    submitBaseInfo () {
      // console.log(this.address)
      if (!this.contactName) {
        this.$message.error('请填写现场联系人')
        return
      }
      if (!this.storeId) {
        this.$message.error('请填写施工门店')
        return
      }
      if (!this.contactPhone) {
        this.$message.error('请填写联系电话')
        return
      }
      if (!this.time) {
        this.$message.error('请选择上门时间')
        return
      }
      if (!this.$refs.region.value) {
        this.$message.error('请填写上门地址')
        return
      }
      if (!this.detailed_address) {
        this.$message.error('请填写详细地址')
        return
      }
      const params = {
        'type': this.orderType,
        'store_id': this.storeId,
        'appointment_time': this.appointment_time,
        'district': this.$refs.region.value.join(','),
        'address': this.detailed_address.replace(/\s/g, ''),
        'name': this.contactName,
        'phone': this.contactPhone,
        'remark': this.remark.replace(/\s/g, '')
      }
      console.log(params)
      addOrderWithBaseInfo(params).then(res => {
        this.$message({
          type: 'success',
          message: '新增工单成功，请完善车辆及安装方案'
        })
        this.$router.push({path: '/productcenter/addnewjob', query: {orderId: res.id}})
      }).catch(err => {
        this.$message.error(err)
      })
    },
    submitScheme () {
      const params = {
        'order_id': this.orderId,
        'scheme': this.schemeList
      }
      console.log(params)
      // return
      addScheme(params).then(res => {
        this.$message({
          type: 'success',
          message: '添加工单车辆成功！'
        })
        this.$router.push(`/productcenter/orderdetail/${res.order_id}`)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleChange (value) {
      // console.log(value)
    }
  },

  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  }
}

</script>
<style lang='less' scoped>
.add-new-job{
  height: 100%;
  flex-grow: 1;
  overflow: auto;
  padding: 15px;
  padding-top: 0;
}
// .title{
//   font-size: 16px;
//   text-align: left;
//   font-family: 'MicrosoftYaHei';
//   color: #333;
//   font-weight: normal;
//   padding-left:20px;
//   margin-bottom: 10px;
// }
.form-content{
  border: 1px solid #eee;
  background: #fff;
  font-size: 14px;
  color: #606266;
  padding: 20px;
  // margin-bottom: 20px;
}
.rows{
  display: flex;
  margin-bottom: 16px;
  &:first-of-type{
    .item{
      margin-right: 0
    }
    /deep/.select-store{
      .el-cascader{
        width: 200px;
      }
    }
  }
  .item{
    display: flex;
    line-height: 32px;
    margin-right: 200px;
    .item-name{
      width: 90px;
      text-align: right;
      margin-right:10px;
    }
    .el-input,.el-select{
      width: 200px;
    }
  }
  .job-types{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .job-type{
      width: 80px;
      height: 32px;
      line-height: 32px;
      border: 1px solid #dcdfe6;
      border-radius: 3px;
      color: #999999;
      cursor: pointer;
      &.active{
        border: 1px solid #67c239;
        background: url('../../../assets/tick.png') no-repeat top right;
      }
    }
  }
  textarea{
    height: 90px;
    line-height: 30px;
    resize: none;
    outline: none;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 0 10px;
  }
}
.necessary{
  &::before{
    content: '* ';
    color: #FC4343;
  }
}
.scheme-content{
  font-size: 14px;
  background: #fff;
  border: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
  .right{
    float: right;
    font-size: 16px;
    color: #409eff;
    cursor: pointer;
    span{
      margin-left: 8px;
    }
    i{
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin: 0 5px;
      background-size: 18px 18px;
    }
    .delete{
      background: url('../../../assets/delete.png') no-repeat center center;
    }
    .add-car{
      background: url('../../../assets/add-car-info.png') no-repeat center center;
    }
    .add-cars{
      background: url('../../../assets/add-cars-info.png') no-repeat center center;
    }
  }
  .title{
    font-size: 16px;
    color: #5e6d82;
    font-weight: normal;
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding: 0 20px;
    border-bottom: 1px solid #F2F5FA;
  }
  .device-table,.vehicle-table{
    text-align: left;
    margin-bottom: 10px;
    .el-row{
      height: 60px;
      padding: 0 20px;
      border-bottom: 1px solid #F2F5FA;
    }
    .device-table-header{
      color: #111;
    }
  }
  .vehicle-table{
    margin-bottom: 0;
  }
  .add-device-btn{
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #999;
    background: #fff;
    border-bottom: 1px solid #F2F5FA;
  }
  .car-frame-content{
    padding: 0 20px;
    textarea{
      width: 100%;
      height: 100px;
      line-height: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 3px;
      resize: none;
      outline: none;
      &::-webkit-scrollbar{
        width: 10px;
        height: 1px;
        margin-right: 1px;
      }
      &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: #535353;
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          border-radius: 10px;
          background: #EDEDED;
      }
    }
  }
}
.add-scheme{
  height: 40px;
  line-height: 40px;
  background: #F9FAFC;
  font-size: 18px;
  color: #999;
  cursor: pointer;
  margin-top: -20px;
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-top: none;
}
.submit-btns{
  font-size: 0;
  button{
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    background: #4F6FFF;
    margin-right: 10px;
    &:last-of-type{
      margin-right:0;
    }
  }
}
.w90{
  width: 90px;
}
.operation{
  cursor: pointer;
  color: #4365FC;
}
.w300{
  width: 300px;
}
.w400{
  width: 400px;
}
.w700{
  width: 700px;
}
</style>
