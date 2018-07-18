<template>
  <div v-loading="isLoading">
    <div class="title-top">
      <template v-for="(item, index) in title">
        <div :key="index" :style="{flex: item.flex|| 1}">{{item.value}}</div>
      </template>
    </div>
    <div class="content-box">
      <template v-for="(item1, index) in content">
      <div class="content" :key = index>
        <template v-for="(item2, index) in item1">
          <template v-if="item2.isOperation">
            <div :key="index" class="btn" :style="{flex: item2.flex|| 1}">
              <template v-for="(item3, index3) in item2.value">
                <div :key="index3" @click="item3.func(item2.itemValue)">{{item3.value}}</div>
              </template>
            </div>
          </template>
          <template v-else>
            <div :key="index" :style="{flex: item2.flex|| 1}">{{item2.value}}</div>
          </template>
        </template>
      </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'formContainer',
  data () {
    return {
      callback: null
    }
  },
  methods: {
  },
  props: {
    title: null,
    content: null,
    isLoading: {
      default: true,
      type: Boolean
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
.title-top{
  display: flex;
  align-items: center;
  height: 62px;
  background-color: #F8F8FC;
  padding: 0 22px;
  text-align: left;
  &>div{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.content-box{
  text-align: left;
  background-color: #fff;
  .content{
    padding: 0 22px;
    height: 80px;
    display: flex;
    align-items: center;
    &:hover{
      box-shadow: 0 5px 10px #eee;
    }
    &>div{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .btn{
      display: flex;
      align-items: center;
      &>div{
        cursor: pointer;
        color: #4365FC;
      }
      &>div:nth-child(1){
        margin-right: 20px;
      }
    }
  }
}
</style>
