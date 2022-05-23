<template>
  {{messageForShow}}
  <div class="footer" v-if="isShowFooter">
    <el-button type="success" size="small" @click="handleGroupApplication('Agree')">接受</el-button>
    <el-button size="small" @click="handleGroupApplication('Reject')">拒绝</el-button>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {ElMessage} from "element-plus/es";

export default {
  name: "GroupSystemNoticeElement",
  props: {
    message: {
      type: Object as PropType<message>,
      required: true,
    }
  },
  computed: {
    messageForShow() {
      const groupName = this.message.payload.groupProfile.name || this.message.payload.groupProfile.groupID
      switch (this.message.payload.operationType) {
        case 1:
          return `${this.message.payload.operatorID} 申请加入群组：${groupName}`
        case 2:
          return `成功加入群组：${groupName}`
        case 3:
          return `申请加入群组：${groupName}被拒绝`
        case 4:
          return `你被管理员${this.message.payload.operatorID}踢出群组：${groupName}`
        case 5:
          return `群：${groupName} 已被${this.message.payload.operatorID}解散`
        case 6:
          return `${this.message.payload.operatorID}创建群：${groupName}`
        case 7:
          return `${this.message.payload.operatorID}邀请你加群：${groupName}`
        case 8:
          return `你退出群组：${groupName}`
        case 9:
          return `你被${this.message.payload.operatorID}设置为群：${groupName}的管理员`
        case 10:
          return `你被${this.message.payload.operatorID}撤销群：${groupName}的管理员身份`
        case 12:
          return `${this.message.payload.operatorID}邀请你加群：${groupName}`
        case 13:
          return `${this.message.payload.operatorID}同意加群：${groupName}`
        case 14:
          return `${this.message.payload.operatorID}拒接加群：${groupName}`
        case 255:
          return '自定义群系统通知: ' + this.message.payload.userDefinedField
      }
    },
    isShowFooter() {
      return this.message.payload.operationType === 1 ;
    },
  },
  methods: {
    handleGroupApplication(action:string) {
      this.tim.handleGroupApplication({
        handleAction: action,
        message: this.message // 申请加群群系统通知的消息实例
      })
          .then(res => {
            ElMessage.success('已同意');
          })
          .catch(err => {
            ElMessage.error('失败');
            console.error(err);
          })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>