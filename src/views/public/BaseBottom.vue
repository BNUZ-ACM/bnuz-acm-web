<template>
  <center>
   <h3 class="bottom-text">{{ msg }}</h3>
  </center>
</template>

<script>
export default {
  name: 'BaseBottom',
  props: {
    msg: String
  }
}
</script>

<style lang="stylus" scoped>
  .bottom-text {
    // position: absolute; 
    margin-top: 30px;
    bottom: 0; 
    width: 100%; 
    height: 60px; /*脚部的高度*/ 
    clear:both; 
  }
</style>

