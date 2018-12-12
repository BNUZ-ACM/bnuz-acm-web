import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import CompanyList from './views/company/CompanyList'

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
      path: '/company/list',
      name: 'companyList',
      component: CompanyList
    }
  ]
})
