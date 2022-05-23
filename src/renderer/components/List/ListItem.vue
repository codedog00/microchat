<template>
  <div class="item-wrapper" v-if="this.$slots.default">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "ListItem"
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    background-color: #e5e5e5;
  }
}
</style>