<template>
  <div>
    <my-form ref="childMethod" :title="riskDetail.name + '--策略详情'" @modalConfirm="modalConfirm" :width="650">
      <div slot="content" class="container">
        <row-container :info="detail">
          <div slot="tagContainer" class="tag-container">
            <el-tag
              size="medium"
              :key="index"
              v-for="(tag, index) in tagOption"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="medium"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="medium" @click="showInput" >+ 新建标签</el-button>
          </div>
          <div slot="tagList">
            <span
              class="my-tag mediu"
              :class="{'disabled': tagOption.indexOf(tag) !== -1}"
              size="medium"
              :key="index"
              v-for="(tag, index) in tagIntroduce"
              @click="choose(tag)"
              >
              {{tag}}
            </span>
          </div>
        </row-container>
      </div>
    </my-form>
  </div>
</template>

<script>
import rowContainer from './../../components/common/rowContainer'
export default {
  data () {
    return {
      riskDetail: '',
      detail: [],
      tagOption: ['111', '222', '333', '444', '555555555', '222', '333'],
      tagIntroduce: ['4144', '5555155', '222', '33', '4434', '53555555'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    choose (tag) {
      if (this.tagOption.indexOf(tag) === -1) {
        this.tagOption.push(tag)
      }
    },
    handleClose (tag) {
      this.tagOption.splice(this.tagOption.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.tagOption.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    modalOpen (info) {
      this.riskDetail = info
      console.log(info, 222)
      this.detail = [{label: '超速限制', value: '100km/s'}, {label: '开关', value: info.status === 1 ? '开启' : '关闭'}, {
        label: '生效日期', value: info.begin_date + ' 到 ' + info.end_date}, {label: '生效时段', value: info.begin_time + '~' + info.end_time}, {
        label: '策略描述', value: info.description, width: 24}, {
        label: '标签', width: 24, slot: 'tagContainer'}, {label: '推荐标签', width: 24, slot: 'tagList'}]
      if (info.condition && info.condition instanceof Object) {
        for (let temp in info.condition) {
          let temp2 = {label: temp, value: info.condition[temp]}
          this.detail.push(temp2)
        }
      }
      this.$refs.childMethod.modalOpen()
    },
    modalConfirm () {
      this.$refs.childMethod.modalClose()
    }
  },
  mounted () {
    // this.modalOpen()
  },
  components: {
    rowContainer
  },
  filters: {},
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.container{
  padding: 0 50px;
}
  .tag-container{
    min-height: 160px;
    border-radius: 3px;
    border:1px solid #e0e5ec;
    padding: 12px;
  }

.el-tag + .el-tag {
  margin-left: 10px;
}
.el-tag{
  margin-bottom: 10px;
}
.button-new-tag {
  margin-left: 10px;
  padding-top: 0;
  padding-bottom: 0;
  height: 28px;
  line-height: 26px;
}
.input-new-tag {
  height: 28px;
  line-height: 26px;
  width: 90px;
  margin-left: 10px;
  /deep/&>input{
    height: 100%;
  }
}
  .my-tag+.my-tag{
    margin-left: 10px;
  }
  .my-tag{
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
  .mediu{
    height: 28px;
    line-height: 26px;
  }
  .disabled{
    background-color:#EBEBEB;
    color: #B2B2B2;
    border-color: #D2D2D2;
    cursor: not-allowed;
  }
</style>
