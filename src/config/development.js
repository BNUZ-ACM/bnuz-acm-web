/*
 * @Author: yhy
 * @Date: 2018-10-15 09:20:22
 * @Last Modified by: yhy
 * @Last Modified time: 2019-03-06 10:21:15
 */
import default_config from './default'

export default Object.assign({}, default_config, {
    // http server config
    http: {
        prot: 'http',
        host: '192.168.1.103',
        port: '8080',
        preUrl: '/api'
    }
})