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
          menuname: '门店账号管理',
          type: 'menu-item',
          index: '/configcenter/newstore',
          children: []
        },
        // {
        //   menuname: '门店管理',
        //   type: 'menu-item',
        //   index: '/configcenter/storeaccount',
        //   children: []
        // },
        // {
        //   menuname: '登录账号管理',
        //   type: 'menu-item',
        //   index: '/configcenter/loginaccount',
        //   children: []
        // },
        // {
        //   menuname: '拖车账号管理',
        //   type: 'menu-item',
        //   index: '/configcenter/traileraccount',
        //   children: []
        // },
        {
          menuname: '消息列表',
          type: 'menu-item',
          index: '/configcenter/informationList',
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
