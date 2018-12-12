import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import ContestList from './views/contest/ContestList'

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
    }
  ]
})
