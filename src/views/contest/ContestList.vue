<template>
  <div style="width:80%; margin: 0 auto;">
    <Row type="flex">
      <Card style="width:100%; margin-top: 10px;" v-for="contest in contestList" :key="contest.contestId">
        <Col span="6"><img style="width: 80%; margin: 0 auto;" src="../../assets/contest-logo.png"></Col>
        <Col span="12">
          <div style="text-align: left;">
            <h2>{{contest.contestName}}</h2>
            <Divider class="line-margin"/>
            <div>
              {{contest.comment}}
            </div>
          </div>
        </Col>
        <Col span="6" style="padding-left: 20px;">
          <h3>比赛基础信息</h3>
          <div style="margin-top:20px;">
            <p> <Icon :size="20" type="ios-time" />开始时间：{{contest.contestStartTime | filterDate}}</p>
            <p> <Icon :size="20" type="ios-people" />已报名人数：{{contest.signUpNum}}人</p>
            <p> <Icon :size="20" type="md-timer" />持续时间：5个小时</p>
            <br>
            <router-link :to="{path:'/contest/info', query:{id:contest.contestId}}">
            <Button type="success" style="margin-bottom:20px;">查看详情</Button>
            </router-link>
          </div>
        </Col>
      </Card>
        
    </Row>
  </div>
</template>
<script>
  import ContestApi from '@/http/api/Contest'
  import Request from '@/util/request_util'
  import util from '@/util/tool_util'
  export default {
    data() {
      return {
        contestList: []
      }
    },
    filters: {
      filterDate: util.timeFilter
    },
    methods: {
      async getContestList() {
        Request.msg(ContestApi.getContestList, [], (ret) => {
          console.log(ret)
          this.contestList = ret.data.list
        })
      },
      formatTimeToStr(times, pattern) {
          
      }
    },
    created() {
      this.getContestList()
    }
  }
</script>
<style lang="stylus" scoped>
  .line-margin {
    margin: 12px 0;
  }
</style>
