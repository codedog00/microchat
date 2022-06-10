<template>
  <div class="conversation-wrapper">

    <div class="top-bar">
      {{ title }}
      <el-icon
          class="more"
          v-if="currentConversation?.type !== this.TIM.TYPES.CONV_SYSTEM"
          @click="isShowDrawer = true"
      >
        <MoreFilled/>
      </el-icon>
    </div>


    <div class="message-area">
      <MessageBox style="flex-grow: 1;" :selection-mode="selectionMode" v-model:selected-group="selectedGroup">
          <MessageItem
              v-for="message in currentMessageList"
              :key="message.ID"
              :message="message"

          />
      </MessageBox>

      <MessageSendBox
          v-if="currentConversation?.type !== this.TIM.TYPES.CONV_SYSTEM"
          v-model="messageContent"
          @sendMessage="sendMessage"
      >
        <template #menu>
          <el-popover
              ref="emojisPopover"
              placement="top"
              width="15rem"
              trigger="click"
          >
            <template #reference>
              <el-icon style="margin: 0 0.5rem;" size="1.5rem"><Eleme/></el-icon>
            </template>
            <div class="emojis">
              <div v-for="emoji in emojiMap" class="emoji" @click="inputEmoji(emoji)">
                {{emoji}}
              </div>
            </div>
          </el-popover>

          <el-icon style="margin: 0 0.5rem;" size="1.5rem" @click="this.$refs.imagePicker.click()">
            <Picture/>
            <input ref="imagePicker" type="file"
                   accept=".jpg, .jpeg, .png, .gif, .bmp"
                   style="display:none" @change="sendPicture"
            />
          </el-icon>

          <el-icon style="margin: 0 0.5rem;" size="1.5rem" @click="this.$refs.filePicker.click()">
            <FolderOpened/>
            <input type="file" id="filePicker" ref="filePicker" @change="sendFile" style="display:none" />
          </el-icon>
        </template>
      </MessageSendBox>
      <Drawer v-model="isShowDrawer" width="16rem" style="height: calc(100%);box-shadow: -3px 0 4px rgba(0,0,0,0.1)">
        <ConversationControlPanel :type="currentConversation?.type" :profile="currentConversation?.groupProfile"/>
      </Drawer>

    </div>


  </div>
</template>

<script lang="ts">
import MessageBox from "@renderer/components/MessageBox/MessageBox.vue";
import MessageRow from "@renderer/components/MessageBox/MessageRow.vue";
import {Eleme, FolderOpened, MoreFilled, Picture, Plus} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import MessageItem from "@renderer/views/Home-CurrentContent/MessageItem/MessageItem.vue";
import Drawer from "@renderer/components/Drawer/Drawer.vue";
import MessageSendBox from "@renderer/components/MessageBox/MessageSendBox.vue";
import ConversationControlPanel from "@renderer/views/Home-CurrentContent/components/ConversationControlPanel.vue";
import useConversationStore from "@store/conversation/conversation";
import useDialogStore from "@store/dialog/dialog";
import useFriendStore from "@store/friend/friend";
import useUserStore from "@store/user/user";
import emojiMap from "@renderer/utils/emojiMap";

const conversationStore = useConversationStore();
const dialogStore = useDialogStore();
const friendStore = useFriendStore();
const userStore = useUserStore();

export default {
  name: "content-conversation",
  components: {
    Picture,
    ConversationControlPanel,
    MessageSendBox,
    Drawer, MoreFilled, MessageItem, Plus, FolderOpened, Eleme, MessageRow, MessageBox},
  setup() {
    return {
      emojiMap
    }
  },
  data() {
    return {
      selectionMode: false,
      selectedGroup: [],
      messageContent: '',
      isShowDrawer: false,
      drawerSty: {
        width: '0rem'
      }
    }
  },
  computed: {
    currentConversation: () => conversationStore.currentConversation,
    currentMessageList: () => conversationStore.currentMessageList,
    toAccount: () => conversationStore.toAccount,
    title() {
      switch (this.currentConversation?.type) {
        case "C2C":
          return this.currentConversation?.remark ||
              this.currentConversation?.userProfile.nick ||
              this.currentConversation?.userProfile.userID
        case "GROUP":
          return this.currentConversation.groupProfile.name || this.currentConversation.groupProfile.groupID
        case "SYSTEM":
          return '系统消息'
        default:
          return ''
      }
    }
  },
  methods: {
    inputEmoji(emoji: string) {
      this.messageContent += emoji;
      this.$refs.emojisPopover.hide();
    },
    sendMessage() {
      if (this.messageContent === '') {
        ElMessage.info('不能发送空白消息')
        return;
      }
      conversationStore.sendMessage({text: this.messageContent},'text')
          .then(() => {
            this.messageContent = '';
          })
          .catch(err => {
            ElMessage.error(err.message);
          })
    },
    sendPicture(e) {
      conversationStore.sendMessage({file: e.target},'img')
          .catch(err => {
            ElMessage.error('发送失败')
            console.error(err);
          })
    },
    sendFile(e) {
      conversationStore.sendMessage({file: e.target,},'file')
          .catch(err => {
            ElMessage.error('发送失败')
            console.error(err)
          })
    }
  },
}
</script>

<style lang="scss" scoped>

.conversation-wrapper {
  --bgcolor: #F3F3F3;
  --top-height: 3.5rem;

  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: red;

  .top-bar {
    position: relative;
    z-index: 10;
    width: 100%;
    height: var(--top-height);
    flex-shrink: 0;
    font-size: 1.1rem;
    padding: 0 1.4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--bgcolor);
    border-bottom: 1px solid #E0E0E0;

    .more {
      position: absolute;
      right: .8rem;
      font-size: 1.3rem;
      cursor: pointer;

      &:active {
        color: gray;
      }
    }
  }

  .message-area {
    position: relative;
    overflow: hidden;
    height: calc(100% - var(--top-height));
    width: 100%;
    display: flex;
    flex-direction: column;

  }

}

.emojis {
  //width: 10rem;
  height: 160px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;

  .emoji {
    height: 40px;
    width: 40px;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: lightgray;
    }
  }
}
</style>