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
          menuname: '风控总览',
          type: 'menu-item',
          index: '/riskmanagementcenter/riskmanagementoverview',
          children: []
        },
        {
          menuname: '报警列表',
          type: 'menu-item',
          index: '/riskmanagementcenter/alarmlist',
          children: []
        },
        {
          menuname: '策略管理',
          type: 'menu-item',
          index: '/riskmanagementcenter/strategymanagement',
          children: []
        },
        {
          menuname: '位置管理',
          type: 'menu-item',
          index: '/riskmanagementcenter/positionmanagement',
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
