<template>
  <div class="soreSelectBox">
    <div class="selectStore" style="display:inline-block">
      <span style="margin-right:5px;">包含下级门店</span>
      <el-switch v-model="hasLowerLevel" active-color="#4f6ffe" inactive-color="#dcdfe6" style="margin-right:15px;">
      </el-switch>
      <el-tag size="small" style="cursor:pointer;font-size:20px;line-height:20px" @click.native="clickSelectStore">+</el-tag>
      <div class="storeOPtion" v-show="storeOptionShow">
        <el-tree ref="tree" :data="storeArr" :default-expanded-keys="allStoreId" @check="getSelectStores" show-checkbox :check-strictly="true" node-key="id" :props="defaultProps">
        </el-tree>
      </div>
    </div>
    <el-tag v-for="(item,index) in showStores" :key="item.id" @close="handleClose(index)" closable size="small">
      {{item.label}}
    </el-tag>
  </div>
</template>

<script>
import { getStoreTreeList } from '@/service/index'
export default {
  name: 'selectStore',
  props: {},
  data () {
    return {
      storeId: '',
      storeName: '',
      hasLowerLevel: false, // 门店是否包含下级
      storeOptionShow: false, // 门店选项的展示
      storeArr: [], // 门店数据
      allStoreId: [], // 所有门店的id
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      showStores: [], // { label: '门店一', id: 1 }, { label: '门店二', id: 2 }
      selectStoreId: [], // 选择的门店id
      treeShowStore: [] // 树形展示的默认节点
    }
  },
  computed: {},
  mounted () {
    this.getStoreData()
  },
  methods: {
    getStoreData () {
      getStoreTreeList().then(res => {
        this.storeArr.splice(0)
        this.allStoreId.splice(0)
        this.storeId = ''
        this.storeName = ''
        if (res && res.length > 0) {
          this.storeId = res[0].id
          this.storeName = res[0].name
          this.$emit('changeSelectStore', {'storeId': this.storeId, 'storeName': this.storeName, 'hasLowerLevel': this.hasLowerLevel, 'selectStoreId': this.selectStoreId})
          this.getStoreTree(res, this.storeArr)
        }
      })
    }, // 获取门店数据
    clickSelectStore () {
      this.storeOptionShow = !this.storeOptionShow
    }, // 点击选择门店
    getSelectStores (val1, val2) {
      this.treeShowStore = val2.checkedKeys
      this.showStores = val2.checkedNodes
      this.getSelectStoresIds()
    }, // 获取选择的门店
    getSelectStoresIds () {
      this.selectStoreId = []
      this.showStores.forEach(ele => {
        this.selectStoreId.push(ele.id)
      })
    }, // 获取选择门店的id
    handleClose (index) {
      this.treeShowStore.splice(index, 1)
      this.showStores.splice(index, 1)
      this.setCheckedKeys()
      this.getSelectStoresIds()
    }, // 点击关闭tag
    setCheckedKeys () {
      this.$refs.tree.setCheckedKeys(this.treeShowStore)
    }, // 设置选中tree的id
    getStoreTree (arr, contain) {
      if (arr && arr.length > 0) {
        arr.map(value => {
          this.allStoreId.push(value.id)
          let temp = {
            id: value.id,
            label: value.name,
            'parent_id': value['parent_id']
          }
          if (value.level && value.level.length > 0) {
            temp.children = []
            this.getStoreTree(value.level, temp.children)
          }
          contain.push(temp)
        })
      }
    } // 门店数据处理
  },
  watch: {
    hasLowerLevel: function (val) {
      this.$emit('changeSelectStore', {'storeId': this.storeId, 'storeName': this.storeName, 'hasLowerLevel': this.hasLowerLevel, 'selectStoreId': this.selectStoreId})
    },
    selectStoreId: function (val) {
      this.$emit('changeSelectStore', {'storeId': this.storeId, 'storeName': this.storeName, 'hasLowerLevel': this.hasLowerLevel, 'selectStoreId': this.selectStoreId})
    }
  }
}
</script>

<style scoped lang="less">
@style-color: #4f6ffe;
@border-line-color: #f2f5fa;
.soreSelectBox{
  .selectStore {
      position: relative;
      .storeOPtion {
        position: absolute;
        left: 50%;
        top: 30px;
        min-width: 200px;
        z-index: 999;
        /deep/.el-tree {
          padding: 20px;
          border: 1px solid #efefef;
          border-radius: 3px;
        }
      }
    }
  /deep/.el-tag {
      margin-right: 20px;
    }

}
</style>
