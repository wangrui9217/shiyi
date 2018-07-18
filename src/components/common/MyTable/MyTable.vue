<!--  -->
<template>
  <div class="my-table">
    <el-row class="table-header" type="flex" align="middle">
      <template v-for="(ele,index) in fields">
        <el-col v-if="ele.type === 4" :key="index" :span="ele.span">
          <input class="checkbox" type="checkbox" v-model="selectAll" @change="test">
        </el-col>
        <el-col v-else-if="ele.type !== 4 && ele.type !== 5" :span="ele.span" :key="index">
          <template v-if="ele.header">
            <p class="ellipsis">
              <icon :name="ele.header.icon" scale="2.5" class="icon"></icon>
              <span>{{ele.header.label}}</span>
            </p>
          </template>
        </el-col>
      </template>
    </el-row>
    <el-row class="table-item" :class="{'has-tags': has_tag(item)}" type="flex" align="middle" v-for="(item,inx) in localData" :key="inx">
      <check-col @selectChange="selectChange" :data="item" :index="inx" :span="1"></check-col>
      <template v-for="(ele,index) in fields">
        <col-cell1 :span="ele.span" v-if="ele.type === 1" :key="index" :data="item" :field="ele.content"></col-cell1>
        <col-cell2 :span="ele.span" v-if="ele.type === 2" :key="index" :data="item" :field="ele.content"></col-cell2>
        <col-cell3 :span="ele.span" v-if="ele.type === 3" :key="index" :data="item" :field="ele.content"></col-cell3>
        <tag-col v-if="ele.type === 5" :key="index" :data="item" :field="ele.content"></tag-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import ColCell1 from './ColCell1' // 正常两行展示信息
import ColCell2 from './ColCell2' // n行展示信息
import ColCell3 from './ColCell3' // n行操作行为
import CheckCol from './checkCol' // checkbox选择框
import TagCol from './TagCol' // 标签行
export default {
  props: ['tableData', 'fields'],
  name: 'tableComponent',
  data () {
    return {
      localData: [],
      simpleData: [
        {
          order_num: 12345678,
          order_name: '测试1',
          time: '2018-06-04',
          tags: ['标签1', '标签2', '标签1', '标签2', '标签1', '标签2']
        },
        {
          order_num: 321564,
          order_name: '测试2',
          time: '2018-06-14',
          tags: ['标签1', '标签2', '标签3', '标签4', '标签5', '标签6']
        }
      ],
      simpleFields: [
        {type: 4, span: 1},
        {header: {label: '工单', icon: 'car'}, type: 1, span: 5, content: [{name: 'order_name'}, {name: 'order_num'}]},
        {header: {label: '工单wer', icon: 'car'}, type: 2, span: 5, content: [{name: 'order_name'}, {name: 'order_num'}, {name: 'time'}]},
        {type: 3, span: 5, content: [{label: '工单详情', func: this.test, param: 'time'}, {label: '取消详情', func: this.test, param: 'time'}]},
        {type: 5, content: [{name: 'tags'}]}
      ],
      selectList: [],
      selectAll: false
    }
  },

  components: {
    ColCell1,
    ColCell2,
    ColCell3,
    CheckCol,
    TagCol
  },

  computed: {
    has_tags () {
      const arr = this.fields.filter(el => el.type === 5)
      if (arr.length === 0) {
        return false
      } else {
        return true
      }
    },
    selected_items () {
      const selectedItems = this.localData.filter(el => el.selected)
      return selectedItems
    }
  },
  filters: {

  },
  created () {
  },
  mounted () {
  },

  methods: {
    test (val) {
      // console.log(val)
      if (this.selectAll) {
        this.localData.forEach(el => {
          this.$set(el, 'selected', true)
        })
      } else {
        this.localData.forEach(el => {
          this.$set(el, 'selected', false)
        })
      }
      console.log(this.localData)
      console.log(this.selectAll)
    },
    selectChange (val, index) {
      console.log(val, index)
      if (val) {
        this.$set(this.localData[index], 'selected', true)
      } else {
        this.$set(this.localData[index], 'selected', false)
        console.log(this.localData)
      }
      this.checkIsSelectAll()
    },
    checkIsSelectAll () {
      let flag = true
      this.localData.forEach(el => {
        if (!el.selected) {
          flag = false
        }
      })
      this.selectAll = flag
    },
    has_tag (item) {
      const arr = this.fields.filter(el => el.type === 5)
      // console.log(arr[0].content[0].name)
      console.log(arr.length)
      // console.log(item[arr[0].content[0].name])
      if (arr.length === 0 || !item[arr[0].content[0].name] || item[arr[0].content[0].name].length === 0) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    tableData (val, oldval) {
      // this.selectAll = false
      this.localData = []
      this.localData.push(...val)
      this.checkIsSelectAll()
    },
    localData (val, oldval) {
      console.log(val)
    }
  }
}

</script>
<style lang='less' scoped>
// @-webkit-keyframes fadeIn {
//   0% {
//   opacity: 0; /*初始状态 透明度为0*/
//   }
//   100% {
//   opacity: 1; /*结尾状态 透明度为1*/
//   }
// }
.my-table{
  width: 100%;
  .el-row{
    border-bottom: 1px solid #eee;
    &:hover{
      background: #F8F8FC;
    }
  }
  .table-header{
    font-size: 14px;
    background: #F8F8FC;
    height: 50px;
    border-top: 1px solid #eee;
    .el-col{
      height: 50px;
      line-height: 50px;
      .icon{
        padding-right: 3px;
        vertical-align: middle;
      }
    }
  }
  .has-tags{
    min-height: 92px !important;
    padding-bottom: 32px;
      .tags{
        display: block;
      }
  }
  .table-item{
    position: relative;
    min-height: 60px;
    // .tags{
    //   display: none;
    //   text-align: left;
    //   padding-left: 20px;
    //   position: absolute;
    //   height: 32px;
    //   line-height: 32px;
    //   bottom: 0;
    //   border-top: 1px solid #eee;
    //   &{
    //     -webkit-animation-name: fadeIn; /*动画名称*/
    //     -webkit-animation-duration: 0.4s; /*动画持续时间*/
    //     -webkit-animation-iteration-count: 1; /*动画次数*/
    //     -webkit-animation-delay: 0s; /*延迟时间*/
    //   }
    // }
  }
}
</style>
