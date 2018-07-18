<template>
  <div class="bind-equipment">
    <CommonTitle :title="'车辆安装记录'"></CommonTitle>
    <div class="box">
      <head-operation left="车辆信息"></head-operation>
      <div class="car-info" align="left">
        <boxContainder :data="carInfo" ref="vehicleInfoReadOnlyForm" :isLoading="vehicleInfoIsloading">
          <div slot="selectStore">
            <selectStore @selectStore="getSelectStoreId"></selectStore>
          </div>
        </boxContainder>
      </div>
    </div>
    <div v-if="showForm">
      <div class="box hasTop">
        <head-operation left="车辆安装信息" :right="setting"></head-operation>
        <div class="add-photo" align="left">
          <div class="item-content">
            <div class="picture-box">
              <div>
                <div style="height:200px;line-height:200px;text-align:center;border-bottom:1px solid #f2f5fa" v-if="preVehicleInstallRecordList.length === 0">
                  暂无车辆安装记录
                </div>
                <div v-else>
                  <form1 :formItemConfigs="preRecordItem.install_standard" :defaultProp="defaultProp" :num="index" @dataChange="getEditVehicleInstallData" v-for="(preRecordItem,index) in preVehicleInstallRecordList" :key="preRecordItem.id"></form1>
                </div>
              </div>
              <div v-if="this.showNewVehicleForm">
                <form1 ref="vehicleForm" :formItemConfigs="formItemConfigs" :defaultProp="defaultProp" @dataChange="getVehicleData"></form1>
              </div>
              <!-- <el-row>
            <el-col :span="12">
              <upload :pictureArr="carFramePictureArr" :allowNumber="1" :title="'车架号'" @pictureChange="pictureHandle1"></upload>
            </el-col>
            <el-col :span="12">
              <upload :pictureArr="LPNPictureArr" :allowNumber="1" :title="'车牌号'" @pictureChange="pictureHandle2"></upload>
            </el-col>
          </el-row>
          <upload :pictureArr="additionPicture" :allowNumber="9" :title="'附加照片'" @pictureChange="pictureHandle3"></upload> -->
            </div>
          </div>
        </div>
      </div>
      <div class="box hasTop">
        <div class="bind-device" align="left">
          <deviceFormItem ref="deviceForm" @preDeviceDataChange="getPreDeviceData" @deviceDataChange="getDeviceData" :storeId="StoreId" :preVehicleInstallIds="preVehicleInstallIds"></deviceFormItem>
          <!-- <div class="addNewDeviceBtn" @click="addDevice">+新增设备</div> -->
        </div>
        <div class="bind-equipment-btns">
          <el-button type="primary" size="small" @click="save">保存</el-button>
          <el-button type="primary" size="small">取消</el-button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import CommonTitle from '@/components/common/title'
import upload from '@/components/common/uploadPicture'
import deviceFormItem from '@/components/common/bindDeviceForm1'
import boxContainder from '@/components/common/boxContainer'
import form1 from '@/components/common/form2'
import selectStore from '@/components/SelectStore'
import {
  standardListRequest,
  searchCarLists,
  vehicleInstallRecordRequest,
  editInstallRecordRequest,
  bindNewInstallRequest
} from '@/service/index'
export default {
  components: {
    upload,
    deviceFormItem,
    boxContainder,
    form1,
    CommonTitle,
    selectStore
  },
  data () {
    return {
      vehicleInfoIsloading: true, // 车辆信息的loading
      deviceDataArr: [
        {
          // deviceNumber: '', // 设备号
          device_num: '', // 设备号
          device_id: '', // 设备id
          order_id: '', // 订单的id
          install_place: '', // 安装位置
          install_man: '', // 安装人
          deviceLinePic: [],
          devicePlacePic: [],
          img_type: {
            device_line: '', // 接线图
            device_place: '' // 安装位置图
          }
        }
      ], // 设备的数据
      rules: {
        install_man: [
          {
            required: true,
            message: '请输入安装人员',
            trigger: 'blur'
          }
        ],
        install_place: [
          {
            required: true,
            message: '请输入安装位置',
            trigger: 'blur'
          }
        ]
      },
      carInfo: [
        { label: '车架号', value: '' },
        { label: '车牌号', value: '' },
        { label: '车主', value: '' },
        { label: '门店', component: 'selectStore' }
      ], // 车辆的信息
      warning: true, // 提交需要警告吗
      formItemConfigs: [],
      preVehicleInstallRecordList: [],
      preVehicleInstallIds: [],
      defaultProp: {
        type: 'field',
        prop: 'id',
        label: 'name',
        default_name: 'default_value'
      },
      vehicleData: [],
      DeviceData: [],
      StoreId: '', // 选择的门店
      showForm: false,
      setting: [{ label: '新增车辆安装', func: this.addVehicleInstall }],
      preDeviceInstallRecordList: [],
      loadDevice: false,
      showNewVehicleForm: false
    }
  },
  mounted () {
    this.getVehicleInfo()
  },
  computed: {},
  methods: {
    deleteDeviceForm (index) {
      this.deviceDataArr.splice(index, 1)
    }, // 删除设备的表单
    getVehicleData (val) {
      this.vehicleData.splice(0)
      this.vehicleData.push(...val.formArr)
    },
    getDeviceData (val) {
      this.DeviceData.splice(0)
      this.DeviceData.push(...val)
    },
    isWarn (callback) {
      if (this.$refs.vehicleForm) {
        alert(1)
        this.$refs.vehicleForm.validateForm()
      }
      // this.$refs.deviceForm.validateDeviceForm()
      // if (callback) {
      //   callback()
      // }
    }, // 是否需要警告
    bindDevice () {
      if (!this.showNewVehicleForm && this.preVehicleInstallRecordList.length === 0) {
        return this.$message({
          type: 'error',
          message: '请选择新增车辆安装'
        })
      }
      this.edit()
      this.addNew()
    }, // 绑定设备
    addNew () {
      let id = ''
      let newVehicle = []
      if (this.showNewVehicleForm) {
        id = ''
        newVehicle = this.vehicleData
      } else {
        id = this.preVehicleInstallRecordList[0].id
        newVehicle = []
      }
      let params = {
        car_id: this.$route.query.id,
        install_standard: newVehicle,
        store_id: this.StoreId,
        vin: this.carInfo[0].value,
        car_install_id: id,
        driver: this.DeviceData
      }
      bindNewInstallRequest(params).then(res => {
        this.$message({
          type: 'success',
          message: '安装成功'
        })
      })
    },
    save () {
      this.isWarn(this.bindDevice)
    }, // 保存绑定设备
    getGenerateFormData () {
      let params = {
        store_id: this.StoreId,
        type: '1'
      }
      standardListRequest(params).then(res => {
        this.formItemConfigs.splice(0)
        if (res.items.length > 0) {
          this.formItemConfigs.push(...res.items)
        }
      })
    },
    getSelectStoreId (val) {
      this.StoreId = val
      this.showForm = true
      this.getVehicleInstallRecord()
      this.showNewVehicleForm = false
    },
    getVehicleInfo () {
      const id = this.$route.query.id
      searchCarLists(id).then(res => {
        this.carInfo[0].value = res.vin_code
        this.carInfo[1].value = res.license_plate
        this.carInfo[2].value = res.owner_name
        this.vehicleInfoIsloading = false
      })
    },
    getVehicleInstallRecord () {
      let params = {
        store_id: this.StoreId,
        car_id: this.$route.query.id
      }
      vehicleInstallRecordRequest(params)
        .then(res => {
          this.preVehicleInstallRecordList.splice(0)
          this.preVehicleInstallIds.splice(0)
          if (res && res.length > 0) {
            this.preVehicleInstallRecordList.push(...res)
            res.forEach(ele => {
              this.preVehicleInstallIds.push(ele.id)
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.preVehicleInstallIds.splice(0)
          this.preVehicleInstallRecordList.splice(0)
        })
    }, // 获取车辆的安装记录
    addVehicleInstall () {
      if (!this.showNewVehicleForm) {
        this.showNewVehicleForm = true
      } else {
        return false
      }
      this.getGenerateFormData()
    },
    getEditVehicleInstallData (val) {
      this.preVehicleInstallRecordList[val.Number].install_standard =
        val.formArr
    }, // 获取车辆的安装记录
    getPreDeviceData (val) {
      this.preDeviceInstallRecordList = val
    },
    edit () {
      let params = {
        car: this.preVehicleInstallRecordList,
        driver: this.preDeviceInstallRecordList
      }
      editInstallRecordRequest(params).then(res => {})
    }
  }
}
</script>

<style lang="less" scoped>
@style-color: #4f6ffe;
.bind-equipment {
  width: 86.4%;
  max-width: 1660px;
  margin: 0 auto;
  padding-bottom: 30px;
  position: relative;
  .box {
    background: #fff;
  }
  .item-header-box {
    padding-top: 8px;
    line-height: 2;
  }
  .item-title {
    font-weight: normal;
    color: #333333;
    line-height: 2;
    font-size: 16px;
    display: inline-block;
  }
  .annotation {
    font-size: 12px;
    color: #9ca8b3;
  }
  .item-content {
    background: #fff;
    padding: 26px 24px;
    .car-info-title {
      color: #9ca8b3;
      line-height: 1.5;
    }
  }
  .addNewDeviceBtn {
    line-height: 2;
    background: #f9fafc;
    color: #999999;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
  }
  .bind-equipment-btns {
    padding: 30px;
  }
  .hasTop {
    margin-top: 20px;
  }
}
</style>
