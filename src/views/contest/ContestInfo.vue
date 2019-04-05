<template>
     <div>
        <Content :style="{padding: '0 200px'}">
            <h1 style="font-size: 2.5em;">
                {{contestData.contestName}} {{contestData.style | filterContestType}}
            </h1>
            <h2>
                报名截止时间：{{this.contestData.signUpEndTime | filterDate}}
            </h2>
            <Divider />
            <Row>
                <Col span="8" style="color: #4169e1; padding: 0 10px;">
                    <h1>
                        已报名人员
                    </h1>
                    如果还未报名请前往报名页面进行报名，若已经报名可以直接查看页面下方信息。<br>
                    <Button type="primary" style="margin-top: 20px;">
                        查看名单
                    </button>
                </Col>
                <Col span="8" style="color: #b8860b; padding: 0 10px;">
                    <h1>
                        比赛规则及申明
                    </h1>
                    了解比赛制度和比赛规则，最终解释权归北京师范大学珠海分校 ICPC协会所有。<br>
                    <Button type="warning" style="margin-top: 20px;">
                        查看比赛规则
                    </button>
                </Col>
                <div v-if="!hasLogin">
                    <Col span="8" style="color: #ed4014; padding: 0 10px;">
                        <h1>
                            请您登录
                        </h1>
                        只有您登录了您的账号，您才可以报名参与本次比赛，点击登录图标快速登录。<br>
                        <Button type="error" style="margin-top: 20px;" @click="showLoginDialog = true">
                            登录账号
                        </button>
                    </Col>
                </div>
                <div v-if="hasLogin">
                    <Col span="8" v-if="this.myTeamId == '' && checkContestTimeOut(this.contestData.signUpEndTime)" style="color: #ed4014; padding: 0 10px;">
                        <h1>
                            报名截止
                        </h1>
                        比赛报名已经截止，各位不用灰心，请留意下次比赛时间。
                        如真有特殊需要请联系比赛主办方。<br>
                        <Button type="error" style="margin-top: 20px;" disabled>
                            报名截止
                        </button>
                    </Col>
                    <Col span="8" v-if="this.myTeamId == '' && !checkContestTimeOut(this.contestData.signUpEndTime)" style="color: #ed4014; padding: 0 10px;">
                        <h1>
                            创建队伍
                        </h1>
                    下面辣么多队伍没有找到心意的队伍？不如自己来创建一支无人可敌的队伍吧<br>
                        <Button type="error" style="margin-top: 20px;" @click="showCreateTeamDialog = true">
                                创建队伍
                        </Button>
                    </Col>
                    <Col span="8" v-if="this.myTeamId != ''" style="color: #ed4014; padding: 0 10px;">
                        <h1>
                            查看队伍信息
                        </h1>
                        想知道你队伍的组建情况？快点进来看看<br>
                        <Button type="error" style="margin-top: 20px;" @click="showTeam(myTeamId)">
                            查看队伍信息
                        </Button>
                    </Col>
                </div>
            </Row>
            <Divider />
            <h1>已报名名单</h1><br>
            <Table border :columns="teamCol" :data="teamData" height="500"></Table>
        </Content>
        <contest-drawer 
        :teamId="teamId"
        :drawerShow.sync="joinTeam"
        :isUpdate.sync="isUpdate"
        />
        <contest-team-dialog 
        :formVisible.sync="showCreateTeamDialog" 
        :title="contestData.contestName"
        :isUpdate.sync="isUpdate"
        :contestId="contestData.contestId"
        />
        <home-login-dialog :formVisible.sync="showLoginDialog"/>                
    </div>
</template>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>


<script>
    import ContestApi from '@/http/api/Contest'
    import TeamApi from '@/http/api/Team'
    import Request from '@/util/request_util'
    import util from '@/util/tool_util'
    export default {
        data () {
            return {
                showCreateTeamDialog: false,
                teamId: "",
                joinTeam: false,
                contestData: {},
                myTeamId: "",
                isUpdate: false,
                hasLogin: false,
                showLoginDialog: false,
                teamCol: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '队伍名',
                        key: 'teamName',
                    },
                    {
                        title: '队长名',
                        key: 'leaderName',
                        sortable: true,
                    },
                    {
                        title: '队伍人数',
                        key: 'memberNum',                   
                        filters: [
                            {
                                label: '已满人',
                                value: 1
                            },
                            {
                                label: '待加入',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.count == 3;
                            } else if (value === 2) {
                                return row.count != 3;
                            }
                        }
                    },
                    {
                        title: '备注',
                        key: 'comment',                   
                    },
                    {
                        title: '操作',
                        key: 'option',
                        fixed: 'right',
                        filters: [
                            {
                                label: '不需要密码',
                                value: 1
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.need_password != 1;
                            }
                        },
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.showTeam(params.row.teamId)
                                        }
                                    }
                                }, '加入队伍')
                            ]);
                        }
                    }
                ],
                teamData: []
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
            showTeam(teamId) {
                this.teamId = teamId;
                this.isUpdate = true;
                this.changeJoinTeam(true);
            },
            changeJoinTeam(value) {
                this.joinTeam = value;
            }, 
            getContestData() {
                let id = this.$route.query.id
                Request.msg(ContestApi.getContestDetail, [id], (ret) => {
                    this.contestData = ret.data.contest
                    this.myTeamId = ret.data.teamId
                })
            },
            checkContestTimeOut(contestTime) {
                let nowDate = new Date()
                let nowTime = nowDate.getTime()
                return nowTime > contestTime
            },
            getTeamData() {
                let id = this.$route.query.id
                Request.msg(TeamApi.getTeamList, [id], (ret) => {
                    this.teamData = ret.data.list
                }, null, false)
            },
            getUserLoginStatus() {
                setTimeout(() => {
                    this.hasLogin = this.$store.getters.loginStatus                    
                }, 200);
            }
        },
        created() {
            this.getContestData()
            this.getTeamData()
            this.getUserLoginStatus()
        },
        mounted() {
            this.getUserLoginStatus()
        },
        watch: {
            isUpdate(nVal, oVal) {
                if (nVal == false) {
                    this.getContestData()                    
                    this.getTeamData()
                    this.getUserLoginStatus()    
                    this.isUpdate = true                
                }
            },
            showLoginDialog(nVal, oVal) {
                if (!nVal) {
                    this.getUserLoginStatus()
                }
            }
        },
        updated() {
            this.getUserLoginStatus()
        }
    }
</script>