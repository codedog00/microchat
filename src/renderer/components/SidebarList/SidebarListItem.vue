<template>
  <el-menu-item >
    <div class="item-wrapper">
      <el-badge class="avatar-wrapper" :value="unreadCount" :hidden="unreadCount === 0">
        <el-avatar  :src="src" />
      </el-badge>

      <slot></slot>
    </div>
  </el-menu-item>
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "SidebarListItem",
  props: {
    src: {
      type: String as PropType<string>,
      default: () => ('')
    },
    unreadCount: {
      type: Number as PropType<number>,
      default: () => 0,
    }
  },

}
</script>

<style lang="scss" scoped>
.item-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //border: 1px solid black;

  .avatar-wrapper {
    line-height: 40px; //与头像大小一致
    margin-right: 1rem;
  }

}
</style>