<template>
    <div>
        <base-nav style="margin-bottom: 30px;"></base-nav>
        <Content :style="{padding: '0 200px'}" class="content-font">
            <center>
                 <Avatar 
                class="icon-large"
                :style="{background: color}" size="large">
                    <span class="icon-content">{{headerPinyin}}</span>
                </Avatar>
                <br><br>
                <p>{{userData.userName}}</p>
                <!-- <p>2016届ACM协会会长</p> -->
                <Tooltip content="我不要做咸鱼！点击旁边按钮刷新数据~">
                    <p>
                        {{this.filterDay(acmData == null ? null : acmData.lastAcceptTime)}}
                    </p>
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
                                <p v-if="acmData != null">职业类型：{{thisYear - 3 >= userData.grade ? 'ACM退役选手' : 'ACM肝命选手'}}</p>
                                <p v-if="acmData == null">职业类型：在校生</p>
                            </Col>
                            <Col span="11">
                                <p>学院&专业：{{userData.collage}} {{userData.major}}</p>
                                <p>部门：{{acmData == null ? '不是ACMer噢' : filterSection(acmData.section)}}</p>
                            </Col>
                        </Row>
                    </center>
                </Content>
            <div v-if="acmData != null">
                <Divider orientation="left" style="font-size:1.2em;">OJ信息</Divider>
                <Row>
                    <Col span="11">
                        <Card>
                            <p slot="title">HDU</p>
                            <div v-if="acmData.hduId == null">
                                暂时没有你的hdu信息噢
                            </div>
                            <div v-if="acmData.hduId != null">
                                <p>{{acmData.hduId}}</p>
                                <p>Accepted: {{acmData.hduSolve}}</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span="11" offset="2">
                        <Card>
                            <p slot="title">Codeforces</p>
                            <div v-if="acmData.codeforcesId == null">
                                暂时没有你的codeforces信息噢
                            </div>
                            <div v-if="acmData.codeforcesId != null">
                                <p>{{acmData.codeforcesId}}</p>
                                <p>Ranklist: {{acmData.score}}</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <br>
                <Row>
                    <Col span="11">
                        <Card>
                            <p slot="title">POJ</p>
                            <div v-if="acmData.pojId == null">
                                暂时没有你的vjudge信息噢
                            </div>
                            <div v-if="acmData.pojId != null">
                                <p>{{acmData.pojId}}</p>
                                <p>Accepted: {{acmData.pojSolve}}</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span="11" offset="2">
                        <Card>
                            <p slot="title">VJudge</p>
                            <div v-if="acmData.vjudgeId == null">
                                暂时没有你的vjudge信息噢
                            </div>
                            <div v-if="acmData.vjudgeId != null">
                                <p>{{acmData.vjudgeId}}</p>
                                <p>Accepted: {{acmData.vjudgeSolve}}</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>
    </div>
</template>

<script>
import ACMerApi from '@/http/api/ACMer'
import UserApi from '@/http/api/User'
import Request from '@/util/request_util'
import util from '@/util/tool_util'
import Pinyin from '@/util/pinyin_util'
export default {
    data() {
        return {
            color: "#00a2ae",
            acmData: null,
            userData: {},
            thisYear: 2019,
            headerPinyin: "N",
            section: ['无业游民', '组织部', '技术部', '宣传部', '竞赛部']
        }
    },
    filters: {
        
    },
    methods: {
        filterSection(type) {
            if (type > 4 || type == null || !Number.isInteger(type)) {
                type = 0
            }
            return this.section[type]
        },
        filterDay(time) {
            if (this.acmData == null || typeof(time) == "undefined" || time == null) {
                return "小伙子,很遗憾你不是ACM队员,这里没有你的信息噢";
            }
            let nowTime = new Date();
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
        getAcmInfo() {
            Request.msg(ACMerApi.getMyACMerInfo, [], (ret) => {
                this.acmData = ret.data
            }, null, false)
        },
        getUserInfo() {
            Request.msg(UserApi.getInfo, [], (ret) => {
                this.userData = ret.data
                let pinyin = Pinyin.chineseToPinYin(this.userData.userName)
                if (pinyin.length > 0) {
                    this.headerPinyin = pinyin.charAt(0)
                }
            }, null, false)
        },
        initData() {
            let nowTime = new Date();
            this.thisYear = nowTime.getFullYear()
        }
    },
    created() {
        this.getAcmInfo()
        this.getUserInfo()
        this.initData()
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
