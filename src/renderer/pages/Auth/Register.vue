<template>
  <el-form :model="registerData" label-width="4rem">
    <el-form-item :label="$t('auth.username')">
      <el-input v-model="registerData.username"/>
    </el-form-item>
    <el-form-item :label="$t('auth.email')">
      <el-input v-model="registerData.email" />
    </el-form-item>
    <el-form-item :label="$t('auth.password')">
      <el-input type="password" v-model="registerData.password"/>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">

import {PropType} from "vue";

interface registerData {
  username: string;
  email: string;
  password: string;
}

export default {
  name: "Register",
  props: {
    registerData: {
      type: Object as PropType<registerData>,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>