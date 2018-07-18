<template>
    <div>
      <div class="container">
        <template v-for="(item, index) in info">
          <div class="list" :key="index" :style="{width: (item.width || 12)/24*100 + '%'}">
            <div class="title">{{item.label}}<span class="space">:</span></div>
            <div class="content">
              <slot :name="item.slot" v-if="item.slot" class="content"></slot>
              <template v-else>{{item.value}}</template>
            </div>
          </div>
        </template>
      </div>
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
  props: {
    info: {
      type: Array
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
.container{
  font-size: 14px;
  color: #606266;
  padding-top: 25px;
  display: flex;
  flex-wrap: wrap;
  .space{
    padding: 0 5px;
  }
  .list{
    display: flex;
    align-items: flex-start;
    margin-bottom: 25px;
    padding-right: 20px;
    .title{}
    .content{
      flex: 1;
    }
  }
}
</style>
