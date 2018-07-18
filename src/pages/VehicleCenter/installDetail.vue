<template>
  <div class="install-detail">
    <common-title :title="storeName + '-车辆安装记录'"></common-title>
    <div class="car-info box">
      <head-operation left="车辆信息"></head-operation>
      <boxContainder :data="carInfo" ref="vehicleInfoReadOnlyForm" :isLoading="vehicleInfoIsloading">
      </boxContainder>
    </div>
    <div class="car-install-info box">
      <head-operation left="车辆安装信息"></head-operation>
      <div class="standard-content">
        <div class="standard" v-for="(item,index) in car_install_standard" :key="index">
          <p class="standard-name p60">{{item.name}}</p>
          <div class="standard-value p60" v-if="item.field === 'text'">
            {{item.default_value}}
          </div>
          <div class="standard-value" v-if="item.field === 'image'">
            <img :src="APIHOST + item.default_value[0]" alt="">
            <!-- {{item.default_value}} -->
          </div>
        </div>
      </div>
    </div>
    <div class="device-install-info box">
      <head-operation left="设备安装信息"></head-operation>
      <template v-for="(ele,inx) in device_list">
        <head-operation :left="'设备 ' + (inx+1)" :key="inx" style="backgroundColor: #fff"></head-operation>
        <!-- <h3 class="device-title" :key="inx">{{'设备 ' + (inx+1)}}</h3> -->
        <div class="standard-content" :key="inx">
          <div class="standard">
            <p class="standard-name p60">设备号</p>
            <div class="standard-value p60">{{ele.driver_code}}</div>
          </div>
          <div class="standard">
            <p class="standard-name p60">安装位置</p>
            <div class="standard-value p60">{{ele.install_data}}</div>
          </div>
        </div>
        <div class="standard-content" :key="inx">
          <div class="standard" v-for="(item,index) in ele.device_install_standard" :key="index">
            <p class="standard-name p60">{{item.name}}</p>
            <div class="standard-value p60" v-if="item.field === 'text'">
              {{item.default_value}}
            </div>
            <div class="standard-value" v-if="item.field === 'image'">
              <img :src="APIHOST + item.default_value[0]" alt="">
              <!-- {{item.default_value}} -->
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CommonTitle from '@/components/common/title'
import boxContainder from '@/components/common/boxContainer'
import { carInstallDetail, driverInstallDetail } from '@/service'
export default {
  data () {
    const APIHOST = process.env.API_HOST
    return {
      storeName: this.$route.query.storeName,
      storeId: this.$route.query.storeId,
      carInfo: [
        { label: '车架号', value: '', width: 7 },
        { label: '车牌号', value: '', width: 7 },
        { label: '车主', value: '', width: 7 },
        { label: '门店', value: '', width: 3 }
      ], // 车辆的信息
      vehicleInfoIsloading: true,
      car_install_standard: [],
      device_list: [],
      device_install_standard: [],
      APIHOST: APIHOST
    }
  },

  components: {
    CommonTitle,
    boxContainder
  },

  computed: {},

  mounted () {
    const id = this.$route.params.tableId
    carInstallDetail(id).then(res => {
      this.carInfo[0].value = res.vin
      this.carInfo[1].value = res.license_plate
      this.carInfo[2].value = res.owner_name
      this.carInfo[3].value = this.storeName
      this.vehicleInfoIsloading = false
      const textStandard = res.install_standard.filter(el => el.field === 'text')
      const imageStandard = res.install_standard.filter(el => el.field === 'image')
      this.car_install_standard.push(...textStandard)
      this.car_install_standard.push(...imageStandard)
      driverInstallDetail(res.id).then(response => {
        console.log(response)
        this.device_list = response
        this.device_list.forEach(el => {
          const textStandard = res.install_standard.filter(el => el.field === 'text')
          const imageStandard = res.install_standard.filter(el => el.field === 'image')
          const arr = []
          arr.push(...textStandard)
          arr.push(...imageStandard)
          this.$set(el, 'device_install_standard', arr)
        })
      }).catch(err => {
        console.log(err)
      })
    })
  },

  methods: {}
}

</script>
<style lang='less' scoped>
.install-detail{
  width: 86.4%;
  max-width: 1660px;
  margin: 0 auto;
  padding-bottom: 30px;
  .box{
    margin-bottom: 20px;
    .standard-content{
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      padding: 15px 20px;
      background: #fff;
      .standard{
        width: 15%;
        margin-right: 27%;
        text-align: left;
        margin-bottom: 25px;
        .standard-name{
          color: #9ca8b3;
          font-size: 14px;
          height: 32px;
          line-height: 32px;
        }
        .standard-value{
          font-size: 14px;
          color: #333;
          img{
            max-width: 60%;
            height: auto;
          }
        }
      }
      .standard:nth-of-type(3n){
        margin-right: 0;
      }
    }
  }
  .device-install-info{
    .device-title{
      padding-left: 22px;
      padding-top: 15px;
      text-align: left;
      font-size: 16px;
      font-weight: normal;
      // height: 30px;
      line-height: 30px;
      background: #fff;
      border-bottom: 1px solid #eee;
    }
  }
}
.p60{
  // padding: 0 60px;
}
</style>
