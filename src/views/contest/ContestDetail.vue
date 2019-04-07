<template>
     <div>
        <base-nav style="margin-bottom: 30px;"></base-nav>

        <Content :style="{padding: '0 200px'}">
            <Breadcrumb>
                <BreadcrumbItem to="/contest/list"><Icon type="ios-home-outline" /> 赛事列表</BreadcrumbItem>
                <BreadcrumbItem v-if="contestData.style === 1" :to="{path:'/contest/info', query:{id:contestData.contestId}}"><Icon type="ios-jet-outline" /> {{contestData.contestName}}</BreadcrumbItem>
                <BreadcrumbItem v-if="contestData.style === 0" :to="{path:'/contest/personal', query:{id:contestData.contestId}}"><Icon type="ios-jet-outline" /> {{contestData.contestName}}</BreadcrumbItem>                
                <BreadcrumbItem><Icon type="ios-paper-plane" /> 比赛详情</BreadcrumbItem>
            </Breadcrumb>
            <br>
            <h1 style="font-size: 2.5em;">
                {{contestData.contestName}} {{contestData.style | filterContestType}}
            </h1>
            <h2>
                比赛时间时间：{{contestData.contestStartTime | filterDate}} 至 {{contestData.contestEndTime | filterDate}}
            </h2>
            <Divider/>
            
            <h1>比赛要求</h1>
            <Card style="width:100%; margin-top: 10px;">
                <Row v-html="contestData.contestBaseInfo || defaultContent">
                </Row>
            </Card>
            <br>
            <h1>比赛基本信息</h1>
            <Card style="width:100%; margin-top: 10px;">
                <Row v-html="contestData.contestBaseInfo || defaultContent">
                </Row>
            </Card>  
            <br>
            <h1>奖品</h1>
            <Card style="width:100%; margin-top: 10px;">
                <Row v-html="contestData.prize || defaultContent">
                </Row>
            </Card> 
            <br>
            <h1>现场纪律</h1>
            <Card style="width:100%; margin-top: 10px;">
                <Row v-html="contestData.contestDiscipline || defaultContent">
                </Row>
            </Card>
            <br>
            <h1>联系我们</h1>
            <Card style="width:100%; margin-top: 10px;">
                <Row v-html="contestData.contestContactInfo || defaultContent">
                </Row>
            </Card> 
        </Content>         
         
    </div>
</template>

<script>
    import ContestApi from '@/http/api/Contest'
    import Request from '@/util/request_util'
    import util from '@/util/tool_util'
    export default {
        data () {
            return {
                contestData: {},
                defaultContent: "主办方贼懒没有补充信息噢"
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
            getContestData() {
                let id = this.$route.query.id
                Request.msg(ContestApi.getContestDetail, [id], (ret) => {
                    this.contestData = ret.data.contest
                }, null, false)
            }
        },
        created() {
            this.getContestData()
        },
    }
</script>