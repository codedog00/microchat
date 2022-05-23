<template>
  <el-form-item :label="label">
    <slot></slot>
  </el-form-item>
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "VCardInfoItem",
  props: {
    label:{
      type: String as PropType<string>,
      default: () => (''),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>