<template>
  <Modal v-model="dialogFormVisible" width="360"
    :styles="{top: '120px'}">
    <p slot="header" style="text-align:center;font-size:1.5em;">
        <!-- <Icon type="ios-information-circle"></Icon> -->
        <span>{{title}}</span>
    </p>
    <div style="text-align:">
        {{userName}}同学：<br/>
        你若已经确认好以下培训资料及信息，即可点击报名，如果没有认真了解请仔细了解，对于非{{grade}}级新生，如果报名了将不会得到新生赛的奖励，请注意。<br/>
        请确认信息，学号：{{userId}}<br/>
        如果信息有误请联系管理员
    </div>
    <div slot="footer">
        <div @click="signCourse"><Button type="error">{{confirmSignUp}}</Button></div>
    </div>
  </Modal>
</template>
<script>
import ScholarsApi from '@/http/api/Scholar'
import Request from '@/util/request_util'
import util from '@/util/tool_util'
export default {
    props: {
        formVisible: false,
        isSignUp: true,
        title: "",
        grade: "",
        isUpdate: false,
        
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
        }
    },
    methods: {
        initUserData() {
            this.userId = this.$store.getters.userId
            this.userName = this.$store.getters.username
            if (this.isSignUp) {
                this.confirmSignUp = "确认报名";
            } else {
                this.confirmSignUp = "取消报名";
            }
        },
        closeDialog() {
            this.dialogFormVisible = false;
            this.isPromptShow = false;
        },
        async signCourse() {
            // 报名或取消报名
            if (this.isSignUp) {
                Request.msg(ScholarsApi.signUpCourse, [this.$route.query.id], (ret) => {
                    this.closeDialog()
                    this.dialogIsUpdate = true
                })
            } else {
                Request.msg(ScholarsApi.cancelCourse, [this.$route.query.id], (ret) => {
                    this.closeDialog()     
                    this.dialogIsUpdate = true               
                })
            }
        }
    },
    updated() {
        this.initUserData()
    }
}
</script>
