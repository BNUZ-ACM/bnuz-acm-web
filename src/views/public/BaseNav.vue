<template>
  <div>
    <Menu mode="horizontal" :theme="'dark'" active-name="1">
      <div>
        <MenuItem name="0" to="/">
          <div class="small-logo">
            <img class="small-log" alt="ACM logo" src="../../assets/small-logo.png">
          </div>
        </MenuItem>
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-paper" />
                ACM简介
            </template>
            <MenuGroup title="ACM简述">
                <MenuItem name="1-1">ACM介绍</MenuItem>
                <MenuItem name="1-2">竞赛简介</MenuItem>
                <MenuItem name="1-3">编程要求</MenuItem>
            </MenuGroup>
            <MenuGroup title="校队">
                <MenuItem name="1-4" to="/crews/team">校队介绍</MenuItem>
                <MenuItem name="1-5">获奖情况</MenuItem>
                <MenuItem name="1-6">历届毕业</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="2" to="/contest/list">
            <Icon type="ios-people" />
            比赛中心
        </MenuItem>
        <MenuItem name="3">
            <Icon type="ios-construct" />
            协会课程
        </MenuItem>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            WeJudgeOJ
        </MenuItem>
        <MenuItem name="5" class="right-box"  >
          <div @click="showLoginDialog = true">
            登录
          </div>
        </MenuItem>
      </div>
    </Menu>
    <home-login-dialog :formVisible.sync="showLoginDialog"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoginDialog: false
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
  .small-logo {
    margin-top: 3%;
  }
  .right-box {
    border: 0;
    color: black;
    float: right !important;
    height: 61px;
    display: flex;
    outline: none;
    align-items: center;

    span {
      color: black;
    }
  }
</style>
