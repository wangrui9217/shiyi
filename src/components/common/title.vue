<template>
  <div class="common-title">
    {{title}}
    <slot name="hint-text"></slot>
  </div>
</template>

<script>
export default {
  name: 'CommonTitle',
  props: [
    'title'
  ],
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
.common-title{
  font-size: 22px;
  text-align: left;
  font-family: 'MicrosoftYaHei';
  font-weight: normal;
  line-height: 65px;
  height: 65px;
  .hint-text{
    color: #cccccc;
    font-size: 12px;
    margin-left: 16px;
  }
}
</style>
