<template>

  <div class="item-wrapper">
    <el-avatar  :src="src" />

    <div  class="content">
      <div class="name">
        {{name}}
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "SearchListItem",
  props: {
    src: {
      type: String as PropType<string>,
      default: () => (''),
    },
    name: {
      type: String as PropType<string>,
      default: () => (''),
    }
  }
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  width: 14rem;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  .content {
    margin-left: 1rem;
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;

    .name {
      //width: 7.5rem;
      width: 100%;
      font-size: 1rem;
      line-height: 1rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

}
</style>