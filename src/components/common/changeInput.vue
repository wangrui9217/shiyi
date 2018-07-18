<template>
  <div>
    <my-form ref="childMethod" title="绑定设备"  :bottomShow="false">
      <div slot="content" class="content">
        <div class="container">
          <el-select
            v-model="value"
            filterable
            remote
            :clearable="true"
            reserve-keyword
            placeholder="请输入设备编号或安装型号或安装状态"
            :remote-method="remoteMethod"
            :loading="false">
            <el-option
              v-for="item in option2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" size="small" @click="confirmM" :disabled="deviceInfo.install_status === 2">绑定</el-button>
        </div>
        <div class="deviceInfo">
          <box-container :data="props" :isLoading="isLoading"></box-container>
        </div>
      </div>
    </my-form>
  </div>
</template>

<script>
import {
  searchDevicde,
  bindCarDevice
} from './../../service/index'
export default {
  data () {
    return {
      options: [],
      option2: [],
      value: '',
      deviceInfo: '',
      items: [],
      isLoading: true,
      that: ''
    }
  },
  methods: {
    modalOpen (val) {
      this.initDeviceState()
      this.that = val
      this.$refs.childMethod.modalOpen()
    },
    getDeviceInfoById (array, id) {
      let temp = ''
      array.map(value => {
        if (value.id === id) {
          temp = value
        }
      })
      return temp
    },
    confirmM () {
      let params = {
        id: this.value,
        car_id: this.that.car_id
      }
      bindCarDevice(params).then(res => {
        this.that.getDeviceInfo()
        this.$message.success('绑定成功')
        this.$refs.childMethod.modalClose()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    initDeviceState () {
      searchDevicde().then(res => {
        this.isLoading = false
        this.items = res.items
        this.options = this.items.map(value => {
          return {
            'value': value.id,
            'label': value.code + '+' + value.model + '+' + value.install_status_view
          }
        })
        this.option2 = this.options
        this.deviceInfo = this.getDeviceInfoById(this.items, this.value)
        console.log(res)
      })
    },
    // 筛选出智能提示的选项
    remoteMethod (query) {
      if (query !== '') {
        try {
          this.option2 = this.options.filter(item => {
            return item.label.toLowerCase().toString()
              .indexOf(query.toLowerCase().toString()) > -1
          })
        } catch (e) {
          this.option2 = []
        }
      } else {
        this.option2 = this.options
      }
    },
    // 截取时间
    getDate: (val) => {
      if (val) {
        return val.substring(0, 10)
      }
    }
  },
  mounted () {
    // this.initDeviceState()
  },
  components: {},
  filters: {},
  computed: {
    props: function () {
      return this.deviceInfo ? [{label: '设备编号', value: this.deviceInfo.code, width: 9}, {label: '设备类型', value: this.deviceInfo.type_view, width: 9}, {
        label: '设备型号', value: this.deviceInfo.model, width: 6}, {label: '来源', value: this.deviceInfo.source, width: 9}, {
        label: '设备sn', value: this.deviceInfo.sn, width: 9}, {label: 'IMEI', value: this.deviceInfo.imei, width: 6}, {
        label: '使用状态', value: this.deviceInfo.use_status_view, width: 9}, {label: '安装状态', value: this.deviceInfo.install_status_view, width: 9}, {
        label: '维护状态', value: this.deviceInfo.status_view, width: 6}, {label: '车辆信息', value: this.deviceInfo.car_id_view, width: 9}, {
        label: '安装时间', value: this.getDate(this.deviceInfo.install_time), width: 9}, {label: '使用时间', value: this.getDate(this.deviceInfo.use_time), width: 6}, {
        label: '标签', value: this.deviceInfo.tags ? this.deviceInfo.tags.toString().split(',') : '', width: 24, isTag: 'true'}] : ''
    }
  },
  watch: {
    value (curVal, oldVal) {
      this.deviceInfo = this.getDeviceInfoById(this.items, curVal)
    }
  }
}
</script>

<style scoped lang="less">
.content{
  padding: 20px;
}
  /deep/.el-input__inner{
    /*text-align: center;*/
  }
  /deep/.is-disabled{
    opacity: 0.7;
  }
  .container{
    display: flex;
    align-items: center;
    .el-select{
      flex: 1;
      margin-right: 20px;
    }
    .el-button--primary{
      background-color: @style-color;
      border-color: @style-color;
      color: #fff;
    }
    .el-button--small, .el-button--small.is-round{
      padding: 10px 36px;
    }
    .el-button--default{
      border-color: @style-color;
      color: @style-color;
    }
  }
  .deviceInfo{}
@style-color: #4f6ffe;
</style>
