<template>
  <div class="add-car-info">
    <h3 class="title">批量增加<i class="close" @click="close()"></i></h3>
    <div class="content">
      <div class="item">
        <div class="item-name">所属门店:</div>
        <div class="item-value">
          <select-store></select-store>
        </div>
      </div>
      <div class="item">
        <div class="item-name">车辆类型:</div>
        <div class="item-value">
          <el-select v-model="carType" placeholder="请选择" size="small">
            <el-option v-for="(item,index) in carTypeList" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </div>
      </div>
      <div class="item" v-if="carType === 1">
        <div class="item-name">安装车辆数:</div>
        <div class="item-value">
          <el-input-number v-model="num" :min="1" :max="10" label="描述文字" size="small"></el-input-number>
          个
        </div>
      </div>
      <div class="item" v-else>
        <textarea v-model="carFrames" placeholder="每一行为一个车架号"></textarea>
      </div>
      <div class="submit-and-cancel">
        <button class="submit" @click="sumbit()">保存</button>
        <button class="cancel" @click="close()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectStore from '../../components/SelectStore'
export default {
  props: [
    'item',
    'schemeIndex'
  ],
  data () {
    return {
      carType: 1,
      carTypeList: [
        {
          value: 1,
          label: '默认车架号'
        },
        {
          value: 2,
          label: '普通车'
        },
        {
          value: 3,
          label: '特殊车'
        }
      ],
      num: null,
      carFrames: ''
    }
  },

  components: {
    SelectStore
  },

  computed: {},

  mounted () {
  },

  methods: {
    sumbit () {
      console.log('批量增加提交')
      let arr = this.carFrames.split('\n')
      arr.forEach(el => {
        const obj = {
          car_frame: el,
          car_license: '',
          car_type: null,
          car_color: '',
          car_owner_name: '',
          car_owner_phone: '',
          car_owner_certificate_no: '',
          car_owner_certificate_type: '',
          contract_num: ''
        }
        this.$emit('addCarInfo', obj, this.schemeIndex)
      })
    },
    close () {
      this.$emit('close')
    }
  }
}

</script>
<style lang='less' scoped>
.add-car-info{
  width: 475px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-60%);
  background: #fff;
  z-index: 11;
  border-radius: 3px;
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
  padding: 0 20px 0;
  /deep/.select-store{
    .el-cascader{
      width: 240px;
    }
  }
  .item{
    // height: 32px;
    line-height: 32px;
    color: #606266;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .item-name{
      width: 90px;
      text-align: left;
      margin-right: 10px;
    }
    .item-value{
      text-align: left;
      width: 240px;
      .el-select{
        width: 240px;
      }
    }
    textarea{
      width: 340px;
      height: 208px;
      resize: none;
      outline: none;
      border-radius: 3px;
      border: 1px solid #E0E5EC;
      line-height: 18px;
      padding: 5px 8px;
      overflow: auto;
    }
  }
  .submit-and-cancel{
    height: 72px;
    line-height: 72px;
    font-size: 0;
    border-top: 1px solid #f0f6ff;
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
