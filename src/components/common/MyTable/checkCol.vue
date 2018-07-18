<!-- checkbox的列 -->
<template>
  <el-col :span="span">
    <input class="checkbox" ref="checkbox" @change="select" type="checkbox" :checked="selectTag">
  </el-col>
</template>

<script>
export default {
  props: ['span', 'data', 'field', 'index'],
  data () {
    return {
      selected: false
    }
  },

  components: {},

  computed: {
    selectTag () {
      return this.data.selected | false
    }
  },

  mounted () {
    this.selected = this.selectTag
  },

  methods: {
    select () {
      console.log(this.$refs.checkbox.checked)
      if (this.$refs.checkbox.checked) {
        this.$emit('selectChange', true, this.index)
      } else {
        this.$emit('selectChange', false, this.index)
      }
    }
  }
}

</script>
<style lang='less' scoped>
.checkbox{
  cursor: pointer;
}
</style>
