<template>
  <SidebarListItem
      :index="conversation.conversationID"
      :unread-count="conversation.unreadCount"
  >
    <div class="content">
      <div class="row-top">
        <div class="name">
          {{ username }}
        </div>
        <div class="date">{{date}}</div>
      </div>
      <div class="row-summary">
        {{ conversation.lastMessage.messageForShow }}
      </div>
    </div>
  </SidebarListItem>

</template>

<script lang="ts">
import {Prop} from "vue";
import SidebarListItem from "@renderer/components/SidebarList/SidebarListItem.vue";

export default {
  name: "ConversationItem",
  components: {SidebarListItem},
  props: {
    conversation: {
      type: Object as Prop<conversation>,
      required: true
    }
  },
  computed: {
    username() {
      let name = '系统通知';
      if (this.conversation.type === this.TIM.TYPES.CONV_C2C) {
        name = this.conversation.remark || this.conversation.userProfile.nick || this.conversation.userProfile.userID
      } else if (this.conversation.type === this.TIM.TYPES.CONV_GROUP) {
        name = this.conversation.groupProfile.name || this.conversation.groupProfile.groupID
      }
      return name;
    },
    date() {
      let date = new Date(this.conversation.lastMessage.lastTime * 1000)
      let today = new Date();
      if(date.getDay() === today.getDay()) {
        return `${date.getHours()}:${date.getMinutes()}`;
      }else {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 10rem;
  height: 100%;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .row-top {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .name {
      width: 8.5rem;
      color: var(--el-text-color-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1rem;
    }

    .date {
      font-size: 0.7rem;
      color: var(--el-text-color-placeholder);
    }
  }

  .row-summary {
    width: 10rem;
    font-size: 0.8rem;
    color: var(--el-text-color-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1rem;
  }
}
</style>