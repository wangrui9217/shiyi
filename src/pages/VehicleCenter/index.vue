<template>
  <div class="index">
    <side-bar :menudata="sidemenu"></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from '../../components/common/SideBar'
export default {
  components: {
    SideBar
  },
  data () {
    return {
      sidemenu: [
        {
          menuname: '车辆管理',
          type: 'menu-item',
          index: '/vehiclecenter/vehiclemanagement',
          children: []
        }
      ]
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.index{
  height: 100%;
  display: flex;
}
</style>
