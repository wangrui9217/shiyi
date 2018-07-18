<template>
    <div class="login">
        <!-- <div class="login-userMessage">
            <div class="login-userMessage-content">
                <div class="logo icon"><img src="../assets/tianyi_logo.png" width="60%" alt=""></div>
                <div class="title">天易后台管理系统</div>
                <div class="border-radius-item border-radius-input">
                    <input type="text" v-model="loginForm.username" placeholder="用户名">
                </div>
                <div class="border-radius-item border-radius-input">
                    <input type="password" v-model="loginForm.password" placeholder="密码" @keyup.enter="Login">
                </div>
                <div class="border-radius-item login-btn" @click="Login">登&nbsp;&nbsp;录</div>
            </div>
        </div> -->
        <img src="../assets/login-logo.png" alt="">
        <div class="login-window">
          <h3 class="title">用户登录</h3>
          <div class="login-userMessage-content">
            <div class="border-radius-item border-radius-input">
                <input type="text" v-model="loginForm.username" placeholder="请输入用户名">
            </div>
            <div class="border-radius-item border-radius-input">
                <input type="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter="Login">
            </div>
            <div class="border-radius-item login-btn" @click="Login">登&nbsp;&nbsp;录</div>
          </div>
          <div class="kefu">您好，欢迎来到天易保！客服电话：021-60297588</div>
        </div>
        <p class="company-info">
          © 2018 上海石易电子科技有限公司 版权所有 沪ICP备09039173号-1
        </p>
    </div>
</template>

<script>
import { loginRequest } from '../service/index'
// import Axios from "axios"
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },

  components: {},

  computed: {},

  mounted () {
    this.$cookie.remove('token')
  },

  methods: {
    // 登陆
    Login () {
      if (this.loginForm.userName === '') {
        this.$message({
          showClose: true,
          message: '用户名不能为空',
          type: 'error'
        })
        return
      }
      if (this.loginForm.password === '') {
        this.$message({
          showClose: true,
          message: '密码不能为空',
          type: 'error'
        })
        return
      }
      loginRequest(this.loginForm)
        .then(
          res => {
            if (res) {
            // eslint-disable-next-line
            // let tianyi_user = {}
              this.$axios.defaults.headers.common.Authorization = `Bearer ${
                res
              }`
              this.$cookie.set('token', res, {
                expires: 1
              })
              // localStorage.setItem('tianyi_user', JSON.stringify(tianyi_user))
              this.$router.push({name: 'Index'})
            }
          }
        )
        .catch(err => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          })
        })
    }
  }
}
</script>
<style lang='less' scoped>
@pinkRed: #ff3552;

.borderRed {
  border: 1px solid @pinkRed !important;
}
.login{
  width: 100%;
  height: auto;
  position: relative;
  font-size: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/login-bg.jpg') no-repeat center center;
  background-size: cover;
  img{
    // width: 100%;
    // height: auto;
    float: left;
    margin: 60px 0 0 70px;
  }
  .login-window{
    width: 450px;
    height: 450px;
    background: #fff;
    border-radius: 3px;
    position: absolute;
    // right: 260px;
    // top: 300px;
    right: 13.5%;
    top: 50%;
    transform: translateY(-50%);
    .title{
      height: 80px;
      line-height: 80px;
      font-size: 24px;
      color: #2c4cdb;
      font-weight: normal;
      letter-spacing: 2px;
      border-bottom: 1px solid#f5f7ff;
      margin-bottom: 50px;
    }
    .login-userMessage-content{
      padding: 0 58px;
    }
    .border-radius-item {
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-radius: 3px;
      margin-bottom: 30px;
      position: relative;
      &.border-radius-input {
        border: 1px solid #ccc;
        // background-color: rgba(0, 0, 0, 0.1);
        text-align: left;
        padding-left: 15px;
        padding-right: 25px;
        padding-top: 5px;
        input {
          background-color: transparent;
          display: inline-block;
          width: 100%;
          height: 22px;
          line-height: 22px;
          font-size: 16px;
          color: #666;
          outline: none;
        }
      }
      &:nth-of-type(2){
        margin-bottom: 50px;
      }
      &.login-btn {
        background-color: #4b65ef;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .kefu{
      color: #999;
      font-size: 14px;
      height: 16px;
      line-height: 16px;
    }
  }
  .company-info{
    position: absolute;
    font-size: 16px;
    color: #fff;
    bottom: 44px;
    width: 100%;
  }
}
// .login {
//   width: 100%;
//   height: 100%;
//   background-color: #2d3a4b;
//   display: flex;
//   flex-flow: row nowrap;
//   overflow: hidden;
//   .login-userMessage {
//     width: 100%;
//     height: 100%;
//     .login-userMessage-content {
//       width: 360px;
//       height: 420px;
//       margin: 170px auto 0;
//       .logo {
//         margin-bottom: 16px;
//       }
//       .title {
//         font-size: 20px;
//         color: #fff;
//         text-align: center;
//         margin-bottom: 40px;
//       }
//       .border-radius-item {
//         width: 100%;
//         height: 50px;
//         line-height: 50px;
//         border-radius: 25px;
//         margin-bottom: 30px;
//         position: relative;
//         &.border-radius-input {
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           background-color: rgba(0, 0, 0, 0.1);
//           text-align: left;
//           padding-left: 56px;
//           padding-right: 25px;
//           .svg-icon {
//             width: 20px;
//             height: 20px;
//             position: absolute;
//             top: 15px;
//             left: 20px;
//           }
//           input {
//             background-color: transparent;
//             display: inline-block;
//             width: 100%;
//             height: 22px;
//             line-height: 22px;
//             font-size: 16px;
//             color: #fff;
//             outline: none;
//           }
//         }
//         &.login-btn {
//           background-color: #2c4cdb;
//           color: #fff;
//           font-size: 16px;
//           cursor: pointer;
//         }
//         &.error-tip {
//           background: #fff5f6;
//           color: @pinkRed;
//           font-size: 14px;
//           padding-left: 54px;
//           text-align: left;
//           .svg-icon {
//             width: 16px;
//             height: 16px;
//             position: absolute;
//             top: 18px;
//             left: 22px;
//           }
//         }
//       }
//     }
//   }
// }
input::-webkit-input-placeholder {
  /* WebKit browsers*/
  color: #909399;
  font-size: 16px;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18*/
  color: #909399;
  font-size: 16px;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+*/
  color: #909399;
  font-size: 16px;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+*/
  color: #909399;
  font-size: 16px;
}
</style>
