<!--<script src="../../service/index.js"></script>-->
<template>
  <div>
    <my-form ref="childMethod" title="解绑设备" @modalConfirm="modalConfirm">
      <div slot="content">
        <p class="tip">确定解绑该设备，请维护设备状态</p>
        <div class="content">
          <div :class="{active: this.state === 1}" @click="changeState(1)">正常</div>
          <div :class="{active: this.state === 3}" @click="changeState(3)">报废</div>
          <div :class="{active: this.state === 4}" @click="changeState(4)">待拆除</div>
        </div>
      </div>
    </my-form>
  </div>
</template>

<script>
import {
  cancelBindDevice
} from './../../service/index'
export default {
  data () {
    return {
      that: '',
      state: null,
      id: null
    }
  },
  methods: {
    changeState (val) {
      this.state = val
    },
    modalOpen (item, that) {
      this.state = 1
      this.id = item.id
      this.that = that
      console.log(item, '传进来的参数', this.state)
      this.$refs.childMethod.modalOpen()
    },
    modalConfirm () {
      let params = {
        type: this.state,
        id: this.id
      }
      console.log(params)
      cancelBindDevice(this.id, this.state).then(res => {
        console.log(res)
        this.$message.success('拆除成功')
        this.$refs.childMethod.modalClose()
        this.that.getDeviceInfo()
      })
    }
  },
  mounted () {},
  components: {},
  filters: {},
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
  .tip{
    font-size: 16px;
    color: #1F2F3D;
    padding: 55px 0 34px;
  }
  .content{
    font-size: 16px;
    width: 60%;
    margin: 0 auto 30px;
    display: flex;
    justify-content: space-between;
    &>div{
      border-radius: 3px;
      cursor: pointer;
      width: 75px;
      height: 32px;
      text-align: center;
      line-height: 30px;
      color: #888888;
      border: 1px solid #dcdfe6;
    }
    .active{
      border: 1px solid #67c239;
      background: url('../../assets/tick.png') no-repeat top right;
    }
  }

</style>
