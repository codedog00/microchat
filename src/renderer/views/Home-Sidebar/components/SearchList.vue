<template>
  <div class="search-list-wrapper">
    <List>
      <SubList :title="group.title" v-for="group in results" :key="group.title">
        <ListItem v-for="item in group.listData">
          <SearchListItem
              v-if="group.title === '联系人'"
              :src="item.profile.avatar"
              :name="item.remark || item.profile.nick || item.userID"
              @click="openVCard(item)"
          />
          <GroupItem
              v-if="group.title === '群聊'"
              :group="item"
          />
        </ListItem>
        <div class="footer">
          <SearchListItem
              v-if="group.title === '联系人'"
              :src="icon_addFriend"
              :name="`搜索ID:${searchStr}`"
              @click="searchUserByID"
          />
          <SearchListItem
              v-if="group.title === '群聊'"
              :src="icon_group"
              :name="`搜索群ID：${searchStr}`"
              @click="searchGroupByID"
          >
          </SearchListItem>
        </div>
      </SubList>
    </List>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import icon_addFriend from '@renderer/assets/icons/svg/add-friend.svg';
import icon_group from '@renderer/assets/icons/svg/group.svg';
import List from "@renderer/components/List/List.vue";
import SubList from "@renderer/components/List/SubList.vue";
import ListItem from "@renderer/components/List/ListItem.vue";
import GroupItem from "@renderer/components/SidebarList/GroupItem.vue";
import SearchListItem from "@renderer/components/SidebarList/SearchListItem.vue";
import {ElMessage} from "element-plus";
import useDialogStore from "@store/dialog/dialog";


export default {
  name: "SearchList",
  components: { SearchListItem, GroupItem, ListItem, SubList, List},
  props: {
    searchStr: {
      type: String as PropType<string>,
      required: true,
    },
    results: {
      type: Array as PropType<Array<any>>,
      default: () => [],
    }
  },
  setup() {

    const dialogStore = useDialogStore();

    return {
      icon_addFriend,
      icon_group,
      dialogStore
    }
  },
  methods: {
    searchUserByID() {
      this.tim.getUserProfile({userIDList: [this.searchStr]})
          .then(res => {
            console.log(res.data);
            if(res.data.length === 0) {
              ElMessage.error('用户不存在')
            }else {
              let data:VCardDialogData = {relationship: 'stranger',data: res.data[0]}
              this.dialogStore.openHomeDialog('VCardDialog',data)
            }
          })
          .catch(err => {
            ElMessage.error('搜索失败')
            console.log(err);
          })
    },
    searchGroupByID() {
      this.tim.searchGroupByID(this.searchStr)
          .then(res => {
            const group = res.data.group as group;
            const flag = confirm(`是否加入群聊：${group.name}`)
            if(flag) {
              this.tim.joinGroup({
                groupID: group.groupID,
              })
                  .then(imResponse => {
                    switch (imResponse.data.status) {
                      case this.TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
                        ElMessage.success('申请成功，请等待管理员同意');
                        break;
                      case this.TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
                        ElMessage.success('加群成功')
                        break;
                      case this.TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
                        ElMessage.warning('已在群中')
                        break;
                      default:
                        break;
                    }
                  })
            }
          })
          .catch(err => {
            ElMessage.error('群组不存在');
            console.error(err);
          })
    },
    openVCard(friend:friend) {
      let data:VCardDialogData = {relationship: 'friend',data: friend};
      this.dialogStore.openHomeDialog('VCardDialog',data)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-list-wrapper {

  width: 100%;
  background-color: white;

  .footer {
    padding: 0.5rem 1rem;

    &:hover {
      background-color: #e5e5e5;
    }
  }
}
</style>