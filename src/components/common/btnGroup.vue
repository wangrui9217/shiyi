<template>
    <div class="switch-btn">
      <div v-for="(item, index) in data" :key="index"  :class="{ 'active': isIn(item.value)}" @click="change(item.value)" class="switch-btn-list">{{item.label}}</div>
    </div>
</template>

<script>
export default {
  name: 'btnGroup',
  data () {
    return {
      moreThanOne: this.model instanceof Array
    }
  },
  methods: {
    change (val) {
      if (this.moreThanOne) {
        if (this.selected_value.indexOf(val) === -1) {
          this.selected_value.push(val)
        } else {
          this.selected_value.splice(this.selected_value.indexOf(val), 1)
        }
      } else {
        this.selected_value = val
      }
      // this.$emit('update:model', this.selected_value)
    },
    isIn (val) {
      if (this.moreThanOne) {
        if (this.selected_value.indexOf(val) === -1) {
          return false
        } else {
          return true
        }
      } else {
        if (this.selected_value === val) {
          return true
        } else {
          return false
        }
      }
    }
  },
  created () {
    // this.$emit('update:model', this.selected_value)
  },
  props: {
    data: {
      type: Array
    },
    model: null
  },
  computed: {
    selected_value: {
      get: function () {
        return this.model
      },
      // setter
      set: function (newValue) {
        this.$emit('update:model', newValue)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .switch-btn{
    display: flex;
    align-items: center;
    height: 40px;
  .switch-btn-list{
    user-select: none;
     cursor: pointer;
     border: 1px solid #E0E5EC;
     border-radius: 3px;
     color: #999999;
     width: 65px;
     height:33px;
     display: flex;
     justify-content: center;
     align-items: center;
   }
    .switch-btn-list + .switch-btn-list{
      margin-left: 10px;
    }
  .active{
    border: 1px solid #67c239;
    background: url('../../assets/tick.png') no-repeat top right;
  }
  }
</style>
