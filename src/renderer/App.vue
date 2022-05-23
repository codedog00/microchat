<template>
  <title-bar />
  <el-config-provider :locale="i18nt">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { ElConfigProvider } from "element-plus";
import { i18n } from "./i18n";
import TitleBar from "./components/common/TitleBar.vue";
import TIM from 'tim-js-sdk/tim-js-friendship.js'
import tim from "@renderer/tim";
import {ElMessage} from "element-plus/es";
import useUserStore from "@store/user/user";
import useConversationStore from "@store/conversation/conversation";
import useFriendStore from "@store/friend/friend";
import useGroupStore from "@store/group/group";

const userStore = useUserStore();
const conversationStore = useConversationStore();
const friendStore = useFriendStore();
const groupStore = useGroupStore();

const i18nt = computed(() => i18n.global.messages[i18n.global.locale].el);

function initListener() {
  // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
  tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, this)
  // SDK NOT READY
  tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate)
  // 被踢出
  tim.on(TIM.EVENT.KICKED_OUT, onKickOut)
  // SDK内部出错
  tim.on(TIM.EVENT.ERROR, handleError)
  // 收到新消息
  tim.on(TIM.EVENT.MESSAGE_RECEIVED, onReceiveMessage)
  // 会话列表更新
  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, onUpdateConversationList)
  // 群组列表更新
  tim.on(TIM.EVENT.GROUP_LIST_UPDATED, onUpdateGroupList)
  // 网络监测
  tim.on(TIM.EVENT.NET_STATE_CHANGE, onNetStateChange)
  // 已读回执
  tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, onMessageReadByPeer)
  // 收到好友列表更新通知
  tim.on(TIM.EVENT.FRIEND_LIST_UPDATED, onFriendListUpdated)
  // 收到好友申请列表更新通知
  tim.on(TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED, onFriendApplicationListUpdated)
  // 好友分组更新
  tim.on(TIM.EVENT.FRIEND_GROUP_LIST_UPDATED, onFriendGroupListUpdated)

}

function onReadyStateUpdate(e) {
  if(e.name === TIM.EVENT.SDK_READY){
    tim.getMyProfile()
        .then(({data}) => {
          userStore.userProfile = data;
        })
        .catch(err => {
          ElMessage.error(err);
        })
  }else {
    ElMessage.error(e.name)
    userStore.loginFailure();
  }
}
function onKickOut() {

}
function onReceiveMessage(e) {
  console.error(e.data);
  conversationStore.pushCurrentMessageList(e.data);
}
function onUpdateConversationList(e) {
  conversationStore.updateConversationList(e.data);
}
function onUpdateGroupList(e) {
  groupStore.updateGroupList(e.data);
}
function onNetStateChange() {

}
function onMessageReadByPeer() {

}
function onFriendListUpdated(e) {
  friendStore.updateFriendList(e.data)
}
function onFriendApplicationListUpdated(e) {
  console.log(e.data);
  friendStore.friendApplicationList = e.data;
}
function onFriendGroupListUpdated(e) {
  console.log('好友列表事件触发')
  friendStore.updateFriendGroups(e.data);
}
function handleError(e) {
  console.error(e)
}

onMounted(() => {
  initListener();
  if(userStore.user) {

    tim.login({userID: userStore.user.username ,userSig: userStore.user.accessToken})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
          userStore.logout();
        })
  }
})

</script>

<style lang="scss">
$background-light:#f5f5f5;
$base: #1c2438;
</style>
