<!-- 公共table组件 -->
<template>
  <div class="table-content clear">
    <column v-for="(item,index) in fields" :key="index" :span="item.span" :control="item.control" :title="item.label" :icon="item.icon" :type="item.type" :isCenter="item.isCenter" :data="tableData" :name="item.name" :params="item.params"></column>
  </div>
</template>

<script>
import Column from './column'
export default {
  name: 'MyTable',
  props: ['tableData', 'fields'],
  data () {
    return {
      simpleTableData: [

      ]
    }
  },

  components: {
    Column
  },

  computed: {},

  mounted () {
    console.log(this.tableData)
  },

  methods: {}
}

</script>
<style lang='less' scoped>
.table-content{
  // border: 1px solid #eee;
}
</style>
