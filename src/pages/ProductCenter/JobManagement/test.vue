<template>
  <div class="test-content clear">
    <my-form :schema="schema" :context="context" ref="testForm">
      <div class="button">
        <button @click="test">测试</button>
      </div>
    </my-form>
    <div class="table-content clear">
      <my-table :tableData="tableData" :fields="fields"></my-table>
    </div>
  </div>
</template>

<script>
import MyForm from '@/components/common/MyForm'
import MyTable from '@/components/common/MyTable/MyTable'
export default {
  data () {
    return {
      schema: [
        {
          type: 'input',
          label: '姓名',
          name: 'name',
          span: 8,
          el_width: 'w200',
          offset: 4,
          necessary: true
        },
        {
          type: 'select',
          label: '地区',
          name: 'area',
          options: [
            {
              label: '上海',
              value: 1
            },
            {
              label: '武汉',
              value: 2
            },
            {
              label: '成都',
              value: 3
            }
          ],
          span: 8,
          el_width: 'w200',
          offset: 4,
          necessary: true
        },
        {
          type: 'datepicker',
          label: '日期',
          name: 'time',
          span: 8,
          el_width: 'w200',
          offset: 16,
          necessary: true
        },
        {
          type: 'textarea',
          label: '地址',
          name: 'address',
          span: 16,
          el_width: 'w400',
          offset: 8,
          necessary: false
        }
      ],
      context: {
        'name': 'gusheng',
        'area': 2,
        'time': '2008-10-10',
        'address': '地址啊地址'
      },
      tableData: [
        {
          value1: 111,
          value2: 222
        },
        {
          value1: 333,
          value2: 444
        }
      ],
      fields: [
        {name: ['value1', 'value2'], label: '瓦牛1', span: 6, icon: 'car'},
        {name: ['value2', 'value2'], label: '瓦牛2', span: 6, icon: 'circle'}
      ]
    }
  },

  components: {
    MyForm,
    MyTable
  },

  computed: {},

  mounted () {},

  methods: {
    test () {
      console.log('hello')
      console.log(this.$refs.testForm.params)
    }
  }
}

</script>
<style lang='less' scoped>
.test-content{
  // width: 100%;
  height: 100%;
  flex-grow: 1;
  // padding: 0 20px;
  .table-content{
    background: #fff;
  }
}
</style>
