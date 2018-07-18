<template>
  <div class="detail-message-part">
    <h3 class="part-title">{{data ? data.title : ''}}<icon v-if="data && data.icon" :name="data.icon" scale="2" @click.native="action()"></icon></h3>
    <div class="content clear">
      <template v-if="data">
        <el-col :span="item.span || 8" v-for="(item,index) in data.content" :key="index" class="item">
          <div class="item-name">{{item.item_name}}</div>
          <div class="item-value">{{item.item_value}}</div>
        </el-col>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'data'
  ],
  data () {
    return {
      // mm: {
      //   title: '工单基础信息',
      //   content: [
      //     {
      //       item_name: '工单类型',
      //       item_value: '新装',
      //       span: 9
      //     },
      //     {
      //       item_name: '现场联系人',
      //       item_value: '赵鑫 15888888888',
      //       span: 9
      //     },
      //     {
      //       item_name: '下单联系人',
      //       item_value: '赵鑫 15888888888',
      //       span: 6
      //     },
      //     {
      //       item_name: '上门时间',
      //       item_value: '2018-03-08 15:00',
      //       span: 9
      //     },
      //     {
      //       item_name: '上门地址',
      //       item_value: '上海智力产业园3号楼100号',
      //       span: 9
      //     },
      //     {
      //       item_name: '备注',
      //       item_value: '天下武功',
      //       span: 6
      //     }
      //   ]
      // }
    }
  },

  components: {},

  computed: {},

  mounted () {
    console.log(this.data)
  },

  methods: {
    action () {
      this.$emit('action')
    }
  }
}

</script>
<style lang='less' scoped>
.detail-message-part{
  margin-bottom: 20px;
  .part-title{
    height: 18px;
    line-height: 18px;
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    color: #333;
    padding-left: 20px;
    margin-bottom: 10px;
    position: relative;
    /deep/svg{
      position:absolute;
      right: 10px;
      cursor: pointer;
      path{
        fill: #4365FC;
      }
    }
  }
  .content{
    // overflow: hidden;
    background: #fff;
    border-radius: 3px;
    padding: 30px;
    text-align: left;
    font-size: 14px;
    .item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 20px;
      .item-name{
        color: #9ca8bc;
      }
      .item-value{
        color: #333333;
      }
    }
  }
  .el-col{
    height: 40px;
    line-height: 20px;
  }
}
</style>
