<template>
  <el-menu>
    <el-sub-menu v-for="group in friendStore.friendsClassifiedByGroup" :index="group.name">
      <template #title>
        <el-dropdown trigger="contextmenu">
          <div class="group-title-wrapper">
            {{group.name}}
          </div>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="renameGroup(group.name)">
                {{this.$t('friend.group.renameGroup')}}
              </el-dropdown-item>
              <el-dropdown-item @click="addGroup">
                {{this.$t('friend.group.addGroup')}}
              </el-dropdown-item>
              <el-dropdown-item @click="deleteGroup(group.name)">
                {{this.$t('friend.group.deleteGroup')}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </template>

      <SidebarListItem v-for="friend in group.friendList" @click="openFriendProfile(friend)">
        <div  class="content">
          <div class="username">
            {{friend.remark || friend.profile.nick || friend.userID}}
          </div>
        </div>
      </SidebarListItem>
    </el-sub-menu>

    <el-dialog v-model="setGroupDialog.dialogVisible" width="20rem">
      <el-input v-model="setGroupDialog.newGroupName"/>
      <template #footer>
        <el-button size="small" @click="setGroupDialog.dialogVisible = false">
          {{this.$t('buttons.cancel')}}
        </el-button>
        <el-button type="success" size="small" @click="setGroup">
          {{this.$t('buttons.confirm')}}
        </el-button>
      </template>
    </el-dialog>

  </el-menu>
</template>

<script lang="ts">
import SidebarListItem from "@renderer/components/SidebarList/SidebarListItem.vue";
import SidebarList from "@renderer/components/SidebarList/SidebarList.vue";
import useFriendStore from "@store/friend/friend";
import useDialogStore from "@store/dialog/dialog";
import {ElMessage} from "element-plus";

const friendStore = useFriendStore();
const dialogStore = useDialogStore();

export default {
  name: "FriendList",
  components: {SidebarList, SidebarListItem},
  setup() {
    return {
      friendStore,
    }
  },
  data() {
    return {
      setGroupDialog: {
        dialogVisible: false,
        type: '',
        oldGroupName: '',
        newGroupName: '',
      },
    }
  },
  computed: {
    friendApplicationList: () => friendStore.friendApplicationList,
  },
  methods: {
    setGroup() {
      if(this.setGroupDialog.type === 'renameGroup') {
        console.log(this.setGroupDialog.oldGroupName);
        this.tim.renameFriendGroup({
          oldName: this.setGroupDialog.oldGroupName,
          newName: this.setGroupDialog.newGroupName,
        })
            .then(() => {
              ElMessage.success('重命名分组成功')
            })
            .catch(err => {
              ElMessage.error('重命名分组失败')
              console.error(err);
            })
            .finally(() => {
              this.setGroupDialog.dialogVisible = false;
              this.setGroupDialog.newGroupName = '';
            })
      }else if(this.setGroupDialog.type === 'addGroup') {
        this.tim.createFriendGroup({
          name: this.setGroupDialog.newGroupName,
        })
            .then(() => {
              ElMessage.success('新增分组成功')
            })
            .catch(err => {
              ElMessage.error('新增分组失败')
              console.error(err);
            })
            .finally(() => {
              this.setGroupDialog.dialogVisible = false;
              this.setGroupDialog.newGroupName = '';
            })
      } else if (this.setGroupDialog.type === 'deleteGroup') {
        this.tim.deleteFriendGroup({
          name: this.setGroupDialog.oldGroupName,
        })
            .then(() => {
              ElMessage.success('删除成功')
            })
            .catch(err => {
              ElMessage.error('删除失败')
              console.error(err);
            })
            .finally(() => {
              this.setGroupDialog.dialogVisible = false;
            })
      }
    },
    renameGroup(oldGroupName: string) {
      this.setGroupDialog.type = 'renameGroup';
      this.setGroupDialog.oldGroupName = oldGroupName;
      this.setGroupDialog.dialogVisible = true;
    },
    addGroup() {
      this.setGroupDialog.type = 'addGroup';
      this.setGroupDialog.dialogVisible = true;
    },
    deleteGroup(oldGroupName: string) {
      this.setGroupDialog.type = 'deleteGroup';
      this.setGroupDialog.oldGroupName = oldGroupName;
    },
    openFriendProfile(friend: friend) {
      friendStore.currentFriend = friend;
      this.$router.replace('/home/friendProfile');
    }
  }
}
</script>

<style lang="scss" scoped>
.group-title-wrapper {
  width: 13.9rem;
  height: 3rem;
  display: flex;
  align-items: center;
}

.content {
  height: 100%;
  display: flex;
  align-items: center;

  .username {
    width: 7.5rem;
    font-size: 1rem;
    line-height: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>