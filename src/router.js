import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import ContestList from './views/contest/ContestList'
import ContestInfo from './views/contest/ContetInfo'
import SchoolTeam from './views/crews/SchoolTeam'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
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
    {
      path: '/crews/team',
      name: 'schoolTeam',
      component: SchoolTeam
    }
  ]
})
