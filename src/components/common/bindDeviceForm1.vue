<template>
  <div>
    <head-operation left="设备安装信息" :right="setting"></head-operation>
    <div class="bindDeviceForm1">
      <div style="height:200px;line-height:200px;text-align:center;border-bottom:1px solid #f2f5fa" v-if="preDeviceInstallRecordList.length === 0">
        暂无设备安装记录
      </div>
      <div v-else>
        <form1 :formItemConfigs="preRecordItem.install_standard" :num="index" @dataChange="getEditDeviceInstallData" :defaultProp="defaultProp" v-for="(preRecordItem,index) in preDeviceInstallRecordList" :key="preRecordItem.id"></form1>
      </div>
    </div>
    <div class="bindDeviceForm" v-for="(deviceDataItem,index) in deviceDataArr" :key="index">
      <el-row style="display:flex;align-items:center">
        <el-col :span="4">设备{{index+1}}</el-col>
        <el-col :span="20">
          <div class="defaultForm">
            <el-form ref="defaultForm" :inline="true" :model="deviceDataItem" class="demo-ruleForm" label-width="110px" :label-position="'top'">
              <el-form-item label="设备号" prop="code" :rules="[{required:true,message:'请输入设备号',trigger:'blur'}]">
                <el-autocomplete class="inline-input" v-model="deviceDataItem.code" :fetch-suggestions="(queryString, cb) => querySearch(queryString, cb,index)" ref="searchDom" placeholder="请输入设备号" :trigger-on-focus="false" size="small" @select="handleSelect(index,$event)">
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.code}}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <!-- <el-form-item label="安装人" prop="install_man">
            <el-input v-model="deviceData.install_man" placeholder="请输入安装人" size="small"></el-input>
          </el-form-item> -->
              <el-form-item label="安装位置" prop="install_data" :rules="[{required:true,message:'请输入安装位置',trigger:'blur'}]">
                <el-input v-model="deviceDataItem.install_data" type="textarea" placeholder="请输入安装位置" size="small"></el-input>
              </el-form-item>
            </el-form>
            <span class="delete-box" v-if="index !== 0" @click="deleteDevice(index)">删除</span>
          </div>
          <form1 ref="comForm" :formItemConfigs="deviceDataItem.install_standard" :num="index" :defaultProp="defaultProp" v-if="deviceDataItem.install_standard.length > 0"></form1>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="addNewDeviceBtn" @click="addDevice">+新增设备</div> -->
  </div>
</template>
<script>
import { searchDeviceRequest, standardListRequest, deviceInstallRecordRequest } from '@/service/index'
import upload from '@/components/common/uploadPicture'
import form1 from '@/components/common/form2'
export default {
  name: 'bindDeviceForm',
  props: {
    storeId: {
      required: true
    },
    preVehicleInstallIds: {}
  },
  data () {
    return {
      // deviceData: {
      //   install_data: '', // 安装位置
      //   driver_id: '', // 安装设备号
      //   device_num: ''
      // },
      deviceDataArr: [
        {
          install_data: '', // 安装位置
          driver_id: '', // 安装设备号
          code: '',
          install_standard: []
        }
      ], // 设备的数组
      rules1: {
        code: [
          {
            required: true,
            message: '请输入设备号',
            trigger: 'blur'
          }
        ],
        install_data: [
          {
            required: true,
            message: '请输入安装位置',
            trigger: 'blur'
          }
        ]
      },
      formItemConfigs: [],
      defaultProp: {
        type: 'field',
        prop: 'id',
        label: 'name',
        default_name: 'default_value'
      },
      setting: [{ label: '新增设备安装', func: this.addDevice }],
      preDeviceInstallRecordList: []
    }
  },
  components: {
    upload,
    form1
  },
  computed: {},
  updated () {}, // 数据更新
  created () {},
  beforeMount () {
    this.getgenerateFormData()
  },
  mounted () {},
  methods: {
    searchDevice (val, callback) {
      let params = {
        store_id: this.storeId,
        'search[code]': val
      }
      searchDeviceRequest(params).then(res => {
        if (res.items) {
          callback(res.items)
        }
      })
    }, // 模糊查询
    querySearch (queryString, cb, index) {
      this.deviceDataArr[index].driver_id = ''
      this.searchDevice(queryString, cb)
    }, // 查询搜索
    handleSelect (index, $event) {
      this.deviceDataArr[index].driver_id = $event.id
      this.deviceDataArr[index].code = $event.code
      // this.deviceData.device_num = val.device_num
      // this.deviceData.device_id = val.id
      // this.deviceData.order_id = val.work_order_id // 订单的id
    }, // 处理选择
    // deleteDevice () {
    //   this.$emit('deleteItem')
    // }, // 删除设备的表单
    getgenerateFormData () {
      let params = {
        store_id: this.storeId,
        type: 2
      }
      standardListRequest(params).then(res => {
        this.formItemConfigs = res.items
        let val = this.generateTemplateData()
        this.deviceDataArr[0].install_standard = val
      })
    }, // 获取生成form表单的数据
    // generateForm () {
    //   this.formItemConfigs1.forEach((element, index) => {
    //     let objectKye = 'formName' + index
    //     this.$set(this.form, objectKye, element.default_value)
    //     if (element.required === 1) {
    //       this.rules['formName' + index] = [
    //         { required: true, message: 'hhh', trigger: 'blur' }
    //       ]
    //     }
    //   })
    // }, // 生成form表单
    addDevice () {
      let val = this.generateTemplateData()
      let item = {
        install_data: '', // 安装位置
        driver_id: '', // 安装设备号
        code: '',
        install_standard: val
      }
      this.deviceDataArr.push(item)
    }, // 添加设备
    generateTemplateData () {
      let newArr = []
      this.formItemConfigs.forEach(ele => {
        let itemObj = {}
        for (let k in ele) {
          itemObj[k] = ele[k]
        }
        newArr.push(itemObj)
      })
      return newArr
    },
    deleteDevice (index) {
      console.log(index)
      this.deviceDataArr.splice(index, 1)
    },
    validateDeviceForm () {
      this.$refs.defaultForm.forEach((ele, index) => {
        ele.validate(valid => {
          if (valid) {
          } else {
            this.$message({
              message: '请把表单填写完整~',
              type: 'error'
            })
            return false
          }
        })
      })
      this.$refs.comForm.forEach((ele, index) => {
        ele.validateForm()
      })
    }, /// 设备验证
    getDeviceInstallRecord () {
      let params = {
        id: this.preVehicleInstallIds
      }
      deviceInstallRecordRequest(params)
        .then(res => {
          this.preDeviceInstallRecordList.splice(0)
          if (res && res.length > 0) {
            this.preDeviceInstallRecordList.push(...res)
          }
        })
        .catch(err => {
          this.preDeviceInstallRecordList.splice(0)
          console.log(err)
        })
    },
    getEditDeviceInstallData (val) {
      this.preDeviceInstallRecordList[val.Number].install_standard = val.formArr
    }
  },
  watch: {
    deviceDataArr: {
      handler (val, oldVal) {
        this.$emit('deviceDataChange', val)
      },
      deep: true
    },
    preDeviceInstallRecordList: {
      handler (val, oldVal) {
        this.$emit('preDeviceDataChange', val)
      },
      deep: true
    },
    storeId: function (val, oldVal) {
      this.deviceDataArr = [
        {
          install_data: '',
          driver_id: '',
          code: '',
          install_standard: []
        }
      ]
      this.getgenerateFormData()
    },
    preVehicleInstallIds: function (val, oldVal) {
      this.getDeviceInstallRecord()
    }
  }
}
</script>

<style lang="less" scoped>
@style-color: #4f6ffe;
.bindDeviceForm1{
  padding: 26px 22px;
}
.bindDeviceForm {
  background: #fff;
  padding: 26px 22px;
  // margin-bottom: 8px;
  border-bottom: 1px solid #f2f5fa;
  .defaultForm {
    position: relative;
    .el-form {
      display: flex;
    }
    .el-form-item {
      width: 25%;
      margin-right: 0;
      /deep/.el-form-item__content {
        width: 120px;
        input {
          height: 120px;
        }
        .el-textarea__inner {
          width: 120px;
          height: 120px;
          min-height: 120px;
          max-height: 120px;
        }
      }
    }
    .delete-box {
      position: absolute;
      color: @style-color;
      line-height: 2.5;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
}
.addNewDeviceBtn {
  line-height: 2;
  background: #f9fafc;
  color: #999999;
  font-size: 18px;
  text-align: center;
  border-bottom: 1px solid #f2f5fa;
  cursor: pointer;
}
</style>
