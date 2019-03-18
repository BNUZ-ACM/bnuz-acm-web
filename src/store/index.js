/*
 * @Author: yhy
 * @Date: 2018-07-24 12:53:02
 * @Last Modified by: yhy
 * @Last Modified time: 2019-03-18 14:09:31
 */
import Vue from 'vue'
import Vuex from 'vuex'
import UserApi from '../http/api/User'
import Request from '../util/request_util'
import Cookie from '../util/cookie_util'

Vue.use(Vuex)
// store 中保存的内容是需要全局保存的状态。
// 暂时想到的只有用户的登陆状态等信息

/* eslint-disable no-new */
export default new Vuex.Store({
    state: {
        user: null,
        token: "",
        isLogin: false
    },
    getters: {
        username: state => {
            if (state.user != null) {
                return state.user.nickName;
            } else {
                return null;
            }
        },
        loginStatus: state => {
            return state.isLogin;
        }
    },
    mutations: {
        login(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isLogin = false;
            localStorage.removeItem("token");
            Cookie.set("token", "");
        }
    },
    actions: {
        isLogin: (state) => {
            if (state.state.isLogin === false) {
                let token = null;
                try {
                    token = Cookie.get("token");
                } catch (error) {

                }
                if (!token) {
                    token = localStorage.getItem("token");
                }
                if (token) {
                    Request.msg(UserApi.getInfo, [], ret => {
                        state.state.isLogin = true;
                        state.state.user = ret.data;
                    }, err => {
                        state.state.isLogin = false;
                    }, false);
                }
            }
        }
    }
})