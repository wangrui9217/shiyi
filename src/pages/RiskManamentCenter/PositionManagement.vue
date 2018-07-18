<!--位置管理-->
<template>
  <div class="position-management">
    <div class="left-part">
      <div class="top-actions">
        <p>
          <input class="checkbox" ref="selectAll" type="checkbox" @click="selectAll()">
          <span>围栏列表({{selectedArr.length}}/{{totalCount}})</span>
          <!-- <div>其他按钮</div> -->
          <span class="other-btns">
            <icon name="edit" class="edit" scale="2" title="编辑"></icon>
            <icon name="delete" class="delete" scale="2.2" title="删除" @click.native="deleteMap"></icon>
            <icon name="add2" class="add2" scale="2.3" title="新增"></icon>
          </span>
        </p>
      </div>
      <div class="search">
        <el-select v-model="value" filterable placeholder="请输入或选择搜索项" size="small"></el-select>
      </div>
      <div class="content">
        <el-collapse class="position-list" v-model="activeNames" @change="handleChange">
          <el-collapse-item class="position-item" :name="item.id" v-for="(item,index) in positionList" :key="index">
            <template slot="title">
              <div class="position-header">
                <input class="checkbox" type="checkbox" ref="checkbox" @click.stop="test(item,index)" :checked="item.checked">
                <p class="ellipsis title">{{item.name || '未命名'}}</p>
                <p class="sub-title">
                  <span class="point" :class="{red: item.type === 2,yellow: item.type === 1,blue: item.type === 3}"></span>{{item.type_view || '未选择围栏类型'}}<span class="edit" @click.stop="editMap(item)">编辑</span>
                </p>
              </div>
            </template>
            <div v-if="item.tags">
              <el-tag size="mini" v-for="(ele,inx) in item.tags.split(',')" :key="inx">{{ele}}</el-tag>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
       <el-pagination
        layout="prev, pager, next"
        :page-size="page_size"
        :total="totalNum"
        @current-change="currentPageChange">
      </el-pagination>
    </div>
    <div class="right-part">
      <my-map ref="MyMap" @resetFillColor="resetFillColor" :options="options"></my-map>
      <div class="enclosure">
        <span class="circle-enclosure" @click="drawCircle">圆形围栏</span>
        <span class="polygon-enclosure" @click="drawPloygon">多边形围栏</span>
      </div>
    </div>
    <my-form ref="childMethod" title="围栏" @modalConfirm="modalConfirm" @modalClose="modalClose">
      <div slot="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="form-content">
            <el-form-item label="围栏名称:" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入围栏名称" size="small"></el-input>
            </el-form-item>
            <el-form-item label="围栏名称:" prop="type">
              <!-- <el-input v-model="ruleForm.type" placeholder="请输入围栏名称" size="small"></el-input> -->
              <el-select v-model="ruleForm.type" placeholder="请输入围栏类型" size="small">
                <el-option v-for="(item,index) in map_location_types" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" style="background: #4f6ffe" size="mini" @click="reDraw()">重绘</el-button>
          </div>
        </el-form>
      </div>
    </my-form>
  </div>
</template>

<script>
import MyMap from '@/components/map/MapForPosition'
import {mapLocation, dataDict, addMapLocation, deleteMapLocation, editMapLocation} from '@/service/index'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      let temp = value.toString().trim().replace(/\s/g, '')
      if (temp === '') {
        callback(new Error('请输入门店名称'))
      } else {
        if (temp.length > 20) {
          callback(new Error('最多输入20个字符'))
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      let temp = value.toString().trim().replace(/\s/g, '')
      if (temp === '') {
        callback(new Error('请输入门店负责人'))
      } else {
        if (temp.length > 20) {
          callback(new Error('最多输入20个字符'))
        }
        callback()
      }
    }
    // var validatePass3 = (rule, value, callback) => {
    //   let temp = value.toString().trim().replace(/\s/g, '')
    //   if (temp === '') {
    //     callback(new Error('请输入门店详细地址'))
    //   } else {
    //     if (temp.length > 50) {
    //       callback(new Error('最多输入50个字符'))
    //     }
    //     callback()
    //   }
    // }
    return {
      value: null,
      options: {
        id: 1,
        centerPoint: {
          longitude: 121.4392742313,
          latitude: 31.3450763623
        },
        arr: [
          {
            longitude: 121.4392,
            latitude: 31.3450
          },
          {
            longitude: 121.4397,
            latitude: 31.3450
          },
          {
            longitude: 121.4397,
            latitude: 31.3455
          },
          {
            longitude: 121.4392,
            latitude: 31.3455
          }
        ],
        strokeColor: '#5DAC81',
        strokeWeight: 2,
        fillColor: '#FB9966',
        fillOpacity: 0.3
      },
      activeNames: [],
      positionList: [],
      page_size: 20,
      currentPageNo: 1,
      totalCount: 0,
      totalPageCount: 0,
      ruleForm: {
        name: '',
        type: '',
        location: null
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入围栏名称',
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请输入门店负责人',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      },
      map_location_types: []
    }
  },

  components: {
    MyMap
  },

  computed: {
    totalNum () {
      if (!this.totalCount) {
        return 0
      }
      return this.totalCount
    },
    selectedArr () {
      return this.positionList.filter(el => el.checked)
    }
  },

  mounted () {
    this.getMapLocation()
    const params = {
      group_name: 'tb_map_location_type'
    }
    dataDict(params).then(res => {
      console.log(res)
      res.forEach(el => {
        const locationType = {
          value: el.value,
          label: el.name
        }
        this.map_location_types.push(locationType)
      })
      console.log(this.map_location_types)
    })
  },

  methods: {
    getMapLocation () {
      const params = {
        'page': this.currentPageNo,
        'per-page': this.page_size
      }
      mapLocation(params).then(res => {
        this.totalCount = res.pagination.totalCount
        this.positionList = []
        this.positionList.push(...res.items)
      })
    },
    handleChange () {
      // console.log('hh')
    },
    selectAll () {
      // this.$refs.checkbox.forEach(el => {
      //   el.checked = this.$refs.selectAll.checked
      // })
      this.positionList.forEach((el, index) => {
        this.$set(el, 'checked', this.$refs.selectAll.checked)
      })
    },
    test (item, index) {
      // console.log(this.$refs.checkbox[index].checked)
      if (this.$refs.checkbox[index].checked && !item.polygon) {
        console.log(item.location)
        this.$set(item, 'polygon', this.$refs.MyMap.addOverlay(item))
        this.$set(item, 'checked', true)
      } else {
        this.$refs.MyMap.removeOverlay(item.polygon)
        this.$set(item, 'polygon', undefined)
        this.$set(item, 'checked', false)
      }
    },
    resetFillColor () {
      const arr = this.positionList.filter(el => el.polygon)
      arr.forEach(el => {
        el.polygon.setFillColor('#f45a46')
      })
    },
    currentPageChange (page) {
      this.currentPageNo = page
      this.$refs.MyMap.mapObj.clearOverlays()
      this.getMapLocation()
    },
    drawCircle () {
      const _this = this
      _this.$refs.MyMap.mapObj.clearOverlays()
      _this.$refs.MyMap.myDrawingManagerObject.open()
      // if(!_this.ruleForm.id){
      //   this.
      // }
      // eslint-disable-next-line
      _this.$refs.MyMap.myDrawingManagerObject.setDrawingMode(BMAP_DRAWING_CIRCLE)
      _this.$refs.MyMap.myDrawingManagerObject.addEventListener('circlecomplete', function (e, overlay) {
        const location = {'lnglat': [e.getCenter().lng, e.getCenter().lat], range: parseInt(e.getRadius())}
        _this.$set(_this.ruleForm, 'location', location)
        _this.$refs.MyMap.myDrawingManagerObject.close()
        _this.$refs.childMethod.modalOpen()
      })
    },
    drawPloygon () {
      const _this = this
      _this.$refs.MyMap.mapObj.clearOverlays()
      _this.$refs.MyMap.myDrawingManagerObject.open()
      // eslint-disable-next-line
      _this.$refs.MyMap.myDrawingManagerObject.setDrawingMode(BMAP_DRAWING_POLYGON)
      _this.$refs.MyMap.myDrawingManagerObject.addEventListener('overlaycomplete', function (e, overlay) {
        console.log(overlay.overlay.ia)
        _this.$set(_this.ruleForm, 'location', overlay.overlay.ia)
        _this.$refs.MyMap.myDrawingManagerObject.close()
        _this.$refs.childMethod.modalOpen()
      })
    },
    editMap (item) {
      console.log(item)
      this.ruleForm = {
        name: item.name,
        type: item.type + '',
        location: item.location,
        id: item.id
      }
      this.$refs.childMethod.modalOpen()
    },
    modalConfirm () {
      console.log(this.ruleForm)
      // return
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ruleForm.id) {
            const params = {
              name: this.ruleForm.name,
              type: this.ruleForm.type,
              location: this.ruleForm.location
            }
            editMapLocation(this.ruleForm.id, params).then(res => {
              this.$message.success('修改成功')
              this.$refs.childMethod.modalClose()
              this.$refs.MyMap.mapObj.clearOverlays()
              this.getMapLocation()
            })
          } else {
            addMapLocation(this.ruleForm).then(res => {
              // console.log(res)
              this.$message.success('新增成功')
              this.$refs.childMethod.modalClose()
              this.$refs.MyMap.mapObj.clearOverlays()
              this.getMapLocation()
            })
          }
        } else {
          return false
        }
      })
    },
    modalClose (test) {
      if (test !== '重绘') {
        this.ruleForm = {
          name: '',
          type: '',
          location: null
        }
      }
    },
    deleteMap () {
      if (this.selectedArr.length > 0) {
        this.$confirm('此操作将永久删除该围栏, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.selectedArr.forEach(el => {
            deleteMapLocation(el.id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }).catch(err => {
              this.$message.error(err)
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    reDraw () {
      this.$refs.childMethod.modalClose('重绘')
    }
  }
}

</script>
<style lang='less' scoped>
@black: #111;
@light-black: #333;
  .position-management{
    height: 100%;
    display: flex;
    flex-grow: 1;
    padding-left: 15px;
    .left-part{
      width: 350px;
      height: 100%;
      flex-shrink: 0;
      background: #fff;
      border: 1px solid #eee;
      display: flex;
      flex-direction: column;
      .top-actions{
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        text-align: left;
        background: rgb(248,248,252);
        p{
          position: relative;
          padding-left: 20px;
          font-size: 15px;
          font-weight: bold;
          .checkbox{
            position: absolute;
            width: 16px;
            height: 16px;
            left: 0;
            top: 17px;
          }
          .other-btns{
            position: absolute;
            width: 100px;
            height: 50px;
            right: 0;
            /deep/svg{
              margin-left: 3px;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
              path{
                fill: #2C4CDB;
              }
            }
            .add2{
              right: 0;
            }
            .delete{
              right: 25px;
            }
            .edit{
              right: 50px;
            }
          }
        }
      }
      .search{
        padding: 20px;
        .el-select{
          width: 100%;
        }
      }
      .content{
        width: 100%;
        flex-grow: 1;
        overflow: auto;
        .position-list{
          text-align: left;
          .position-item{
            position: relative;
            .checkbox{
              position: absolute;
              width: 16px;
              height: 16px;
              left: 20px;
              top: 10px;
            }
            .position-header{
              .title{
                color: #111;
                padding-left: 40px;
              }
              .sub-title{
                padding-left: 55px;
                font-size: 12px;
                color: #666;
                position: relative;
                .point{
                  position: absolute;
                  left: 40px;
                  top: 13px;
                  width: 9px;
                  height: 9px;
                  border-radius: 50%;
                }
                .edit{
                  position: absolute;
                  right: 10px;
                  color: #2C4CDB;
                }
                .red{
                  background: #fb7e7e;
                }
                .yellow{
                  background: #fac85e;
                }
                .blue{
                  background: #7f93eb;
                }
              }
            }
          }
          /deep/.el-collapse-item{
            .el-tag{
              margin-right: 5px;
            }
            .el-collapse-item__header{
              height: auto;
              line-height: 36px;
            }
            .el-collapse-item__arrow{
              height: 36px;
              margin-left: 8px;
              transform-origin: 50% 60%;
            }
            .el-collapse-item__content{
              min-height: 30px;
              padding-bottom: 10px;
              padding-left: 40px;
              padding-right: 36px;
            }
          }
        }
      }
      /deep/.el-pagination{
        height: auto;
        line-height: 40px;
        // background: cyan;
        .btn-prev, .el-pager .number, .btn-next{
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .right-part{
      flex-grow: 1;
      position: relative;
      .enclosure{
        position: absolute;
        background: #fff;
        top: 10px;
        right: 15px;
        line-height: 20px;
        padding: 10px 0;
        z-index: 100;
        font-size: 14px;
        color: #666;
        border-radius: 4px;
        border: 1px solid #eee;
        span{
          display: inline-block;
          padding: 0 22px;
          cursor: pointer;
          &.circle-enclosure{
            border-right: 1px solid #eee;
          }
        }
      }
    }
    .form-content {
      padding: 22px 70px 37px 70px;
      /*border-bottom: 1px solid #e9e9e9;*/
      .el-select {
        width: 100%;
      }
      .el-cascader {
        width: 100%;
      }
      .el-form-item:nth-last-child(1){
        margin-bottom: 0;
      }
    }
  }
</style>
