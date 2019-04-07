import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import ContestList from './views/contest/ContestList'
import ContestPromotionList from './views/contest/ContestPromotionList'
import ContestInfo from './views/contest/ContestInfo'
import ContestDetail from './views/contest/ContestDetail.vue'
import SchoolTeam from './views/crews/SchoolTeam'
import ACMDetail from './views/acm/Detail.vue'
import ACMRole from './views/acm/Role.vue'
import ACMClaim from './views/acm/Claim.vue'
import ACMHonor from './views/acm/Honor.vue'
import ACMDalao from './views/acm/Dalao.vue'
import PersonalCenter from './views/personal/Center.vue'
import CourseList from './views/course/CourseList'
import CourseInfo from './views/course/CourseInfo'
import MobileHome from './views/mobile/Home.vue'

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
            component: ContestList,
            meta: {
                title: '比赛列表'
            }

        },
        {
            path: '/contest/info',
            name: 'contestInfo',
            component: ContestInfo,
            meta: {
                title: '比赛详情'
            }
        },
        {
            path: '/contest/detail',
            name: 'contestDetail',
            component: ContestDetail,
            meta: {
                title: '比赛详情'
            }
        },
        {
            path: '/contest/promotionList',
            name: 'promotionList',
            component: ContestPromotionList,
            meta: {
                title: '晋级名单'
            }
        },
        // acm简介
        {
            path: '/acm/detail',
            name: 'detail',
            component: ACMDetail,
            meta: {
                title: 'ACM简介'
            }
        },
        {
            path: '/acm/role',
            name: 'role',
            component: ACMRole,
            meta: {
                title: 'ACM规则'
            }
        },
        {
            path: '/acm/claim',
            name: 'claim',
            component: ACMClaim,
            meta: {
                title: '编程要求'
            }
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
            meta: {
                title: '获奖情况'
            }
        },
        {
            path: '/acm/crews/dalao',
            name: 'dalao',
            component: ACMDalao,
            meta: {
                title: '历届毕业'
            }
        },
        // 个人中心
        {
            path: '/personal/center',
            name: 'center',
            component: PersonalCenter,
            meta: {
                title: '个人中心'
            }
        },
        // 课程
        {
            path: '/course/list',
            name: 'courseList',
            component: CourseList,
            meta: {
                title: '课程列表'
            }
        },
        {
            path: '/course/info',
            name: 'course',
            component: CourseInfo,
            meta: {
                title: '课程信息'
            }
        },
        {
            path: '/mobile',
            name: 'mobileHome',
            component: MobileHome,
        }
    ]
})