<template>
  <div class="bindDeviceForm">
    <el-row>
      <el-col :span="20">
        <el-form :inline="true" :model="deviceData" :rules="rules" class="demo-ruleForm">
          <el-form-item label="设备号" prop="device_num">
            <el-autocomplete class="inline-input" v-model="deviceData.device_num" :fetch-suggestions="querySearch" ref="searchDom" placeholder="请输入设备号" :trigger-on-focus="false" size="small" @select="handleSelect">
              <template slot-scope="{ item }">
                <div class="name">{{ item.device_num }}</div>
              </template>
            </el-autocomplete>
            <!-- <el-input v-model="item.deviceNumber" placeholder="请输入设备号" size="small"></el-input> -->
          </el-form-item>
          <el-form-item label="安装人" prop="install_man">
            <el-input v-model="deviceData.install_man" placeholder="请输入安装人" size="small"></el-input>
          </el-form-item>
          <el-form-item label="安装位置" prop="install_place">
            <el-input v-model="deviceData.install_place" placeholder="请输入安装位置" size="small"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" align="right">
        <span class="delete-box" @click="deleteDevice">删除</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <upload :pictureArr="deviceData.deviceLinePic" :allowNumber="1" :title="'接线图'" @pictureChange="pictureHandle4"></upload>
      </el-col>
      <el-col :span="12">
        <upload :pictureArr="deviceData.devicePlacePic" :allowNumber="1" :title="'安装位置图'" @pictureChange="pictureHandle5"></upload>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { searchDeviceRequest } from '@/service/index'
import upload from '@/components/common/uploadPicture'
export default {
  name: 'bindDeviceForm',
  data () {
    return {
      storeId: '', // 门店的id
      deviceData: this.itemDeviceData,
      rules: {
        device_num: [
          {
            required: true,
            message: '请输入设备号',
            trigger: 'blur'
          }
        ],
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
      }
    }
  },
  components: {
    upload
  },
  props: ['itemDeviceData'],
  computed: {},
  updated () {
    this.$emit('update:itemDeviceData', this.deviceData)
  }, // 数据更新
  mounted () {
    this.storeId = this.$route.query.storeId
  },
  methods: {
    pictureHandle4 (val) {
      this.deviceData.deviceLinePic = val.pictureUrlArr
      this.deviceData.img_type['device_line'] = val.pictureUrlStr
      // this.wiringPicture = val
    }, // 接线图图片处理
    pictureHandle5 (val) {
      this.deviceData.devicePlacePic = val.pictureUrlArr
      this.deviceData.img_type['device_place'] = val.pictureUrlStr
      // this.installLocationPicture = val
    }, // 安装位置图片处理
    searchDevice (val, callback) {
      let params = {
        store_id: this.storeId,
        device_num: val
      }
      searchDeviceRequest(params).then(res => {
        if (res) {
          callback(res)
        }
      })
    }, // 模糊查询
    querySearch (queryString, cb) {
      this.searchDevice(queryString, cb)
    }, // 查询搜索
    handleSelect (val) {
      this.deviceData.device_num = val.device_num
      this.deviceData.device_id = val.id
      this.deviceData.order_id = val.work_order_id // 订单的id
    }, // 处理选择
    deleteDevice () {
      this.$emit('deleteItem')
    } // 删除设备的表单
  },
  watch: {
    itemDeviceData: function (val) {
      this.deviceData = val
    }
  }
}
</script>

<style lang="less" scoped>
@style-color: #4f6ffe;
.bindDeviceForm {
  background: #fff;
  padding: 26px 24px;
  margin-bottom: 8px;
  .delete-box {
      color: @style-color;
      line-height: 2.5;
      cursor: pointer;
    }
}
</style>
