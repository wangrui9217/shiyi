<template>
  <div class="form-content">
    <div class="clear">
      <form-item v-for="(item,index) in schema" ref="formItem" :content="context[item.name]" :key="index" :schema="item"></form-item>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import FormItem from './FormItem'
export default {
  props: ['schema', 'context'],
  data () {
    return {
      simpleSchema: {
        type: 'input', // 表单元素类型 input select textarea datepicker
        label: '姓名', // label 即表单元素前的文字
        name: 'name', // 表单数据名称 与context保持一致
        span: 8, // 分为24等份，span为宽度设置
        el_width: 'w200', // 表单元素宽度，预设 w140 w200 w400
        offset: 4, // 右边距，设置同span
        necessary: true // 是否必填（后期加入validate 修改）
      },
      simpleContext: {
        'name': 'gusheng',
        'area': 2,
        'time': '2008-10-10',
        'address': '地址啊地址'
      }
    }
  },

  components: {
    FormItem
  },

  computed: {
    params () {
      let params = {}
      let _this = this
      this.schema.forEach((el, index) => {
        params[el.name] = _this.$refs.formItem[index].form_item_value
      })
      return params
    }
  },

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>
.form-content{
  // width: 100%;
  padding: 30px;
}
.button{
  // float: left;
  // width: 100%;
  margin-top: 40px;
  button{
    // width: 100px;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    background: #4F6FFF;
  }
}
</style>
