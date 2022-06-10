<template>
  <el-menu>
    <SidebarListItem
        v-for="group in groupList"
        :index="group.groupID"
        :src="group.avatar || avatar_group"
        @click="openConversation(group.groupID)"
    >
      <div class="content">
        <div class="group-name">
          {{group.name || group.groupID}}
        </div>
      </div>
    </SidebarListItem>
  </el-menu>
</template>

<script lang="ts">
import useGroupStore from "@store/group/group";
import useConversationStore from "@store/conversation/conversation";
import SidebarListItem from "@renderer/components/SidebarList/SidebarListItem.vue";
import SidebarList from "@renderer/components/SidebarList/SidebarList.vue";
import avatar_group from "@renderer/assets/avatar/group.png";

const groupStore = useGroupStore();
const conversationStore = useConversationStore();

export default {
  name: "GroupList",
  components: {SidebarList, SidebarListItem},
  setup() {
    return {
      avatar_group
    }
  },
  computed: {
    groupList:() => groupStore.groupList,
  },
  methods: {
    openConversation(groupID: string) {
      conversationStore.checkoutConversation(`GROUP${groupID}`);
      this.$router.replace('/home/conversation');
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  display: flex;
  align-items: center;
  .group-name {
    width: 10rem;

    font-size: 1rem;
    line-height: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>