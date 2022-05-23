<template>
  <el-dialog
      v-model="homeDialog.dialogVisible"
      width="20rem"
      title="申请添加好友"
  >
    <el-form label-position="top">
      <el-form-item label="发送添加朋友申请">
        <el-input type="textarea" v-model="wording"/>
      </el-form-item>
      <el-form-item label="添加备注">
        <el-input v-model="remark"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button plain>{{this.$t('buttons.cancel')}}</el-button>
      <el-button type="success" @click="addFriend">
        {{this.$t('buttons.confirm')}}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import useDialogStore from "@store/dialog/dialog";
import {ElMessage} from "element-plus";
import UserAPI from "@renderer/api/user";

const dialogStore = useDialogStore();

export default {
  name: "AddFriend-dialog",
  data() {
    return {
      wording: '',
      remark: '',
    }
  },
  computed: {
    homeDialog: () => dialogStore.homeDialog,
    data() {
      if(dialogStore.homeDialog.currentHomeDialog === 'AddFriendDialog') {
        return dialogStore.homeDialog.data as addFriendDialogData
      }else {
        return null
      }
    }
  },
  methods: {
    addFriend() {
      this.tim.addFriend({
        to: this.data.userID,
        source: 'AddSource_Type_Network',
        remark: this.remark,
        groupName: '我的好友',
        wording: this.wording,
      })
          .then(res => {
            console.log(res.data.code)
            if(res.data.code === 30539) {
              ElMessage.success('请等待对方确认')
            }else if(res.data.code === 0) {
              ElMessage.success('添加好友成功')
            }

          })
          .catch(err => {
            console.error(err);
          })
          .finally(() => {
            dialogStore.closeHomeDialog();
          })

    }
  }
}
</script>

<style lang="scss" scoped>
.user-item {
  position: relative;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  .avatar {
    margin-right: 1rem;
  }
  .btn-add {
    position: absolute;
    right: 0;
  }
}
</style>