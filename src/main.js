import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import globalComponentRegister from './views/components/global/globalComponentRegister';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css' //样式文件
import store from './store'

Vue.directive('highlight', function(el) {
    let blocks = el.querySelectorAll('pre code');
    setTimeout(() => {
        blocks.forEach((block) => {
            hljs.highlightBlock(block)
        })
    }, 200)
})
Vue.use(VueRouter);
Vue.use(iView);

globalComponentRegister()

new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App)
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = "北京师范大学珠海分校ACM协会官网";
    }
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        store.dispatch("isLogin").then(
            ret => {
                ret = true;
                if (ret) {
                    next();
                } else {
                    router.push("/");
                }
            }, err => {
                router.push("/");
            }
        )
    } else {
        next();
    }
})