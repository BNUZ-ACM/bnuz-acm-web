/* 官网模块 */

import HomeLoginDialog from './home/LoginDialog'
import CourseDialog from './home/CourseDialog'
import Vue from 'vue'

export default () => {
    Vue.component('home-login-dialog', HomeLoginDialog)
    Vue.component('course-dialog', CourseDialog)
}