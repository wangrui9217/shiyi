import Cookie from 'js-cookie'
import axios from 'axios'
function goLogin () {
  const loginUrl = `${window.location.origin}/#/login`
  window.location.replace(loginUrl)
}
function Authorize () {
  const token = Cookie.get('token')
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    goLogin()
  }
}
export default Authorize
