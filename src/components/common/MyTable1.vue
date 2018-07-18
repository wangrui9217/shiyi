<!-- 公共table组件 -->
<template>
  <div class="table-content">
    <column v-for="(item,index) in fields" :key="index" :span="item.span" :control="item.control" :title="item.label" :icon="item.icon" :type="item.type" :data="tableData" :name="item.name"></column>
  </div>
</template>

<script>
import Column from './column1'
export default {
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
</style>
