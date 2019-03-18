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
                <MenuItem name="1-1" to='/acm/detail'>ACM介绍</MenuItem>
                <MenuItem name="1-2" to='/acm/role'>竞赛规则</MenuItem>
                <MenuItem name="1-3" to='/acm/claim'>编程要求</MenuItem>
            </MenuGroup>
            <MenuGroup title="校队">
                <MenuItem name="1-4" to="/acm/crews/team">校队介绍</MenuItem>
                <MenuItem name="1-5" to="/acm/crews/honor">获奖情况</MenuItem>
                <MenuItem name="1-6" to="/acm/crews/dalao">历届毕业</MenuItem>
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

        <MenuItem name="5" class="right-box" v-if="!isLogin">
          <div @click="showLoginDialog = true">
            登录
          </div>
        </MenuItem>
        <Submenu name="5" class="right-box" v-if="isLogin">
          <template slot="title">
            {{username}}
          </template>
          <MenuGroup title="用户">
              <MenuItem name="6" to="/personal/center">个人中心</MenuItem>
              <MenuItem name="3-2">
                <div  @click="logout">
                  退出登录
                </div>
              </MenuItem>              
          </MenuGroup>
        </Submenu>
      </div>
    </Menu>
    <home-login-dialog :formVisible.sync="showLoginDialog"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoginDialog: false,
      username: "",
      activeIndex: "1",
      showLoginDialog: false,
      formType: false
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    }
  },
  computed: {
    isLogin: {
      get: function() {
        this.$store.dispatch("isLogin");
        console.log(this.$store.getters)
        this.username = this.$store.getters.username;
        return this.$store.getters.loginStatus;
      }
    }
  },
  mounted() {
    this.username = this.$store.getters.username;
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
