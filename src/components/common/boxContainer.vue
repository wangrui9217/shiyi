<template>
  <div class="floor-container" v-loading="isLoading" :class="{'box-border':hasBorder}">
    <template v-if="data">
      <template v-for="(item, index) in data">
        <div :key="index" :style="{width: getBoxSpan(item.width)/24*100 + '%'}">
          <template v-if="item.isTag">
            <div>{{item.label}}</div>
            <template v-for="(item2, index) in item.value" v-if="item.value instanceof Array && item.value.length !== 0">
              <el-tag :key="index" size="medium" v-if="item2">{{item2}}</el-tag>
            </template>
          </template>
          <template v-else-if="item.component">
            <div>{{item.label}}</div>
            <template>
              <slot :name="item.component"></slot>
            </template>
          </template>
          <template v-else>
            <div>{{item.label}}</div>
            <div>{{item.value}}</div>
          </template>
        </div>
      </template>
    </template>
    <template v-if="error">
    <p class="center">{{error}}</p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'boxContainer',
  data () {
    return {}
  },
  props: {
    data: null,
    error: '',
    isLoading: {
      type: Boolean,
      default: true
    },
    hasBorder: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    getBoxSpan: val => {
      if (typeof val === 'number' && val) {
        return val
      } else {
        return 6
      }
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
.box-border {
  border: 1px solid #e6e6e6;
}
.el-tag {
  margin-bottom: 5px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.floor-container {
  width: 100%;
  background-color: #fff;
  padding: 30px 22px 5px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .center {
    flex: 1;
    font-size: 16px;
    text-align: center;
    margin-bottom: 25px;
  }
  & > div {
    min-height: 44px;
    /*padding-right: 80px;*/
    color: #333;
    font-size: 12px;
    word-wrap: break-word;
    text-align: left;
    margin-bottom: 25px;
    padding-right: 20px;
    & > div:nth-child(1) {
      font-size: 14px;
      color: #9ca8b3;
      margin-bottom: 6px;
    }
  }
}
</style>
