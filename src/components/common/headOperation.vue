<template>
  <div class="floor-title-box" :class="className">
    <div>
      {{left}}
      <slot name="left-content"></slot>
    </div>
    <div class="right">
      <slot name="right-content"></slot>
      <template v-for="(item, index) in right">
        <div :key="index" @click="item.func(value)" :class="item.className">
          <icon :name="item.icon" :scale="item.iconScale||2" v-if="item.icon"></icon>
          {{item.label}}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headOperation',
  data () {
    return {
      callback: null
    }
  },
  props: {
    left: null,
    right: null,
    className: '',
    value: ''
  },
  methods: {
  },
  mounted () {},
  components: {},
  filters: {},
  computed: {},
  watch: {}
}
</script>

<style  lang="less" scoped>
  @style-color:#4365FC;
  .hasBottom{
  }
  .hasTop{
    margin-top: 20px;
  }
  .hasPadding{
    padding: 0 44px !important;
  }
  .noBackground{
    background-color: transparent !important;
  }
  .floor-title-box{
    border-bottom: 1px solid #f2f5fa;
    border-top: 1px solid #f2f5fa;
    font-size: 16px;
    color: #333;
    padding: 0 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    flex-wrap: nowrap;
    background-color: #F8F8FC;
    .right{
      font-size: 14px;
      color: @style-color;
      cursor: pointer;
      display: flex;
      user-select: none;
      &>div{
        margin-left: 20px;
        display: flex;
        align-items: center;
      }
      /deep/svg{
        margin-right: 4px;
        path{
          fill:@style-color;
        }
      }
    }
  }
</style>
