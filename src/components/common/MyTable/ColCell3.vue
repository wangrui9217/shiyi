<!-- control列 -->
<template>
  <el-col :span="span" class="col-cell-3">
    <p class="ellipsis" v-for="(item,index) in field" :key="index" @click="item.func(item.param ? data[item.param] : data)">{{item.label}}</p>
  </el-col>
</template>

<script>
export default {
  props: ['span', 'data', 'field'],
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>
.col-cell-3{
  font-size: 12px;
  line-height: 18px;
  color: #4365fc;
  p{
    cursor: pointer;
  }
}
</style>
