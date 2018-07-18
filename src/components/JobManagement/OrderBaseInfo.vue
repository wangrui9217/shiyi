<template>
  <div class="add-car-info">
    <h3 class="title">工单基础信息编辑<i class="close" @click="close()"></i></h3>
    <div class="content">
      <div class="form-content">
        <div class="rows">
          <div class="item">
            <div class="item-name necessary">工单类型:</div>
            <div class="item-value job-types">
              <div class="job-type" :class="{active: orderType === 1}" @click="orderType = 1">新装</div>
              <div class="job-type" :class="{active: orderType === 2}" @click="orderType = 2">改装</div>
              <div class="job-type" :class="{active: orderType === 3}" @click="orderType = 3">拆除</div>
              <div class="job-type" :class="{active: orderType === 4}" @click="orderType = 4">维修</div>
            </div>
          </div>
          <div class="item">
            <div class="item-name necessary">施工门店:</div>
            <div class="item-value">
              <select-store :store="workStoreId" :storeName="workStoreName" @selectStore="selectStore"></select-store>
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
              <!-- <el-cascader :options="options" v-model="address" @change="handleChange" change-on-select placeholder="请选择省市区" size="small" :props="props"></el-cascader> -->
              <region ref="region" :data="address"></region>
            </div>
          </div>
        </div>
        <div class="rows">
          <div class="item">
            <div class="item-name necessary">详细地址:</div>
            <div class="item-value">
              <!-- <el-select placeholder="选择省市区（默认IP地址）" size="small"></el-select> -->
              <textarea v-model="detailedAddress" placeholder="请输入详细地址" class="w400"></textarea>
            </div>
          </div>
        </div>
        <div class="rows">
          <div class="item">
            <div class="item-name">备注:</div>
            <div class="item-value">
              <textarea v-model="remark" placeholder="请输入备注内容" class="w400"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-and-cancel">
        <button class="submit" @click="sumbit()">保存</button>
        <button class="cancel" @click="close()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchOrderBaseInfo} from '@/service/index'
import SelectStore from '../SelectStore'
import Region from '@/components/common/Region'
import dateFormat from 'dateformat'
import { locationOption } from '@/utils/location'
export default {
  data () {
    return {
      orderType: 1,
      workStoreId: null,
      workStoreName: '',
      contactName: '',
      contactPhone: '',
      time: null,
      address: [],
      detailedAddress: '',
      remark: '',
      options: locationOption,
      props: {
        value: 'label',
        children: 'children'
      }
    }
  },

  components: {
    SelectStore,
    Region
  },

  computed: {
    appointment_time () {
      return this.time ? dateFormat(this.time, 'yyyy-mm-dd HH:MM:ss') : this.time
    }
  },

  mounted () {
    fetchOrderBaseInfo(this.$route.params.orderid).then(res => {
      console.log(res)
      this.orderType = res.type
      // this.workStoreId = res.work_store_id
      // this.workStoreName = res.construction_store_name_view
      this.contactName = res.name
      this.contactPhone = res.phone
      this.time = new Date(res.appointment_time)
      const arr = res.district.split(',')
      arr.forEach(el => {
        this.address.push(parseFloat(el))
      })
      this.detailedAddress = res.address
      this.remark = res.remark
    })
    // const data = this.data
    // if (data) {
    //   this.orderType = data.order_type
    //   this.workStoreId = data.work_store_id
    //   this.workStoreName = data.construction_store_name_view
    //   this.contactName = data.contact_name
    //   this.contactPhone = data.contact_phone
    //   this.time = new Date(data.appointment_time)
    //   this.address = data.address.split(',')
    //   this.detailedAddress = data.detailed_address
    //   this.remark = data.remark
    // }
    // console.log(this.handleTime('2018-05-25 15:06:31'))
  },

  methods: {
    sumbit () {
      if (!this.contactName) {
        this.$message.error('请填写现场联系人')
        return
      }
      // if (!this.workStoreId) {
      //   this.$message.error('请填写施工门店')
      //   return
      // }
      if (!this.contactPhone) {
        this.$message.error('请填写联系电话')
        return
      }
      if (!this.time) {
        this.$message.error('请选择上门时间')
        return
      }
      // if (!this.address) {
      //   this.$message.error('请填写上门地址')
      //   return
      // }
      if (!this.detailedAddress) {
        this.$message.error('请填写详细地址')
        return
      }
      const params = {
        'order_type': this.orderType,
        'store_id': this.workStoreId,
        'appointment_time': this.appointment_time,
        'address': this.detailedAddress,
        'district': this.$refs.region.value.join(','),
        // 'address': this.address.join(),
        // 'detailed_address': this.detailedAddress,
        'contact_name': this.contactName,
        'contact_phone': this.contactPhone,
        'remark': this.remark
      }
      this.$emit('submit', params)
      // console.log('批量增加提交')
      // let arr = this.carFrames.split('\n')
      // arr.forEach(el => {
      //   const obj = {
      //     car_frame: el,
      //     car_license: '',
      //     car_type: null,
      //     car_color: '',
      //     car_owner_name: '',
      //     car_owner_phone: '',
      //     car_owner_certificate_no: '',
      //     car_owner_certificate_type: '',
      //     contract_num: ''
      //   }
      //   this.$emit('addCarInfo', obj, this.schemeIndex)
      // })
    },
    close () {
      this.$emit('close')
    },
    handleTime (timeStr) {
      let Str = timeStr.slice(0, 10)
      let Arr1 = Str.split('-')
      Arr1[1] = Arr1[1] - 1
      let date = new Date()
      date.setFullYear(...Arr1)
      // date.setHours(0, 0, 0, 0)
      return date
    },
    selectStore (val) {
      this.workStoreId = val
    },
    handleChange (value) {
      // console.log(value)
    }
  }
}

</script>
<style lang='less' scoped>
.add-car-info{
  width: 900px;
  position: absolute;
  top: 100px;
  left: 50%;
  // transform: translate(-50%,-60%);
  transform: translateX(-50%);
  background: #fff;
  z-index: 11;
  border-radius: 3px;
}
.title{
  height: 60px;
  line-height: 60px;
  // background: rgba(44, 76, 219, 1);
  font-size: 16px;
  color: #2C4CDB ;
  text-align: left;
  padding: 0 20px;
  border-bottom: 1px solid #f2f5fa;
  margin-bottom: 20px;
  position: relative;
  i{
    position: absolute;
    width: 30px;
    height: 30px;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: url('../../assets/close.png') no-repeat center center;
    cursor: pointer;
  }
}
.content{
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 25px;
  .form-content{
    // border: 1px solid #cccccc;
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
        margin-right: 40px
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
      margin-right: 40px;
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
        text-align: center;
        line-height: 32px;
        border: 1px solid #dcdfe6;
        border-radius: 3px;
        color: #999999;
        cursor: pointer;
        margin-right: 15px;
        &.active{
          border: 1px solid #67c239;
          background: url('../../assets/tick.png') no-repeat top right;
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
  .item{
    // height: 32px;
    line-height: 32px;
    color: #606266;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .item-name{
      width: 90px;
      text-align: left;
      margin-right: 10px;
    }
    .item-value{
      text-align: left;
      width: 240px;
      .el-select{
        width: 240px;
      }
    }
    textarea{
      width: 340px;
      height: 82px;
      resize: none;
      outline: none;
      border-radius: 3px;
      border: 1px solid #E0E5EC;
      line-height: 18px;
      padding: 5px 8px;
      overflow: auto;
    }
  }
  .submit-and-cancel{
    width: 100%;
    height: 72px;
    line-height: 72px;
    font-size: 0;
    border-top: 1px solid #f0f6ff;
    button{
      width: 100px;
      height: 34px;
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
}
.w400{
  width: 400px !important;
}
</style>
