<template>
  <div class="select-store">
    <!-- <div class="switch" v-if="showSwitch">
      含子门店：&nbsp;
      <el-switch
        v-model="is_include_child"
        @change="changeSwitch()"
        active-color="#3551d6"
        inactive-color="#dcdfe6">
      </el-switch>
    </div> -->
    <el-cascader
      :placeholder="storeName || '请选择门店'"
      :options="options"
      filterable
      change-on-select
      :show-all-levels="false"
      v-model="value"
      @change="selectStore()"
      size="small"
    ></el-cascader>
  </div>
</template>

<script>
import {fetchStoreList} from '../service/index'
export default {
  props: [
    'showSwitch',
    'store',
    'storeName'
  ],
  data () {
    return {
      value: [],
      is_include_child: false,
      options: []
    }
  },

  components: {},

  computed: {
    storeId () {
      return this.value[(this.value.length - 1)]
    }
  },

  mounted () {
    // if (this.store) {
    //   this.value = this.store
    // }
    fetchStoreList().then(res => {
      console.log(res)
      let headstore = [{
        value: res[0].id,
        label: res[0].name,
        children: []
      }]
      if (res[0].level && res[0].level.length > 0) {
        res[0].level.forEach(el => {
          const level1 = {
            value: el.id,
            label: el.name,
            children: []
          }
          if (el.level && el.level.length > 0) {
            el.level.forEach(ele => {
              const level2 = {
                value: ele.id,
                label: ele.name
              }
              level1.children.push(level2)
            })
          } else {
            level1.children = null
          }
          headstore[0].children.push(level1)
        })
      } else {
        headstore.children = null
      }
      this.options.push(...headstore)
    }).catch(() => {
      this.$message.error('获取门店列表失败')
    })
  },

  methods: {
    // changeSwitch () {
    //   this.$emit('changeMode', this.is_include_child)
    // },
    selectStore () {
      this.$emit('selectStore', this.storeId)
    }
  }
}

</script>
<style lang='less' scoped>
.select-store{
  display: inline-block;
  // vertical-align: bottom;
  // width: 140px;
  // font-size: 13px;
  // border-radius: 5px;
  // border: 1px solid #e4e7ed;
  // background: #fff;
  // color: #c0c4cc;
  // padding: 0 15px;
  margin-right: 10px;
  // cursor: pointer;
  // position: relative;
  .switch{
    display: inline-block;
    height: 32px;
    line-height: 32px;
    font-size: 13px;
    margin-right: 10px;
  }
  /deep/.el-switch{
    height: 32px;
    line-height: 32px;
    vertical-align: top;
    display: inline-block;
  }
  .el-cascader{
    width: 140px;
  }
}
</style>
