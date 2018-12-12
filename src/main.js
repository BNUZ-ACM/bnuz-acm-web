import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import globalComponentRegister from './components/global/globalComponentRegister';

Vue.use(VueRouter);
Vue.use(iView);

globalComponentRegister()

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});