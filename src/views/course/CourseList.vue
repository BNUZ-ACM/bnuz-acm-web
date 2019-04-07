<template>
  <div>
    <base-nav style="margin-bottom: 30px;"></base-nav>
    <div style="width:80%; margin: 0 auto;">
      <Row type="flex">
        <Card style="width:100%; margin-top: 10px;" v-for="course in courseList" :key="course.courseId">
          <Col span="6"><img style="width: 80%; margin: 0 auto;" src="../../assets/contest-logo.png"></Col>
          <Col span="12">
            <div style="text-align: left;">
              <h2>{{course.courseName}}</h2>
              <Divider class="line-margin"/>
              <div>
                {{course.comment}}
              </div>
            </div>
          </Col>
          <Col span="6" style="padding-left: 20px;">
            <h3>课程基础信息</h3>
            <div style="margin-top:20px;">
              <p> <Icon :size="20" type="ios-time" />报名开始时间：{{course.signUpStartTime | filterDate}}</p>
              <p> <Icon :size="20" type="ios-time" />报名截止时间：{{course.signUpEndTime | filterDate}}</p>            
              <p> <Icon :size="20" type="ios-people" />已报名人数：{{course.signUpNum}}人</p>
              <br>
              <router-link :to="{path:'/course/info', query:{id:course.courseId}}">
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
  import CourseApi from '@/http/api/Course'
  import Request from '@/util/request_util'
  import util from '@/util/tool_util'
  export default {
    data() {
      return {
        courseList: []
      }
    },
    filters: {
      filterDate: util.timeFilter
    },
    methods: {
      async getCourseList() {
        Request.msg(CourseApi.getCourseList, [], (ret) => {
          console.log(ret)
          this.courseList = ret.data.list
        }, null, false)
      },
    },
    created() {
      this.getCourseList()
    }
  }
</script>
<style lang="stylus" scoped>
  .line-margin {
    margin: 12px 0;
  }
</style>
