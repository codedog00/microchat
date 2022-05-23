<template>
  <div class="bubble" :class="position" >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "MessageBubble",
  props: {
    position: {
      type: String as PropType<'left' | 'right'>,
      default: () => ('left'),
    },
    maxWith: {
      type: String as PropType<string>,
      default: () => (''),
    }
  },
  computed: {
    bubbleStyle() {
      if(this.maxWith !== '') {
        return {
          maxWith: this.maxWith
        }
      }

      return {};
    }
  }
}
</script>

<style lang="scss" scoped>
.bubble {
  position: relative;
  margin: 0.3rem 0;
  padding: 0.4rem ;
  width: fit-content;
  min-height: 2.2rem;
  border-radius: 0.2rem;
  color: white;
  background-color: var(--el-color-primary);


}

.left {
  &:before {
    content: '';
    position: absolute;
    border: 0.4rem solid  transparent;
    border-right-color: var(--el-color-primary);
    top: 0.4rem;
    left: -0.8rem;
  }
}

.right {
  &:before {
    content: '';
    position: absolute;
    border: 0.4rem solid  transparent;
    border-left-color: var(--el-color-primary);
    top: 0.4rem;
    right: -0.8rem;
  }
}
</style>