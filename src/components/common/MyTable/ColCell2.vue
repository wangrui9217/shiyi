<!-- 3行及以上展示 -->
<template>
  <el-col :span="span" class="col-cell-2">
    <p class="ellipsis" v-for="(item,index) in field" :key="index">{{data[field[index].name]}}</p>
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
.col-cell-2{
  padding: 5px 0;
  color: #2f2f2f;
  font-size: 12px;
  line-height: 18px;
}
</style>
