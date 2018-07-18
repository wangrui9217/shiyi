'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"//test.api.tianyigps.com/"',
  // API_HOST: '"//php1.phpcountry.cn/v1/"',
  DEBUG: true
})
