/* 官网模块 */

import HomeLoginDialog from './home/LoginDialog'
import CourseDialog from './home/CourseDialog'
import ContestDrawer from './home/ContestDrawer'
import ContestTeamDialog from './home/ContestTeamDialog'
import ContestPersonalDialog from './home/ContestPersonalDialog'
import BaseNav from '@/views/public/BaseNav'
import Vue from 'vue'

export default () => {
    Vue.component('home-login-dialog', HomeLoginDialog)
    Vue.component('course-dialog', CourseDialog)
    Vue.component('contest-drawer', ContestDrawer)
    Vue.component('contest-team-dialog', ContestTeamDialog)
    Vue.component('contest-personal-dialog', ContestPersonalDialog)
    Vue.component('base-nav', BaseNav)
}