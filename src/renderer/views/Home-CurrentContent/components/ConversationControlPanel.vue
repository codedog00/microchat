<template>
  <div class="conversation-control-panel">
    <UserControlPanel v-if="type === this.TIM.TYPES.CONV_C2C" />
    <GroupControlPanel v-if="type === this.TIM.TYPES.CONV_GROUP" :profile="profile"/>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import UserControlPanel from "@renderer/views/Home-CurrentContent/components/UserControlPanel.vue";
import GroupControlPanel from "@renderer/views/Home-CurrentContent/components/GroupControlPanel.vue";


export default {
  name: "ConversationControlPanel",
  components: {GroupControlPanel, UserControlPanel},
  props: {
    type: {
      type: String as PropType<string>,
      required: true,
    },
    profile: {
      type: Object as PropType<any>,
      default: () => undefined,
    }
  }
}
</script>

<style lang="scss" scoped>
.conversation-control-panel {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>