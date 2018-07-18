<template>
  <div class="add-car">
    <h3 class="title">新增车辆<i class="close" @click="close()"></i></h3>
    <div class="content">
      <h4 class="sub-title">安装产品（单车）：</h4>
      <el-row class="header">
        <el-col :span="11">产品名称</el-col>
        <el-col :span="11">安装数量</el-col>
        <el-col :span="2">操作</el-col>
      </el-row>
      <template v-for="(item,index) in goods">
        <el-row class="device-table-body" :key="index" type="flex" align="middle">
          <el-col :span="11">
            <el-select v-model="item.product_id" size="small">
              <el-option v-for="(el,el_index) in deviceList" :key="el_index" :value="el.value" :label="el.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="11">
            <el-input-number v-model="item.product_num" :min="1" :max="10" label="" size="small"></el-input-number>
          </el-col>
          <el-col :span="2" class="operation" @click.native="deleteDevice(index)">删除</el-col>
        </el-row>
      </template>
      <button class="add-device-btn" @click="addNewDevice()">添加产品</button>
      <h4 class="sub-title">施工车辆</h4>
      <div class="car-frame-content">
        <textarea v-model="car_frame" placeholder="请输入所要施工车辆的车架号，每行为一个车架号"></textarea>
      </div>
      <div class="submit-and-cancel">
        <button class="submit" @click="submit()">保存</button>
        <button class="cancel" @click="close()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchProductList} from '@/service/index'
export default {
  props: ['orderId'],
  data () {
    return {
      deviceList: [],
      goods: [
        {
          product_num: 1,
          product_id: null
        }
      ],
      car_frame: ''
    }
  },

  components: {},

  computed: {},

  mounted () {
    fetchProductList().then(res => {
      res.items.forEach(el => {
        const product = {
          value: el.id,
          label: el.name
        }
        this.deviceList.push(product)
      })
    })
  },

  methods: {
    addNewDevice () {
      const goods = {
        product_num: 1,
        product_id: null
      }
      this.goods.push(goods)
    },
    deleteDevice (index) {
      if (this.goods.length === 1) {
        this.$message({
          message: '最少保留一个安装设备',
          type: 'warning'
        })
        return
      }
      this.goods.splice(index, 1)
    },
    submit () {
      const params = {
        'order_id': this.orderId,
        'scheme': [
          {
            car_vins: this.car_frame,
            goods: this.goods
          }
        ]
      }
      console.log(params)
      // return
      this.$emit('submit', params)
    },
    close () {
      this.$emit('close')
    }
  }
}

</script>
<style lang='less' scoped>
.add-car{
  width: 700px;
  position: absolute;
  top: 100px;
  left: 50%;
  // transform: translate(-50%,-60%);
  transform: translateX(-50%);
  background: #fff;
  z-index: 11;
  border-radius: 3px;
  padding-bottom: 30px;
}
.title{
  height: 60px;
  line-height: 60px;
  // background: rgba(44, 76, 219, 1);
  font-size: 16px;
  color: #2C4CDB ;
  text-align: left;
  padding: 0 20px;
  border-bottom: 1px solid #f2f5fa;
  margin-bottom: 20px;
  position: relative;
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
  padding: 0 25px;
  .sub-title{
    text-align: left;
    height: 20px;
    line-height: 20px;
  }
  .header{
    height: 40px;
    line-height: 40px;
    text-align: left;
  }
  .device-table-body{
    text-align: left;
    height: 40px;
    .operation{
      color: #4365FC;
      cursor: pointer;
    }
  }
  .add-device-btn{
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #999;
    background: #fff;
    border-bottom: 1px solid #F2F5FA;
    margin-bottom: 16px;
  }
  .car-frame-content{
    padding: 0 20px;
    margin-bottom: 30px;
    textarea{
      margin-top: 10px;
      width: 100%;
      height: 100px;
      line-height: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 3px;
      resize: none;
      outline: none;
      &::-webkit-scrollbar{
        width: 10px;
        height: 1px;
        margin-right: 1px;
      }
      &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: #535353;
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          border-radius: 10px;
          background: #EDEDED;
      }
    }
  }
  .submit-and-cancel{
    font-size: 0;
    button{
      width: 100px;
      height: 34px;
      border-radius: 3px;
      &.submit{
        background: #4f6ffe;
        color: #fff;
        margin-right: 32px;
      }
      &.cancel{
        border: 1px solid #4f6ffe;
        color: #4f6ffe;
        background: #fff;
      }
    }
  }
}
</style>
