<template>
  <div class="nav-bar">
    <div class="left-part">
      <div class="logo-wrap">
        <img src="../../assets/logo.png" alt="">
        <i class="collapse-icon" @click="sideMenuControl()"></i>
      </div>
    </div>
    <div class="right-part">
      <el-menu
        :default-active="path"
        background-color="transparent"
        text-color="#FFFFFF"
        active-text-color="#ffffff"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item index="/vehiclecenter">车辆中心</el-menu-item>
         <el-menu-item index="/riskmanagementcenter">风控中心</el-menu-item>
        <el-menu-item index="/productcenter">产品中心</el-menu-item>
        <el-menu-item index="/configcenter">配置中心</el-menu-item>
      </el-menu>
      <div class="message-icon">
        <i class="message" @click="toggleMessage"></i>
        <!-- <i class="log-out" @click="logOut"></i> -->
      </div>
          <my-message :show="show"></my-message>
    </div>
  </div>
</template>

<script>
import myMessage from '../../components/common/message'
export default {
  data () {
    return {
      show: false
    }
  },

  components: {
    myMessage
  },

  computed: {
    path () {
      if (this.$route.path.startsWith('/vehiclecenter')) {
        return '/vehiclecenter'
      } else if (this.$route.path.startsWith('/riskmanagementcenter')) {
        return '/riskmanagementcenter'
      } else if (this.$route.path.startsWith('/productcenter')) {
        return '/productcenter'
      } else if (this.$route.path.startsWith('/configcenter')) {
        return '/configcenter'
      } else {
        return ''
      }
    }
  },

  mounted () {},

  methods: {
    sideMenuControl () {
      this.$store.commit('TOGGLE_SIDE_MENU')
    },
    toggleMessage () {
      this.show = !this.show
    }
  }
}

</script>
<style lang='less' scoped>
  .nav-bar{
  width: 100%;
  height: 60px;
  background: url('../../assets/nav-bg.png') no-repeat left center;
  background-size: cover;
  position: absolute;
  top: 0;
  min-width: 1366px;
  display: flex;
  justify-content: flex-start;
}
.logo-wrap{
  width: 220px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  img{
    width: auto;
    height: 50px;
    display: block;
    margin-top: 5px;
    margin-left: 30px;
  }
  i{
    width: 18px;
    height: 14px;
    background: url(../../assets/Category.png) no-repeat center center;
    background-size: 100% auto;
    margin-top: 23px;
    cursor: pointer;
  }
}
.right-part{
  width: 650px;
  height: 60px;
  padding-left: 40px;
  display: flex;
  .el-menu{
    width: 500px;
    height: 60px;
    margin-top: 2px;
    /deep/.el-menu-item{
      width: 125px;
      height: 60px;
      line-height: 60px;
      border-bottom: none;
      &.is-active{
        border-bottom: 4px solid #fff;
      }
      &:hover{
        background-color: rgba(50, 50, 50, 0.3) !important;
      }
    }
  }
  .message-icon{
    position: absolute;
    right: 0;
    width: 120px;
    height: 20px;
    margin-top: 20px;
    // border-left: 1px solid #8c9bdc;
    text-align: left;
    i{
      float: left;
      cursor: pointer;
    }
    .message{
      display: inline-block;
      width: 18px;
      height: 22px;
      background: url('../../assets/message_logo.png') no-repeat center center;
      background-size: 100% auto;
      margin-left: 50px;
      margin-top: -3px;
    }
    .log-out{
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url('../../assets/log-out.png') no-repeat center center;
      background-size: 100% auto;
      margin-left: 20px;
      margin-top: -1px;
    }
  }
}
</style>
