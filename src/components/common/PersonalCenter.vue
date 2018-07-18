<template>
  <div class="personal-center">
    <div class="id-and-avatar">
      <h4>个人中心</h4>
      <div class="avatar">
        <img :src="userInfo.customer_logo" alt="">
      </div>
      <p class="username">{{userInfo.name}}</p>
      <p class="usercompany">{{userInfo.customer_view}}</p>
      <div class="buttons">
        <div class="item basic-info" :class="{active: page === 1}" @click="page = 1"></div>
        <div class="item edit-info" :class="{active: page === 2}" @click="page = 2"></div>
        <div class="item change-psd" :class="{active: page === 3}" @click="page = 3"></div>
      </div>
    </div>
    <template v-if="page === 1">
      <div class="basic-information">
        <h4>基本信息<i class="close" @click="closePersonalCenter"></i></h4>
        <h4>Basic information</h4>
        <div class="content">
          <div class="item">
            <div class="item-name"><i class="username icon"></i>用户名称</div>
            <div class="item-value">{{userInfo.name}}</div>
          </div>
          <div class="item">
            <div class="item-name"><i class="login-account icon"></i>登录账号</div>
            <div class="item-value">{{userInfo.username}}</div>
          </div>
          <div class="item">
            <div class="item-name"><i class="phone icon"></i>联系电话</div>
            <div class="item-value">{{userInfo.phone}}</div>
          </div>
          <!-- <div class="item">
            <div class="item-name"><i class="store-name icon"></i>门店名称</div>
            <div class="item-value">上海市宝山区门店</div>
          </div> -->
        </div>
      </div>
    </template>
    <template v-else-if="page === 2">
      <div class="basic-information">
        <h4>修改信息<i class="close" @click="closePersonalCenter"></i></h4>
        <h4>Change information</h4>
        <div class="content">
          <div class="item">
            <div class="item-name"><i class="username icon"></i>用户名称</div>
            <div class="item-value"><el-input v-model="username" size="small" maxlength="20"></el-input></div>
          </div>
          <div class="item">
            <div class="item-name"><i class="login-account icon grey"></i>登录账号</div>
            <div class="item-value">{{userInfo.username}}</div>
          </div>
          <div class="item">
            <div class="item-name"><i class="phone icon"></i>联系电话</div>
            <div class="item-value"><el-input v-model="phone" size="small" maxlength="11"></el-input></div>
          </div>
          <!-- <div class="item">
            <div class="item-name"><i class="store-name icon grey"></i>门店名称</div>
            <div class="item-value">上海市宝山区门店</div>
          </div> -->
        </div>
        <div class="confirm-change" @click="changeUserInfo">确认修改</div>
      </div>
    </template>
    <template v-else-if="page === 3">
      <div class="basic-information change-password">
        <h4>修改密码<i class="close" @click="closePersonalCenter"></i></h4>
        <h4>Change password</h4>
        <div class="content">
          <div class="item">
            <div class="item-name necessary">旧密码</div>
            <div class="item-value">
              <el-input v-model="old_psd" placeholder="请输入旧密码" size="small"></el-input>
            </div>
          </div>
          <!-- <div class="item">
            <div class="item-name"></div>
            <div class="item-value">错误提示文案</div>
          </div> -->
          <div class="item">
            <div class="item-name necessary">新密码</div>
            <div class="item-value">
              <el-input v-model="new_psd" placeholder="请输入新密码" size="small"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-name necessary">确认新密码</div>
            <div class="item-value">
              <el-input v-model="confirm_psd" placeholder="确认新密码" size="small"></el-input>
            </div>
          </div>
        </div>
        <div class="confirm-change" @click="changePassword">确认修改</div>
      </div>
    </template>
  </div>
</template>

<script>
import { fetchUserInfo, changeInfo, changePassword } from '@/service/index'
// import {loginAccountDetailRequest, updateAccountDetailRequest} from '../../service/index'
export default {
  data () {
    return {
      page: 1,
      userInfo: null,
      username: '',
      phone: '',
      old_psd: '',
      new_psd: '',
      confirm_psd: ''
    }
  },

  components: {},

  computed: {},

  mounted () {
    this.getUserInfo()
  },

  methods: {
    closePersonalCenter () {
      this.$store.commit('TOGGLE_PERSONAL_CENTER')
    },
    getUserInfo () {
      fetchUserInfo().then(res => {
        this.userInfo = res
        this.username = res.name
        this.phone = res.phone
      })
      // const params = {
      //   'id': JSON.parse(localStorage.getItem('tianyi_user')).id
      // }
      // loginAccountDetailRequest(params).then(res => {
      //   this.userInfo = res
      //   this.username = res.contacts_name
      //   this.phone = res.phone
      // })
    },
    changeUserInfo () {
      if (!this.username) {
        this.$message.error('请输入用户名称')
        return
      }
      if (!this.phone) {
        this.$message.error('请输入联系号码')
        return
      }
      const params = {
        'name': this.username,
        'phone': this.phone
      }
      changeInfo(params).then(res => {
        this.$message({
          message: '修改信息成功！',
          type: 'success'
        })
      }).catch(err => {
        this.$message.error(err)
      })
    },
    changePassword () {
      if (!this.old_psd) {
        this.$message.error('请输入旧密码')
        return
      }
      if (!this.new_psd) {
        this.$message.error('请输入新密码')
        return
      }
      if (this.new_psd !== this.confirm_psd) {
        this.$message.error('确认密码应与新密码保持一致')
        return
      }
      const params = {
        'password': this.old_psd,
        'new_password': this.new_psd
      }
      changePassword(params).then(res => {
        this.$message({
          message: '修改密码成功！',
          type: 'success'
        })
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}

</script>
<style lang='less' scoped>
.personal-center{
  position: absolute;
  top: 50%;
  left:50%;
  width: 800px;
  height: 450px;
  z-index:11;
  transform: translate(-50%,-50%);
  display: flex;
}
.id-and-avatar{
  width: 300px;
  background: url(../../assets/bg.gif) repeat-x center center;
  padding: 20px;
  position: relative;
  h4{
    font-size: 16px;
    color: #fff;
    text-align: left;
    margin-bottom: 75px;
  }
  .avatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    // background: url('../../assets/default-avatar.png') no-repeat center center;
    background:#fff;
    background-size: 100% 100%;
    margin: 0 auto 25px;
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
  .username{
    font-size: 26px;
    font-weight: bold;
    color: #fff;
  }
  .usercompany{
    font-size: 16px;
    color: #fff;
  }
  .buttons{
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-around;
    .item{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      &.active{
        background: #4a63d8;
      }
      &.basic-info{
        background: url('../../assets/basic-info.png') no-repeat center center;
        // background-size: 20px 20px;
      }
      &.edit-info{
        background: url('../../assets/change-info.png') no-repeat center center;
        // background-size: 20px 20px;
      }
      &.change-psd{
        background: url('../../assets/change-psd.png') no-repeat center center;
        // background-size: 20px 20px;
      }
    }
  }
}
.basic-information{
  width: 500px;
  background: #fff;
  padding: 20px;
  .el-input{
    width: 135px;
  }
  h4{
    color: #2c4cdb;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    position: relative;
    .close{
      position: absolute;
      width: 14px;
      height: 14px;
      background: url('../../assets/close.png') no-repeat center center;
      top: 3px;
      right: 0;
      cursor: pointer;
    }
    &:last-of-type{
      margin-bottom: 25px;
    }
  }
  &.change-password{
    .content{
      width: 400px;
      .el-input{
        width: 220px;
      }
    }
  }
  .content{
    width: 275px;
    margin: 0 auto;
    padding-top: 12px;
    margin-bottom: 35px;
    .icon{
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
      &.username{
        background: url('../../assets/username.png') no-repeat center center;
      }
      &.login-account{
        background: url('../../assets/submit-account.png') no-repeat center center;
        &.grey{
          background: url('../../assets/submit-account-grey.png') no-repeat center center;
        }
      }
      &.phone{
        background: url('../../assets/contact-phone.png') no-repeat center center;
      }
      &.store-name{
        background: url('../../assets/store-name.png') no-repeat center center;
        &.grey{
          background: url('../../assets/store-name-grey.png') no-repeat center center;
        }
      }
    }
    .item{
      display: flex;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      .item-name{
        text-align: right;
        width: 120px;
        margin-right: 20px;
      }
      .item-value{

      }
    }
  }
  .confirm-change{
    width: 150px;
    height: 32px;
    line-height: 32px;
    margin: 0 auto;
    background: #4f6fff;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
  }
}
.necessary{
  &::before{
    content: '* ';
    color: #fe6367;
  }
}
</style>
