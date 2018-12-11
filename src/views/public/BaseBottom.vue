<template>
  <h3 class="bottom-text">{{ msg }}</h3>
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
    position: absolute; 
    bottom: 0; 
    width: 100%; 
    height: 60px;/*脚部的高度*/ 
    clear:both; 
  }
</style>

