<template>
  <div class="friend-profile-wrapper">
    <div class="profile-panel">
      <VCard
          :name="name"
          :id="currentFriend?.userID"
          :src="currentFriend?.profile.avatar"
          :gender="gender"
          :infos="infos"
      >
        <VCardInfoItem label="备注名">
          <input class="inp_remark"
                 placeholder="编辑备注名"
                 :value="currentFriend?.remark"
                 @blur="updateFriend($event.target.value)"
          />
        </VCardInfoItem>
        <VCardInfoItem v-for="info in infos" :key="info.label" :label="info.label">
          {{info.value}}
        </VCardInfoItem>
        <el-form>
          <el-form-item label="好友分组">
            <el-select v-model="currentFriend.groupList[0]" @change="changeFriendGroup">
              <el-option
                  v-for="group in friendGroupList"
                  :key="group.name"
                  :label="group.name"
                  :value="group.name"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="profile-footer">
            <el-button type="danger" size="large" @click="deleteFriend">删除好友</el-button>
            <el-button type="success" size="large" @click="openConversation">发送消息</el-button>
          </div>
        </template>
      </VCard>
    </div>
  </div>
</template>

<script lang="ts">
import VCard from "@renderer/components/VCard/VCard.vue";
import locationUtils from "@renderer/utils/china_location";
import useFriendStore from "@store/friend/friend";
import useConversationStore from "@store/conversation/conversation";
import VCardInfoItem from "@renderer/components/VCard/VCardInfoItem.vue";
import {ElMessage} from "element-plus";
import emojiMap from "@renderer/utils/emojiMap";

const friendStore = useFriendStore();
const conversationStore = useConversationStore();

export default {
  name: "content-FriendProfile",
  components: { VCardInfoItem, VCard},
  setup() {

    return {
      emojiMap,
    }
  },
  data() {
    return {
      oldGroup: ''
    }
  },
  computed: {
    currentFriend: () => friendStore.currentFriend,
    friendGroupList: () => friendStore.friendGroupList,
    name() {
      return this.currentFriend?.profile.nick || this.currentFriend?.userID
    },
    gender() {
      switch (this.currentFriend?.profile.gender) {
        case this.TIM.TYPES.GENDER_MALE:
          return 'male'
        case this.TIM.TYPES.GENDER_FEMALE:
          return 'female'
        default:
          return 'unknown'
      }
    },
    infos() {
      return [
        // {label: '备注名', value: this.currentFriend?.remark},
        {label: '地区', value: locationUtils.getLocationPath(this.currentFriend?.profile.location) },
        {label: '来源', value: this.currentFriend?.source},
      ]
    }
  },
  beforeUpdate() {
    //在刷新时使用oldGroup记录原来的分组，以便更改分组时使用
    this.oldGroup = this.currentFriend.groupList[0];
  },
  methods: {
    openConversation() {
      conversationStore.checkoutConversation(`C2C${this.currentFriend.userID}`);
      this.$router.replace('/home/conversation');
    },
    updateFriend(value) {
      if(value === this.currentFriend.remark) {
        return;
      }
      this.tim.updateFriend({
        userID: this.currentFriend.userID,
        remark: value,
      })
          .catch(err => {
            ElMessage.error(err);
          })
    },
    changeFriendGroup(option) {
      //从原来分组移除
      this.tim.removeFromFriendGroup({
        name: this.oldGroup,
        userIDList: [this.currentFriend.userID]
      })
          .then(res => {
            if(res.data.failureUserIDList.length === 0) {
              return Promise.resolve();
            }else {
              return Promise.reject();
            }
          })
          .then(() => {
            //添加到新分组
            return this.tim.addToFriendGroup({
              name: option,
              userIDList: [this.currentFriend.userID]
            })
                .then(response => {
                  if(response.data.failureUserIDList.length === 0) {
                    ElMessage.success('修改成功')
                    return Promise.resolve();
                  }else {
                    return Promise.reject()
                  }
                })
          })
          .then(() => {
            //手动刷新好友分组列表（本来应该触发事件，不知道什么问题）
            this.tim.getFriendGroupList()
                .then(res => {
                  friendStore.updateFriendGroups(res.data);
                  //强制刷新，触发原来分组oldGroup的刷新，为下次更改作准备
                  this.$forceUpdate();
                })
          })
          .catch(() => {
            ElMessage.error('修改失败')
          })
    },
    deleteFriend() {
      this.tim.deleteFriend({
        userIDList:[this.currentFriend.userID],
      })
          .then(res => {
            if(res.data.failureUserIDList.length === 0) {
              ElMessage.success('删除成功');
              this.$router.replace('/home');
            }else {
              ElMessage.error('删除出错');
            }
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.friend-profile-wrapper {
  width: 100%;
  height: 100%;
  padding: 5rem;
  background-color: white;

  .profile-panel {
    width: 100%;
    height: 100%;

    .inp_remark {
      width: 100%;
      border: 0;
      outline: 0;
      border-radius: 2px;
      padding: 2px;

      &:focus {
        outline: 1px solid #409EFF;
      }
    }
  }
}

.profile-footer {
  margin-top: 2.5rem;
  padding-bottom: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>