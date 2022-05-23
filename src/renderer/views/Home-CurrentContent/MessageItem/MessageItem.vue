<template>
  <div
      v-if="currentMessageElement === 'GroupTipElement'"
      class="group-tip-wrapper"
  >
    <GroupTipElement :message="message" />
  </div>
  <MessageRow
      v-else
      :index="message.ID"
      :position="position"
      :title="name"
      :src="message.avatar"
      @avatarClick="openVCard"
  >
    <MessageBubble :position="position">
      <template v-if="currentMessageElement === 'undefined'">
        {{`无法解析的消息类型:${this.message.type}`}}
      </template>

      <component
          v-else
          :is="currentMessageElement"
          :message="message"
      />
    </MessageBubble>

  </MessageRow>

</template>

<script lang="ts">
import {PropType} from "vue";
import TextElement from "@renderer/views/Home-CurrentContent/MessageItem/TextElement.vue";
import ImageElement from "@renderer/views/Home-CurrentContent/MessageItem/ImageElement.vue";
import GroupSystemNoticeElement from "@renderer/views/Home-CurrentContent/MessageItem/GroupSystemNoticeElement.vue";
import CustomElement from "@renderer/views/Home-CurrentContent/MessageItem/CustomElement.vue";
import FileElement from "@renderer/views/Home-CurrentContent/MessageItem/FileElement.vue";
import MessageRow from "@renderer/components/MessageBox/MessageRow.vue";
import useFriendStore from "@store/friend/friend";
import useUserStore from "@store/user/user";
import useDialogStore from "@store/dialog/dialog";
import GroupTipElement from "@renderer/views/Home-CurrentContent/MessageItem/GroupTipElement.vue";
import MessageBubble from "@renderer/components/MessageBox/MessageBubble.vue";

const friendStore = useFriendStore();
const userStore = useUserStore();
const dialogStore = useDialogStore();

export default {
  name: "MessageItem",
  components: {
    MessageBubble,
    GroupTipElement,
    MessageRow, FileElement, CustomElement, GroupSystemNoticeElement, ImageElement, TextElement},
  props: {
    message: {
      type: Object as PropType<message>,
      required: true,
    }
  },
  mounted() {
    this.$parent.$refs.messageBox.scrollTop = this.$parent.$refs?.messageBox.scrollHeight;
  },
  computed: {
    position() {
      return this.message.flow === 'out' ? 'right' : 'left'
    },
    name() {
      return this.message.nameCard || this.message.nick || this.message.from
    },
    currentMessageElement() {
      switch (this.message.type) {
        case this.TIM.TYPES.MSG_TEXT:
          return 'TextElement'
        case this.TIM.TYPES.MSG_IMAGE:
          return 'ImageElement'
        case this.TIM.TYPES.MSG_GRP_SYS_NOTICE:
          return 'GroupSystemNoticeElement'
        case this.TIM.TYPES.MSG_CUSTOM:
          return 'CustomElement'
        case this.TIM.TYPES.MSG_FILE:
          return 'FileElement'
        case this.TIM.TYPES.MSG_GRP_TIP:
          return 'GroupTipElement'
        default:
          return 'undefined'
      }
    }
  },
  methods: {
    openVCard() {
      let data:VCardDialogData = {relationship: 'friend',data: null};
      if(this.message.flow === 'in') {
        data.data = friendStore.friendList.find(friend => friend.userID === this.message.from);
      }else {
        data.relationship = 'myself';
        data.data = userStore.userProfile;
      }

      console.log(userStore.userProfile);
      dialogStore.openHomeDialog('VCardDialog',data)
    },
  }
}
</script>

<style lang="scss" scoped>
.group-tip-wrapper {
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>