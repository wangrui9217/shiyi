<template>
  <div class="layer" @click="layerClick()"></div>
</template>
<script>
export default {
  name: 'Layer',
  data () {
    return {}
  },
  methods: {
    layerClick () {
      this.$emit('layerClick')
    }
  }
}
</script>

<style lang="less" scoped>
  .layer {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0.93, 0.93, 0.93, 0.5);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
