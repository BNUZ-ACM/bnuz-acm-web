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
        host: 'tt6hmk.natappfree.cc',
        port: '80',
        preUrl: '/api'
    }
})