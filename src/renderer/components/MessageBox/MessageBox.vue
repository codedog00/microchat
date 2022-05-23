<template>
  <div ref="messageBox" class="message-box">
    <slot></slot>
  </div>
</template>

<script lang="ts">

import MessageRow from "@renderer/components/MessageBox/MessageRow.vue";
import {PropType, provide, toRefs} from "vue";


export default {
  name: "MessageBox",
  components: {MessageRow,},
  props: {
    // 是否开启消息选择
    selectionMode: {
      type: Boolean as PropType<boolean>,
      default: () => false
    },
    // 被选中的元素列表
    selectedGroup: {
      type: Array as PropType<Array<any>>,
      default: () => ([]),
    },
  },
  setup(props) {

    const {selectionMode, selectedGroup} = toRefs(props);

    provide('selectionMode',selectionMode);
    provide('selectedGroup',selectedGroup);

  },
}
</script>

<style lang="scss" scoped>
.message-box {
  background-color: #F3F3F3;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    background-color: transparent;
  }
}

</style>