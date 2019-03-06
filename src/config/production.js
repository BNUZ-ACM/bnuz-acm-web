/*
 * @Author: yhy
 * @Date: 2018-11-01 15:48:11
 * @Last Modified by: yhy
 * @Last Modified time: 2019-03-06 10:23:39
 */
import default_config from './default'

export default Object.assign({}, default_config, {
  // http server config
  http: {
    prot: 'https',
    host: 'www.hdzt.cn',
    port: '80',
    preUrl: '/api'
  }
})