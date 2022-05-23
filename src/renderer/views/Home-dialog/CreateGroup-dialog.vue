<template>
  <el-dialog v-model="dialogStore.homeDialog.dialogVisible" width="40rem">
    <el-transfer
        v-model="selectedFriends"
        :titles="['待添加好友','发起群聊']"
        :data="friendsData"
        filterable
        @change="handleChange"
    >
      <template #right-footer >
        <div class="right-footer">
          <el-button size="small" @click="cancel">
            {{this.$t('buttons.cancel')}}
          </el-button>
          <el-button
              size="small"
              :disabled="selectedFriends.length === 0"
              @click="createGroup"
          >
            {{this.$t('buttons.confirm')}}
          </el-button>
        </div>
      </template>
    </el-transfer>
  </el-dialog>
</template>

<script lang="ts">
import useDialogStore from "@store/dialog/dialog";
import useFriendStore from "@store/friend/friend";
import { ref } from "vue";


export default {
  name: "CreateGroup-dialog",
  setup() {

    const dialogStore = useDialogStore();
    const friendStore = useFriendStore();

    const selectedFriends = ref([])

    return {
      dialogStore,
      friendStore,
      selectedFriends
    }

  },
  computed: {
    friendsData() {
      return this.friendStore.friendList.map(item => {
        return {key: item.userID, label: item.remark||item.profile.nick||item.userID, disabled: false}
      })
    }
  },
  methods: {
    handleChange() {
      console.log(this.selectedFriends);
    },
    cancel() {
      this.dialogStore.homeDialog.dialogVisible = false;
      this.selectedFriends = [];
    },
    createGroup() {
      const members = this.selectedFriends.map(item => ({userID:item}))
      this.tim.createGroup({
        name: `群聊${Math.ceil(Math.random()*10000)}`,
        type: this.TIM.TYPES.GRP_PUBLIC,
        joinOption: this.TIM.TYPES.JOIN_OPTIONS_NEED_PERMISSION, //加群需要经过同意
        memberList: [...members],
      })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.error(err);
          })
          .finally(() => {
            this.dialogStore.homeDialog.dialogVisible = false;
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.right-footer {
  width: 100%;
  height: 100%;
  padding-right: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
</style>