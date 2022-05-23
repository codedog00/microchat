<template>
  <div class="auth-wrapper">
    <el-card class="auth-panel">
      <el-tabs v-model="currentComponent" @tab-click="clearData">
        <el-tab-pane :label="$t('auth.login')" name="login">
          <Login :login-data="authData.loginData"/>
        </el-tab-pane>
        <el-tab-pane :label="$t('auth.register')" name="register">
          <Register :register-data="authData.registerData"/>
        </el-tab-pane>
      </el-tabs>
      <div class="panel-botton">
        <el-button @click="submit">{{ $t(`auth.${currentComponent}`) }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Login from "./Login.vue";
import Register from "@renderer/pages/Auth/Register.vue";
import {ElMessage} from "element-plus";
import useUserStore from "@store/user/user";

const userStore = useUserStore();

export default {
  name: "Auth",
  components: {Register, Login},
  data() {
    return {
      currentComponent: 'login',
      authData: {
        loginData: {
          username: '',
          password: '',
        },
        registerData: {
          username: '',
          email: '',
          password: '',
        }
      }
    }
  },
  methods: {
    clearData() {
      this.authData.loginData.username = '';
      this.authData.loginData.password = '';
      this.authData.registerData.username = '';
      this.authData.registerData.email = '';
      this.authData.registerData.password = '';
    },
    submit() {
      if(this.currentComponent === 'login') {
        this.login();
      }else {
        this.register();
      }
    },
    login() {
      userStore.login(this.authData.loginData)
          .then(user => {
            ElMessage.success(this.$t('auth.loginSuccess'))
            console.log(user)
            this.tim.login({userID: user.username ,userSig: user.accessToken})
                .then(() => {
                  this.$router.replace('/');
                })

          })
          .catch(err => {
            // let msg = `${this.$t('auth.loginFailure')}${err.status+ ': '+ err.data.message}`
            console.log(err);
            ElMessage.error(err);
          })
    },
    register() {
      userStore.register(this.authData.registerData)
          .then( res => {
            ElMessage.success(this.$t('auth.registerSuccess'));
            this.currentComponent = 'login';
          })
          .catch(err => {
            ElMessage.error(err.message);
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--el-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;

  .auth-panel {
    width: 20rem;
    transition: height .5s ease;

    .panel-header {
      width: 100%;
    }
    .panel-botton {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: end;
    }
  }
}

</style>