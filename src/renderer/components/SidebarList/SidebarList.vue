<template>
  <div class="list-wrapper">
    <el-menu>
      <slot></slot>
    </el-menu>
  </div>
</template>

<script lang="ts">
import {Plus} from "@element-plus/icons-vue";
import {PropType} from "vue";

export default {
  name: "SidebarList",
  components: {Plus,},

}
</script>

<style lang="scss" scoped>
.list-wrapper {
  width: 100%;
  height: 100%;

}

</style>

<style>
.el-menu {
  --el-menu-bg-color: rgba(0,0,0,0);
  border: 0;
}
</style>