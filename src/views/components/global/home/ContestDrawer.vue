<template>
    <Drawer :title="drawerTitle" :closable="false" 
    v-model="drawerShowControl" 
    v-if="teamData != null"
    class="drawer-content"
    width="350"
    >
        <h1 class="drawer-content-lg">{{teamData.teamName}}</h1>
        <p class="drawer-content">当前人数：{{teamData.memberNum}}人{{teamData.memberNum == 3 ? '（已满人）' : ''}}</p>        
        <br>
        <Divider orientation="left" class="drawer-content-md">队长</Divider>
        <div v-for="(competitor, index) in competitorList" :key="competitor.compId" class="drawer-content" style="vertical-align: middle; margin-top:10px;">
            <span v-if="index == 0">{{competitor.nickName}} ({{competitor.userId}}) </span>
        </div>
        <Divider orientation="left" class="drawer-content-md">队员们</Divider>
        <div v-if="Object.keys(competitorList).length <= 1">
            {{relation == 1 ? '没有队友的你好惨啊，赶紧去召集小伙伴一起打比赛吧~' : '这个队贼惨，要不考虑加入助他一力 [手动doge]'}}
        </div>
        <div v-for="(competitor, index) in competitorList" :key="competitor.compId + '1'" class="drawer-content" style="vertical-align: middle; margin-top:10px; padding: 0 auto; display: table-cell">
            <span v-if="index != 0">{{competitor.nickName}} ({{competitor.userId}}) </span> 
            <Button v-if="index != 0 && relation == 1" type="info" size="small" @click="confirm(confirmMap.changeCaptain, [competitor.compId])">移交队长</Button>
            &nbsp<Button v-if="index != 0 && relation == 1" type="warning" size="small" @click="confirm(confirmMap.removeTeamMember, [competitor.compId])">移除队员</Button>
        
        </div>
        <br>
        <p v-if="teamData.comment != null && teamData.comment != ''">队伍备注：{{teamData.comment}}</p>
        <div v-if="relation == 0">
            <Divider orientation="left" class="drawer-content-md">加入队伍</Divider>
            <div v-if="teamData.hasPsw != 0">
                <Input search enter-button="加入" 
                type="password"
                v-model="password"
                @on-search="joinTeam(password)"
                @keyup.enter.native="joinTeam(password)"
                placeholder="请输入该队伍密码"/>
                <br>
                <span class="drawer-content"><b>注意：该队伍需要密码才可进入</b></span>            
            </div>
            <div v-if="teamData.hasPsw == 0">
                <Input search enter-button="加入" placeholder="嘻嘻我们队不需要密码噢" @on-search="joinTeam('')"/>
            </div>
        </div>
       
        <div v-if="relation == 1">
            <Divider orientation="left" class="drawer-content-md">设置队伍信息</Divider>
            <Input
                v-model="updateTeamData.teamName">
                <span slot="prepend">队伍名称</span>
            </Input>
            <br>
            <i-switch  v-model="hasPassword">
                <Icon type="md-checkmark" slot="open"></Icon>
                <Icon type="md-close" slot="close"></Icon>
            </i-switch>
            &nbsp&nbsp&nbsp
            <Input 
            :disabled="!hasPassword" 
            placeholder="请输入密码" 
            type="password"
            clearable style="width: 255px" 
            v-model="updateTeamData.password"/>
            <br>
            <br>
            <Input
                v-model="updateTeamData.comment">
                <span slot="prepend">队伍备注</span>
            </Input>
            <br><br>
            <center>
                <Button type="info" @click="updateTeam()">更改队伍信息</Button>
                <Button style="margin-left: 20px" type="error" @click="confirm(confirmMap.deleteTeam)">删除队伍</Button>
            </center>
        </div>
        <div v-if="relation == 2">
            <Divider orientation="left" class="drawer-content-md">队伍操作</Divider>
            <center>
            <Button type="error" @click="confirm(confirmMap.cancelTeam)" long>退出队伍</Button>
            </center>
            <br>
        </div>
        <home-login-dialog :formVisible.sync="showLoginDialog"/>        
    </Drawer>
</template>
<style lang="stylus">
    .drawer-content {
        font-size: 1.1em !important;
    }
    .drawer-content-md {
        font-size: 1.5em !important;
    }
    .drawer-content-lg {
        font-size: 2.2em !important;
    }
</style>

<script>
import TeamApi from '@/http/api/Team'
import CompetitorApi from '@/http/api/Competitor'
import Request from '@/util/request_util'
import util from '@/util/tool_util'
import TeamFactory from '@/entity/TeamEntity'
import { Message } from 'iview'

export default {
    props: {
        teamId: "",
        drawerShow: false, 
        isUpdate: 0,
        showLoginDialog: false,
    },
    data() {
        return {
            hasPassword: true,
            password: "",
            userName: "",
            teamData: {},
            drawerTitle: "",
            competitorList: {},
            relation: 0,
            updateTeamData: {
                password: "",
                teamName: "",
                comment: "",
            },
            confirmMap: {
                removeTeamMember: {
                    title: "移除队员",
                    content: "你真的不是手误吗，忍心把这么可爱的队友踢出队伍orz",
                    cancelMessage: "嘻嘻，我就知道你是手误",
                    confirmFunc: this.removeTeamMember
                },
                cancelTeam: {
                    title: "退出队伍",
                    content: "你就这么忍心离开你可爱的队友们嘛，不跟他们一起奋战到底吗？",
                    cancelMessage: "我代表你队友们爱你噢~",
                    confirmFunc: this.cancelTeam
                },
                deleteTeam: {
                    title: "解散队伍",
                    content: "你确定你要让队友们无家可归吗，呜呜",
                    cancelMessage: "恩，手误了，真香",
                    confirmFunc: this.deleteTeam
                },
                changeCaptain: {
                    title: "更换队长",
                    content: "确定要把队长交给它了嘛，不再作为队长carry队伍了吗？",
                    cancelMessage: "果然还是当队长比较帅啊",
                    confirmFunc: this.changeCaptain
                }
            }
        }
    },
    methods: {
        initUserData() {
            this.userName = this.$store.getters.username
        },
        getTeamData() {
            if (this.teamId != '' && this.teamId != null && typeof(this.teamId) != "undefined") {
                Request.msg(TeamApi.getTeamInfo, [this.teamId], (ret) => {  
                    this.teamData = ret.data.team
                    this.updateTeamData.teamName = ret.data.team.teamName
                    this.updateTeamData.comment = ret.data.team.comment
                    this.competitorList = ret.data.competitorList
                    this.relation = ret.data.relation
                    if (this.relation == 0) {
                        this.drawerTitle = "加入队伍"
                    } else {
                        this.drawerTitle = "查看队伍信息"
                    }
                    if (this.teamData.hasPsw == 0) {
                        this.hasPassword = false
                    } else {
                        this.hasPassword = true
                    }
                }, null, false)
            }
            
        },
        joinTeam(password) {
            Request.msg(CompetitorApi.signUpTeam, [this.teamId, password], (ret) => {
                this.password = ""
                this.drawerIsUpdate = this.drawerIsUpdate + 1
            }, (ret) => {
                // 如果没登录拉起登录框
                if (ret.errorCode == 401) {
                    this.showLoginDialog = true
                }
            })
        },
        updateTeam() {
            let checkTeamName = util.checkName(this.updateTeamData.teamName, 1)
            if (checkTeamName != '') {
                Message.error(checkTeamName)
                return 
            }
            let team = TeamFactory.get()
            team.teamId = this.teamId
            team.teamName = this.updateTeamData.teamName
            team.comment = this.updateTeamData.comment
            if (this.hasPassword) {
                team.hasPsw = 1
                let check = util.checkStr(this.updateTeamData.password, "队伍密码", 15, true)
                if (check != '') {
                    Message.error(check)
                    return 
                }
                team.password = this.updateTeamData.password
            } else {
                team.hasPsw = 0
                team.password = null
            }
            let check = util.checkStr(this.updateTeamData.comment, "队伍备注", 20, true)
            if (check != '') {
                Message.error(check)
                return
            }
            Request.msg(TeamApi.updateTeam, [team], (ret) => {
                this.updateTeamData.password = ""
                this.drawerIsUpdate = this.drawerIsUpdate + 1
            })
        },
        deleteTeam() {
            let teamId = this.teamId
            Request.msg(TeamApi.deleteTeam, [teamId], (ret) => {
                this.drawerIsUpdate = this.drawerIsUpdate + 1
                this.drawerShowControl = false
                this.drawerTeamId = ""
            }) 
        },
        cancelTeam() {
            let teamId = this.teamId
            Request.msg(CompetitorApi.cancelTeam, [teamId], (ret) => {
                this.drawerIsUpdate = this.drawerIsUpdate + 1
                this.drawerShowControl = false
                this.drawerTeamId = ""
            })
        },
        removeTeamMember(compId) {
            Request.msg(TeamApi.removeTeamMember, [compId], (ret) => {
                this.drawerIsUpdate = this.drawerIsUpdate + 1
            })
        },
        changeCaptain(compId) {
            let teamId = this.teamId
            Request.msg(TeamApi.changeCaptain, [teamId, compId], (ret) => {
                this.drawerIsUpdate = this.drawerIsUpdate + 1
            })
        },
        confirm(confirmType, params = []) {
            var confirmData = confirmType
            this.$Modal.confirm({
                title: confirmData.title,
                content: confirmData.content,
                onOk: () => {
                    if (confirmData.confirmFunc != null) {
                        confirmData.confirmFunc(...params)
                    }
                },
                onCancel: () => {
                    this.$Message.info(confirmData.cancelMessage);
                }
            });
        },
    },
    computed: {
        drawerShowControl: {
            get: function() {
                return this.drawerShow;
            },
            set: function(value) {
                this.$emit('update:drawerShow', value);
            }
        },
        drawerIsUpdate: {
            get: function() {
                return this.isUpdate;
            },
            set: function(value) {
                this.$emit('update:isUpdate', value);
            }
        },
        drawerTeamId: {
            get: function() {
                return this.teamId
            },
            set: function(value) {
                this.$emit('update:teamId', value)
            }
        }
    },
    watch: {
        isUpdate(nVal, oVal) {
            this.initUserData()
            this.getTeamData()
        },
        drawerShowControl(nVal, oVal) {
            if (nVal == false) {
                this.password = ""
            }
        }
    }
}
</script>
