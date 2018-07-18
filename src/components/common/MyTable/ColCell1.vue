<!-- 一行或两行展示 -->
<template>
  <el-col :span="span" class="col-cell-1">
    <p class="ellipsis" :title="data[field[0].name]">{{data[field[0].name]}}</p>
    <p class="grey ellipsis" v-if="field[1] && data[field[1].name]" :title="data[field[1].name]">{{data[field[1].name]}}</p>
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
.col-cell-1{
  color: #2f2f2f;
  font-size: 12px;
  line-height: 18px;
  .grey{
    color: #9ca8b3;
  }
}
</style>
