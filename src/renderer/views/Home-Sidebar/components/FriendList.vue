<template>
  <el-menu>
    <el-sub-menu index="friendApplication">
      <template #title>
          <div class="group-title-wrapper">
            新的好友
          </div>
      </template>
      <SidebarListItem
          v-for="application in friendApplicationList.friendApplicationList"
          :src="application.avatar || avatar_person"
          @click="openHandleApplicationDialog(application)"
      >
        <div class="content">
          <div class="username">
            {{ application.nick || application.userID }}
          </div>
        </div>
      </SidebarListItem>
      <el-dialog v-model="setHandleApplicationDialog.visible" width="20rem">
        <el-form>
          <el-form-item label="留言">
            <el-input
                disabled
                type="textarea"
                v-model="setHandleApplicationDialog.application.wording"
            />
          </el-form-item>
          <el-form-item>
            <div style="width: 100%;display: flex;justify-content: end">
              <el-button type="success" @click="acceptFriendApplication">同意</el-button>
              <el-button @click="refuseFriendApplication">拒绝</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-sub-menu>
    <el-sub-menu v-for="group in friendStore.friendsClassifiedByGroup" :index="group.name">
      <template #title>
        <el-dropdown trigger="contextmenu">
          <div class="group-title-wrapper">
            {{ group.name }}
          </div>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="renameGroup(group.name)">
                {{ this.$t('friend.group.renameGroup') }}
              </el-dropdown-item>
              <el-dropdown-item @click="addGroup">
                {{ this.$t('friend.group.addGroup') }}
              </el-dropdown-item>
              <el-dropdown-item @click="deleteGroup(group.name)">
                {{ this.$t('friend.group.deleteGroup') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </template>

      <SidebarListItem
          v-for="friend in group.friendList"
          :index="friend.userID"
          :src="friend.profile.avatar || avatar_person"
          @click="openFriendProfile(friend)"
      >
        <div class="content">
          <div class="username">
            {{ friend.remark || friend.profile.nick || friend.userID }}
          </div>
        </div>
      </SidebarListItem>
    </el-sub-menu>

    <el-dialog v-model="setGroupDialog.dialogVisible" width="20rem">
      <el-input v-model="setGroupDialog.newGroupName"/>
      <template #footer>
        <el-button size="small" @click="setGroupDialog.dialogVisible = false">
          {{ this.$t('buttons.cancel') }}
        </el-button>
        <el-button type="success" size="small" @click="setGroup">
          {{ this.$t('buttons.confirm') }}
        </el-button>
      </template>
    </el-dialog>

  </el-menu>
</template>

<script lang="ts">
import SidebarListItem from "@renderer/components/SidebarList/SidebarListItem.vue";
import SidebarList from "@renderer/components/SidebarList/SidebarList.vue";
import {ElMessage} from "element-plus";
import useFriendStore from "@store/friend/friend";
import useDialogStore from "@store/dialog/dialog";
import avatar_person from "@renderer/assets/avatar/person.png";

const friendStore = useFriendStore();
const dialogStore = useDialogStore();

export default {
  name: "FriendList",
  components: {SidebarList, SidebarListItem},
  setup() {
    return {
      friendStore,
      avatar_person,
    }
  },
  data() {
    return {
      setHandleApplicationDialog: {
        visible: false,
        application: null as FriendApplication,
      },
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
    openHandleApplicationDialog(application: FriendApplication) {
      this.setHandleApplicationDialog.visible = true;
      this.setHandleApplicationDialog.application = application;
    },
    acceptFriendApplication() {
      const currentUserID = this.setHandleApplicationDialog.application.userID;
      this.tim.acceptFriendApplication({
        userID: currentUserID,

        type: this.TIM.TYPES.SNS_APPLICATION_AGREE_AND_ADD,
      })
          .then(() => {
            ElMessage.success('已同意');
            this.tim.addToFriendGroup({
              name: '我的好友',
              userIDList: [currentUserID]
            })
                .then(res => {
                  if(res.data.failureUserIDList.length !== 0) {
                    console.error('初始化分组失败')
                  }else {
                    //手动刷新好友分组列表（本来应该触发事件，不知道什么问题）
                    this.tim.getFriendGroupList()
                        .then(res => {
                          friendStore.updateFriendGroups(res.data);
                          //强制刷新，触发原来分组oldGroup的刷新，为下次更改作准备
                          this.$forceUpdate();
                        })
                  }
                })
          })
          .catch(err => {
            ElMessage.error('操作失败');
            console.error(err);
          })
          .finally(() => {
            this.setHandleApplicationDialog.visible = false;
          })
    },
    refuseFriendApplication() {
      this.tim.refuseFriendApplication({
        userID: this.setHandleApplicationDialog.application.userID,
      })
          .then(() => {
            ElMessage.success('已拒绝');
          })
          .catch(err => {
            ElMessage.error('操作失败');
            console.error(err);
          })
          .finally(() => {
            this.setHandleApplicationDialog.visible = false;
          })
    },
    setGroup() {
      if (this.setGroupDialog.type === 'renameGroup') {
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
              this.$forceUpdate();
            })
      } else if (this.setGroupDialog.type === 'addGroup') {
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
              this.$forceUpdate();
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
              this.$forceUpdate();
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
      this.setGroup();
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