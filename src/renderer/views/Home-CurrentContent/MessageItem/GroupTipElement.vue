<template>
  <div class="group-tip">
    {{messageForShow}}
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import useUserStore from "@store/user/user";

const userStore = useUserStore();

export default {
  name: "GroupTipElement",
  props: {
    message: {
      type: Object as PropType<message>,
      required: true,
    }
  },
  computed: {
    userID: () => userStore.userProfile.userID,
    messageForShow() {
      let nick = this.message.nick
          || ((this.message.from === this.userID) && this.currentUserProfile.nick)
          || this.message.from

      const userName = this.message.nick || this.message.payload.userIDList.join(',')
      switch (this.message.payload.operationType) {
        case this.TIM.TYPES.GRP_TIP_MBR_JOIN:
          return `群成员：${userName} 加入群组`
        case this.TIM.TYPES.GRP_TIP_MBR_QUIT:
          return `群成员：${userName} 退出群组`
        case this.TIM.TYPES.GRP_TIP_MBR_KICKED_OUT:
          return `群成员：${userName} 被${this.message.payload.operatorID}踢出群组`
        case this.TIM.TYPES.GRP_TIP_MBR_SET_ADMIN:
          return `群成员：${userName} 成为管理员`
        case this.TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
          return `群成员：${userName} 被撤销管理员`
        case this.TIM.TYPES.GRP_TIP_GRP_PROFILE_UPDATED:
          return '群资料修改'
        case this.callTips:
          if(this.message.payload.text.indexOf('结束群聊')> -1) {
            return  `"${this.message.payload.text}"`
          }else {
            return  `"${nick}" ${this.message.payload.text}`
          }
        case this.TIM.TYPES.GRP_TIP_MBR_PROFILE_UPDATED:
          for (let member of this.message.payload.memberList) {
            if (member.muteTime > 0) {
              return `群成员：${member.userID}被禁言${member.muteTime}秒`
            } else {
              return `群成员：${member.userID}被取消禁言`
            }
          }
          break
        default:
          return '[群提示消息]'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.group-tip {
  font-size: 0.7rem;
  color: gray;
  background-color: white;
  padding: 4px;
  border-radius: 5px;
}
</style>