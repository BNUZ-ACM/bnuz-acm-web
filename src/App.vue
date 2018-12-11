<template>
    <div id="app">
        <div>
            <base-nav></base-nav>
        </div>
        <div id="nav">
        </div>
        <router-view/>
        <base-bottom msg="Copyright ©2018 北京师范大学珠海分校-ACM协会 "/>
    </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url('assets/background.png');
  height: 100%;
}
html,body{
    height:100%;
    width: 100%;
    margin: 0;
    padding: 0;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import BaseNav from './views/public/BaseNav.vue';
import BaseBottom from './views/public/BaseBottom.vue';

export default {
    components: {
        BaseNav,
        BaseBottom
    }    
}
</script>
