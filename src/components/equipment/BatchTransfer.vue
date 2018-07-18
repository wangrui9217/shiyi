<template>
  <div class="batch-transfer">
    <h3 class="title">批量转移<i class="close" @click="close()"></i></h3>
    <div class="content">
      <div class="item">
        <div class="item-name">转移至：</div>
        <div class="item-value">
          <select-store @selectStore="selectStore"></select-store>
        </div>
      </div>
      <div class="item">
        <div class="item-name">设备号：</div>
        <div class="item-value">
          <input type="file"
           :style="{display: 'none'}"
           ref="input"
           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
           @change="selectedFile"/>
          <a href="javascript:void(0)" @click="upload">上传文件</a>
          <a href="">下载模板</a>
        </div>
      </div>
    </div>
    <div class="btns">
      <button class="submit" @click="submit()">确认</button>
      <button class="cancel" @click="close()">取消</button>
    </div>
  </div>
</template>

<script>
import SelectStore from '../SelectStore'
// import {devicetransfer} from '../../service/index'
import axios from 'axios'
export default {
  data () {
    return {
      storeId: null,
      file: null
    }
  },

  components: {
    SelectStore
  },

  computed: {},

  mounted () {},

  methods: {
    close () {
      this.$emit('close')
    },
    selectStore (value) {
      this.storeId = value
    },
    fetchStoreName (value) {
      this.storeName = value
    },
    triggerSelect () {
      this.$refs.input.click()
    },

    selectedFile (e) {
      // console.log(e.target.files[0])
      this.file = e.target.files[0]
      // 根据项目需求做具体处理，比如说获取文件名
    },

    async upload () {
      this.triggerSelect()
    },
    submit () {
      let formData = new FormData()
      formData.append('transfer', this.file)
      formData.append('store_id', this.storeId)
      formData.append('store_name', '门店名称')

      // const params = {
      //   'transfer': this.file,
      //   'store_id': this.storeId,
      //   'store_name': '门店名称'
      // }
      // console.log(formData)
      // devicetransfer(formData).then(res => {
      //   console.log('hhh')
      //   this.close()
      // }).catch(err => {
      //   this.$message.error(err.content)
      // })
      axios.post('http://php1.randzh.com/v1/devices/device-transfer', formData)
        .then(res => {
          // console.log(res.data.code)
          if (res.data.code === 3003) {
            this.$message.error(res.data.msg)
            return
          }
          this.$message({
            type: 'success',
            message: '批量转移成功'
          })
          this.close()
        })
    }
  }
}

</script>
<style lang='less' scoped>
@line-color:#e6e6e6;
@border-line-color: #f2f5fa;
.batch-transfer{
  width: 475px;
  height: 340px;
  position: absolute;
  padding-top: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
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
  position: absolute;
  top: 0;
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
  padding-top: 60px;
}
.item{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-bottom: 30px;
  .item-value{
    width: 200px;
    text-align: left;
    /deep/.select-store{
      .el-cascader{
        width: 200px;
      }
    }
    a{
      color: #4365FC;
    }
  }
}
.btns{
  width: 100%;
  height: 74px;
  line-height: 74px;
  font-size: 0;
  position: absolute;
  bottom: 0;
  border-top: 1px solid @line-color;
  button{
    width: 98px;
    height: 34px;
    vertical-align: middle;
    border-radius: 3px;
  }
  .submit{
    background: #4365FC;
    color: #fff;
    margin-right: 30px;
  }
  .cancel{
    background: #fff;
    color: #4365FC;
    border: 1px solid #4365FC;
  }
}
</style>
