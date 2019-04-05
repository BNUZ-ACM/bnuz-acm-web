<template>
    <Drawer :title="drawerTitle" :closable="false" 
    v-model="drawerShowControl" 
    v-if="teamData != null"
    class="drawer-content"
    width="300"
    >
        <h1 class="drawer-content-lg">{{teamData.teamName}}</h1>
        <p class="drawer-content">当前人数：{{teamData.memberNum}}人{{teamData.memberNum == 3 ? '（已满人）' : ''}}</p>        
        <br>
        <Divider orientation="left" class="drawer-content-md">队员们</Divider>
        
        <p v-for="competitor in competitorList" :key="competitor.compId" class="drawer-content">
            {{competitor.nickName}} ({{competitor.userId}})
        </p>
        <br>
        <p v-if="teamData.comment != null && teamData.comment != ''">队伍备注：{{teamData.comment}}</p>
        <div v-if="relation == 0">
            <Divider orientation="left" class="drawer-content-md">加入队伍</Divider>
            <div v-if="teamData.hasPsw != 0">
                <Input search enter-button="加入" 
                type="password"
                v-model="password"
                @on-search="joinTeam(password)"
                placeholder="请输入该队伍密码"/>
                <br>
                <span class="drawer-content"><b>注意：该队伍需要密码才可进入</b></span>            
            </div>
        </div>
        <div v-if="teamData.hasPsw == 0">
            <Input search enter-button="加入" placeholder="嘻嘻我们队不需要密码噢" disabled/>
        </div>
        <div>
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
            clearable style="width: 205px" 
            v-model="updateTeamData.password"/>
            <br><br>
            <center>
                <Button type="info" @click="updateTeam()">更改队伍信息</Button>
                <Button style="margin-left: 20px" type="error" @click="deleteTeam()">删除队伍</Button>
            </center>
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

export default {
    props: {
        teamId: "",
        drawerShow: false, 
        isUpdate: false,
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
                teamName: ""
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
                    console.log(this.teamData)
                    this.updateTeamData.teamName = ret.data.team.teamName
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
                this.drawerIsUpdate = false
            }, (ret) => {
                // 如果没登录拉起登录框
                if (ret.errorCode == 401) {
                    this.showLoginDialog = true
                }
            })
        },
        updateTeam() {
            let team = TeamFactory.get()
            team.teamId = this.teamId
            team.teamName = this.updateTeamData.teamName
            if (this.hasPassword) {
                team.hasPsw = 1
                team.password = this.updateTeamData.password
            } else {
                team.hasPsw = 0
                team.password = null
            }
            console.log(team)
            Request.msg(TeamApi.updateTeam, [team], (ret) => {
                this.updateTeamData.password = ""
                this.drawerIsUpdate = false
            })
        },
        deleteTeam() {
            let teamId = this.teamId
            Request.msg(TeamApi.deleteTeam, [teamId], (ret) => {
                this.drawerIsUpdate = false
                this.drawerShowControl = false
            }) 
        }
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
        }
    },
    watch: {
        isUpdate(nVal, oVal) {
            if (nVal == true) {
                this.initUserData()
                this.getTeamData()
            }
        }
    }
}
</script>
