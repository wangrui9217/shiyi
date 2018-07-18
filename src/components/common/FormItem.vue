<!-- 表单元素容器（单个） -->
<template>
  <div class="form-item-line" :style="'width:' + getWidth(schema.span) + ';margin-right:' + getWidth(schema.offset)">
    <div class="form-item-name" :class="{necessary: schema.necessary}">{{schema.label || ''}} :</div>
    <div class="form-item"  v-if="schema.type === 'input'">
      <el-input v-model="value" size="small" :class="schema.el_width"></el-input>
    </div>
    <div class="form-item" v-else-if="schema.type === 'select'">
      <el-select v-model="value" size="small" :class="schema.el_width">
        <el-option v-for="(item,index) in schema.options" :key="index" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="form-item" v-else-if="schema.type === 'datepicker'">
      <el-date-picker
        :class="schema.el_width"
        v-model="value"
        type="date"
        placeholder="选择日期"
        size="small">
      </el-date-picker>
    </div>
    <div class="form-item" v-else-if="schema.type === 'textarea'">
      <el-input type="textarea" v-model="value" :autosize="{ minRows: 3, maxRows: 3}" resize="none" :class="schema.el_width">

      </el-input>
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
export default {
  props: ['schema', 'content'],
  data () {
    return {
      value: null
    }
  },

  components: {},

  computed: {
    form_item_value () {
      if (this.schema.type === 'input' || this.schema.type === 'select' || this.schema.type === 'textarea') {
        return this.value
      } else if (this.schema.type === 'datepicker') {
        return this.value ? dateFormat(this.value, 'yyyy-mm-dd') : ''
      }
    }
  },

  mounted () {
    this.value = this.content || null
  },

  methods: {
    getWidth (span) {
      if (span === 0) {
        return 0
      }
      const val = span || 6
      return val / 24 * 100 + '%'
    }
  }
}

</script>
<style lang='less' scoped>
.form-item-line{
  float: left;
  font-size: 14px;
  display: flex;
  line-height: 40px;
  margin-bottom: 10px;
  .form-item-name{
    width: 90px;
    text-align: right;
    padding-right: 20px;
  }
}
.w140{
  width: 140px;
}
.w200{
  width: 200px;
}
.w400{
  width: 400px;
}
</style>
