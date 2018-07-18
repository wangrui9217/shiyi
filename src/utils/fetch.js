import axios from 'axios'

const APIHOST = process.env.API_HOST

/**
 *
 * @param {*} url
 * @param {*} params
 * @param {*} method
 */
function goLogin () {
  const loginUrl = `${window.location.origin}/#/login`
  window.location.replace(loginUrl)
}

const fetch = (url, params, method) => {
  let config = {
    url: `${APIHOST}${url}`,
    method: method || 'get'
  }
  if (method === 'get' || method === 'delete') {
    config.params = params
  } else {
    config.data = params
  }
  return new Promise((resolve, reject) => {
    axios(config)
      .then(res => {
        const data = res.data
        // console.log(res)
        if (data.status === 200) {
          resolve(data.data)
        } else if (data.status === 4404) {
          reject(data)
        } else if (data.status === 1001 || data.status === 1002 || data.status === 1003) {
          reject(data.message)
          goLogin()
        } else {
          reject(data.message)
        }
      })
      .catch(err => {
        let error = '网络链接有误~'
        if (err && err.data && err.data.message) {
          error = err.response.data.message
        }
        reject(error)
      })
  })
}

export default fetch
