<template>
  {{message.payload.extension}}
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "CustomElement",
  props: {
    message: {
      type: Object as PropType<message>,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>