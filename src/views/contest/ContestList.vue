<template>
  <div>
    <base-nav style="margin-bottom: 30px;"></base-nav>
    <div style="width:80%; margin: 0 auto;">
      <Row type="flex">
        <Card style="width:100%; margin-top: 10px;" v-for="contest in contestList" :key="contest.contestId">
          <Col span="6"><img style="width: 80%; margin: 0 auto;" src="../../assets/contest-logo.png"></Col>
          <Col span="12">
            <div style="text-align: left;">
              <h2>{{contest.contestName}} {{contest.style | filterContestType}}</h2>
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
              <p> <Icon :size="20" type="md-timer" />持续时间：{{getCorrectCompetitionTime(contest.contestStartTime, contest.contestEndTime)}}</p>
              <br>
              <router-link v-if="contest.style === 1" :to="{path:'/contest/info', query:{id:contest.contestId}}">
                <Button type="success" style="margin-bottom:20px;">查看详情</Button>
              </router-link>
              <router-link v-if="contest.style === 0" :to="{path:'/contest/personal', query:{id:contest.contestId}}">
                <Button type="success" style="margin-bottom:20px;">查看详情</Button>
              </router-link>
            </div>
          </Col>
        </Card>
          
      </Row>
    </div>

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
      filterDate: util.timeFilter,
      filterContestType: function(type) {
          if (type == 0) {
              return " (个人赛)"
          } else {
              return " (组队赛)"
          }
      }
    },
    methods: {
      async getContestList() {
        Request.msg(ContestApi.getContestList, [], (ret) => {
          this.contestList = ret.data.list
        }, null, false)
      },
      getCorrectCompetitionTime(contestStartTime, contestEndTime) {
        if (contestStartTime == null || contestEndTime == null) {
          return "0个小时"
        }
        let competitionTime = contestEndTime - contestStartTime
        if (competitionTime <= 0) {
          return "0个小时"
        }
        competitionTime = parseInt(competitionTime / 1000)
        let sustained = parseInt(Math.floor(competitionTime / 60 / 60))
        let sustainedMod = competitionTime % 3600
        let timeStr = ""
        if (sustainedMod != 0) {
          timeStr = "约"
        }
        if (sustained >= 24) {
          return timeStr + Math.floor(sustained / 24) + '天' 
        } else {
          return timeStr + sustained + '个小时'
        }
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
