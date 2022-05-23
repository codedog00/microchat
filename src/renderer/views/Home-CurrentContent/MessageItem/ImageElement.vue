<template>
  <img :src="message.payload.imageInfoArray[0].url" alt="failure" style="max-width: 100%">
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "ImageElement",
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