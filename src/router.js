import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: '北京师范大学珠海分校ACM协会官网'
            }
        },
        // 比赛
        {
            path: '/contest/list',
            name: 'contestList',
            component: resolve => require(['./views/contest/ContestList'], resolve),
            meta: {
                title: '比赛列表'
            }

        },
        {
            path: '/contest/info',
            name: 'contestInfo',
            component: resolve => require(['./views/contest/ContestInfo'], resolve),
            meta: {
                title: '比赛详情'
            }
        },
        {
            path: '/contest/personal',
            name: 'ContestPersonal',
            component: resolve => require(['./views/contest/ContestPerson'], resolve),
            meta: {
                title: '比赛详情'
            }
        },
        {
            path: '/contest/detail',
            name: 'contestDetail',
            component: resolve => require(['./views/contest/ContestDetail.vue'], resolve),
            meta: {
                title: '比赛详情'
            }
        },
        {
            path: '/contest/promotionList',
            name: 'promotionList',
            component: resolve => require(['./views/contest/ContestPromotionList'], resolve),
            meta: {
                title: '晋级名单'
            }
        },
        // acm简介
        {
            path: '/acm/detail',
            name: 'detail',
            component: resolve => require(['./views/acm/Detail.vue'], resolve),
            meta: {
                title: 'ACM简介'
            }
        },
        {
            path: '/acm/role',
            name: 'role',
            component: resolve => require(['./views/acm/Role.vue'], resolve),
            meta: {
                title: 'ACM规则'
            }
        },
        {
            path: '/acm/claim',
            name: 'claim',
            component: resolve => require(['./views/acm/Claim.vue'], resolve),
            meta: {
                title: '编程要求'
            }
        },
        // 校队
        {
            path: '/acm/crews/team',
            name: 'schoolTeam',
            component: resolve => require(['./views/crews/SchoolTeam'], resolve),
            meta: {
                title: '校队介绍'
            }
        },
        {
            path: '/acm/crews/honor',
            name: 'honor',
            component: resolve => require(['./views/acm/Honor.vue'], resolve),
            meta: {
                title: '获奖情况'
            }
        },
        {
            path: '/acm/crews/dalao',
            name: 'dalao',
            component: resolve => require(['./views/acm/Dalao.vue'], resolve),
            meta: {
                title: '历届毕业'
            }
        },
        // 个人中心
        {
            path: '/personal/center',
            name: 'center',
            component: resolve => require(['./views/personal/Center.vue'], resolve),
            meta: {
                title: '个人中心'
            }
        },
        // 课程
        {
            path: '/course/list',
            name: 'courseList',
            component: resolve => require(['./views/course/CourseList'], resolve),
            meta: {
                title: '课程列表'
            }
        },
        {
            path: '/course/info',
            name: 'course',
            component: resolve => require(['./views/course/CourseInfo'], resolve),
            meta: {
                title: '课程信息'
            }
        },
        {
            path: '/mobile',
            name: 'mobileHome',
            component: resolve => require(['./views/mobile/Home.vue'], resolve),
        }
    ]
})