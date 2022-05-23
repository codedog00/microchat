<template>
  <el-dialog
      v-model="dialogStore.homeDialog.dialogVisible"
      :show-close="false"
      :modal="false"
      :draggable="true"
      width="23rem"
  >
    <VCard
        :name="name"
        :id="profile?.userID"
        :gender="gender"
        :infos="infos"
    >
      <VCardInfoItem v-for="info in infos" :key="info.label" :label="info.label">
        {{info.value}}
      </VCardInfoItem>
      <template #footer>
        <el-icon
            class="btn-chat"
            v-if="data.relationship === 'friend'"
            @click="openConversation"
        >
          <ChatRound/>
        </el-icon>
        <img style="cursor: pointer;"
             v-if="data.relationship === 'stranger'"
             :src="icon_addFriendOutlined"
             alt="add-friend"
             @click="addFriend"
        >
      </template>
    </VCard>
  </el-dialog>
</template>

<script lang="ts">
import useDialogStore from "@store/dialog/dialog";
import useConversationStore from "@store/conversation/conversation";
import VCard from "@renderer/components/VCard/VCard.vue";
import {ChatRound} from "@element-plus/icons-vue";
import locationUtils from "@renderer/utils/china_location";
import icon_addFriendOutlined from '@renderer/assets/icons/svg/add-friends-outlined.svg'
import VCardInfoItem from "@renderer/components/VCard/VCardInfoItem.vue";


const dialogStore = useDialogStore();
const conversationStore = useConversationStore()

export default {
  name: "VCard-dialog",
  components: {VCardInfoItem, ChatRound, VCard},
  setup() {
    return {
      dialogStore,
      conversationStore,
      icon_addFriendOutlined,
    }
  },
  computed: {
    data() {
      if(dialogStore.homeDialog.currentHomeDialog === 'VCardDialog'){
        return  dialogStore.homeDialog.data as VCardDialogData;
      }else{
        return null;
      }

    },
    profile() {
      if(this.data.relationship === 'friend') {
        return this.data.data?.profile as profile;
      }else {
        return this.data.data as profile;
      }
    },
    name() {
      return this.profile?.nick || this.profile?.userID;
    },
    gender() {
      switch (this.profile?.gender) {
        case this.TIM.TYPES.GENDER_MALE:
          return 'male'
        case this.TIM.TYPES.GENDER_FEMALE:
          return 'female'
        default:
          return 'unknown'
      }
    },
    infos() {
      if(this.data.relationship === 'friend') {
        let friend = this.data.data as friend;

        return [
          {label: '备注名', value: friend?.remark},
          {label: '地区', value: locationUtils.getLocationPath(friend?.profile.location) },
          {label: '来源', value: friend?.source},
        ]
      }else {
        return [
          {label: '地区', value: locationUtils.getLocationPath(this.profile?.location)},
        ]
      }

    },

  },
  methods: {
    addFriend() {
      let data: addFriendDialogData = {
        userID: this.profile.userID,
        source: this.$t('friend.sourceType.network')
      }
      dialogStore.openHomeDialog('AddFriendDialog',data)
    },
    openConversation() {
      conversationStore.checkoutConversation(`C2C${this.profile.userID}`);
      this.$router.replace('/home/conversation');
      dialogStore.homeDialog.dialogVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-chat {
  font-size: 1.5rem;
  cursor: pointer;

  &:active {
    color: gray;
  }
}
</style>