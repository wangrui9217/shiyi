<template>
  <div class="app-wrapper">
    <nav-bar></nav-bar>
    <div class="main-container">
      <router-view></router-view>
    </div>
    <layer v-if="show_personal_center"></layer>
    <personal-center v-if="show_personal_center"></personal-center>
  </div>
</template>

<script>
import SideBar from '../components/common/SideBar'
import NavBar from '../components/common/NavBar'
import Layer from '../components/common/layer'
import PersonalCenter from '../components/common/PersonalCenter'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    SideBar,
    NavBar,
    Layer,
    PersonalCenter
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['show_personal_center'])
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.app-wrapper{
  height: 100%;
  padding-top: 60px;
  background-color: #F4F3FF;
}
.main-container{
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
