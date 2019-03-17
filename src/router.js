import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import ContestList from './views/contest/ContestList'
import ContestInfo from './views/contest/ContetInfo'
import SchoolTeam from './views/crews/SchoolTeam'
import ACMDetail from './views/acm/Detail.vue'
import ACMRole from './views/acm/Role.vue'
import ACMClaim from './views/acm/Claim.vue'
import ACMHonor from './views/acm/Honor.vue'
import ACMDalao from './views/acm/Dalao.vue'
import PersonalCenter from './views/personal/Center.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        // 比赛
        {
            path: '/contest/list',
            name: 'contestList',
            component: ContestList
        },
        {
            path: '/contest/info',
            name: 'contestInfo',
            component: ContestInfo
        },
        // acm简介
        {
            path: '/acm/detail',
            name: 'detail',
            component: ACMDetail,
        },
        {
            path: '/acm/role',
            name: 'role',
            component: ACMRole,
        },
        {
            path: '/acm/claim',
            name: 'claim',
            component: ACMClaim,
        },
        // 校队
        {
            path: '/acm/crews/team',
            name: 'schoolTeam',
            component: SchoolTeam,
            meta: {
                title: '校队介绍'
            }
        },
        {
            path: '/acm/crews/honor',
            name: 'honor',
            component: ACMHonor,
        },
        {
            path: '/acm/crews/dalao',
            name: 'dalao',
            component: ACMDalao,
        },
        // 个人中心
        {
            path: '/personal/center',
            name: 'center',
            component: PersonalCenter,
        }
    ]
})