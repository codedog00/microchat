<template>
  <div class="list-wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "List",
  props: {
    listData: {
      type: Array as PropType<Array<any>>,
      default: () => [],
    },
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  width: 100%;
}
</style>