<template>
  <div class="com-form">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
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
      <template v-for="(itemConfig,index) in formItemConfigs">
        <el-form-item :label="itemConfig.label" :key="index" :style="{width: getBoxSpan(itemConfig.span)/24*100 + '%'}" :prop="itemConfig.prop">
          <el-input size="small" v-if="itemConfig.type === 'text'" v-model="form[itemConfig.prop]" :placeholder="itemConfig.placeholder"></el-input>
          <el-select size="small" v-else-if="itemConfig.type === 'select'" v-model="form[itemConfig.prop]" :placeholder="itemConfig.placeholder">
            <el-option size="small" :label="option[itemConfig.defaultProp.label]" :value="option[itemConfig.defaultProp.value]" v-for="(option,index) in itemConfig.options" :key="index"></el-option>
          </el-select>
          <!-- <upload></upload> -->
          <upload v-else-if="itemConfig.type ==='image'" :pictureArr="itemConfig.pictureArr" :allowNumber="1" @pictureChange="itemConfig.pictureHandle || defaultFunction"></upload>
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
    form: {
      type: Object,
      required: true
    },
    formItemConfigs: {
      type: Array
    },
    span: {
      type: Number,
      default: 6
    },
    rules: {}
  },
  data () {
    return {

    }
  },
  components: {
    upload
  },
  computed: {},
  methods: {
    getBoxSpan: val => {
      if (typeof val === 'number' && val) {
        return val
      } else {
        return 6
      }
    }, // 获取每项的宽度
    getRules () {

    },
    defaultFunction () {
    } // 默认图像改变的函数
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
      padding: 0 10px;
    }
  }
}
.el-select {
  width: 100%;
}
</style>
