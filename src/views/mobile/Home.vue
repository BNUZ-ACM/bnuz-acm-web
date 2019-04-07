<template>
  <div>
    <h1>抱歉，本网站制作组很懒</h1>
    <h1>暂时不支持手机端</h1>
    <center>
        <img v-bind:src="getMobile500Photo()" width="100%;"/>
    </center>
  </div>
</template>

<script>
export default {
    methods: {
        getRandomInt(max) {
            let range = max;
            let rand = Math.random();
            console.log((Math.round(rand * range)))
            return Math.round(rand * range);
        },
        getMobile500Photo() {
            return require('../../assets/mobile/mobile-500-' + this.getRandomInt(2) + '.jpg')
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>
