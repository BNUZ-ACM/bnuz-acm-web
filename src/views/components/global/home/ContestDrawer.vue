<template>
    <Drawer title="加入队伍" :closable="false" 
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
        <br>
        <div v-if="teamData.hasPsw != 0">
            <span class="drawer-content"><b>注意：该队伍需要密码才可进入</b></span>
            <br>
            <Input search enter-button="加入" 
            type="password"
            v-model="password"
            @on-search="joinTeam(password)"
            placeholder="请输入该队伍密码"/>
        </div>
        <div v-if="teamData.hasPsw == 0">
            <Input search enter-button="加入" placeholder="嘻嘻我们队不需要密码噢" disabled/>
        </div>
        <home-login-dialog :formVisible.sync="showLoginDialog"/>        
    </Drawer>
</template>
<style lang="stylus">
    .drawer-content {
        font-size: 1.2em !important;
    }
    .drawer-content-md {
        font-size: 1.6em !important;
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
export default {
    props: {
        teamId: "",
        drawerShow: false, 
        isUpdate: false,
        showLoginDialog: false,
    },
    data() {
        return {
            password: "",
            userName: "",
            teamData: {},
            competitorList: {},
            isMyTeam: false,
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
                    this.competitorList = ret.data.competitorList
                    this.isMyTeam = ret.data.isMyTeam
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
                this.drawerIsUpdate = false
            }
        }
    }
}
</script>
