<template>
  <transition name="slide-fade">
    <div class="message" v-if="show">
      <div class="message-inner">
        <div class="title">
          <div :class="activeTabIndex == 1?'active':''" @click="tabClick(1)">
            <el-badge :value="noticeListAllData" :hidden='noticeListAllData === 0 ? true : false' class="item">
              通知
            </el-badge>
          </div>
          <div :class="activeTabIndex == 2?'active':''" @click="tabClick(2)">
            <el-badge :value="warnListAllData" :hidden='warnListAllData === 0 ? true : false' class="item">
              报警
            </el-badge>
          </div>
          <div :class="activeTabIndex == 3?'active':''" @click="tabClick(3)">
            <el-badge :value="toDoListAllData" :hidden='toDoListAllData === 0 ? true : false' class="item">
              重要
            </el-badge>
          </div>
        </div>
        <div class="message-content">
          <div class="inform-content" v-show="activeTabContentIndex === 1">
            <p style="padding:20px;color:#666;font-size:14px" v-if="!hasNoticeData">暂无相关数据</p>
            <div v-else>
            <el-row class="content-item" v-for="(item,index) in noticeListData" :key="index" @click.native="getItemDetail(item.id,item.title)">
              <el-col :span="8">
                <img src="../../assets/haoshi_big.png" alt="" class="">
              </el-col>
              <el-col :span="16" align="left">
                <div class="item-title">{{item.title}}</div>
                <div class="text-intro">{{item.content}}</div>
              </el-col>
            </el-row>
            </div>
            <span style="display:inline-block;padding:10px;cursor:pointer" v-show="moreNoticeData" @click="getMoreNotice">加载更多...</span>
          </div>
          <div class="alarm-content" v-show="activeTabContentIndex === 2">
            <p style="padding:20px;color:#666;font-size:14px" v-if="!hasWarnData">暂无相关数据</p>
            <div v-else>
            <el-row class="content-item" v-for="(item,index) in warnListData" :key="index" @click.native="getItemDetail(item.id,item.title)">
              <el-col :span="8">
                <img src="../../assets/ing_big.png" alt="">
              </el-col>
              <el-col :span="16" align="left">
                <div class="item-title">{{item.title}}</div>
                <div class="text-intro">{{item.content}}</div>
              </el-col>
            </el-row>
            </div>
            <span style="display:inline-block;padding:10px;cursor:pointer" v-show="moreWarnData" @click="getMoreWarm">加载更多...</span>
          </div>
          <div class="to-do-content" v-show="activeTabContentIndex === 3">
            <p style="padding:20px;color:#666;font-size:14px" v-if="!hasTodoData">暂无相关数据</p>
            <div v-else>
            <el-row class="content-item" v-for="(item,index) in toDoListData" :key="index"  @click.native="getItemDetail(item.id,item.title)">
              <el-col :span="8">
                <img src="../../assets/haoshi_big.png" alt="" class="img">
              </el-col>
              <el-col :span="16" align="left">
                <div class="item-title">{{item.title}}</div>
                <div class="text-intro">{{item.content}}</div>
              </el-col>
            </el-row>
            </div>
            <span style="display:inline-block;padding:10px;cursor:pointer" v-show="moreTodoData" @click="getMoreTodo">加载更多...</span>
          </div>
        </div>
        <div class="message-bottom">
          <el-row class="bottom-operation">
            <el-col :span="24" @click.native="toClearContent">
              {{clearContent}}
            </el-col>
          </el-row>
        </div>
      </div>
      <el-dialog :title="infoDetailTitle" :visible.sync="Detaildialog1" align="left" :append-to-body="true" @click="closeDialog">
      <div v-html="infoDetailhtml">
      </div>
    </el-dialog>
    </div>
  </transition>
</template>

<script>
import { informationNoticeRequest, pushMessageRequest, informationDetailRequest, clearMessageRequest } from '@/service/index'
export default {
  data () {
    return {
      pageInfo: {
        pageIndex1: 1,
        pageIndex2: 1,
        pageIndex3: 1
      },
      activeTabIndex: 1,
      activeTabContentIndex: 1,
      noticeListData: [], // 通知列表数据
      warnListData: [], // 警告列表数据
      toDoListData: [], // 待办列表数据
      noticeListAllData: 0, // 总数据
      warnListAllData: 0, // 总数据
      toDoListAllData: 0, // 总数据
      hasNoticeData: false,
      hasWarnData: false,
      hasTodoData: false,
      moreNoticeData: false,
      moreWarnData: false,
      moreTodoData: false,
      infoDetailTitle: '', // 详情的标题
      Detaildialog1: false, // 详情的弹窗展示
      infoDetailhtml: '', // 详情的内容
      clearContent: '清空通知' // 清空的内容
    }
  },
  props: ['show'],

  components: {},

  computed: {},

  mounted () {
    this.$nextTick(function () {
      // this.timer()
      this.getInformationNotice()
      this.getInformationWarm()
      this.getInformationUpcoming()
    })
  },

  methods: {
    getInformationNotice () {
      const params = {
        type: 'notice',
        'per-page': 3,
        page: this.pageInfo.pageIndex1
      }
      informationNoticeRequest(params).then(res => {
        if (res.items && res.items.length > 0) {
          this.hasNoticeData = true
          this.noticeListData = this.noticeListData.concat(res.items)
          if (res.items.length === 3) {
            this.moreNoticeData = true
          }
        } else {
          this.moreNoticeData = false
        }
        if (res._meta) {
          this.noticeListAllData = res._meta.totalCount
        }
      })
    }, // 获得通知消息
    getInformationWarm () {
      const params = {
        type: 'warm',
        'per-page': 3,
        page: this.pageInfo.pageIndex2
      }
      informationNoticeRequest(params).then(res => {
        if (res.items && res.items.length > 0) {
          this.hasWarnData = true
          this.warnListData = this.warnListData.concat(res.items)
          if (res.items.length === 3) {
            this.moreWarnData = true
          }
        } else {
          this.moreWarnData = false
        }
        if (res._meta) {
          this.warnListAllData = res._meta.totalCount
        }
      })
    }, // 获得报警消息
    getInformationUpcoming () {
      const params = {
        type: 'upcoming',
        'per-page': 3,
        page: this.pageInfo.pageIndex3
      }
      informationNoticeRequest(params).then(res => {
        if (res.items && res.items.length > 0) {
          this.hasTodoData = true
          this.toDoListData = this.toDoListData.concat(res.items)
          if (res.items.length === 3) {
            this.moreTodoData = true
          }
        } else {
          this.moreTodoData = false
        }
        if (res._meta) {
          this.toDoListAllData = res._meta.totalCount
        }
      })
    }, // 获得待办消息
    tabClick (index) {
      this.activeTabIndex = index
      this.activeTabContentIndex = index
      if (index === 1) {
        this.clearContent = '清空通知'
      } else if (index === 2) {
        this.clearContent = '清空报警'
      } else if (index === 3) {
        this.clearContent = '清空重要'
      }
    }, // tab的点击事件
    toClearContent () {
      if (this.activeTabIndex === 1 && this.noticeListData.length === 0) {
        this.$message({
          type: 'info',
          message: '没有相关数据~'
        })
        return
      }
      if (this.activeTabIndex === 2 && this.warnListData.length === 0) {
        this.$message({
          type: 'info',
          message: '没有相关数据~'
        })
        return
      }
      if (this.activeTabIndex === 3 && this.toDoListData.length === 0) {
        this.$message({
          type: 'info',
          message: '没有相关数据~'
        })
        return
      }
      let type = ''
      if (this.activeTabIndex === 1) {
        type = 'notice'
      } else if (this.activeTabIndex === 2) {
        type = 'warm'
      } else if (this.activeTabIndex === 3) {
        type = 'upcoming'
      }
      const params = {
        type: type
      }
      clearMessageRequest(params).then(res => {
        if (this.activeTabIndex === 1) {
          this.noticeListData.splice(0)
          this.pageInfo.pageIndex1 = 1
          this.getInformationNotice()
        } else if (this.activeTabIndex === 2) {
          this.warnListData.splice(0)
          this.pageInfo.pageIndex2 = 1
          this.getInformationWarm()
        } else if (this.activeTabIndex === 3) {
          this.toDoListData.splice(0)
          this.pageInfo.pageIndex3 = 1
          this.getInformationUpcoming()
        }
      })
    }, // 清空内容
    closeDialog () {
      this.Detaildialog1 = false
    }, // 关闭弹窗
    getMoreNotice () {
      this.pageInfo.pageIndex1++
      this.getInformationNotice()
    }, // 点击加载更多通知消息
    getMoreWarm () {
      this.pageInfo.pageIndex2++
      this.getInformationWarm()
    }, // 点击加载更多报警消息
    getMoreTodo () {
      this.pageInfo.pageIndex3++
      this.getInformationUpcoming()
    }, // 点击加载更多待办消息
    getItemDetail (id, title) {
      this.infoDetailTitle = title
      this.Detaildialog1 = true
      const param = {
        id: id
      }
      informationDetailRequest(param).then(res => {
        this.infoDetailhtml = ''
        if (res.content) {
          this.infoDetailhtml = res.content
        }
        if (this.activeTabIndex === 1) {
          this.noticeListData.splice(0)
          this.pageInfo.pageIndex1 = 1
          this.getInformationNotice()
        } else if (this.activeTabIndex === 2) {
          this.warnListData.splice(0)
          this.pageInfo.pageIndex2 = 1
          this.getInformationWarm()
        }
      })
    }, // 获取详情
    getRealTimeNotice () {
      pushMessageRequest().then(res => {
        if (res === '') {
          return false
        }
        this.$notify({
          title: res.title || '',
          message: res.content || '',
          position: 'bottom-right',
          onClick: function (res) {

          }
        })
      })
    }, // 获得实时通知
    timer () {
      window.setInterval(this.getRealTimeNotice, 5000)
    } // 定时器
  }
}
</script>
<style lang='less' scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(320px);
}
.message {
  user-select: none;
  position: fixed;
  width: 320px;
  right: 0;
  top: 60px;
  bottom: 0;
  background-color: #fff;
  border-left: 1px solid #ecedf1;
  box-shadow: 0px 0px 15px #888;
  z-index: 9999;
  .message-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .title {
    display: flex;
    border-bottom: 1px solid #ecedf1;
    height: 70px;
    flex: 0 0 auto;
    .active:after {
      width: 100%;
      height: 4px;
      background-color: #2f7cfc;
      left: 0;
      bottom: 0;
      position: absolute;
      content: "";
    }
    & > div {
      position: relative;
      cursor: pointer;
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .tip {
        position: relative;
        font-size: 14px;
        color: #666;
        .num {
          position: absolute;
          width: 15px;
          height: 15px;
          background-color: #ff0a09;
          color: #fff;
          border-radius: 100%;
          font-size: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          right: -10px;
          top: -10px;
        }
      }
    }
  }
  .message-content {
    flex: 1 1 auto;
    overflow: scroll;
  }
  .content-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 10px;
    border-bottom: 1px solid #ecedf1;
    .img{
      display: block;
      margin:auto;
    }
    .item-title {
      font-size: 14px;
      color: #333;
      line-height: 1.3;
    }
    .text-intro {
      font-size: 12px;
      color: #999;
      line-height: 1.2;
    }
  }
  .message-bottom {
    flex: 0 0 auto;
    font-size: 14px;
    .bottom-intro {
      padding: 10px 0;
      border-bottom: 1px solid #ecedf1;
    }
    .bottom-operation {
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      border-top:1px solid #efefef
    }
  }
}
</style>
