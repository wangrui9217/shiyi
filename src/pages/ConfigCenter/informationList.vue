<template>
  <div class="information-list">
    <!-- <h2 class="info-list-title" align="left">消息列表</h2> -->
    <common-title :title="'消息列表'"></common-title>
    <el-row class="info-list-tag" align="right">
      <head-operation :right="[{label: '已读', func: this.informationHandle, icon: 'read', iconScale: 1.9, value: 1},
      {label: '未读', func: this.informationHandle, icon: 'unread', iconScale: 2, value: 0}
      ,{label: '已处理', func: this.informationHandle, icon: 'processed', iconScale: 2, value: 3},
      {label: '待办', func: this.informationHandle, icon: 'todo', iconScale: 2.1, value: 4}]"></head-operation>
      <!-- <el-col>
        标记为：
        <span class="wby-button" :class="activeEl === 1?'active':''" @click="informationHandle(1)">已读</span>
        <span class="wby-button" :class="activeEl === 0?'active':''" @click="informationHandle(0)">未读</span>
        <span class="wby-button" :class="activeEl === 3?'active':''" @click="informationHandle(3)">已处理</span>
        <span class="wby-button" :class="activeEl === 4?'active':''" @click="informationHandle(4)">待办</span>
      </el-col> -->
       <el-col>
         <span style="color:#4365FC" class="item-button" @click="informationHandle(1)">
           <icon name="read" scale="1.9"></icon>
           <span class="button-text">已读</span>
         </span>
         <span style="color:#4365FC" class="item-button" @click="informationHandle(0)">
           <icon name="unread" scale="2"></icon>
           <span class="button-text">未读</span>
         </span>
         <span style="color:#4365FC" class="item-button" @click="informationHandle(3)">
           <icon name="processed" scale="2.1"></icon>
           <span class="button-text">已处理</span>
         </span>
         <span style="color:#4365FC" class="item-button" @click="informationHandle(4)">
           <icon name="todo" scale="1.9"></icon>
          <span class="button-text"> 待办</span>
         </span>
      </el-col>
    </el-row>
    <el-row class="table h100">
      <el-col class="h100">
        <el-table ref="table" :data="informationListData" style="width: 100%" height="100%" @row-click="getItemDetail" @selection-change="selectionChange" v-loading="tableloading" :highlight-current-row="false">
          <el-table-column type="selection" width="50" header-align="center">
          </el-table-column>
          <el-table-column property="read" align="left" label="当前状态">
            <template slot-scope="scope">
              <span class="readState" :class="scope.row.read ==='未读'?'unread':'read'"></span>
              <span style="vertical-align:middle">{{scope.row.read}}</span>
            </template>
          </el-table-column>
          <el-table-column property="module_name_view" align="left" label="消息类型" :render-header=renderHeader2>
          </el-table-column>
          <el-table-column align="left" label="主题" :render-header=renderHeader3>
            <template slot-scope="scope">
              <P @click="getItemDetail(scope.row.id)">{{scope.row.title}}</P>
              <p style="font-size:12px;color:#9CA8B3;line-height:1.2s">{{scope.row.content}}</p>
            </template>
          </el-table-column>
          <el-table-column property="update_time" align="left" label="时间" :render-header=renderHeader4>
          </el-table-column>
          <el-table-column property="sign_type" align="left" label="标记" :render-header=renderHeader5>
            <template slot-scope="scope">
              {{scope.row.sign_type}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-pagination @current-change="pageChange" :page-size="pageInfo.pageSize" :current-page="pageInfo.pageIndex" layout="total,prev, pager, next" :total="pageInfo.pageTotal">
    </el-pagination>
    <el-dialog :title="infoDetailTitle" :visible.sync="Detaildialog" align="left" width="30%">
      <div v-html="infoDetailhtml">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CommonTitle from '@/components/common/title'
import {
  informationListRequest,
  informationDetailRequest,
  informationTagRequest
} from '@/service/index'
export default {
  data () {
    return {
      activeEl: 0,
      tableloading: false, // 表格数据加载
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 10
      },
      informationListData: [], // 信息列表数据
      selectedItem: '', // 选择的对象
      Detaildialog: false, // 详情弹窗
      html: '<h1>hahha<h1></br>kkkk',
      infoDetailhtml: '', // 详情
      infoDetailTitle: '' // 详情标题
    }
  },

  components: {
    CommonTitle
  },

  computed: {},
  created () {},
  mounted () {
    this.$nextTick(function () {
      this.getInformationListData()
    })
  },

  methods: {
    renderHeader2 (h, { column, $index }) {
      return h('p', [h('span', {
        style: {
          display: 'inline-block',
          width: '20px',
          height: '20px',
          'margin-right': '2px',
          background: 'url(' + require('../../assets/icon_messageType.png') + ') no-repeat center center',
          'background-size': '16px 16px',
          'vertical-align': 'middle'
        }
      }), h('span', {
        style: {
          'vertical-align': 'middle'
        }
      }, column.label)])
    },
    renderHeader3 (h, { column, $index }) {
      return h('p', [h('span', {
        style: {
          display: 'inline-block',
          width: '20px',
          height: '20px',
          'margin-right': '2px',
          background: 'url(' + require('../../assets/icon_theme.png') + ') no-repeat center center',
          'background-size': '16px 16px',
          'vertical-align': 'middle'
        },
        attrs: {
          src: require('../../assets/icon_theme.png')
        }
      }), h('span', {
        style: {
          'vertical-align': 'middle'
        }
      }, column.label)])
    },
    renderHeader4 (h, { column, $index }) {
      return h('p', [h('span', {
        style: {
          display: 'inline-block',
          width: '20px',
          height: '20px',
          'margin-right': '2px',
          background: 'url(' + require('../../assets/icon_time.png') + ') no-repeat center center',
          'background-size': '16px 16px',
          'vertical-align': 'middle'
        },
        attrs: {
          src: require('../../assets/icon_theme.png')
        }
      }), h('span', {
        style: {
          'vertical-align': 'middle'
        }
      }, column.label)])
    },
    renderHeader5 (h, { column, $index }) {
      return h('p', [h('span', {
        style: {
          display: 'inline-block',
          width: '20px',
          height: '20px',
          'margin-right': '2px',
          background: 'url(' + require('../../assets/icon_tag.png') + ') no-repeat center center',
          'background-size': '16px 16px',
          'vertical-align': 'middle'
        },
        attrs: {
          src: require('../../assets/icon_theme.png')
        }
      }), h('span', {
        style: {
          'vertical-align': 'middle'
        }
      }, column.label)])
    },
    informationHandle (type) {
      if (this.selectedItem === '') {
        this.$message({
          type: 'info',
          message: '请选择要处理的消息'
        })
        return
      }
      const params = {
        type: type,
        id: this.selectedItem
      }
      informationTagRequest(params)
        .then(res => {
          this.activeEl = type
          this.getInformationListData()
          this.$message({
            type: 'success',
            message: '处理成功'
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    }, // 消息处理
    getItemDetail (val) {
      this.infoDetailTitle = val.module_name_view
      this.Detaildialog = true
      const param = {
        id: val.id
      }
      informationDetailRequest(param).then(res => {
        this.infoDetailhtml = ''
        if (res.content) {
          this.infoDetailhtml = res.content
        }
        this.getInformationListData()
      })
    }, // 获取详情
    pageChange (val) {
      this.pageInfo.pageIndex = val
      this.getInformationListData()
    }, // 分页查询
    getInformationListData () {
      this.tableloading = true
      const params = {
        'per-page': this.pageInfo.pageSize,
        page: this.pageInfo.pageIndex
      }
      informationListRequest(params)
        .then(res => {
          this.tableloading = false
          this.informationListData.splice(0)
          if (res._meta) {
            this.pageInfo.pageTotal = res._meta.totalCount || 0
          }
          if (res.items && res.items.length > 0) {
            this.informationListData.push(...res.items)
          }
        })
        .catch(err => {
          this.tableloading = false
          console.log(err)
        })
    }, // 获得信息列表的数据
    selectionChange (val) {
      this.selectedItem = this.handleSelectedItem(val)
      // console.log(this.selectedItem)
    }, // 选择
    handleSelectedItem (arr) {
      var newArr = []
      arr.forEach(el => {
        newArr.push(el.id)
      })
      return newArr.join(',')
    } // 处理选中的项
  }
}
</script>
<style lang="less" scoped>
@style-color: #4f6ffe;
.information-list {
  height: 100%;
  padding: 0 15px 60px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-x: scroll;
  .info-list-title {
    flex: 0 0 auto;
    font-size: 24px;
  }
  .info-list-tag {
    // padding: 8px 0;
    height: 46px;
    line-height: 46px;
    background: #fff;
    border: 1px solid #eee;
    border-bottom: none;
    color: #409eff;
    font-size: 14px;
    text-align: right;
    flex: 0 0 auto;
    .item-button{
      vertical-align: middle;
      margin-right: 30px;
      cursor:pointer;
      .button-text{
        vertical-align: middle
      }
      /deep/svg{
      vertical-align: middle;
       path{
      fill:@style-color
    }
    }
    }

  }
  .table {
    flex: 1 1 auto;
    overflow: hidden;
    border: 1px solid #eee;
    /deep/.el-table th {
      background: #f8f8fc;
    }
    /deep/.el-table tr {
      background: transparent;
    }
    /deep/.el-table tr:hover {
      -webkit-box-shadow: 0 5px 10px #eee;
      box-shadow: 0 5px 10px #eee;
    }
    /deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
      background: transparent;
    }
    .readState {
      display: inline-block;
      width: 16px;
      height: 15px;
      vertical-align: middle;
    }
  }
  /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
  /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #4f6ffe;
    border-color: #4f6ffe;
  }
  /deep/.el-dialog__body {
    padding-left: 60px;
  }
  /deep/.el-dialog__header {
    border: 1px solid #efefef;
    /deep/.el-dialog__title {
      color:@style-color;
    }
    /deep/.el-dialog__close {
      color: @style-color;
      font-size: 20px;
    }
  }
  // /deep/.el-pagination.is-background .btn-next {
  //   background: #fff;
  // }
  // /deep/.el-pagination.is-background .btn-prev {
  //   background: #fff;
  // }
  // /deep/.el-pagination.is-background .el-pager li {
  //   background: #fff;
  // }
  // /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  //   background: #409eff;
  // }
}
.el-table th div {
  line-height: 0;
}
.wby-button {
  width: 70px;
  height: 34px;
  box-sizing: border-box;
  text-align: center;
  line-height: 32px;
  border: 1px solid #b3d8ff;
  font-size: 14px;
  color: #409eff;
  display: inline-block;
  background: #ecf5ff;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
}
.wby-button.active::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 0px;
  width: 16px;
  height: 16px;
  background: url("../../assets/tag_selected.png");
}
.pl20 {
  padding-left: 20px;
}
.h100 {
  height: 100%;
}
.col66 {
  color: #666;
}
.el-pagination{
  position: absolute;
  right: 20px;
  bottom: 20px;
  /deep/.btn-next, /deep/.btn-prev, /deep/.el-pager li{
    background: transparent;
  }
}
.read {
  background: url("../../assets/read.png") no-repeat center center;
  background-size: 16px 14px;
}
.unread {
  background: url("../../assets/unread.png") no-repeat center center;
  background-size: 16px 11px;
}
</style>
