<template>
  <div class="equipment">
    <div class="top-actions">
      <h3 class="title">安装明细</h3>
      <div class="search">
        <el-select
          v-model="orderStatus"
          placeholder="设备型号"
          size="small"
        ></el-select>
        <el-select
          v-model="orderType"
          placeholder="施工类型"
          size="small"
        ></el-select>
        <el-select
          v-model="orderType"
          placeholder="设备类型"
          size="small"
        ></el-select>
        <select-store></select-store>
        <el-input
          v-model="orderNum"
          placeholder="设备号"
          size="small"
        ></el-input>
        <button @click="search()">搜索</button>
        <button>重置</button>
      </div>
      <!-- <div class="other-btns">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
      </div> -->
    </div>
    <div class="content table">
      <!-- <el-row class="table-header" type="flex" align="middle">
        <el-col :span="1" class="ellipsis">
          <div class="checkbox select"></div>
        </el-col>
        <el-col :span="7" class="ellipsis">设备</el-col>
        <el-col :span="6" class="ellipsis">车辆</el-col>
        <el-col :span="6" class="ellipsis">下单</el-col>
        <el-col :span="4" class="ellipsis">工单</el-col>
      </el-row>
      <div class="table-body">
        <el-row type="flex" align="middle" v-for="(item,index) in JobOrderList" :key="index">
        <el-row type="flex" align="middle">
          <el-col :span="1" class="ellipsis">
            <icon name="circle" scale="3"></icon>
            <div class="checkbox checked"></div>
          </el-col>
          <el-col :span="7" class="ellipsis">
            <div class="text">
              <p class="line1">3132356564545</p>
              <p class="line2">GT223-有线</p>
            </div>
          </el-col>
          <el-col :span="6" class="ellipsis">
            <div class="text">
              <p class="line1">沪A80538</p>
              <p class="line2">LSVNN2180D2013488</p>
            </div>
          </el-col>
          <el-col :span="6" class="ellipsis">
            <div class="text">
              <p class="line1">某某某门店</p>
              <p class="line2">2017-12-12 12:10:17</p>
            </div>
          </el-col>
          <el-col :span="4" class="ellipsis">
            <div class="text">
              <p class="line1">13646467497979</p>
              <p class="line2">维修</p>
            </div>
          </el-col>
        </el-row>
      </div> -->
      <column :span="8">
        <!-- <p class="ellipsis">这是一行文本的情况</p>
        <p class="grey">灰色字</p> -->
      </column>
      <column :span="4"></column>
      <column :span="6"></column>
      <column :span="6"></column>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="page_size"
        :total="totalNum"
        @current-change="currentPageChange"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchJobOrderList } from '../../../service/index'
import SelectStore from '@/components/SelectStore'
import Column from '@/components/common/column'
export default {
  data () {
    return {
      orderStatus: null,
      orderType: null,
      orderNum: '',
      JobOrderList: [],
      page_size: 4,
      currentPageNo: 1,
      totalCount: 0,
      totalPageCount: 0
    }
  },

  components: {
    SelectStore,
    Column
  },

  computed: {
    totalNum () {
      if (!this.totalCount) {
        return 0
      }
      return this.totalCount
    }
  },

  filters: {
    orderType (value) {
      if (value === 1) {
        return '新装'
      } else if (value === 2) {
        return '拆除'
      } else if (value === 3) {
        return '改装'
      } else if (value === 4) {
        return '维修'
      }
    },
    orderState (value) {
      if (value === 1) {
        return '订单生成'
      } else if (value === 2) {
        return '已派单'
      } else if (value === 3) {
        return '安装师傅已接单'
      } else if (value === 4) {
        return '已预约'
      } else if (value === 5) {
        return '已上门'
      } else if (value === 6) {
        return '已完成'
      } else if (value === 7) {
        return '空单'
      } else if (value === 8) {
        return '退单'
      }
    }
  },

  mounted () {
    this.getDocumentHeight()
    this.getJobOrderList()
  },

  methods: {
    getJobOrderList () {
      const params = {
        'search[order_num]': this.orderNum,
        'search[order_type]': this.orderType,
        'search[state]': this.orderStatus,
        'page': this.currentPageNo,
        'per-page': this.page_size
      }
      fetchJobOrderList(params).then(res => {
        this.totalCount = res._meta.totalCount
        this.JobOrderList = []
        if (res.items && res.items.length > 0) {
          this.JobOrderList.push(...res.items)
        }
      })
    },
    getDocumentHeight () {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const List = h - 60 - 190 - 50
      this.page_size = Math.floor(List / 70)
      console.log(this.page_size)
    },
    currentPageChange (page) {
      this.currentPageNo = page
      this.getJobOrderList()
    }
  }
}

</script>
<style lang='less' scoped>
.equipment{
  height: 100%;
  flex-grow: 1;
  padding: 20px;
  padding-top: 120px;
  padding-bottom: 70px;
  position: relative;
}
.top-actions{
  font-size: 0;
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  .title{
    font-size: 22px;
    text-align: left;
    font-family: 'MicrosoftYaHei';
    font-weight: normal;
    margin-bottom: 20px;
  }
  .el-input,.el-select{
    width: 140px;
    margin-right: 10px;
  }
  .search{
    text-align: left;
    margin-bottom: 16px;
    button{
      padding: 0 16px;
      height: 28px;
      line-height: 28px;
      border-radius: 3px;
      background: #4f6ffe;
      color: #fff;
      margin-right: 10px;
      &:last-of-type{
        margin-right: 10px;
      }
    }
  }
  .other-btns{
    text-align: right;
    font-size: 0;
    margin-bottom: 10px;
    button{
      width: 18px;
      height: 18px;
      margin-right: 60px;
      background: cyan;
    }
    button:last-of-type{
      margin-right: 0;
    }
  }
}
.content{
  font-size: 14px;
  height: 100%;
  background: #fff;
  /deep/.el-row{
    padding-left: 20px;
  }
  // .el-row{
  //   height: 60px;
  //   line-height: 60px;
  //   padding: 0 40px;
  //   border-bottom: 1px solid #f2f5fa;
  //   text-align: left;
  //   &:last-of-type{
  //     border-bottom: none;
  //   }
  // }
  // .table-body{
  //   .operation{
  //     cursor: pointer;
  //   }
  //   .el-row:hover{
  //     box-shadow: 0 5px 10px #eee;
  //     .operation{
  //       span{
  //         color: #4f6ffe;
  //       }
  //     }
  //   }
  // }
  // .time{
  //   line-height: 30px;
  // }
  /deep/.el-pagination{
    position: absolute;
    right: 20px;
    bottom: 20px;
    .number{
      background: #fff;
    }
  }
}
.checkbox{
  width: 14px;
  height: 14px;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #DDDFE7;
  cursor: pointer;
  margin: 0 auto;
}
.checked,.select{
  position: relative;
  background-color: #4365FC;
  border: none;
  &:after{
    content: "";
    position: absolute;
    width: 7px;
    height: 4px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-80%) rotate(-45deg)
  }
}
</style>
