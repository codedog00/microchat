<template>
  <div class="avatar-wrapper" :style="wrapperStyle">
    <img :src="src" alt="alt" class="avatar" />
    <el-upload
        class="avatar-upload"
        action="http://121.5.67.65:3000/api/upload/avatar"
        :limit="1"
        :show-file-list="false"
        :on-success="onSuccess"
    >
      <el-icon class="upload-icon-wrapper"><Plus /></el-icon>
    </el-upload>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {Plus} from "@element-plus/icons-vue";

export default {
  name: "ModifiableAvatar",
  components: {Plus},
  props: {
    src: {
      type: String as PropType<string>,
      default: () => (''),
    },
    size: {
      type: Number as PropType<number>,
      default: () => ('default'),
    },
    onSuccess: {
      type: Function as PropType<any>,
    }
  },
  data() {
    return {
      wrapperStyle: {
        width: this.size + 'px',
        height: this.size + 'px'
      },
    }
  }

}
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  position: relative;
  border-radius: 50%;
  overflow: hidden;

  .avatar {
    width: 100%;
    height: 100%;
  }

  .avatar-upload {
    position: absolute;
    bottom: 0;

    .upload-icon-wrapper {
      width: 70px;
      height: 20px;
      background-color: rgba(0,0,0,0.2);

      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.6);

      &:hover {
        color: rgba(255,255,255,0.8);
      }
      &:active {
        color: rgba(255,255,255,0.6);
      }
    }
  }
}
</style>