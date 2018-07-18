<template>
  <div class="user-info">
    <div class="wrapper" v-if="!isCollapse">
      <p class="welcome">WELCOME <i class="set" @click="showPersonalCenter"></i></p>
      <div class="user-message" v-if="userInfo">
        <div class="user-logo">
          <img :src="userInfo.customer_logo || '../../assets/default-avatar.png'" alt="">
        </div>
        <div class="user-name">
          <p class="cn-name">{{userInfo.name}}</p>
          <p class="eng-name">{{userInfo.customer_view}}</p>
        </div>
      </div>
    </div>
    <div class="icon-wrapper" v-else>
      <icon name="user" scale="2"  @click.native="howPersonalCenter"></icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchUserInfo } from '@/service/index'
export default {
  data () {
    return {
      userInfo: null
    }
  },

  components: {},

  computed: {
    ...mapGetters(['side_menu_open']),
    isCollapse () {
      return !this.side_menu_open
    }
  },

  mounted () {
    fetchUserInfo().then(res => {
      this.userInfo = res
    })
  },

  methods: {
    showPersonalCenter () {
      this.$store.commit('TOGGLE_PERSONAL_CENTER')
    }
  }
}

</script>
<style lang='less' scoped>
.user-info{
  .wrapper{
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  }
  .icon-wrapper{
    width: 63px;
    height: 120px;
    line-height: 120px;
    svg{
      cursor: pointer;
    }
  }
  .welcome{
    color: #3551d6;
    text-align: left;
    font-weight: bold;
    margin-bottom: 16px;
    position: relative;
    .set{
      width: 19px;
      height: 19px;
      position: absolute;
      right: 5px;
      top: 1px;
      cursor: pointer;
      background: url(../../assets/set.png) no-repeat center center;
    }
  }
  .user-message{
    height: 48px;
    display: flex;
    justify-content: space-between;
    .user-logo{
      width: 48px;
      height: 48px;
      line-height: 48px;
      border-radius: 50%;
      overflow: hidden;
      background: #fff;
      // background: url('../../assets/default-avatar.png') no-repeat center center;
      background-size: 100% 100%;
      margin-left: 10px;
      position: relative;
      img{
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 100%;
        height: auto;
      }
    }
    .user-name{
      width: 120px;
      margin-top: 5px;
      .cn-name{
        font-size: 14px;
      }
      .eng-name{
        font-size: 12px;
      }
    }
  }
}
</style>
