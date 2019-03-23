<template>
    <div>
        <Content :style="{padding: '0 200px'}" class="content-font">
            <center>
                 <Avatar 
                class="icon-large"
                :style="{background: color}" size="large">
                    <span class="icon-content">Y</span>
                </Avatar>
                <br><br>
                <p>叶启权</p>
                <p>2016届ACM协会会长</p>
                <Tooltip content="我不要做咸鱼！点击旁边按钮刷新数据~">
                    <p v-html="this.filterDay(acmData.lastAcceptTime)">{{filterDay(acmData.lastAcceptTime)}}</p>
                </Tooltip>
                <Tooltip content="点我更新数据">
                    <Icon type="ios-sync" size="20" style="cursor:pointer"/>
                </Tooltip>
            </center>
            <Divider orientation="left" style="font-size:1.2em;">个人信息</Divider>
            <Content :style="{padding: '0 200px'}">
                <center>
                    <Row>
                        <Col span="11">
                            <p>年级：{{userData.grade}}级</p>
                            <p>职业类型：ACM退役选手</p>                            
                        </Col>
                        <Col span="11">
                            <p>学院&专业：{{userData.collage}} {{userData.major}}</p>
                            <p>部门：竞赛部</p>
                        </Col>
                    </Row>
                </center>
            </Content>
            <Divider orientation="left" style="font-size:1.2em;">OJ信息</Divider>
            
             <Row>
                <Col span="11">
                    <Card>
                        <p slot="title">HDU</p>
                        <p>{{acmData.hduId}}</p>
                        <p>Accepted: {{acmData.hduSolve}}</p>
                        <p>Rank: 706</p>
                    </Card>
                </Col>
                <Col span="11" offset="2">
                    <Card>
                        <p slot="title">Codeforces</p>
                        <p>{{acmData.codeforcesId}}</p>
                        <p>Accepted: 365</p>
                        <p>Ranklist: {{acmData.score}}</p>
                    </Card>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="11">
                    <Card>
                        <p slot="title">POJ</p>
                        <p>QuanQ</p>
                        <p>Accepted: 50</p>
                    </Card>
                </Col>
                <Col span="11" offset="2">
                    <Card>
                        <p slot="title">VJudge</p>
                        <p>{{acmData.vjudgeId}}</p>
                        <p>Accepted: 189</p>
                    </Card>
                </Col>
            </Row>
        </Content>
    </div>
</template>

<script>
import ACMerApi from '@/http/api/ACMer'
import UserApi from '@/http/api/User'
import Request from '@/util/request_util'
import util from '@/util/tool_util'
export default {
    data() {
        return {
            color: "#00a2ae",
            acmData: {},
            userData: {},
        }
    },
    filters: {
        
    },
    methods: {
        filterDay(time) {
            var nowTime = Date.parse(new Date());
            let acTime = parseInt(time)
            if (acTime == -1) {
                return "哇, 你连题都没刷过来玩什么ACM";
            }
            let lastAcTime = Math.floor((nowTime - acTime) / 1000 / 3600 / 24)
            if (lastAcTime == 0) {
                return "昨天有刷题,很棒噢, 继续努力！"
            } else {
                return "小懒虫你已经" + lastAcTime + "天没有ac了，快要成咸鱼了噢！"
            }
        },
        async getAcmInfo() {
            Request.msg(ACMerApi.getMyACMerInfo, [], (ret) => {
                this.acmData = ret.data
                console.log(this.acmData)
            }, null, false)
        },
        getUserInfo() {
            Request.msg(UserApi.getInfo, [], (ret) => {
                this.userData = ret.data
                console.log(this.userData)
            })
        }
    },
    created() {
        this.getAcmInfo()
        this.getUserInfo()
    }
}
</script>

<style lang="stylus">
    .icon-large {
        width: 100px !important;
        height: 100px !important;
        border-radius: 20px;
    }
    .icon-content {
        line-height: 100px !important; 
        left: calc(50% - 10px) !important;
        font-size: 3em;
    }
    .content-font {
        font-size: 1.2em;
    }
</style>
