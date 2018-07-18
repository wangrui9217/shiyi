<template>
  <div class="add-new-job">
    <div class="order-base-info">
      <h4 class="title">订单基础信息</h4>
      <div class="form-content">
        <div class="row">
          <div class="item">
            <div class="item-name necessary w90">上门联系人:</div>
            <div class="item-value"><el-input v-model="contactName" class="w200" size="small"></el-input></div>
          </div>
          <div class="item">
            <div class="item-name necessary w90">联系电话:</div>
            <div class="item-value"><el-input v-model="contactPhone" class="w200" size="small"></el-input></div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="item-name necessary w90">上门时间:</div>
            <div class="item-value">
              <el-date-picker
                class="w200"
                v-model="time"
                type="datetime"
                placeholder="选择日期"
                size="small">
              </el-date-picker>
            </div>
          </div>
          <div class="item">
            <div class="item-name necessary w90">施工门店:</div>
            <select-store @selectStore="selectStore"></select-store>
            <!-- <div class="item-value"><el-select v-model="storeId" class="w200" size="small"></el-select></div> -->
          </div>
        </div>
        <div class="item">
          <div class="item-name necessary w90">工单类型:</div>
          <div class="item-value job-types w400">
            <div class="job-type" :class="{active: orderType === 1}" @click="orderType = 1">新装</div>
            <div class="job-type" :class="{active: orderType === 2}" @click="orderType = 2">改装</div>
            <div class="job-type" :class="{active: orderType === 3}" @click="orderType = 3">拆除</div>
            <div class="job-type" :class="{active: orderType === 4}" @click="orderType = 4">维修</div>
          </div>
        </div>
        <div class="item">
          <div class="item-name necessary w90">上门地址:</div>
          <div class="item-value">
            <el-select v-model="address" class="w400" size="small">
              <el-option value="上海宝山" label="上海宝山"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item address-detail">
          <div class="item-name w90">&nbsp;&nbsp;详细地址:</div>
          <div class="item-value">
            <textarea v-model="addressDetail" placeholder="请输入详细地址" class="w400"></textarea>
          </div>
        </div>
        <div class="item remarks">
          <div class="item-name w90">&nbsp;&nbsp;备注:</div>
          <div class="item-value">
            <textarea v-model="remark" placeholder="请输入备注内容" class="w700" style="resize: none"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="install-list">
      <div class="top-actions">
        <h4 class="title">
          安装车辆：共<span>{{orderInfo.length}}</span>辆
          <span class="add-car-info" @click="showAddCarInfo()"></span>
        </h4>
      </div>
      <el-row v-if="orderInfo.length > 0" class="table-header" type="flex" align="middle">
        <el-col :span="3">车型</el-col>
        <el-col :span="3">车牌号</el-col>
        <el-col :span="3">车架号</el-col>
        <el-col :span="2">车主姓名</el-col>
        <el-col :span="4">合同号</el-col>
        <el-col :span="3">有线设备</el-col>
        <el-col :span="3">无线设备</el-col>
        <el-col :span="3">操作</el-col>
      </el-row>
      <div class="table-body">
        <el-row v-for="(item,index) in orderInfo" :key="index" type="flex" align="middle">
          <el-col :span="3" class="ellipsis">{{item.car_type}}</el-col>
          <el-col :span="3" class="ellipsis">{{item.car_license}}</el-col>
          <el-col :span="3" class="ellipsis">{{item.car_frame}}</el-col>
          <el-col :span="2" class="ellipsis">{{item.car_owner_name}}</el-col>
          <el-col :span="4" class="ellipsis">合同号字段无</el-col>
          <el-col :span="3" class="ellipsis">{{item.wired_num + '个'}}</el-col>
          <el-col :span="3" class="ellipsis">{{item.wireless_num + '个'}}</el-col>
          <el-col :span="3" class="ellipsis operation"><span @click="showAddCarInfo(item,index)">编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;<span @click="deleteCarInfo(index)">删除</span></el-col>
        </el-row>
        <!-- <el-row type="flex" align="middle">
          <el-col :span="3" class="ellipsis">宝马730</el-col>
          <el-col :span="3" class="ellipsis">沪A88888</el-col>
          <el-col :span="3" class="ellipsis">LDCSF12345FGH1234</el-col>
          <el-col :span="2" class="ellipsis">周洋真丝</el-col>
          <el-col :span="4" class="ellipsis">234254346545675667876</el-col>
          <el-col :span="3" class="ellipsis">1个，1年</el-col>
          <el-col :span="3" class="ellipsis">2个，1年</el-col>
          <el-col :span="3" class="ellipsis operation"><span>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>删除</span></el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="3" class="ellipsis">宝马730</el-col>
          <el-col :span="3" class="ellipsis">沪A88888</el-col>
          <el-col :span="3" class="ellipsis">LDCSF12345FGH1234</el-col>
          <el-col :span="2" class="ellipsis">周洋真丝</el-col>
          <el-col :span="4" class="ellipsis">234254346545675667876</el-col>
          <el-col :span="3" class="ellipsis">1个，1年</el-col>
          <el-col :span="3" class="ellipsis">2个，1年</el-col>
          <el-col :span="3" class="ellipsis operation"><span>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>删除</span></el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="3" class="ellipsis">宝马730</el-col>
          <el-col :span="3" class="ellipsis">沪A88888</el-col>
          <el-col :span="3" class="ellipsis">LDCSF12345FGH1234</el-col>
          <el-col :span="2" class="ellipsis">周洋真丝</el-col>
          <el-col :span="4" class="ellipsis">234254346545675667876</el-col>
          <el-col :span="3" class="ellipsis">1个，1年</el-col>
          <el-col :span="3" class="ellipsis">2个，1年</el-col>
          <el-col :span="3" class="ellipsis operation"><span>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>删除</span></el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="3" class="ellipsis">宝马730</el-col>
          <el-col :span="3" class="ellipsis">沪A88888</el-col>
          <el-col :span="3" class="ellipsis">LDCSF12345FGH1234</el-col>
          <el-col :span="2" class="ellipsis">周洋真丝</el-col>
          <el-col :span="4" class="ellipsis">234254346545675667876</el-col>
          <el-col :span="3" class="ellipsis">1个，1年</el-col>
          <el-col :span="3" class="ellipsis">2个，1年</el-col>
          <el-col :span="3" class="ellipsis operation"><span>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>删除</span></el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="3" class="ellipsis">宝马730</el-col>
          <el-col :span="3" class="ellipsis">沪A88888</el-col>
          <el-col :span="3" class="ellipsis">LDCSF12345FGH1234</el-col>
          <el-col :span="2" class="ellipsis">周洋真丝</el-col>
          <el-col :span="4" class="ellipsis">234254346545675667876</el-col>
          <el-col :span="3" class="ellipsis">1个，1年</el-col>
          <el-col :span="3" class="ellipsis">2个，1年</el-col>
          <el-col :span="3" class="ellipsis operation"><span>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>删除</span></el-col>
        </el-row> -->
      </div>
    </div>
    <div class="submit-and-cancel">
      <button class="submit" @click="submit">提交工单</button>
      <button class="cancel">取消</button>
    </div>
    <transition name="fade">
      <add-car-info v-if="show_add_car_info" :item="item" :index="index" @addCarInfo="addCarInfo" @close="closeAddCarInfo"></add-car-info>
    </transition>
    <transition name="fade">
      <layer v-if="show_layer"></layer>
    </transition>
  </div>
</template>

<script>
import AddCarInfo from '../../../components/JobManagement/AddCarInfo'
import Layer from '../../../components/common/layer'
import SelectStore from '../../../components/SelectStore'
import dateFormat from 'dateformat'
import {addJobOrderList} from '../../../service/index'
export default {
  data () {
    return {
      orderType: 1,
      contactName: '',
      contactPhone: null,
      time: null,
      storeId: null,
      address: '',
      addressDetail: '',
      remark: '',
      orderInfo: [],
      show_layer: false,
      show_add_car_info: false,
      item: null,
      index: null
    }
  },

  components: {
    AddCarInfo,
    Layer,
    SelectStore
  },

  computed: {
    appointment_time () {
      return this.time ? dateFormat(this.time, 'yyyy-mm-dd HH:MM:ss') : this.time
    }
  },

  mounted () {},

  methods: {
    selectStore (value) {
      this.storeId = value
    },
    addCarInfo (item, index) {
      if (index === null) {
        this.orderInfo.push(item)
        this.show_add_car_info = false
        this.show_layer = false
      } else {
        this.orderInfo.splice(index, 1, item)
        this.show_add_car_info = false
        this.show_layer = false
      }
    },
    deleteCarInfo (index) {
      this.orderInfo.splice(index, 1)
    },
    submit () {
      if (!this.contactName) {
        this.$message.error('请填写上门联系人')
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
      if (!this.storeId) {
        this.$message.error('请选择施工门店')
        return
      }
      if (!this.address) {
        this.$message.error('请选择上门地址')
        return
      }
      const params = {
        order_type: parseFloat(this.orderType),
        store_id: parseFloat(this.storeId),
        appointment_time: this.appointment_time,
        address: this.address,
        detailed_address: this.addressDetail,
        contact_name: this.contactName,
        contact_phone: this.contactPhone,
        remark: this.remark,
        order_info: this.orderInfo
      }
      console.log(params)
      addJobOrderList(params).then(res => {

      })
    },
    showAddCarInfo (item, index) {
      this.show_layer = true
      this.show_add_car_info = true
      console.log('show' + index)
      if (item) {
        this.item = item
        this.index = index
      }
    },
    closeAddCarInfo () {
      this.show_add_car_info = false
      this.show_layer = false
    }
  }
}

</script>
<style lang='less' scoped>
.add-new-job{
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  padding: 20px;
  font-size: 14px;
  position: relative;
}
.order-base-info{
  width: 100%;
  padding: 10px 24px;
  background: #fff;
  margin-bottom: 20px;
  .title{
    height: 56px;
    line-height: 56px;
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    color: #5c6e82 ;
    border-bottom: 1px solid #f2f5fa;
    margin-bottom: 20px;
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
  .address-detail.item,.remarks.item{
    height: 90px;
    .item-value{
      padding: 8px 0;
    }
    textarea{
      height: 100%;
      line-height: 20px;
      padding: 5px 10px;
      border-radius: 3px;
      border: 1px solid #dcdfe6;
      resize: none;
      outline: none;
    }
  }
  .row{
    display: flex;
    justify-content: space-between;
    width: 800px;
  }
  .item{
    display: flex;
    height: 48px;
    line-height: 48px;
    .item-name{
      text-align: left;
      margin-right: 10px;
    }
    /deep/.select-store{
      margin-right: 0;
      .el-cascader{
        width: 200px;
      }
    }
    .necessary{
      &::before{
        content: '* ';
        color: #fe6367;
      }
    }
  }
}
.install-list{
  text-align: left;
  background: #fff;
  margin-bottom: 40px;
  .top-actions{
    padding: 0 20px;
    border-bottom: 1px solid #f2f5fa;
    position: relative;
    .title{
      height: 56px;
      line-height: 56px;
      text-align: left;
      font-size: 16px;
      font-weight: normal;
      color: #5c6e82;
      // border-bottom: 1px solid #f2f5fa;
      // margin-bottom: 20px;
    }
    .add-car-info{
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      background: url('../../../assets/add.png') no-repeat center center;
    }
  }
  .el-row{
    height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid #f2f5fa;
    &:last-of-type{
      border-bottom: none;
    }
    .operation{
      cursor: pointer;
      span{
        color: #4266fa;
      }
    }
  }
  .table-body{
    // max-height: 180px;
    // overflow: auto;
  }
}
.submit-and-cancel{
  font-size: 0;
  button{
    width: 100px;
    height: 40px;
    border-radius: 3px;
    &.submit{
      background: #4f6ffe;
      color: #fff;
      margin-right: 32px;
    }
    &.cancel{
      border: 1px solid #4f6ffe;
      color: #4f6ffe;
      background: #fff;
    }
  }
}
.w90{
  width: 90px;
}
.w200{
  width: 200px;
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
