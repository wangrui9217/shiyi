<template>
  <div>
    <div class="modal-container" v-show="isopen">
      <div class="box-container">
        <transition name="move">
          <div class="box" v-if="isopen" :style="{width: width+'px'}">
            <div class="title">
              {{title}}
              <span @click="modalClose" class="close-btn">
            <i class="el-icon-close"></i>
          </span>
            </div>
            <slot name="content"></slot>
            <div class="btn-group" v-if="bottomShow">
              <el-button type="primary" size="small" @click="confirmM">{{buttonText}}</el-button>
              <el-button @click="modalClose" size="small">取消</el-button>
            </div>
            <div class="btn-group" v-if="nextShow">
              <el-button type="primary" size="small" @click="confirmN">下一步</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myForm',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    width: {
      type: Number,
      default: 475
    },
    bottomShow: {
      type: Boolean,
      default: true
    },
    nextShow: {
      type: Boolean,
      default: false
    },
    buttonText: {
      default: '确认',
      type: String
    }
  },
  data () {
    return {
      isopen: false
    }
  },
  computed: {},
  methods: {
    modalClose: function (test) {
      console.log(test)
      this.isopen = false
      this.$emit('modalClose', test)
    },
    modalOpen: function () {
      this.isopen = true
    },
    confirmM: function () {
      let obj = this
      this.$emit('modalConfirm', obj)
    },
    confirmN: function () {
      let obj = this
      this.$emit('modalNext', obj)
    }
  }
}
</script>

<style scoped lang="less">
  @style-color: #4f6ffe;
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
  .btn-group{
    padding: 18px 0;
    text-align: center;
    border-top: 1px solid #f2f5fa;
  }
  .modal-container {
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    overflow: scroll;
    .move-enter-active,  .move-leave-active {
      transition: all 0.2s linear;
      opacity: 1;
      transform: translateY(0);
    }
    .move-enter, .move-leave {
      opacity: 0;
      transform: translateY(-20px);
    }
    .box-container{
      width: 100%;
      padding:  120px 0;
      min-height: 100%;
    }
    .box {
      margin: 0 auto;
      /*min-height: 200px;*/
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      border-radius: 4px;
      /*position: absolute;*/
      /*top: 50%;*/
      /*left: 50%;*/
      /*transform: translate(-50%, -50%);*/
      background-color: #fff;
      .title {
        height: 55px;
        width: 100%;
        padding: 0 13px;
        display: flex;
        border-bottom: 1px solid #f2f5fa;
        color: #2C4CDB;
        align-items: center;
        font-size: 16px;
        justify-content: space-between;
        .close-btn{
          cursor: pointer;
          &>i{
            font-weight: bold;
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
