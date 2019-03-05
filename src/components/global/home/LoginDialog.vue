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
            <Input type="password" v-model="formValidate.password" placeholder="请输入你的密码，第一次登录密码为教务密码"></Input>
        </FormItem>
        
      </Form>
    </div>
    <div slot="footer">
        <Button type="error" size="large" @click="login">登录</Button>
        <Button type="default" size="large" @click="dialogFormVisible = false">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { login } from '@/http/api/Auth'

export default {
  props: {
    formVisible: false
  },
  computed: {
    dialogFormVisible: {
      get: function() {
        return this.formVisible;
      },
      set: function(value) {
        this.$emit('update:formVisible', value);
      }
    }
  },
  data () {
    return {
        formValidate: {
            username: '',
            password: ''
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
    async login() {
      const data = await login(this.formValidate.username, this.formValidate.password);
    }
  }
}
</script>
