<template>
  <div class="install-detail">
    <common-title :title="'新增车辆安装记录'"></common-title>
    <div class="car-info box">
      <head-operation left="车辆信息"></head-operation>
      <boxContainder :data="carInfo" ref="vehicleInfoReadOnlyForm" :isLoading="vehicleInfoIsloading">
        <div slot="selectStore">
          <selectStore @selectStore="getSelectStoreId"></selectStore>
        </div>
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
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <head-operation left="设备安装"></head-operation>
      <div v-for="(ele,inx) in device_list" :key="inx">
        <head-operation left="设备1" style="background: #fff"></head-operation>
        <div class="standard-content">
          <div class="standard">
            <p class="standard-name p60">设备号</p>
            <div class="standard-value p60">
              <el-input
                v-model="ele.driver_id"
                size="small"
              ></el-input>
            </div>
          </div>
          <div class="standard">
            <p class="standard-name p60">安装位置</p>
            <div class="standard-value p60">
              <el-input
                v-model="ele.install_data"
                size="small"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="standard-content" :key="inx">
          <div class="standard" v-for="(item,index) in device_install_standard" :key="index">
            <p class="standard-name p60">{{item.name}}</p>
            <div class="standard-value p60" v-if="item.field === 'text'">
              {{item.default_value}}
            </div>
            <div class="standard-value" v-if="item.field === 'image'">
              <!-- <img :src="APIHOST + item.default_value[0]" alt=""> -->
              <el-upload
                action="http://test.api.tianyigps.com/upload/file-url"
                method="post"
                :data="{table: 'carinstall'}"
                enctype="multipart/form-data"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :file-list="photosList"
                :auto-upload="true"
                :multiple="false"
                :limit="1"
                accept="image/*"
              >
              <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTitle from '@/components/common/title'
import boxContainder from '@/components/common/boxContainer'
import selectStore from '@/components/SelectStore'
import { searchCarLists, standardListRequest } from '@/service'
export default {
  data () {
    const APIHOST = process.env.API_HOST
    return {
      // storeName: this.$route.query.storeName,
      storeId: null,
      carInfo: [
        { label: '车架号', value: '', width: 7 },
        { label: '车牌号', value: '', width: 7 },
        { label: '车主', value: '', width: 7 },
        { label: '门店', component: 'selectStore', width: 3 }
      ], // 车辆的信息
      vehicleInfoIsloading: true,
      car_install_standard: [],
      device_list: [
        {
          install_data: '',
          driver_id: null,
          install_standard: null
        }
      ],
      device_install_standard: [],
      APIHOST: APIHOST

    }
  },

  components: {
    CommonTitle,
    boxContainder,
    selectStore
  },

  computed: {},

  mounted () {
    this.getVehicleInfo()
  },

  methods: {
    getSelectStoreId (val) {
      this.StoreId = val
      const carParams = {
        store_id: this.StoreId,
        type: 1
      }
      standardListRequest(carParams).then(res => {
        const textStandard = res.items.filter(el => el.field === 'text')
        const imageStandard = res.items.filter(el => el.field === 'image')
        this.car_install_standard.push(...textStandard)
        this.car_install_standard.push(...imageStandard)
      })
      const deviceParams = {
        store_id: this.StoreId,
        type: 2
      }
      standardListRequest(deviceParams).then(res => {
        const textStandard = res.items.filter(el => el.field === 'text')
        const imageStandard = res.items.filter(el => el.field === 'image')
        this.device_install_standard.push(...textStandard)
        this.device_install_standard.push(...imageStandard)
      })
      // this.showForm = true
      // this.getVehicleInstallRecord()
      // this.showNewVehicleForm = false
    },
    getVehicleInfo () {
      const id = this.$route.query.id
      searchCarLists(id).then(res => {
        this.carInfo[0].value = res.vin_code
        this.carInfo[1].value = res.license_plate
        this.carInfo[2].value = res.owner_name
        this.vehicleInfoIsloading = false
      })
    }
  }
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
