<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/big-logo.png">
    <center>
      <div>
        <h1 class="word-size-h1">思考-灵感-气球</h1>
        <h1 class="word-size-h1">BNUZ ACM Team</h1>
        <h2 class="word-size-h2">荣耀与梦想</h2>
        <h2 class="word-size-h2">你我同创</h2>
        <br><br>
        <Button :size="'large'" type="warning" ghost>加入我们</Button>
      </div>
    </center>
  </div>
</template>

<script>
export default {

}
</script>


<style lang="stylus" scoped>
  .word-size-h1 {
    font-size: 4em;
  }
  .word-size-h2 {
    font-size: 3em;
  }
</style>
