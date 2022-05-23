<template>
  <div class="sublist-wrapper">
    <div class="title-wrapper">
      <div class="title">
        {{title}}
      </div>

    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "SubList",
  props: {
    title: {
      type: String as PropType<string>,
      default: () => ('')
    }
  }
}
</script>

<style lang="scss" scoped>
.sublist-wrapper {
  width: 100%;

  .title-wrapper {
    padding: 0.5rem 1rem 0;

    .title {
      font-size: 0.8rem;
      color: gray;
      border-bottom: 1px solid lightgray;
    }
  }
}
</style>