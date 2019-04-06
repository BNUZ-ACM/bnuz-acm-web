<template>
  <Modal v-model="dialogFormVisible" width="460" :mask-closable="false"
    :styles="{top: '120px'}">
    <p slot="header" style="text-align:center;font-size:1.5em;">
        <!-- <Icon type="ios-information-circle"></Icon> -->
        <span>{{title}}</span>
    </p>
    <Switch />
    <div>
        {{userName}}同学你好<br/>
        欢迎你创建<b>{{title}}</b>队伍<br/>
        <br>
        <Input style="width: 410px;"
        v-model="teamData.teamName">
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
        placeholder="如果队伍需要密码则请输入队伍密码" 
        clearable style="width: 350px" 
        type="password"
        v-model="teamData.password"/>
        <br><br>
        注意：比赛过程中最终解释权归<b>北京师范大学珠海分校ACM协会</b>所有。
    </div>
    <div slot="footer">
        <div><Button type="error" @click="createTeam()">创建队伍</Button>
        <Button type="default" @click="closeDialog()">取消</Button></div>
    </div>
  </Modal>
</template>
<script>
import TeamApi from '@/http/api/Team'
import TeamFactory from '@/entity/TeamEntity'
import Request from '@/util/request_util'
import util from '@/util/tool_util'
export default {
    props: {
        formVisible: false,
        title: "",
        isUpdate: 0,
        contestId: "",        
    },
    computed: {
        dialogFormVisible: {
            get: function() {
                return this.formVisible;
            },
            set: function(value) {
                this.$emit('update:formVisible', value);
            }
        },
        dialogIsUpdate: {
            get: function() {
                return this.isUpdate;
            },
            set: function(value) {
                this.$emit('update:isUpdate', value);
            }
        }
    },
    data() {
        return {
            confirmSignUp: "",
            userId: "",
            userName: "",
            hasPassword: true,
            teamData: {
                password: "",
                teamName: ""
            }
        }
    },
    methods: {
        initUserData() {
            this.userId = this.$store.getters.userId
            this.userName = this.$store.getters.username
            this.confirmSignUp = "创建队伍";
        },
        closeDialog() {
            this.dialogFormVisible = false;
            this.teamData.password = ""
            this.teamData.teamName = ""
        },
        createTeam() {
            let team = TeamFactory.get()
            team.contestId = this.contestId
            if (this.hasPassword) {
                team.hasPsw = 1
                team.password = this.teamData.password                
            } else {
                team.hasPsw = 0
                team.password = null
            }
            team.teamName = this.teamData.teamName
            Request.msg(TeamApi.createTeam, [team], (ret) => {
                this.dialogIsUpdate = this.dialogIsUpdate + 1
                this.closeDialog()
            })
        }
    },
    watch: {
        dialogFormVisible(nVal, oVal) {
            if (nVal) {
                // 如果没有登录关闭当前窗口打开登录框
                if (!this.$store.getters.loginStatus) {
                    this.dialogFormVisible = false
                }
                this.initUserData()
            }
        }
        

    }
}
</script>
