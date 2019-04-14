<template>
    <div>
        <div id="app">
            <router-view/>
            <base-bottom msg="Copyright ©2019 北京师范大学珠海分校-ACM协会 "/>
        </div>
    </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background: url('./assets/background.png') ;
  background-repeat: repeat;
  /* height: 100%; */
}
html,body{
    height:100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>

<script>
import '@/style/base.css'
import BaseNav from './views/public/BaseNav.vue';
import BaseBottom from './views/public/BaseBottom.vue';

export default {
    components: {
        BaseBottom
    },
    methods: {
        _isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        }
    },
    created() {
        this.$Notice.config({
            top: 60,
            duration: 3
        });
        this.$Notice.warning({
            title: '竞赛通知',
            desc: '本次晋级名单中未显示网赛排名满足晋级资格，但因查重或往届违反竞赛规则而被取消晋级资格的同学，如有疑问，请私下联系ACM协会负责学生陈仰焦同学或软件系主任吴小勇老师',
            duration: 0
        });
    },
    mounted() {
        if (this._isMobile()) {
            this.$router.replace('/mobile/');
        }
    }
}
</script>
