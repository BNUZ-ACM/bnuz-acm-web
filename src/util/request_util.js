/*
 * @Author: yhy
 * @Date: 2018-09-25 09:56:31
 * @Last Modified by: yhy
 * @Last Modified time: 2018-12-01 19:27:42
 */
import Config from '../config'
import { Message } from 'iview'

function common(target, params = [], sucCallback = null, errCallback = null, finalCallback = null) {
    return new Promise((resolve, reject) => {
        if (typeof target === 'function') {
            try {
                target(...params).then(
                    ret => {
                        if (ret.status) {
                            if (sucCallback != null && typeof sucCallback === 'function') {
                                sucCallback(ret);
                            }
                        } else {
                            if (errCallback != null && typeof errCallback === 'function') {
                                errCallback(ret);
                            }
                        }
                    }
                ).finally(() => {
                    if (finalCallback != null && typeof finalCallback == 'function') {
                        finalCallback();
                    }
                    resolve();
                })
            } catch (err) {
                let ret = {
                    errorMsg: err
                }
                if (errCallback != null && typeof errCallback === 'function') {
                    errCallback(ret);
                    if (finalCallback != null && typeof finalCallback == 'function') {
                        finalCallback();
                    }
                    resolve();
                }
            }
        } else {
            throw new TypeError('request target is not a function');
        }
    })
}

async function msg(target, params = [], sucCallback = null, errCallback = null, showSucMsg = true) {
    await common(target, params, async(ret) => {
        if (showSucMsg) {
            Message.info(ret.message);
        }
        if (sucCallback != null && typeof sucCallback === 'function') {
            await sucCallback(ret);
        }
    }, (err) => {
        Message.error(err.errorMsg);
        if (errCallback != null && typeof errCallback === 'function') {
            errCallback(err);
        }
    })
}

async function load(target, params = [], sucCallback = null, errCallback = null, showSucMsg = false) {
    let loading = ELEMENT.Loading.service(Config.ele.loading);
    let config = {
        message: "",
        type: "error",
        showClose: true
    };
    try {
        await common(target, params, async(ret) => {
            config.type = "success";
            config.message = ret.message;
            if (showSucMsg) {
                ELEMENT.Message(config);
            }
            if (sucCallback != null && typeof sucCallback === 'function') {
                await sucCallback(ret);
            }
        }, (err) => {
            config.message = err.errorMsg;
            ELEMENT.Message(config);
            if (errCallback != null && typeof errCallback === 'function') {
                errCallback(err);
            }
        }, () => {
            loading.close();
        })
    } catch (error) {
        loading.close();
        throw error;
    }
}

function confirm(target, label = '', params = [], sucCallback = null, errCallback = null, showSucMsg = true, showLoading = false) {
    let config = {
        message: "",
        type: "error",
        showClose: true
    };

    ELEMENT.MessageBox.confirm(label, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async() => {
        let loading = null;
        if (showLoading) {
            loading = ELEMENT.Loading.service(Config.ele.loading);
        }
        await common(target, params, async(ret) => {
            config.type = "success";
            config.message = ret.message;
            if (showSucMsg) {
                ELEMENT.Message(config);
            }
            if (sucCallback != null && typeof sucCallback === 'function') {
                await sucCallback(ret);
            }
        }, (err) => {
            config.message = err.errorMsg;
            ELEMENT.Message(config);
            if (errCallback != null && typeof errCallback === 'function') {
                errCallback(err);
            }
        }, () => {
            if (showLoading) {
                loading.close();
            }
        })
    }).catch((err) => {

    })
}

export default {
    msg: msg,
    load: load,
    confirm: confirm
}