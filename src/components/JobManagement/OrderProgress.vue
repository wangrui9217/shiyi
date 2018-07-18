<template>
  <div class="progress">
    <head-operation left="订单处理进度"></head-operation>
    <div class="content clear">
      <el-row v-for="(item,index) in data" :key="index" type="flex" align="middle" class="step">
        <!-- <el-col class="time" :span="3">2018-06-23 23:11:11</el-col>
        <el-col class="status" :span="3">已结单</el-col>
        <el-col class="desc" :span="14" :offset="1">这是他妈的备注</el-col> -->
        <div class="point">
          <div class="step_icon"></div>
          <div class="step_line"></div>
        </div>
        <el-col class="time" :span="3">{{item.update_time || ''}}</el-col>
        <el-col class="status" :span="3">{{item.status_view}}</el-col>
        <el-col class="desc" :span="14" :offset="1">{{item.remark}}</el-col>
      </el-row>
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
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>
.progress{
  margin-bottom: 20px;
  border: 1px solid #eee;
  background: #fff;
  .part-title{
    height: 18px;
    line-height: 18px;
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    color: #333;
    padding-left: 20px;
    margin-bottom: 10px;
  }
  .content{
    border-radius: 3px;
    padding: 20px;
    font-size: 14px;
    .step{
      position: relative;
      .desc{
        text-align: left;
      }
      .point{
        position: absolute;
        width: 16px;
        height: 16px;
        left: calc(12.5% + 8px);
        // border-radius: 50%;
        // background: cyan;
        .step_icon{
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: url('../../assets/arrow.png') no-repeat center center;
          background-size: 100% 100%;
          z-index: 5;
        }
        .step_line{
          position: absolute;
          width: 2px;
          height: 50px;
          left: calc(50% - 1px);
          background: RGB(239,239,239);
          z-index: 4;
        }
      }
      &:first-of-type{
        .point{
          .step_icon{
            background: url('../../assets/success.png') no-repeat center center;
            background-size: 100% 100%;
          }
        }
      }
      &:last-of-type{
        .step_line{
          display: none;
        }
      }
    }
    .el-col{
      // padding: 15px 0;
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
