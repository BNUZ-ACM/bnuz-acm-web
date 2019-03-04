import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import globalComponentRegister from './components/global/globalComponentRegister';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css' //样式文件

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
    render: h => h(App)
});