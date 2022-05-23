<template>
  <el-form :model="loginData" label-width="4rem">
    <el-form-item :label="$t('auth.username')">
      <el-input v-model="loginData.username"></el-input>
    </el-form-item>
    <el-form-item :label="$t('auth.password')">
      <el-input type="password" v-model="loginData.password"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">

import {PropType} from "vue";

interface loginData {
  username: string;
  password: string;
}

export default {
  name: "Login",
  props: {
    loginData: {
      type: Object as PropType<loginData>,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>