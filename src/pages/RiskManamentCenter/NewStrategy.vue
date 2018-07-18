<template>
  <div>
    <my-form ref="childMethod" :title="isAdd ? '新增策略' : '编辑策略'" @modalConfirm="modalConfirm" @modalNext="modalNext" :nextShow="hasNextStep" :bottomShow="!hasNextStep" :width="550">
      <div slot="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <div class="form-content">
            <el-form-item label="策略类型:" prop="type" >
              <el-select v-model="ruleForm.type" placeholder="请选择" size="small" :disabled="!isAdd">
                <template v-for="(item, index) in ruleOption">
                <el-option :label="item.name" :value="item.value" :key = index></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="策略名称:" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入策略名称" size="small" :disabled="!isAdd"></el-input>
            </el-form-item>
            <el-form-item label="触发报警:" prop="alarm" v-if="['dismantling'].indexOf(ruleForm.type) !== -1">
              <el-select v-model="ruleForm.alarm" placeholder="请选择" size="small">
                <el-option label="无线光感报警" value="lightAlarm"></el-option>
                <el-option label="有线断电报警" value="powerAlarm"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="超速限制:" prop="limitSpeed" v-if="['overspeed'].indexOf(ruleForm.type) !== -1">
              <el-input v-model="ruleForm.limitSpeed" placeholder="最小值(单位 : km/h)" size="small" type="number"></el-input>
            </el-form-item>
            <el-form-item label="无线离线:" prop="wireless" v-if="['offline'].indexOf(ruleForm.type) !== -1">
              <el-input v-model="ruleForm.wireless" placeholder="最小值(单位 : 天)" size="small" type="number"></el-input>
            </el-form-item>
            <el-form-item label="有线离线:" prop="wired" v-if="['offline'].indexOf(ruleForm.type) !== -1">
              <el-input v-model="ruleForm.wired" placeholder="最小值(单位 : 天)" size="small" type="number"></el-input>
            </el-form-item>
            <el-form-item label="停车天数:" prop="duration" v-if="['park'].indexOf(ruleForm.type) !== -1">
              <el-input v-model="ruleForm.duration" placeholder="最小值(单位 : 天)" size="small" type="number"></el-input>
            </el-form-item>
            <el-form-item label="策略范围:"  v-if="['gather'].indexOf(ruleForm.type) !== -1">
              <div class="scope">
                <el-select v-model="unit" placeholder="请选择" size="small">
                  <el-option label="千米" :value="1000"></el-option>
                  <el-option label="米" :value="1"></el-option>
                </el-select>
                <el-form-item prop="radius">
                <el-input v-model="ruleForm.radius" placeholder="请输入范围值" size="small" type="number"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="聚集时间:"  v-if="['gather'].indexOf(ruleForm.type) !== -1">
              <div class="scope">
                <el-select v-model="unit2" placeholder="请输入聚集时间" size="small">
                  <el-option label="秒" :value="1"></el-option>
                  <el-option label="分钟" :value="60"></el-option>
                  <el-option label="小时" :value="3600"></el-option>
                </el-select>
                <el-form-item prop="gatherTime">
                <el-input v-model="ruleForm.gatherTime" placeholder="请输入范围值" size="small" type="number"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="车辆数:" prop="car" v-if="['gather'].indexOf(ruleForm.type) !== -1">
              <el-input v-model="ruleForm.car" placeholder="最小值(单位 : 辆)" size="small" type="number"></el-input>
            </el-form-item>
            <el-form-item label="停留时长:"  v-if="['riskpoint'].indexOf(ruleForm.type) !== -1">
              <div class="scope">
                <el-select v-model="unit3" placeholder="请选择" size="small">
                  <el-option label="分钟" :value="1"></el-option>
                  <el-option label="小时" :value="60"></el-option>
                  <el-option label="天" :value="3600"></el-option>
                </el-select>
                <el-form-item prop="duration">
                <el-input v-model="ruleForm.duration" placeholder="请输入停留时间" size="small" type="number"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="持续时间:" prop="days" v-if="['usualplace'].indexOf(ruleForm.type) !== -1">
              <el-input v-model="ruleForm.days" placeholder="最小值(单位 : 天)" size="small" type="number"></el-input>
            </el-form-item>
            <el-form-item label="生效日期:" prop="date">
              <el-date-picker
                size="small"
                v-model="ruleForm.date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="~"
                :clearable="false"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="生效时段:" prop="time">
              <el-time-picker
                size="small"
                is-range
                :clearable="false"
                v-model="ruleForm.time"
                range-separator="~"
                value-format="HH:mm:ss"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="触发报警:" v-if="['fence'].indexOf(ruleForm.type) !== -1">
              <select-tag :data="[{value: 'exit',label:'出围栏'},{value: 'enter',label:'入围栏'}]" :model.sync="ruleForm.trigger"></select-tag>
            </el-form-item>
            <el-form-item label="区域形式:" v-if="['area', 'fence'].indexOf(ruleForm.type) !== -1">
              <select-tag :data="[{value: 'onlyone',label:'独立区域'}, {value: 'together',label:'聚合区域'}]" :model.sync="ruleForm.style"></select-tag>
            </el-form-item>
            <el-form-item label="开关:">
              <select-tag :data="[{value: 1,label:'开启'},{value: 2,label:'关闭'}]" :model.sync="ruleForm.status"></select-tag>
            </el-form-item>
            <el-form-item label="策略描述:" prop="description">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请给策略做一下备注描述"
                v-model="ruleForm.description">
              </el-input>
            </el-form-item>
            <el-form-item label="门店:">
              <el-select
                v-model="ruleForm.store_id"
                placeholder="请选择"
                size="small"
                multiple
                filterable>
                <template v-for="(item, index) in storeOption">
                  <el-option :label="item.store_name" :value="item.store_id" :key = index></el-option>
                </template>
              </el-select>
            </el-form-item>
            <div class="my-tag">
              <div class="label">标签:</div>
              <div class="box">
                <el-tag
                  size="medium"
                  :key="index"
                  v-for="(tag, index) in tags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-tag
                  size="medium"
                  :key="tag"
                  v-for="tag in ruleForm.store_id"
                  closable
                  :disable-transitions="false"
                  @close="handleCloseTag(tag)">
                  {{tag}}
                </el-tag>
              </div>
            </div>
            <p>{{ruleForm.store_id}}{{tags}}{{tagInfo}}</p>
            <div class="my-tag">
              <div class="label">推荐标签:</div>
              <div class="box2">
                <span
                  class="my-tag-btn"
                  :class="{'disabled': tags.indexOf(tag.name) !== -1}"
                  size="medium"
                  :key="index"
                  v-for="(tag, index) in tagIntroduce"
                  @click="choose(tag)"
                    >
                  {{tag.name}}
                </span>
              </div>
            </div>
            <p>{{params}}</p>
          </div>
        </el-form>
      </div>
    </my-form>
  </div>
</template>

<script>
import {
  addRiskRule,
  editRiskRule
} from '../../service/index'
export default {
  data () {
    return {
      editId: '',
      isAdd: true,
      that: '',
      unit: 1,
      unit2: 1,
      unit3: 1,
      tags: [],
      ruleForm: {
        tag: [],
        name: '',
        type: '',
        date: '',
        time: '',
        description: '',
        status: 1,
        duration: '',
        wired: '',
        wireless: '',
        limitSpeed: '',
        alarm: 'lightAlarm',
        trigger: 'exit',
        days: '',
        car: '',
        radius: '',
        gatherTime: '',
        style: 'onlyone',
        store_id: []
      },
      rules: {
        store_id: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        radius: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        gatherTime: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        car: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        days: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        alarm: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        limitSpeed: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        wired: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        wireless: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        duration: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'change'
          }
        ],
        date: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        time: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '此处不能为空值',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleCloseTag (tag) {
      this.ruleForm.store_id.splice(this.ruleForm.store_id.indexOf(tag), 1)
    },
    choose (tag) {
      if (this.tags.indexOf(tag.name) === -1) {
        this.tags.push(tag.name)
      }
      console.log(tag)
    },
    modalOpen (that, editInfo) {
      editInfo ? this.isAdd = false : this.isAdd = true
      this.stateInit()
      if (!this.isAdd) {
        this.editId = editInfo.id
        this.ruleForm.type = editInfo.type
        this.ruleForm.tag = editInfo.tag ? editInfo.tag.split(',') : []
        this.ruleForm.name = editInfo.name
        this.ruleForm.status = editInfo.status
        this.ruleForm.date = editInfo.begin_date && editInfo.end_date ? [editInfo.begin_date, editInfo.end_date] : ''
        this.ruleForm.time = editInfo.begin_time && editInfo.end_time ? [editInfo.begin_time, editInfo.end_time] : ''
        this.ruleForm.description = editInfo.description
        let data = editInfo.condition
        if (data && data instanceof Object) {
          for (let obj in data) {
            if ((obj === 'duration' || obj === 'wireless' || obj === 'wired') && this.ruleForm.type !== 'riskpoint') {
              this.$set(this.ruleForm, obj, data[obj] / 24 / 60)
            } else if (obj === 'type') {
              this.$set(this.ruleForm, 'trigger', data[obj])
            } else {
              this.$set(this.ruleForm, obj, data[obj])
            }
          }
        }
        console.log(editInfo, this.ruleForm)
      }
      this.that = that
      this.$refs.childMethod.modalOpen()
    },
    modalConfirm () {
      return new Promise((resolve) => {
        this.validateForm().then(() => {
          if (this.isAdd) {
            addRiskRule(this.params).then(res => {
              console.log(res)
              this.$message.success('添加成功')
              this.that.initState(this.that.currentPage, this.that.search.type, this.that.search.desc, this.that.search.date ? this.that.search.date[0] : '', this.that.search.date ? this.that.search.date[1] : '')
              this.$refs.childMethod.modalClose()
              resolve()
            })
          } else {
            editRiskRule(this.editId, this.params).then(res => {
              console.log(res)
              this.$message.success('编辑成功')
              this.that.initState(this.that.currentPage, this.that.search.type, this.that.search.desc, this.that.search.date ? this.that.search.date[0] : '', this.that.search.date ? this.that.search.date[1] : '')
              this.$refs.childMethod.modalClose()
              resolve(this.editId)
            })
          }
        })
      })
    },
    modalNext () {
      this.modalConfirm().then((id) => {
        let temp = id
        this.$confirm('是否立即为此策略绑定' + this.type_name + '？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(temp)
        }).catch(() => {
        })
      })
    },
    validateForm () {
      return new Promise((resolve) => {
        this.$nextTick(function () {
          this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              resolve()
            }
          })
        })
      })
    },
    stateInit () {
      this.unit = 1
      this.unit2 = 1
      this.unit3 = 1
      this.ruleForm = {
        name: '',
        type: '',
        date: '',
        time: '',
        description: '',
        status: 1,
        duration: '',
        wired: '',
        wireless: '',
        limitSpeed: '',
        alarm: 'lightAlarm',
        trigger: 'exit',
        days: '',
        car: '',
        radius: '',
        gatherTime: '',
        style: 'onlyone',
        store_id: '',
        tag: []
      }
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    }
  },
  mounted () {},
  components: {},
  filters: {},
  computed: {
    tagInfo: function () {
      let tag = [...this.ruleForm.store_id, ...this.tags]
      return tag
    },
    params: function () {
      let temp = {}
      temp.tag = [...this.tags, ...this.ruleForm.store_id].join()
      temp.name = this.ruleForm.name
      temp.type = this.ruleForm.type
      temp.description = this.ruleForm.description
      temp.status = this.ruleForm.status
      temp.begin_date = this.ruleForm.date[0] || ''
      temp.end_date = this.ruleForm.date[1] || ''
      temp.begin_time = this.ruleForm.time[0] || ''
      temp.end_time = this.ruleForm.time[1] || ''
      // temp.store_id = this.ruleForm.store_id.toString()
      temp.store_id = 1
      temp.customer_id = 1
      if (this.ruleForm.type === 'park') {
        temp.data = {
          'duration': this.ruleForm.duration * 24 * 60
        }
      } else if (this.ruleForm.type === 'offline') {
        temp.data = {
          'wireless': this.ruleForm.wireless * 24 * 60,
          'wired': this.ruleForm.wired * 24 * 60
        }
      } else if (this.ruleForm.type === 'overspeed') {
        temp.data = {
          'limitSpeed': this.ruleForm.limitSpeed
        }
      } else if (this.ruleForm.type === 'separationequip') {
        temp.data = {}
      } else if (this.ruleForm.type === 'dismantling') {
        this.ruleForm.alarm === 'lightAlarm' ? temp.data = {
          'lightAlarm': true
        } : temp.data = {
          'powerAlarm': true
        }
      } else if (this.ruleForm.type === 'usualplace') {
        temp.data = {
          'days': this.ruleForm.days
        }
      } else if (this.ruleForm.type === 'fence') {
        temp.data = {
          'type': this.ruleForm.trigger,
          'style': this.ruleForm.style
        }
      } else if (this.ruleForm.type === 'gather') {
        temp.data = {
          'radius': this.ruleForm.radius * this.unit,
          'gatherTime': this.ruleForm.gatherTime * this.unit2,
          'car': this.ruleForm.car
        }
      } else if (this.ruleForm.type === 'riskpoint') {
        temp.data = {
          'duration': this.ruleForm.duration * this.unit3
        }
      } else if (this.ruleForm.type === 'area') {
        temp.data = {
          'style': this.ruleForm.style
        }
      }
      return temp
    },
    hasNextStep: function () {
      return ['park', 'offline', 'overspeed', 'separationequip', 'gather', 'dismantling'].indexOf(this.ruleForm.type) === -1
    },
    watchType: function () {
      return this.ruleForm.type
    },
    type_name: function () {
      let name = ''
      this.ruleOption.map(value => {
        if (this.ruleForm.type === value.value) {
          name = value.name
        }
      })
      return name
    }
  },
  watch: {
    watchType (a, b) {
      this.$nextTick(function () {
        this.$refs.ruleForm.clearValidate()
      })
    }
  },
  props: {
    ruleOption: {
      type: Array,
      default: function () {
        return []
      }
    },
    tagIntroduce: {
      type: Array,
      default: function () {
        return []
      }
    },
    storeOption: null
  }
}
</script>

<style scoped lang="less">
  .form-content {
    padding: 22px 70px 37px 70px;
    .my-tag{
      display: flex;
      margin-bottom: 22px;
      .label{
        text-align: right;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        width: 100px;
      }
      .box{
        flex: 1;
        border: 1px solid #dcdfe6;
        padding: 12px 12px 2px 12px;
        border-radius: 4px;
        min-height: 55px;
        .el-tag + .el-tag {
          margin-left: 10px;
        }
        .el-tag{
          margin-bottom: 10px;
        }
      }
      .box2{
        flex: 1;
      }
      .my-tag-btn + .my-tag-btn{
        margin-left: 10px;
      }
      .my-tag-btn{
        user-select: none;
        display: inline-block;
        margin-bottom: 10px;
        background-color: rgba(64,158,255,.1);
        padding: 0 10px;
        height: 32px;
        line-height: 30px;
        font-size: 12px;
        color: #409EFF;
        border-radius: 4px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid rgba(64,158,255,.2);
        white-space: nowrap;
        cursor: pointer;
      }
      .disabled{
        background-color:#EBEBEB;
        color: #B2B2B2;
        border-color: #D2D2D2;
        cursor: not-allowed;
      }
    }
    .scope{
      display: flex;
      &>div:nth-child(1){
        margin-right: 11px;
        width: 65%;
      }
      /*&>div:nth-child(3){*/
        /*margin-right: 11px;*/
        /*flex: 2;*/
      /*}*/
    }
    .switch-btn{
      display: flex;
      align-items: center;
      height: 40px;
      &>div{
        cursor: pointer;
        border: 1px solid #E0E5EC;
        border-radius: 3px;
        color: #999999;
        width: 65px;
        height:33px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
      .active{
        border: 1px solid #67c239;
        background: url('../../assets/tick.png') no-repeat top right;
      }
    }
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
  .el-range-editor.el-input__inner{
    width: 100%;
  }
  /deep/.el-range-separator{
    width: 20px;
    position: relative;
  }
  /deep/ .el-input input[type='number']{
  -moz-appearance:textfield;
  }
  /deep/input::-webkit-outer-spin-button,/deep/input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
</style>
