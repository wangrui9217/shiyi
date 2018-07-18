<!--  -->
<template>
  <el-cascader
    v-model="value"
    :options="options"
    placeholder="请选择省市区地址"
    :show-all-levels="true"
    @change="test"
    size="small"
  ></el-cascader>
</template>

<script>
import {fetchRegion} from '@/service/index'
export default {
  props: [
    'data'
  ],
  data () {
    return {
      value: this.data || null,
      options: []
    }
  },

  components: {},

  computed: {},

  mounted () {
    // const params = {
    //   'page': 30,
    //   'per-page': 100
    // }
    fetchRegion().then(res => {
      const items = res.items
      const province = items.filter(el => el.type === 1)
      const city = items.filter(el => el.type === 2)
      const area = items.filter(el => el.type === 3)
      province.forEach(el => {
        const level1 = {
          value: el.id,
          label: el.name,
          children: []
        }
        city.forEach(ele => {
          if (ele.parent_id === el.id) {
            const level2 = {
              value: ele.id,
              label: ele.name,
              children: []
            }
            area.forEach(element => {
              if (element.parent_id === ele.id) {
                const level3 = {
                  value: element.id,
                  label: element.name
                }
                level2.children.push(level3)
              }
            })
            level1.children.push(level2)
          }
        })
        this.options.push(level1)
      })
    })
  },

  methods: {
    test () {
      console.log(this.value)
    }
  }
}

</script>
<style lang='less' scoped>
</style>
