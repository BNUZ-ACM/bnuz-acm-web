<template>
  <Modal v-model="dialogFormVisible" width="360"
    :styles="{top: '120px'}">
    <p slot="header" style="text-align:center;font-size:1.5em;">
        <!-- <Icon type="ios-information-circle"></Icon> -->
        <span>登录</span>
    </p>
    <div style="text-align:center;">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="60">
        <FormItem label="账号" prop="username">
            <Input v-model="formValidate.username" placeholder="请输入账号，账号为学号"/>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="请输入你的密码，第一次登录密码为教务密码" />
        </FormItem>
          <CheckboxGroup v-model="formValidate.checkbox">
            <Checkbox label="agree">第一次登录本网站将储存你在学校的个人信息，请确认</Checkbox> 
          </CheckboxGroup>
      </Form>
    </div>
    <div slot="footer">
      <Button type="error" size="large" @click="login" @keyup.enter.native="login">登录</Button>
      <Button type="default" size="large" @click="dialogFormVisible = false">取消</Button>
    </div>
    <Spin fix size="large" v-if="isSpinShow"></Spin>
  </Modal>
</template>
<script>
import { login } from '@/http/api/Auth'
import UserApi from '@/http/api/User'
import Request from '@/util/request_util'
import { Message } from 'iview'

export default {
  props: {
    formVisible: false,
    isUpdate: 0,
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
        formValidate: {
            username: '',
            password: '',
            checkbox: [],
        },
        ruleValidate: {
            username: [
                { required: true, message: '账号不能为空', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '密码不能为空', trigger: 'blur' }
            ]
        }
    }
  },
  methods: {
    validateLoginForm(data) {
      if (data.username == '' || data.username == null) {
        return this.ruleValidate.username[0].message
      }
      if (data.password == '' || data.password == null) {
        return this.ruleValidate.password[0].message
      }
      let reg = /^1\d{9}$/
      if (!reg.test(data.username)) {
        return "账号不合法"
      }
      return ''
    },
    async login() {
      if (this.formValidate.checkbox.length <= 0) {
        Message.error("请同意授权本网站个人信息")
        return
      }
      let checkLoginFormMsg = this.validateLoginForm(this.formValidate)
      if (checkLoginFormMsg != '') {
        Message.error(checkLoginFormMsg)
        return 
      }
      this.isSpinShow = true
      Request.msg(login, [this.formValidate.username, this.formValidate.password], (ret) => {
        // 登录成功塞token
        this.$store.commit("login", ret.data);
        localStorage.setItem("token", ret.data);
        this.closeDialog();
        UserApi.getInfo().then((ret) => {
          this.$store.commit("setUser", ret.data);
          this.isSpinShow = false
          this.dialogIsUpdate = this.dialogIsUpdate + 1
          // this.$router.push({ path: "/" });
        }, (ret) => {
          this.isSpinShow = false
        })
      }, (ret) => {
        this.isSpinShow = false
      })
    },
    closeDialog() {
      this.formValidate.username = '';
      this.formValidate.password = '';
      this.dialogFormVisible = false;
    }
  },
  watch: {
    dialogFormVisible(nVal, oVal) {
      if (nVal) {
        if (this.$store.getters.loginStatus) {
          this.dialogFormVisible = false
        }
      }
    }
  }
}
</script>
