<template>
     <div>
        <base-nav style="margin-bottom: 30px;"></base-nav>
        <Content :style="{padding: '0 200px'}">
            <Breadcrumb>
                <BreadcrumbItem to="/contest/list"><Icon type="ios-home-outline" /> 赛事列表</BreadcrumbItem>
                <BreadcrumbItem><Icon type="ios-jet-outline" /> {{contestData.contestName}}</BreadcrumbItem>
            </Breadcrumb>
            <br>
            <h1 style="font-size: 2.5em;">
                {{contestData.contestName}} {{contestData.style | filterContestType}}
            </h1>
            <h2>
                报名截止时间：{{this.contestData.signUpEndTime | filterDate}}
            </h2>
            <Divider/>
            <Row>
                <Col span="8" style="color: #4169e1; padding: 0 10px;">
                    <h1>
                        查看晋级名单
                    </h1>
                    该赛事只有晋级同学可以报名噢，想知道自己或者自己的小伙伴是否晋级，请点击下面链接查看噢<br>
                    <router-link :to="{path:'/contest/promotionList', query:{id:contestData.contestId}}">
                        <Button type="primary" style="margin-top: 20px;">
                            查看名单
                        </button>
                    </router-link>
                </Col>
                <Col span="8" style="color: #b8860b; padding: 0 10px;">
                    <h1>
                        比赛规则及申明
                    </h1>
                    了解比赛制度和比赛规则，最终解释权归北京师范大学珠海分校 ICPC协会所有。<br>
                    <router-link :to="{path:'/contest/detail', query:{id:contestData.contestId}}">
                        <Button type="warning" style="margin-top: 20px;">
                            查看比赛规则
                        </button>
                    </router-link>
                </Col>
                <Col span="8" v-if="checkContestTimeOut(this.contestData.signUpEndTime)" style="color: #ed4014; padding: 0 10px;">
                    <h1>
                        报名截止
                    </h1>
                    比赛报名已经截止，各位不用灰心，请留意下次比赛时间。
                    如真有特殊需要请联系比赛主办方。<br>
                    <Button type="error" style="margin-top: 20px;" disabled>
                        报名截止
                    </button>
                </Col>
                <div v-if="!checkContestTimeOut(this.contestData.signUpEndTime)">
                    <Col span="8" v-if="!hasLogin" style="color: #ed4014; padding: 0 10px;">
                        <h1>
                            请您登录
                        </h1>
                        只有您登录了您的账号，您才可以报名参与本次比赛，点击登录图标快速登录。<br>
                        <Button type="error" style="margin-top: 20px;" @click="showLoginDialog = true">
                            登录账号
                        </button>
                    </Col>
                    <div v-if="hasLogin">
                        <Col span="8" v-if="this.myCompId == ''" style="color: #ed4014; padding: 0 10px;">
                            <h1>
                                快速报名
                            </h1>
                            还想参加比赛？只要你满足规则和在报名截止前，都能报名，点击下面按钮快速报名<br>
                            <Button type="error" style="margin-top: 20px;" @click="showSignUpDialogFunc()">
                                    快速报名
                            </Button>
                        </Col>
                        <Col span="8" v-if="this.myCompId != ''" style="color: #ed4014; padding: 0 10px;">
                            <h1>
                                更改信息
                            </h1>
                            贪心的你还想改名字？没问题，快改一个能称霸全榜的名字<br>
                            <Button type="error" style="margin-top: 20px;"  @click="showUpdateDialogFunc()">
                                更改信息
                            </Button>
                        </Col>
                    </div>
                </div>
            </Row>
            <Divider />
            <h1>已报名名单</h1><br>
            <Table border :columns="personalCol" :data="personalList" no-data-text="暂时没有小老哥报名噢"></Table>
        </Content>
        <home-login-dialog 
        :isUpdate.sync="isUpdate"        
        :formVisible.sync="showLoginDialog"/> 
        <contest-personal-dialog
        :contestId="contestId"
        :isUpdate.sync="isUpdate"   
        :formVisible.sync="showSignUpDialog"
        :personalData="personalUpdateData"
        />
    </div>
</template>

<script>
    import ContestApi from '@/http/api/Contest'
    import CompetitorApi from '@/http/api/Competitor'
    import Request from '@/util/request_util'
    import util from '@/util/tool_util'
    import { Message } from 'iview'
    export default {
        data () {
            return {
                isSuccess: false,
                contestId: "",
                contestData: {},
                myCompId: "",
                isUpdate: 0,
                hasLogin: false,
                showLoginDialog: false,
                showSignUpDialog: false,
                personalCol: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '学号',
                        key: 'userId',
                        sortable: true,                        
                    },
                    {
                        title: '名字',
                        key: 'username',
                    },
                    {
                        title: '昵称',
                        key: 'nickName', 
                    },
                    {
                        title: '备注',
                        key: 'comment',
                    }
                ],
                personalList: [],
                personalUpdateData: {},
                personalUpdateDataList: {
                    create: {
                        title: "报名比赛",
                        confirmButtonContent: "报名比赛",
                        confirmButton: this.signUpPersonal,
                        type: 0,
                    },
                    update: {
                        title: "更新信息",
                        confirmButtonContent: "更新信息",
                        confirmButton: this.updatePersonal,
                        type: 1,
                    }
                }
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
                    this.myCompId = ret.data.compId
                }, null, false)
            },
            checkContestTimeOut(contestTime) {
                let nowDate = new Date()
                let nowTime = nowDate.getTime()
                return nowTime > contestTime
            },
            getListPersonal() {
                let id = this.$route.query.id
                Request.msg(CompetitorApi.getListPersonal, [id], (ret) => {
                    this.personalList = ret.data.list
                }, null, false)
            },
            getUserLoginStatus() {
                setTimeout(() => {
                    this.hasLogin = this.$store.getters.loginStatus
                }, 200);
            },
            signUpPersonal(competitor) {
                let check = util.checkName(competitor.nickName, 0)                
                this.isSuccess = true
                if (check != '') {
                    Message.error(check)
                    this.isSuccess = false
                } else {
                    Request.msg(CompetitorApi.signUpPersonal, [competitor], null, (ret) => {
                        this.isSuccess = false
                    })
                }
                return this.isSuccess
            },
            updatePersonal(competitor) {
                let check = util.checkName(competitor.nickName, 0)
                this.isSuccess = true
                if (check != '') {
                    Message.error(check)
                    this.isSuccess = false                    
                } else {
                    Request.msg(CompetitorApi.updatePersonal, [competitor], null, (ret) => {
                        this.isSuccess = false
                    })
                }
                return this.isSuccess
            },
            showUpdateDialogFunc() {
                this.personalUpdateData = this.personalUpdateDataList.update
                this.showSignUpDialog = true
            },
            showSignUpDialogFunc() {
                this.personalUpdateData = this.personalUpdateDataList.create
                this.showSignUpDialog = true
            }
        },
        created() {
            this.getContestData()
            this.getListPersonal()
            this.getUserLoginStatus()
            this.contestId = this.$route.query.id
        },
        mounted() {
            this.getUserLoginStatus()
        },
        watch: {
            isUpdate(nVal, oVal) {
                setTimeout(() => {
                    this.getContestData()
                    this.getUserLoginStatus()
                    this.getListPersonal()
                }, 200);
                
            },
            showLoginDialog(nVal, oVal) {
                if (!nVal) {
                    this.getUserLoginStatus()
                }
            }
        }
    }
</script>