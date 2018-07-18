<template>
  <div class="add-car-info">
    <h3 class="title">新增车辆<i class="close" @click="close()"></i></h3>
    <div class="content">
      <div class="car-info">
        <h4 class="sub-title">车辆信息</h4>
        <div class="car-info-content">
          <div class="item">
            <div class="item-name necessary">所属门店:</div>
            <div class="item-value">
              <select-store @selectStore="selectStore"></select-store>
            </div>
          </div>
          <div class="item car-frame">
            <div class="item-name necessary">车架号:</div>
            <div class="item-value">
              <el-select v-model="carFrameType" size="small">
                <el-option v-for="(item,index) in carFrameTypeList" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
              <el-input placeholder="请输入车架号" v-model="carFrame" size="small" ></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-name">车牌号:</div>
            <div class="item-value">
              <el-input placeholder="请输入车牌号" v-model="carLicense" size="small" ></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-name">车型:</div>
            <div class="item-value">
              <el-select placeholder="请输入车型" v-model="carType" size="small" >
                <el-option v-for="(item,index) in carTypeList" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="item-name">车辆颜色:</div>
            <div class="item-value">
              <el-input placeholder="请输入车辆颜色" v-model="carColor" size="small" ></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="car-owner-info">
        <h4 class="sub-title">车主信息</h4>
        <div class="car-owner-info-content">
          <div class="item car-owner-types">
            <div class="item-name">车主类型:</div>
            <div class="item-value">
              <div class="car-owner-type" :class="{active: (carOwnerType === '0')}" @click="carOwnerType = '0';carOwnerCertificateType = '1'">个人</div>
              <div class="car-owner-type" :class="{active: (carOwnerType === '1')}" @click="carOwnerType = '1';carOwnerCertificateType = '1'">企业</div>
            </div>
          </div>
          <div class="item">
            <div class="item-name"></div>
            <div class="item-value">
            </div>
          </div>
          <div class="item">
            <div class="item-name">车主:</div>
            <div class="item-value">
              <el-input placeholder="请输入车主" v-model="carOwnerName" size="small" ></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-name">手机号:</div>
            <div class="item-value">
              <el-input placeholder="请输入手机号" v-model="carOwnerPhone" size="small" ></el-input>
            </div>
          </div>
          <div v-if="carOwnerType === '0'" class="item certificate-types">
            <div class="item-name">证件类型:</div>
            <div class="item-value">
              <div class="certificate-type" :class="{active: (carOwnerCertificateType === '1')}" @click="carOwnerCertificateType = '1'">身份证</div>
              <div class="certificate-type" :class="{active: (carOwnerCertificateType === '2')}" @click="carOwnerCertificateType = '2'">护照</div>
              <div class="certificate-type" :class="{active: (carOwnerCertificateType === '3')}" @click="carOwnerCertificateType = '3'">其他</div>
            </div>
          </div>
          <div v-else class="item certificate-types">
            <div class="item-name">证件类型:</div>
            <div class="item-value">
              <div class="certificate-type organization" :class="{active: (carOwnerCertificateType === '1')}" @click="carOwnerCertificateType = '1'">组织机构代码</div>
              <div class="certificate-type" :class="{active: (carOwnerCertificateType === '3')}" @click="carOwnerCertificateType = '3'">其他</div>
            </div>
          </div>
          <div class="item">
            <div class="item-name">证件号:</div>
            <div class="item-value">
              <el-input placeholder="请输入证件号" v-model="carOwnerCertificateNo" size="small" ></el-input>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="item">
        <div class="item-name">车主:</div>
        <div class="item-value">
          <el-input placeholder="请输入车主" v-model="carOwnerName" size="small" ></el-input>
        </div>
      </div>
      <div class="item">
        <div class="item-name">手机号:</div>
        <div class="item-value">
          <el-input placeholder="请输入手机号" v-model="carOwnerPhone" size="small" ></el-input>
        </div>
      </div>
      <div class="item certificate-types">
        <div class="item-name">证件类型:</div>
        <div class="item-value">
          <div class="certificate-type" :class="{active: (carOwnerCertificateType === '1')}" @click="carOwnerCertificateType = '1'">身份证</div>
          <div class="certificate-type" :class="{active: (carOwnerCertificateType === '2')}" @click="carOwnerCertificateType = '2'">护照</div>
          <div class="certificate-type" :class="{active: (carOwnerCertificateType === '3')}" @click="carOwnerCertificateType = '3'">其他</div>
        </div>
      </div>
      <div class="item">
        <div class="item-name">证件号:</div>
        <div class="item-value">
          <el-input placeholder="请输入证件号" v-model="carOwnerCertificateNo" size="small" ></el-input>
        </div>
      </div>
       -->
      <div class="loan-info">
        <h4 class="sub-title">贷款信息</h4>
        <div class="loan-info-content">
          <!-- <div class="item device">
            <div class="item-name">有线设备:</div>
            <div class="item-value">
              <el-select v-model="wiredYearCardId" size="small">
                <el-option v-for="(item,index) in wiredList" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
              <el-input v-model="wiredNum" size="small" ></el-input>
              <span>个</span>
            </div>
          </div>
          <div class="item device">
            <div class="item-name">无线设备:</div>
            <div class="item-value">
              <el-select v-model="wirelessYearCardId" size="small">
                <el-option v-for="(item,index) in wirelessList" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
              <el-input v-model="wirelessNum" size="small" ></el-input>
              <span>个</span>
            </div>
          </div> -->
          <div class="item">
            <div class="item-name">合同号:</div>
            <div class="item-value">
              <el-input placeholder="请输入合同号" v-model="contractNum" size="small" ></el-input>
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
import SelectStore from '../SelectStore'
export default {
  props: [
    'car',
    'schemeIndex',
    'carIndex'
  ],
  data () {
    return {
      storeId: null,
      carFrame: '',
      carLicense: '',
      carType: null,
      carFrameType: null,
      carFrameTypeList: [
        {
          value: 1,
          label: '默认车'
        },
        {
          value: 2,
          label: '普通车'
        },
        {
          value: 3,
          label: '特殊车'
        }
      ],
      carTypeList: [
        {
          value: '1',
          label: '奥迪/A3/2016'
        },
        {
          value: '2',
          label: '宝马/X5/2018'
        },
        {
          value: '3',
          label: '奔驰/E300/2018'
        }
      ],
      carColor: '',
      carOwnerName: '',
      carOwnerPhone: '',
      carOwnerCertificateNo: '',
      carOwnerType: '0',
      carOwnerCertificateType: '1',
      contractNum: ''
    }
  },

  components: {
    SelectStore
  },

  computed: {},

  mounted () {
    if (this.car) {
      console.log(this.car)
      this.storeId = this.car.store_id
      this.carFrame = this.car.car_frame
      this.carLicense = this.car.car_license
      this.carFrameType = this.car.car_frame_type
      this.carColor = this.car.car_color
      this.carOwnerName = this.car.car_owner_name
      this.carOwnerPhone = this.car.car_owner_phone
      this.carOwnerCertificateNo = this.car.car_owner_certificate_no
      this.carOwnerCertificateType = this.car.car_owner_certificate_type
      this.contractNum = this.car.contract_num
    }
  },

  methods: {
    selectStore (value) {
      this.storeId = value
    },
    sumbit () {
      if (!this.carType) {
        this.$message.error('请选择车型')
        return
      }
      if (!this.carFrame) {
        this.$message.error('请填写车架号')
        return
      }
      const obj = {
        store_id: this.storeId,
        car_frame: this.carFrame,
        car_license: this.carLicense,
        car_type: this.carType,
        car_frame_type: this.carFrameType,
        car_color: this.carColor,
        car_owner_type: this.carOwnerType,
        car_owner_name: this.carOwnerName,
        car_owner_phone: this.carOwnerPhone,
        car_owner_certificate_no: this.carOwnerCertificateNo,
        car_owner_certificate_type: this.carOwnerCertificateType,
        contract_num: this.contractNum
      }
      if (this.car) {
        this.$emit('addCarInfo', obj, this.schemeIndex, this.carIndex)
      } else {
        this.$emit('addCarInfo', obj, this.schemeIndex)
      }
    },
    close () {
      this.$emit('close')
    }
  }
}

</script>
<style lang='less' scoped>
.add-car-info{
  width: 810px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-60%);
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
  padding: 0 20px 20px;
  .sub-title{
    text-align: left;
    height: 50px;
    line-height: 50px;
    color: #5e6d84;
  }
  .car-info-content,.car-owner-info-content,.loan-info-content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 25px;
    .car-frame{
      .item-value{
        font-size: 0;
        /deep/.el-select{
          width: 80px;
          margin-right: 8px;
          .el-input__inner{
            padding: 0 6px;
            .el-input__icon{
              width: 20px;
            }
          }
        }
        .el-input{
          width: 112px;
        }
      }
    }
    .car-owner-types{
      .item-value{
        display: flex;
        justify-content: flex-start;
        .car-owner-type{
          width: 60px;
          height: 32px;
          line-height: 32px;
          border: 1px solid #e0e4ed;
          border-radius: 3px;
          color: #999999;
          margin-right: 10px;
          cursor: pointer;
          &.active{
            border: 1px solid #67c239;
            background: url('../../assets/tick.png') no-repeat top right;
          }
        }
      }
    }
    .certificate-types{
      .item-value{
        display: flex;
        justify-content: space-between;
        .certificate-type{
          width: 60px;
          height: 32px;
          line-height: 32px;
          border: 1px solid #e0e4ed;
          border-radius: 3px;
          color: #999999;
          cursor: pointer;
          &.active{
            border: 1px solid #67c239;
            background: url('../../assets/tick.png') no-repeat top right;
          }
          &.organization{
            width: 130px;
          }
        }
      }
    }
    .device{
      .item-value{
        font-size: 0;
        text-align: left;
        .el-select{
          width: 130px;
        }
        .el-input{
          width: 40px;
          margin: 0 5px;
          /deep/.el-input__inner{
            padding: 0 6px;
          }
        }
        span{
          font-size: 14px;
        }
      }
    }
    .item{
      width: 300px;
      height: 32px;
      line-height: 32px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      // &:nth-of-type(odd){
      //   margin-right: 70px;
      // }
      .item-name{
        width: 80px;
        text-align: right;
      }
      .item-value{
        width: 200px;
      }
      .necessary{
        &::before{
          content: '* ';
          color: #fe6367;
        }
      }
      // input{
      //   width: 200px;
      //   height: 26px;
      //   line-height: 26px;
      //   padding: 0 8px;
      //   border: 1px solid #777;
      // }
    }
  }
  .loan-info{
    margin-bottom: 50px;
    // .device-info-content{
    //   .table-body{
    //     max-height: 300px;
    //     overflow: auto;
    //   }
    // }
    // .el-row{
    //   min-height: 60px;
    //   // line-height: 24px;
    //   border-bottom: 1px solid #ddd;
    //   &:last-of-type{
    //     border-bottom: none;
    //   }
    // }
    // .explain{
    //   text-align: left;
    // }
  }
  .submit-and-cancel{
    font-size: 0;
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
  /deep/.select-store{
    .el-cascader{
      width: 200px;
    }
  }
}
</style>
