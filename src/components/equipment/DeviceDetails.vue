<template>
  <div>
    <my-form ref="childMethod" title="设备详情" @modalConfirm="modalConfirm" :width="805" :bottomShow="false">
      <div slot="content" v-loading="isLoading">
        <div class="content">
          <div class="base-info">
            <h4 class="sub-title">设备基本信息</h4>
            <box-container :data="data1.data" :isLoading="data1.isLoading" :hasBorder="true"></box-container>
          </div>
          <div class="base-info">
            <h4 class="sub-title">车辆基本信息</h4>
            <div class="base-info-content">
              <div>
                <div>车牌号</div>
                <div>{{car.car_license}}</div>
              </div>
              <div>
                <div>车架号</div>
                <div>{{car.car_frame}}</div>
              </div>
              <div>
                <div>车主</div>
                <div>{{car.car_owner}}</div>
              </div>
            </div>
          </div>
          <div class="base-info">
            <h4 class="sub-title">年期基本信息</h4>
            <div class="base-info-content">
              <div>
                <div>年期类型</div>
                <div>{{year_car.year_type}}</div>
              </div>
              <div>
                <div>开通日期</div>
                <div>{{this.getDate(year_car.start_time)}}</div>
              </div>
              <div>
                <div>到期日期</div>
                <div>{{this.getDate(year_car.end_time)}}</div>
              </div>
            </div>
          </div>
          <div class="life-cycle">
            <h4 class="sub-title">使用记录</h4>
            <div class="life-cycle-content">
              <el-row class="table-header" type="flex" align="middle">
                <el-col :span="8">时间</el-col>
                <el-col :span="6">记录类型</el-col>
                <el-col :span="10">说明</el-col>
              </el-row>
              <div class="table-body">
                <template v-if="use_log.length !== 0">
                  <template v-for="(item, index) in use_log" >
                    <el-row type="flex" align="middle" :key="index">
                      <el-col :span="8">{{item.created_at}}</el-col>
                      <el-col :span="6">{{item.type}}</el-col>
                      <el-col :span="10" class="explain">{{item.remark}}</el-col>
                    </el-row>
                  </template>
                </template>
                <template v-else>
                  <p class="tips">暂无相关数据</p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-form>
  </div>
</template>

<script>
import { fetchDeviceDetail } from '../../service/index'
export default {
  data () {
    return {
      isLoading: true,
      data1: '',
      basic_info: {
        device_name: '',
        device_num: '',
        device_type: '',
        elect: '',
        in_time: '',
        sim_card: '',
        state: '',
        store: ''
      },
      car: {
        car_frame: '',
        car_license: '',
        car_owner: ''
      },
      use_log: [],
      year_car: {
        end_time: '',
        start_time: '',
        year_type: ''
      }
    }
  },
  methods: {
    // 截取时间
    getDate: (val) => {
      if (val) {
        return val.substring(0, 10)
      }
    },
    modalOpen (id) {
      this.isLoading = true
      this.$refs.childMethod.modalOpen()
      // let params = {
      //   device_id: id
      // }
      fetchDeviceDetail(id).then(res => {
        console.log(res)
        this.basic_info = res.basic_info
        this.data1 = {data: [{label: '设备号', value: res.code, width: 8}, {label: '设备型号', value: res.name, width: 8}, {
          label: '设备状态', value: res.use_status_view, width: 8}, {label: '设备类型', value: res.model, width: 8}, {
          label: '设备电量', value: res.elect, width: 8}, {label: '所属门店', value: res.store_id_view, width: 8}, {
          label: '入库日期', value: this.getDate(res.service_indate), width: 8}, {label: '物联网卡', value: res.simcard_id_view, width: 8}],
        isLoading: false}
        // this.use_log = res.use_log
        const yearCar = {
          end_time: res.expired_time,
          start_time: res.service_indate,
          year_type: res.service_type
        }
        this.year_car = yearCar
        const car = {
          // car_frame: res.car_id_view.substring(9, res.car_id_view.length - 1),
          // car_license: res.car_id_view.substring(0, 8),
          car_frame: res.license_plate,
          car_license: res.vin_code,
          car_owner: res.car_owner_name
        }
        this.car = car
        this.isLoading = false
        console.log(res)
      })
    },
    modalConfirm () {
      this.$refs.childMethod.modalClose()
    }
  },
  mounted () {},
  components: {},
  filters: {},
  computed: {},
  watch: {},
  props: {}
}
</script>

<style scoped lang="less">
  @line-color:#e6e6e6;
  @border-line-color: #f2f5fa;
  .container1{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    z-index: 999;
    background: rgba(0,0,0,0.5);
  }
  .container1{
    min-height: 100%;
    width: 100%;
    padding: 120px 0;
  }
  .table-header{
    padding: 0;
    &>div:nth-child(1){
      padding-left: 25px;
    }
  }
  .life-cycle-content{
    text-align: left;
    .table-body{
      border-left: 1px solid @line-color;
      border-right: 1px solid @line-color;
      .el-row{
        padding-left: 25px;
        border-bottom: 1px solid @line-color;
        /*&>div:nth-child(1){*/
        /*padding-left: 25px;*/
        /*}*/
      }
      .tips{
        text-align: center;
        padding: 20px 0 0 0;
      }
    }
  }
  .equipment-detail{
    width: 805px;
    margin: 0 auto;
    background: #fff;
    z-index: 11;
    border-radius: 3px;
  }
  .title{
    width: 100%;
    height: 60px;
    line-height: 60px;
    // background: rgba(44, 76, 219, 1);
    font-size: 16px;
    color: #2c4adc ;
    text-align: left;
    padding: 0 20px;
    position: relative;
    border-bottom: 1px solid @line-color;
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
      color: #333;
      font-size: 14px;
      font-weight: normal;
    }
    .base-info-content{
      display: flex;
      flex-wrap: wrap;
      border: 1px solid @line-color;
      padding: 20px 20px 0px;
      line-height: 1;
      &>div{
        min-height: 36px;
        text-align: left;
        width: 33.33%;
        margin-bottom: 20px;
        padding-right: 25px;
        &>div:nth-child(1){
          color: #9CA8B3;
          font-size: 14px;
          margin-bottom: 8px;
        }
        &>div:nth-child(2){
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .item{
        width: 280px;
        height: 32px;
        line-height: 32px;
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        &:nth-of-type(odd){
          margin-right: 70px;
        }
        .item-name{
          width: 60px;
          text-align: right;
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
    .life-cycle{
      .table-header{
        background-color: #fff;
        border: 1px solid @line-color;
      }
      .life-cycle-content{
        .table-body{
          max-height: 300px;
          overflow: auto;
        }
      }
      .el-row{
        min-height: 60px;
        // line-height: 24px;
        /*&:last-of-type{*/
        /*border-bottom: none;*/
        /*}*/
      }
      .explain{
        text-align: left;
      }
    }
  }
</style>
