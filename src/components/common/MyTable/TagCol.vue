<!-- 标签列行 -->
<template>
  <el-col class="tags" :span="24">
    <el-tag size="mini" v-for="(item,index) in tags" :key="index">{{item}}</el-tag>
  </el-col>
</template>

<script>
export default {
  props: ['data', 'field'],
  data () {
    return {
    }
  },

  components: {},

  computed: {
    tags () {
      return this.data[this.field[0].name].split(',')
    }
  },

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>
@-webkit-keyframes fadeIn {
  0% {
  opacity: 0; /*初始状态 透明度为0*/
  }
  100% {
  opacity: 1; /*结尾状态 透明度为1*/
  }
}
.tags{
  display: none;
  text-align: left;
  padding-left: calc(1 / 24 * 100%);
  position: absolute;
  height: 32px;
  line-height: 32px;
  bottom: 0;
  border-top: 1px solid #eee;
  &{
    -webkit-animation-name: fadeIn; /*动画名称*/
    -webkit-animation-duration: 0.4s; /*动画持续时间*/
    -webkit-animation-iteration-count: 1; /*动画次数*/
    -webkit-animation-delay: 0s; /*延迟时间*/
  }
  .el-tag{
    margin-right: 5px;
  }
}
</style>
