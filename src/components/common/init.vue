<template>
  <div>
    <my-form ref="childMethod" title="解绑设备" @modalConfirm="modalConfirm">
      <div slot="content">
      </div>
    </my-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    modalOpen () {
      this.$refs.childMethod.modalOpen()
    },
    modalConfirm () {
      this.$refs.childMethod.modalClose()
    }
  },
  mounted () {},
  components: {},
  filters: {},
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">

</style>
