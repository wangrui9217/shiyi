<!--新增业务编辑业务-->
<template>
  <div>
    <my-form ref="childMethod"  title="报错" @modalConfirm="modalConfirm" @modalClose="initData">
      <div slot="content">
        <div class="input-content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 15, maxRows: 15}"
            placeholder="请输入车辆错误信息"
            v-model="wrong">
          </el-input>
        </div>
      </div>
    </my-form>
  </div>
</template>

<script>
import myForm from './../common/form'
export default {
  data () {
    return {
      wrong: ''
    }
  },
  methods: {
    modalOpen (obj) {
      this.$refs.childMethod.modalOpen()
    },
    modalConfirm (obj) {
      obj.modalClose()
    },
    initData () {}
  },
  mounted () {},
  components: {
    myForm
  },
  filters: {},
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
  .input-content{
    padding: 20px 37px 0;
  }

</style>
