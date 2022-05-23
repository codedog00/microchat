<template>
  <el-menu>
    <ConversationItem
        v-for="conversation in conversationStore.conversationList"
        :key="conversation.conversationID"
        :conversation="conversation"
        @click="handleClick(conversation.conversationID)"
    />
  </el-menu>
</template>

<script lang="ts">
import SidebarListItem from "@renderer/components/SidebarList/SidebarListItem.vue";
import useConversationStore from "@store/conversation/conversation";
import ConversationItem from "@renderer/views/Home-Sidebar/components/ConversationItem.vue";
import SidebarList from "@renderer/components/SidebarList/SidebarList.vue";


export default {
  name: "ConversationList",
  components: {SidebarList, ConversationItem, SidebarListItem},
  setup() {
    const conversationStore = useConversationStore();

    return {
      conversationStore,
    }
  },
  methods: {
    handleClick(conversationID: string) {
      this.conversationStore.checkoutConversation(conversationID);
      this.$router.replace(`/home/conversation/`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>