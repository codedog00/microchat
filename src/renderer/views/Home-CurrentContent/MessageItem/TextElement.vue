<template>
  {{message.payload.text}}
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "TextElement",
  props: {
    message: {
      type: Object as PropType<message>,
      default: () => ({text: ''}),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>