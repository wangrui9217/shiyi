<template>
  <div class="contain">
    <change-input ref="changeInput"></change-input>
    <device-details ref="detail"></device-details>
    <un-bind ref="unbind"></un-bind>
    <bussiness ref="addBussiness"></bussiness>
    <report-errors ref="childMethod"></report-errors>
    <common-title :title="'车辆详情页'"></common-title>
    <div class="box">
      <head-operation left="车辆信息" :right="setting" ></head-operation>
      <box-container :data="carInfoList.data" :isLoading="carInfoList.isLoading" :error="carInfoList.error"></box-container>
    </div>
    <div class="box hasTop">
      <head-operation left="车主信息" :right="setting"></head-operation>
      <box-container :data="carOwnerList.data" :isLoading="carOwnerList.isLoading" :error="carOwnerList.error"></box-container>
    </div>
    <div class="box hasTop">
      <head-operation left="业务信息">
        <div slot="right-content">
          <el-dropdown  @command="handleCommand">
            <span class="el-dropdown-link">
              新增业务<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(item, index) in options">
                <el-dropdown-item :command="item" :key = index>{{item.business_names}}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </head-operation>
      <div class="work" v-if="CarInfoLists.length !== 0">
        <template v-for="(item,index) in CarInfoLists">
          <div :key="index">
            <head-operation :left="item.data[0].value + ' — ' + item.business" :right="setting3" :value="item" ></head-operation>
            <box-container :data="item.data" :isLoading="item.isLoading"></box-container>
          </div>
        </template>
      </div>
      <div v-else class="error">
        <p>没有相关业务</p>
      </div>
    </div>
    <div class="hasTop box">
      <head-operation left="设备信息" :right="setting4"></head-operation>
      <my-table :tableData="installInfo" :fields="fields"></my-table>
    </div>
    <!--<div class="hasTop box">-->
      <!--<head-operation left="安装记录" :right="setting2"></head-operation>-->
      <!--<my-table :tableData="installLog" :fields="fields2"></my-table>-->
    <!--</div>-->
    <!--<el-pagination-->
      <!--@current-change="handleCurrentChange"-->
      <!--layout="total, prev, pager, next"-->
      <!--:page-size="pageSize"-->
      <!--:total="totalCount">-->
    <!--</el-pagination>-->
    </div>

</template>
<script>
import changeInput from '../../components/common/changeInput'
import DeviceDetails from '../../components/equipment/DeviceDetails'
import bussiness from '../../components/common/newBusiness'
import reportErrors from '../../components/common/reportErrors'
import { validatePhone } from '@/utils/tools'
import unBind from './unBind'
import {
  searchCarLists,
  searchCarInfoLists,
  searchCarInstall,
  searchCarOwnerLists,
  getStoreTreeList,
  searchCarDeviceLists,
  deleteBusiness2,
  deleteBusiness
} from '../../service/index'
export default {
  data () {
    return {
      testValue: '111',
      // sss:
      // setting: [{label: '报错', func: this.reportErrors, icon: 'write', iconScale: '', className: 'btn'}],
      totalCount: null,
      currentPage: null,
      pageSize: 10,
      fields: [
        {name: ['code'], label: '设备号', span: 4},
        {name: ['type_view'], label: '类型', span: 4},
        {name: ['install_time'], label: '安装时间', span: 4},
        {name: ['car_owner_name'], label: '车主', span: 4},
        {name: ['remark'], label: '备注', span: 4},
        {name: [{label: '解绑'}, {label: '查看详情'}], type: 'control2', span: 4, control: [this.chaichu, this.viewDetail], params: ['', '']}
      ],
      fields2: [
        {name: ['car_id'], label: '车牌号', span: 4},
        {name: ['store_id'], label: '门店', span: 4},
        {name: ['name'], label: '业务名称', span: 4},
        {name: ['create_id'], label: '添加人', span: 4},
        {name: ['create_time'], label: '添加时间', span: 4},
        {name: [{label: '查看详情'}], type: 'control2', span: 4, control: [this.getMoreInfo], params: ['']}
      ],
      installLog: '',
      installInfo: '',
      setting: [{label: '报错', func: this.reportErrors}],
      setting2: [{label: '新增安装记录', func: this.goBindEquiment}],
      setting3: [{label: '删除', func: this.deleteWork}, {label: '编辑', func: this.editWork}],
      setting4: [{label: '绑定设备', func: this.addEquipment}],
      formTitle: [],
      formContent: [],
      formIsLoading: true,
      options: [{business_names: '业务名称', business_id: 1}],
      storeOptions: [],
      isShow: false,
      equipmentID: null,
      carInfoList: {},
      carOwnerList: [],
      car_id: this.$route.query.id,
      carInfo: {},
      CarOwnerLists: {},
      CarInfoLists: [],
      wrong: '',
      title: '新增业务',
      rules: {
        name: [
          {
            required: true,
            message: '请输入门店名称',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入门店电话',
            trigger: 'blur'
          },
          {
            validator: validatePhone,
            message: '请输入正确格式的门店电话',
            trigger: 'blur'
          }
        ]
      },
      ruleForm: {
        name: ''
      }
    }
  },
  methods: {
    // 新增设备
    addEquipment () {
      let that = this
      this.$refs.changeInput.modalOpen(that)
    },
    // 初始化门店选择菜单
    initTreeData () {
      getStoreTreeList().then(res => {
        this.getTreeOption(res)
        this.initState()
      })
    },
    getTreeOption (array) {
      if (array) {
        array.map(value => {
          let temp = {
            value: value.id.toString(),
            label: value.name
          }
          this.storeOptions.push(temp)
          if (value.level && value.level.length) {
            this.getTreeOption(value.level)
          }
        })
      }
    },
    getStoreName (id) {
      let temp = ''
      this.storeOptions.map(item => {
        if (item.value === id) {
          temp = item.label
        }
      })
      return temp
    },
    // 绑定设备
    goBindEquiment () {
      this.$router.push({ name: 'bindquipment', query: {storeId: this.$route.query.storeId, id: this.$route.query.id} })
    },
    // 查看设备
    viewDetail (item) {
      this.$refs.detail.modalOpen(item.id)
    },
    initState () {
      let params = {
        car_id: this.car_id
      }
      // 车辆信息查询
      searchCarLists(this.car_id).then(res => {
        this.carInfoList = {data: [{label: '车架号', value: res.vin_code, width: 7}, {label: '车牌号', value: res.license_plate, width: 7}, {
          label: '发动机号', value: res.engine_number, width: 7}, {label: '车辆颜色', value: res.color, width: 3}, {
          label: '厂家名称', value: res.manufacturer_name, width: 7}, {label: '车辆级别', value: res.vehicle_level, width: 7}, {
          label: '燃油类型', value: res.fuel_type, width: 7}, {label: '生产年份', value: this.getDate(res.production_year), width: 3}, {
          label: '销售名', value: res.sell_name, width: 7}, {label: '品牌名', value: res.brand, width: 7}, {label: '车型名称', value: res.car_model, width: 7}, {
          label: '车辆类型', value: res.type, width: 3}],
        isLoading: false}
        console.log(res, '车辆信息')
      }).catch(err => {
        this.carInfoList.error = err
        this.carInfoList.isLoading = true
      })
      // 车主信息查询
      searchCarOwnerLists(this.car_id).then(res => {
        this.carOwnerList = {data: [{label: '车主类型', value: this.getCarOwnerType(res.car_owner_type), width: 7}, {label: '车主', value: res.name, width: 7}, {
          label: '性别', value: this.getPeopleSex(res.gender), width: 7}, {label: '出生年月', value: this.getDate(res.birthday), width: 3}, {
          label: '籍贯', value: res.native_place, width: 7}, {label: '车主手机号', value: res.phone, width: 7}, {
          label: '职业', value: res.owner_job, width: 7}, {label: '证件类型', value: this.getUserCardIdType(res.car_owner_certificate_type), width: 3}, {
          label: '证件号', value: res.id_card, width: 7}, {label: '工作地址', value: res.company_address, width: 7}, {
          label: '居住地址', value: res.home_address, width: 7}],
        isLoading: false}
        console.log(res, '车主信息')
      }).catch(err => {
        this.carOwnerList.error = err
        this.carOwnerList.isLoading = false
      })
      // 查询业务信息
      searchCarDeviceLists(params).then(res => {
        console.log(res, '业务信息')
        this.CarInfoLists = []
        res.CarLoan.map(value => {
          let obj = {}
          obj = value
          obj.data = [{label: '门店', value: this.getStoreName(value.store_id), width: 7}, {label: '业务员', value: value.salesman_name, width: 7}, {
            label: '业务员电话', value: value.salesman_phone, width: 7}, {label: '贷款金额', value: value.loan_amount, width: 3}, {
            label: '联系人', value: value.contact_name, width: 7}, {label: '联系电话', value: value.contact_phone, width: 7}, {
            label: '开始日期', value: this.getDate(value.start_time), width: 7}, {label: '截止日期', value: this.getDate(value.end_time), width: 3}, {
            label: '合同号', value: value.contract_num, width: 7}, {label: '标签', value: value.tag ? value.tag.split(',') : [], isTag: true, width: 7}, {
            label: '备注', value: value.remark, width: 7}]
          obj.isLoading = false
          obj.business = '贷款业务'
          this.CarInfoLists.push(obj)
        })
        // res.CarInstall.map(value => {
        //   let obj = {}
        //   obj = value
        //   obj.data = [{label: '门店', value: this.getStoreName(value.store_id), width: 7}, {label: '业务员', value: value.salesman_name, width: 7}, {
        //     label: '业务员电话', value: value.salesman_phone, width: 7}, {label: '贷款金额', value: value.loan_amount, width: 3}, {
        //     label: '联系人', value: value.contact_name, width: 7}, {label: '联系电话', value: value.contact_phone, width: 7}, {
        //     label: '开始日期', value: this.getDate(value.start_time), width: 7}, {label: '截止日期', value: this.getDate(value.end_time), width: 3}, {
        //     label: '合同号', value: value.contract_num, width: 7}, {label: '标签', value: value.tag ? value.tag.split(',') : [], isTag: true, width: 7}, {
        //     label: '备注', value: value.remark, width: 7}]
        //   obj.isLoading = false
        //   obj.business = '车辆业务'
        //   this.CarInfoLists.push(obj)
        // })
      }).catch(err => {
        console.log(err)
        this.CarInfoLists = []
        this.formIsLoading = false
      })
    },
    getDeviceInfo () {
      let page = {
        'per-page': 50,
        'car_id': this.car_id
      }
      // 查询设备安装信息
      searchCarInfoLists(page).then(res => {
        this.installInfo = res.items
        this.formIsLoading = false
        console.log(res, '设备信息', this.installInfo)
      }).catch(res => {
        console.log(res)
      })
    },
    getInstallLog (val) {
      // 查询安装记录
      let search = {
        'search[car_id]': this.car_id,
        'page': val || 1,
        'per-page': this.pageSize
      }
      searchCarInstall(search).then(res => {
        this.installLog = res.items
        this.totalCount = res.pagination.totalCount
        console.log(res, '安装信息')
      }).catch(res => {
        console.log(res)
      })
    },
    handleCurrentChange (val) {
      this.getInstallLog(val)
    },
    // 拆除
    chaichu (item) {
      this.$refs.unbind.modalOpen(item, this)
    },
    // 新增业务
    handleCommand (command) {
      this.$refs.addBussiness.modalOpen2(command, this.car_id, this)
    },
    // 编辑业务
    editWork (val) {
      this.$refs.addBussiness.modalOpen(val, this.car_id, this)
    },
    openModal: function (formName, title, content, index) {
      this.$refs[formName].modalOpen(title, content, index)
    },
    closeModal: function (formName) {
      this.$refs[formName].modalClose()
    },
    // 删除业务
    deleteWork: function (item) {
      console.log(item)
      this.$confirm('确认删除此业务?', '删除业务', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Promise.all([deleteBusiness(item.id), deleteBusiness2(item.kind_id)]).then(res => {
          this.$message.success('删除成功!')
          this.initState()
          console.log(res)
        })
      }).catch(
        () => {}
      )
    },
    // 报错
    reportErrors: function () {
      let obj = this
      this.$refs.childMethod.modalOpen(obj)
    },
    // 截取时间
    getDate: (val) => {
      if (val) {
        return val.substring(0, 10)
      }
    },
    // 获取证件类型
    getUserCardIdType: (val) => {
      if (val === '0') {
        return '身份证'
      } else if (val === '1') {
        return '护照'
      } else {
        return '其他'
      }
    },
    // 获取车主类型
    getCarOwnerType: (val) => {
      if (val === 0) {
        return '个人车主'
      } else if (val === 1) {
        return '公司'
      }
    },
    // 查看安装记录详情 == 跳转新页面
    getMoreInfo: function (val) {
      this.$router.push({ path: `/vehiclecenter/installdetail/${val.table_id}`, query: {storeId: val.store_id, storeName: val.store_name} })
      console.log(val.table_id)
    },
    // 获取性别
    getPeopleSex: (val) => {
      if (val === 3) {
        return '未知'
      } else {
        return val === 1 ? '男' : '女'
      }
    }
  },
  components: {
    DeviceDetails,
    bussiness,
    reportErrors,
    unBind,
    changeInput
  },
  computed: {},
  mounted () {
    this.initState()
    this.initTreeData()
    this.getDeviceInfo()
    // this.getInstallLog()
  },
  filters: {
  }
}
</script>
<style lang="less" scoped>
  @max-width: 1660px;
  @min-width: 1000px;
  @style-color: #4f6ffe;
  .el-dropdown-link{
    color: @style-color;
  }
  @border-line-color: #f2f5fa;
  /deep/.el-pager li.active{
    color: @style-color;
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
  .el-pagination {
    text-align: right;
    padding:10px 20px 0 0;
    /deep/button:disabled{
      background:none;
    }
    /deep/button{
      background:none;
    }
    /deep/.el-pager li{
      background: none;
    }
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .delete-contain {
    text-align: center;
    padding: 89px 0 38px;
    & > p {
      margin-bottom: 68px;
    }
  }
  .error{
    padding: 20px 0;
  }
  .demo-ruleForm{
    padding: 0 40px;
    display: flex;
    .form-content{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .el-form-item{
        width: 40%;
      }
      .el-form-item:nth-child(odd){
        margin-right: 15%;
      }
    }
  }
  .install-info{
    background-color: #fff;
  }
  .hasTop{
    margin-top: 20px;
  }
  .contain{
    width: 86.4%;
    max-width: 1660px;
    margin: 0 auto;
    padding-bottom: 30px;
    position: relative;
    .add-work{
      font-size: 14px;
      .add-title{
        color: #5E6D82;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 13px;
      }
      .label{
        display: flex;
        padding: 0 40px;
        .left{
          width: 100px;
          line-height: 40px;
          padding-right: 12px;
          text-align: right;
          color: #606266;
        }
        .right{
          flex: 1;
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
    .input-content{
      padding: 20px 37px 0;
    }
    .btn-group{
      padding: 38px 0 16px;
    }
    .work{
      font-size: 14px;
      background-color: #fff;
      .work-head{
        padding: 0 22px;
        height: 80px;
        align-items: center;
        justify-content: space-between;
        display: flex;
        border-bottom: 1px solid #F2F5FA;
        &>div:nth-child(2){
          cursor: pointer;
          color: #4365FC;
        }
      }
      .work-info{
        padding: 0 22px;
        .info-head{
          height: 50px;
          justify-content: space-between;
          display: flex;
          align-items: center;
          font-size: 16px;
          &>div:nth-child(2){
            display: flex;
            font-size: 14px;
            &>div{
              cursor: pointer;
              color: #4365FC;
              margin-left: 20px;
            }
          }
        }
        .info-content{
          display: flex;
          flex-wrap: wrap;
          line-height: 1.2;
          &>div{
            padding-right: 120px;
            width: 25%;
            min-height: 35px;
            text-align: left;
            margin-bottom: 25px;
            &>div:nth-child(1){
              color: #9CA8B3;
              margin-bottom: 6px;
            }
          }
        }
      }
    }
  }
  .box{
    background-color: #fff;
    border: 1px solid #e6e6e6;
  }
  // .title{
  //     font-size: 24px;
  //     color: #000;
  //     height: 60px;
  //     align-items: center;
  //     display: flex;
  //     padding-left: 22px;
  // }
  .floor-title{
    font-size: 16px;
    color: #333;
    padding: 0 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    &>div:nth-child(2){
      font-size: 14px;
      color: #4365FC;
      cursor: pointer;
    }
  }
  .floor-container{
    width: 100%;
    background-color: #fff;
    padding: 30px 22px 5px;
  }
  .floor-box{
    line-height: 1.2;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    &>div{
      width: 25%;
      min-height: 35px;
      margin-bottom: 25px;
      padding-right: 120px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      word-wrap: break-word;
      font-size: 14px;
      color: #333;
      &>div{
        width: 100%;
      }
      &>div:nth-child(1){
        color: #9CA8B3;
        margin-bottom: 6px;
      }
    }
  }
  .info{
    background-color: #fff;
    .title-top{
      height: 62px;
      background-color: #f8f8fc;
      display: flex;
      align-items: center;
      padding: 0 22px;
      &>div{
        text-align: left;
        width: 16.66%;
      }
    }
    .body{
      padding: 0 22px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &:hover{
        box-shadow: 0 5px 10px #eee;
      }
      &>div{
        text-align: left;
        width: 16.66%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: 20px;
      }
      .btn{
        display: flex;
        align-items: center;
        &>div{
          cursor: pointer;
          color: #4365FC;
        }
        &>div:nth-child(1){
          margin-right: 20px;
        }
      }
    }
  }
  /deep/.table-content{
    &>.column:first-child{
      &>div{
        padding: 0 20px;
      }
    }
  }
</style>
