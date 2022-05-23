<template>
  <div class="message-send-box" >
    <div class="menu-bar" v-if="this.$slots.menu">
      <slot name="menu"></slot>
    </div>

    <textarea
        :value="modelValue"
        @input="this.$emit('update:modelValue',$event.target.value)"
        @keypress.enter.exact.prevent="this.$emit('sendMessage')"/>

    <el-button
        type="success"
        style="position: absolute;bottom: 1rem;right: 1rem"
        @click="this.$emit('sendMessage')"
    >
      {{ this.$t('currentContent.send') }}
    </el-button>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {Camera, Eleme, FolderOpened} from "@element-plus/icons-vue";

export default {
  name: "MessageSendBox",
  components: {FolderOpened, Camera, Eleme},
  emits: {
    'update:modelValue': (newValue: string) => {
      return true;
    },
    sendMessage() {
      return true
    }
  },
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.message-send-box {
  position: relative;
  width: 100%;
  border-top: 1px solid #E0E0E0;
  line-height: 0;

  .menu-bar {
    position: absolute;
    top: 1rem;
    width: 100%;
    height: 2rem;
    padding: 0 0.3rem;

  }

  textarea {
    width: 100%;
    height: 10rem;
    outline: 0;
    border: 0;
    padding: 3rem 1rem 1rem 1rem;
    font-size: 1rem;
    background-color: var(--bgcolor);
    resize: none;

    &:focus {
      background-color: white;
    }
  }

}
</style>