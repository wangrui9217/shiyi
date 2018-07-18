<template>
  <el-menu class="wrapper" :default-active="$route.path" text-color="#cccccc" active-text-color="#5471F1" :collapse="isCollapse" router>
    <div class="user-msg">
      <user-info></user-info>
    </div>
    <template v-if="menudata" v-for="(item,index) in menudata" >
      <el-submenu v-if="item.type == 'submenu'" :key="index" :index="item.index">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.menuname}}</span>
        </template>
        <template v-if="item.children.length > 0">
          <el-menu-item v-for="(ele,idx) in item.children" :key="idx" :index="ele.route">
            {{ele.menuname}}
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else :key="index" :index="item.index">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.menuname}}</span>
      </el-menu-item>
    </template>

    <el-menu-item class="log-out" index="/login">
      <i class="el-icon-back"></i>
      <span slot="title">退出登录</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import UserInfo from './UserInfo'
export default {
  props: [
    'menudata'
  ],
  data () {
    return {
    }
  },

  components: {
    UserInfo
  },

  computed: {
    ...mapGetters(['side_menu_open']),
    isCollapse () {
      return !this.side_menu_open
    }
  },

  mounted () {},

  methods: {
    logOut () {
      console.log('hhh')
      this.$cookie.remove('token')
      this.$router.push('/login')
    }
  }
}

</script>
<style lang='less' scoped>
.el-menu:not(.el-menu--collapse) {
  width: 220px;
}
.el-menu{
  overflow: hidden;
  flex-shrink: 0;
}
.wrapper{
  position: relative;
  padding-bottom: 56px;
  .log-out{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
.wrapper>.el-menu-item{
  color: #666 !important;
  &.is-active{
    color: #5471F1 !important;
  }
}
.user-msg{
  width: 220px;
  height: 120px;
  background: #f7f8fd;
}
.el-menu-item{
  text-align: left;
}
</style>
