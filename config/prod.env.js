'use strict'
const target = process.env.npm_lifecycle_event
var obj
if (target === 'test') {
  // 测试
  obj = {
    NODE_ENV: '"production"',
    // post用当前域名
    API_HOST: '"//test.api.tianyigps.com/"'
  }
} else {
  // 线上
  obj = {
    NODE_ENV: '"production"',
    // post用当前域名
    // API_HOST: '"//crm.api.youzishizu.com/"'
    API_HOST: '"//test.api.tianyigps.com/"'
  }
}
module.exports = obj
