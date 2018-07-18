<template>
  <div class="com-form">
    <el-form ref="comForm" :model="form" label-width="110px" :defaultProp="defaultProp" :rules="rules"  :label-position="'top'" v-loading="loading">
      <!-- <div v-for="(option,index) in itemConfig.options" :key="index">
        {{option}}
        <h1>22</h1>
        {{itemConfig.defaultProp}}
        <h3>33</h3>
        {{itemConfig.defaultProp.label}}
        <h4>44</h4>
        {{option[itemConfig.defaultProp.label]}}
      </div> -->
      <!-- <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select> -->
      <template v-for="(itemConfig,index) in formItemConfigs1">
        <el-form-item :label="itemConfig[defaultProp.label]" :key="index" :style="{width: getBoxSpan(itemConfig.span)/24*100 + '%'}" :prop="'formName'+index">
          <el-input size="small" type="textarea" v-if="itemConfig[defaultProp.type] === 'text'" v-model="form['formName'+index]"></el-input>
          <!-- <el-select size="small" v-else-if="itemConfig.type === 'select'" v-model="form[itemConfig.default_name]">
            <el-option size="small" :label="option[itemConfig.defaultProp.label]" :value="option[itemConfig.defaultProp.value]" v-for="(option,index) in itemConfig.options" :key="index"></el-option>
          </el-select> -->
          <!-- <upload></upload> -->
          <upload v-else-if="itemConfig[defaultProp.type] ==='image'" :num="index" :pictureArr="itemConfig[defaultProp.default_name]" :allowNumber="1" @pictureChange="pictureChange"></upload>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import upload from '@/components/common/uploadPicture'
export default {
  name: 'from1',
  props: {
    formItemConfigs: {
      type: Array
    },
    span: {
      type: Number,
      default: 6
    },
    num: {},
    defaultProp: {
      type: Object,
      default: function () {
        return {
          type: 'type',
          prop: 'prop',
          label: 'label',
          'default_name': 'default_name'
        }
      }
    },
    loading: {
    }
  },
  data () {
    return {
      formItemConfigs1: this.formItemConfigs,
      form: {},
      rules: {},
      Number: this.num
    }
  },
  components: {
    upload
  },
  computed: {},
  updated () {
  },
  created () {

  },
  beforeMount () {
    this.generateForm()
  },
  mounted () {

  },
  methods: {
    getBoxSpan: val => {
      if (typeof val === 'number' && val) {
        return val
      } else {
        return 6
      }
    }, // 获取每项的宽度
    defaultFunction (val) {
      // console.log(val)
    }, // 默认图像改变的函数
    generateForm () {
      this.formItemConfigs1.forEach((element, index) => {
        // this.form['formName' + index] = element.default_value
        let objectKye = 'formName' + index
        this.$set(this.form, objectKye, element.default_value)
        if (element.required === 1) {
          this.rules['formName' + index] = [{required: true, message: '请输入' + element.name, trigger: 'blur'}]
        }
      })
    }, // 生成form表单
    pictureChange (val) {
      this.form['formName' + val.Number] = val.pictureUrlArr
    }, // 图片的改变
    emitVal () {
      this.formItemConfigs1.forEach((ele, index) => {
        ele.default_value = this.form['formName' + index]
      })
      return this.formItemConfigs1
    }, // 传给父组件的值
    validateForm () {
      this.$refs.comForm.validate((valid) => {
        if (valid) {

        } else {
          this.$message({
            message: '请把表单填写完整~',
            type: 'error'
          })
          return false
        }
      })
    }
  },
  watch: {
    form: {
      handler (val, oldVal) {
        let obj = {
          formArr: this.emitVal(),
          formJson: this.form,
          Number: this.Number
        }
        this.$emit('dataChange', obj)
      },
      deep: true
    },
    formItemConfigs: {
      handler (val, oldVal) {
        this.formItemConfigs1 = val
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="less">
.com-form {
  width: 100%;
  padding-right:10px;
  .el-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    .el-form-item {
      display: inline-block;
      /deep/.el-form-item__content{
        width: 120px;
        input{
          height: 120px;
        }
        .el-textarea__inner{
          width: 120px;
          max-height: 120px;
          min-height: 120px;
          height: 120px;
        }
      }
      /deep/.el-upload--picture-card{
        width: 120px;
        height: 120px;
        line-height: 120px;
      }
    }
  }
}

</style>
