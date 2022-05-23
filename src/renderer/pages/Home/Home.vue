<template>
  <el-container class="home">
    <el-aside class="aside">
      <SideBar />
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>

  <!-- 切换dialog -->
  <!-- is为''会出现Invalid vnode type 警告 -->
  <component :is="homeDialog.currentHomeDialog" />
</template>

<script>

import SideBar from "../../views/Home-Sidebar/Sidebar.vue";
import Profile from "../../views/Home-dialog/Profile.vue";
import useConversationStore from "../../store/modules/conversation/conversation";
import useUserStore from "../../store/modules/user/user";
import useDialogStore from "../../store/modules/dialog/dialog";
import AddFriendDialog from "../../views/Home-dialog/AddFriend-dialog.vue";
import CreateGroupDialog from "../../views/Home-dialog/CreateGroup-dialog.vue";
import VCardDialog from "../../views/Home-dialog/VCard-dialog.vue";


const userStore = useUserStore();
const conversationStore = useConversationStore();
const dialogStore = useDialogStore()

export default {
  name: "Home",
  components: {VCardDialog, CreateGroupDialog, AddFriendDialog, Profile, SideBar},
  computed: {
    homeDialog: () => dialogStore.homeDialog,
  },
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: wheat;
  .aside {
    width: 20.5rem;
    height: 100%;
    background-color: white;
    border-right: 1px solid #E0E0E0;
  }

}

.el-main {
  padding: 0;
}
</style>