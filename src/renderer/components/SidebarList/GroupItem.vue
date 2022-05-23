<template>
  <div class="item-wrapper">
    <el-avatar  :src="group.avatar" />

    <div  class="content">
      <div class="group-name">
        {{groupName}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "GroupItem",
  props: {
    group: {
      type: Object as PropType<group>,
      required: true,
    }
  },
  computed: {
    groupName() {
      return this.group.name || this.group.groupID
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

  .content {
    margin-left: 1rem;
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;

    .group-name {
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