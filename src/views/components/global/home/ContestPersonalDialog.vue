<template>
  <Modal v-model="dialogFormVisible" width="360"
    :styles="{top: '120px'}">
    <p slot="header" style="text-align:center;font-size:1.5em;">
        <!-- <Icon type="ios-information-circle"></Icon> -->
        <span>{{personalData.title}}</span>
    </p>
    <div style="text-align:center;">
      <Form ref="competitor" :model="competitor" :label-width="60">
        <Input v-model="competitor.userId" disabled>
            <span slot="prepend">学号</span>
        </Input>
        <br>
        <Input v-model="competitor.username" disabled>
            <span slot="prepend">名字</span>
        </Input>
        <br>
        <Input v-model="competitor.nickName" placeholder="请输入你的昵称，不能超过15个字符">
            <span slot="prepend">昵称</span>
        </Input>
      </Form>
    </div>
    <div slot="footer">
      <Button type="error" size="large" @click="commit()" @keyup.enter.native="personalData.confirmButtonContent">{{personalData.confirmButtonContent}}</Button>
    </div>
    <Spin fix size="large" v-if="isSpinShow"></Spin>
  </Modal>
</template>
<script>
import CompetitorApi from '@/http/api/Competitor'
import Request from '@/util/request_util'
import { Message } from 'iview'

export default {
  props: {
    formVisible: false,
    isUpdate: 0,
    personalData: {
        title: "",
        confirmButtonContent: "",
        confirmButton: function() {},
        type: 0,
    },
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
    },
  },
  data () {
    return {
        isSpinShow: false,
        errorMessage: '',
        competitor: {
            userId: '',
            nickName: '',
            contestId: '',
            username: '',
        },
    }
  },
  methods: {
    closeDialog() {
        this.competitor.userId = '';
        this.competitor.nickName = '';
        this.dialogFormVisible = false;
    },
    getUserCompetitorInfo() {
        Request.msg(CompetitorApi.getUserCompetitorInfo, [this.contestId], (ret) => {
            this.competitor.userId = ret.data.userId
            this.competitor.nickName = ret.data.nickName
            this.competitor.username = ret.data.username
        }, null, false)
    },
    initDialog() {
        this.competitor.contestId = this.contestId     
        if (this.personalData.type === 1) {
            this.getUserCompetitorInfo()
        } else {
            this.competitor.userId = this.$store.getters.userId
            this.competitor.username = this.$store.getters.username
        }
    },
    commit() {
        let isSuccess = this.personalData.confirmButton(this.competitor)
        if (isSuccess) {
            this.dialogIsUpdate = this.dialogIsUpdate + 1
            this.dialogFormVisible = false
        }
    }
  },
  watch: {
    dialogFormVisible(nVal, oVal) {
        if (nVal) {
            // 如果没有登录
            if (!this.$store.getters.loginStatus) {
                this.dialogFormVisible = false
                return 
            }
            this.initDialog()
        }
    }
  }
}
</script>
