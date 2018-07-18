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
            <div class="delete-contain">
            <p>{{content}}</p>
            <div>
            <el-button type="primary" size="small" @click="confirmM">确认</el-button>
            <el-button @click="modalClose" size="small">取消</el-button>
            </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    width: {
      type: Number,
      default: 475
    }
  },
  data () {
    return {
      isopen: false,
      title: '',
      content: '',
      index: null,
      callback: null
    }
  },
  computed: {},
  methods: {
    modalClose: function () {
      this.isopen = false
      this.$emit('modalClose')
    },
    modalOpen: function (title, content, fun) {
      this.isopen = true
      this.title = title || '标题'
      this.content = content || '内容'
      this.callback = fun
      // console.log(title, content, fun)
    },
    confirmM: function () {
      let obj = this
      this.callback(obj)
      // this.$emit('confirm', this.index)
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
  .delete-contain {
    text-align: center;
    padding: 89px 0 38px;
    & > p {
      margin-bottom: 68px;
    }
  }
  .modal-container {
    z-index: 100;
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
      min-height: 200px;
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
        border-bottom: 1px solid #e9e9e9;
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
