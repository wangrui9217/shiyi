<template>
  <div class="add-vehicle">
     <CommonTitle :title="'新增车辆信息'"></CommonTitle>
     <div class="box">
      <head-operation left="车辆信息"></head-operation>
      <div style="overflow:hidden">
      <el-row class="item-info-content" :gutter="20">
        <el-col :span="6" align="left">
          <el-form label-width="90px" :model="vehicleInfoForm" :rules="rules" ref="vehicleInfoForm">
            <el-form-item label="车架号" prop="vin_code">
              <el-input v-model="vehicleInfoForm.vin_code" v-on:blur="carFrameBlur" size="small"></el-input>
            </el-form-item>
            <el-form-item label="厂家名" prop="manufacturer_name">
              <el-input v-model="vehicleInfoForm.manufacturer_name" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
            <el-form-item label="销售名" prop="sell_name">
              <el-input v-model="vehicleInfoForm.sell_name" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="vehicleInfoForm.remark" :disabled="vehicledisabled"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="90px" :model="vehicleInfoForm" ref="vehicleInfoForm" :rules="rules">
            <el-form-item label="车牌号" prop="license_plate">
              <el-input v-model="vehicleInfoForm.license_plate" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
            <el-form-item label="车辆级别" prop="vehicle_level">
              <el-input v-model="vehicleInfoForm.vehicle_level" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
            <el-form-item label="品牌名" prop="brand">
              <el-input v-model="vehicleInfoForm.brand" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="90px" :model="vehicleInfoForm" ref="vehicleInfoForm" :rules="rules">
            <el-form-item label="发动机号" prop="engine_number">
              <el-input v-model="vehicleInfoForm.engine_number" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
            <el-form-item label="燃油类型" prop="fuel_type">
              <el-input v-model="vehicleInfoForm.fuel_type" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
            <el-form-item label="车型名称" prop="car_model">
              <el-input v-model="vehicleInfoForm.car_model" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="90px" :model="vehicleInfoForm" ref="vehicleInfoForm" :rules="rules">
            <el-form-item label="车辆颜色" prop="color">
              <el-input v-model="vehicleInfoForm.color" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
            <el-form-item label="生产年份" prop="production_year">
              <el-input v-model="vehicleInfoForm.production_year" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
            <el-form-item label="车辆类型" prop="car_type">
              <el-input v-model="vehicleInfoForm.car_type" size="small" :disabled="vehicledisabled"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      </div>
      <head-operation left="车主信息"></head-operation>
      <div style="overflow:hidden">
      <el-row class="item-info-content" :gutter="20">
        <el-col :span="6" align="left">
          <el-form label-width="90px" :model="ownerInfoForm" ref="ownerInfoForm" :rules="rules">
            <el-form-item label="车主" prop="name">
              <el-input v-model="ownerInfoForm.name" size="small" :disabled="ownerdisabled"></el-input>
            </el-form-item>
            <el-form-item label="籍贯" prop="native_place">
              <el-input v-model="ownerInfoForm.native_place" size="small" :disabled="ownerdisabled"></el-input>
            </el-form-item>
            <el-form-item label="证件号" prop="id_card">
              <el-input v-model="ownerInfoForm.id_card" size="small" :disabled="ownerdisabled"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="90px" :model="ownerInfoForm" ref="ownerInfoForm" :rules="rules">
            <el-form-item label="车主类型" prop="car_owner_type">
              <el-select v-model="ownerInfoForm.car_owner_type" size="small" :disabled="ownerdisabled">
                <el-option label="个人" :value="0"></el-option>
                <el-option label="企业" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车主手机号" prop="phone">
              <el-input v-model="ownerInfoForm.phone" size="small" :disabled="ownerdisabled"></el-input>
            </el-form-item>
            <el-form-item label="工作地址" prop="company_address">
              <icon name="location" scale="1.9" class="location_svg"></icon>
              <el-input v-model="ownerInfoForm.company_address" class="address_input" size="small" :disabled="ownerdisabled"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="90px" :model="ownerInfoForm" ref="ownerInfoForm" :rules="rules">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="ownerInfoForm.gender" size="small" :disabled="ownerdisabled">
                <el-option label="男" :value="0"></el-option>
                <el-option label="女" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职业" prop="owner_job">
              <el-input v-model="ownerInfoForm.owner_job" size="small" :disabled="ownerdisabled"></el-input>
            </el-form-item>
            <el-form-item label="居住地址" prop="home_address">
              <icon name="location" scale="1.9" class="location_svg"></icon>
              <el-input v-model="ownerInfoForm.home_address" class="address_input" size="small" :disabled="ownerdisabled"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="90px" :model="ownerInfoForm" ref="ownerInfoForm" :rules="rules">
            <el-form-item label="出生日期" prop="birthday">
              <el-input v-model="ownerInfoForm.birthday" size="small" :disabled="ownerdisabled"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" prop="car_owner_certificate_type">
              <el-select v-model="ownerInfoForm.car_owner_certificate_type" size="small" :disabled="ownerdisabled">
                <el-option label="身份证" :value="0"></el-option>
                <el-option label="护照" :value="1"></el-option>
                <el-option label="其他" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      </div>
      <head-operation left="业务信息"></head-operation>
      <div class="item-info-content" align="left" style="padding-bottom:22px;padding-left:40px">
        <span class="current-business">当前车辆业务</span>
        <div v-if="currentBusiness.length > 0" style="display:inline-block">
          <el-tag v-for="(item,index) in currentBusiness" :key="index" size="small" style="margin-right:10px;">
            {{item.name}}
          </el-tag>
        </div>
        <span v-else>暂无</span>
      </div>
    <div align="center" style="padding:40px;border-top:1px solid #f2f5fa">
      <!-- @click="addCarAndOwnerInfo" -->
      <el-button type="primary" style="margin-right:20px" @click="save" size="small">确认</el-button>
      <el-button type="primary" size="small" @click="cancel">取消</el-button>
    </div>
    </div>
  </div>
</template>
<script>
import CommonTitle from '@/components/common/title'
import {
  getCarInfoRequest,
  getOwnerInfoRequest,
  addCarInfoRequest,
  getBusinessInfoRequest,
  addOwnerInfoRequest
} from '@/service/index'
export default {
  components: {
    CommonTitle
  },
  data () {
    return {
      disabled: true,
      ownerId: '', // 车主的id
      carId: '', // 车辆的id
      needSave: true, // 数据是否需要保存
      vehicleInfoForm: {
        vin_code: '', // 车架号 vin
        license_plate: '', // 车牌号 暂无
        engine_number: '', // 发动机号 暂无
        color: '', // 车辆颜色 暂无
        manufacturer_name: '', // 厂家名 manufacturer
        vehicle_level: '', // 车辆级别 vehicle_level
        fuel_type: '', // 燃油类型 fuel_Type
        production_year: '', // 生产年份 made_year
        sell_name: '', // 销售名 sale_name
        brand: '', // 品牌名 brand_name
        car_model: '', // 车型名称 model_name
        car_type: '', // 车辆类型 car_type
        remark: '' // 备注 暂无
      }, // 车辆的信息表单
      ownerInfoForm: {
        name: '', // 车主名称
        car_owner_type: '', // 车主类型
        gender: '', // 性别
        birthday: '', // 出生日期
        native_place: '', // 籍贯
        phone: '', // 车主手机号
        owner_job: '', // 职业
        car_owner_certificate_type: '', // 证件类型
        id_card: '', // 证件号
        company_address: '', // 工作地址
        home_address: '' // 居住地址
      }, // 车主的信息表单
      vehicledisabled: true, // 车辆信息的表单是否可填
      ownerdisabled: true, // 车主信息的表单是否可填
      rules: {
        vin_code: [
          {
            required: true,
            message: '请输入车架号',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入车主',
            trigger: 'blur'
          }
        ]
      },
      currentBusiness: [] // 当前车辆的业务
    }
  },
  mounted () {},
  methods: {
    carFrameBlur () {
      if (!this.vehicleInfoForm.vin_code) {
        return this.$message({
          type: 'error',
          message: '请填写车架号'
        })
      }
      this.getCarInfo()
    }, // 失去焦点查询车辆的信息
    getCarInfo () {
      let params = {
        vin_code: this.vehicleInfoForm.vin_code
      }
      for (let key in this.vehicleInfoForm) {
        if (key !== 'vin_code') {
          this.vehicleInfoForm[key] = ''
        }
      }
      for (let key in this.ownerInfoForm) {
        this.ownerInfoForm[key] = ''
      }
      this.currentBusiness.splice(0)
      this.ownerId = ''
      this.carId = ''
      getCarInfoRequest(params)
        .then(res => {
          if (res.showapi_res_body) {
            let data = res.showapi_res_body
            this.vehicleInfoForm.vin_code = data.vin
            this.vehicleInfoForm.license_plate = ''
            this.vehicleInfoForm.engine_number = ''
            this.vehicleInfoForm.color = ''
            this.vehicleInfoForm.manufacturer_name = data.manufacturer
            this.vehicleInfoForm.vehicle_level = data.vehicle_level
            this.vehicleInfoForm.fuel_type = data.made_year
            this.vehicleInfoForm.production_year = data.made_year
            this.vehicleInfoForm.sell_name = data.sale_name
            this.vehicleInfoForm.brand = data.brand_name
            this.vehicleInfoForm.car_model = data.model_name
            this.vehicleInfoForm.car_type = data.car_type
            this.vehicleInfoForm.remark = ''
            this.needSave = true
          } else {
            // this.vehicleInfoForm = Object.assign({}, res)
            for (let key in this.vehicleInfoForm) {
              this.vehicleInfoForm[key] = res[key]
            }
            this.ownerId = res.car_owner_id
            this.carId = res.id
            this.needSave = false
            this.getOwnerInfo()
            this.getBusinessInfo()
          }
          this.vehicledisabled = true
          this.$message({
            type: 'info',
            message: '已存在该车辆信息'
          })
        })
        .catch(err => {
          console.log(err)
          this.vehicledisabled = false
          this.ownerdisabled = false
          this.needSave = true
        })
    }, // 获取车辆的信息
    getOwnerInfo () {
      getOwnerInfoRequest(this.ownerId).then(res => {
        this.ownerdisabled = true
        this.ownerInfoForm = Object.assign({}, res)
      })
    }, // 获取车主的信息
    getBusinessInfo () {
      let params = {
        car_id: this.carId
      }
      getBusinessInfoRequest(params).then(res => {
        this.currentBusiness.splice(0)
        this.currentBusiness.push(...res)
      })
    },
    addCarInfo (id) {
      this.vehicleInfoForm['car_owner_id'] = id
      let params = this.vehicleInfoForm
      addCarInfoRequest(params).then(res => {
        this.$router.push({ name: 'vehicleDetail', query: { id: res } })
      })
    }, // 添加车辆信息
    addOwnerInfo () {
      let params = this.ownerInfoForm
      addOwnerInfoRequest(params).then(res => {
        this.addCarInfo(res)
      })
    }, // 添加车主的信息
    save () {
      if (this.vehicleInfoForm.vin_code === '') {
        this.$message({
          type: 'error',
          message: '请填写车架号'
        })
        return false
      }
      if (this.ownerInfoForm.name === '') {
        this.$message({
          type: 'error',
          message: '请填写车主名称'
        })
        return false
      }
      if (!this.needSave) {
        return this.$router.push({ name: 'vehicleDetail', query: { id: this.carId } })
      }
      this.addOwnerInfo()
    }, // 保存
    cancel () {
      this.$router.go(-1)
    } // 取消
  }
}
</script>

<style lang="less" scoped>
@style-color: #4f6ffe;
.add-vehicle {
    width: 86.4%;
    max-width: 1660px;
    margin: 0 auto;
    padding-bottom: 30px;
    position: relative;
  .box{
    background: #fff;
  }
  .item-info-title {
    font-size: 16px;
    line-height: 2;
    margin-top: 10px;
    text-align: left;
    font-weight: normal;
    margin-left: 30px;
  }
  .item-info-content {
    background: #fff;
    padding: 30px 25px 15px 5px;
    box-sizing: border-box;
    .address_input {
      /deep/.el-input__inner {
        padding-right: 26px;
      }
    }
    .location_svg {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 99;
    }
    /deep/svg {
      path {
        fill: #e0e5ec;
      }
    }
  }
  .business-info {
    .current-business {
      margin-right: 30px;
      margin-left: 20px;
    }
    .el-tag {
      margin-right: 15px;
    }
  }
  /deep/.el-select {
    width: 100%;
  }
  .h100 {
    height: 100%;
  }
}
</style>
