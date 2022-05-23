<template>
  <div class="sidebar-wrapper">
    <div class="left">
      <el-menu v-bind="menu.menuConfig" @select="menu.handleSelect">

        <div class="avatar-wrapper">
          <el-avatar :src="userProfile?.avatar" shape="circle" @click="openProfile"/>
        </div>

        <el-menu-item :index="item.component" v-for="item in menu.menuItems.value" :key="item.component">
          <div class="icon-box">
            <el-badge is-dot :hidden="!item.haveUnread"  style="line-height: 1.5rem">
              <div class="iconfont" :class="item.icon"></div>
            </el-badge>
          </div>
          <template #title>{{ item.title }}</template>
        </el-menu-item>

        <div class="menu-box">
          <el-popover placement="right" trigger="click">
            <template #reference>
              <el-icon class="menu" @click="changeLanguage">
                <Menu/>
              </el-icon>
            </template>
            {{$t('setting.language')}}
          </el-popover>
        </div>

      </el-menu>
    </div>
    <div class="right">
      <div class="list-header" >
        <el-input
            size="small" style="width: 12rem"
            v-model="searchStr"
            :prefix-icon="Search"
            @focus="openSearchList"
            @keydown.esc.exact="showSearchList = false"
            @click.stop
        />
        <el-button
            plain size="small"
            style="width: 1.8rem"
            @click="openCreateGroupDialog"
        >
          <el-icon><Plus/></el-icon>
        </el-button>
      </div>
        <SearchList v-if="showSearchList" :search-str="searchStr" :results="searchResults"/>
        <component :is="menu.currentComponent.value" v-else ></component>
    </div>
  </div>

</template>

<script lang="ts">
import {Document, Location, Menu, Plus, Setting, Search} from "@element-plus/icons-vue";
import ConversationList from "@renderer/views/Home-Sidebar/components/ConversationList.vue";
import FriendList from "@renderer/views/Home-Sidebar/components/FriendList.vue";
import GroupList from "@renderer/views/Home-Sidebar/components/GroupList.vue";
import SearchList from "@renderer/views/Home-Sidebar/components/SearchList.vue";
import {i18n, setLanguage} from "@renderer/i18n";
import useMenu from "@renderer/views/Home-Sidebar/composables/useMenu";
import {storeToRefs} from "pinia";
import useUserStore from "@store/user/user";
import useDialogStore from "@store/dialog/dialog";
import useGroupStore from "@store/group/group";
import useFriendStore from "@store/friend/friend";

const dialogStore = useDialogStore();
const friendStore = useFriendStore();
const groupStore = useGroupStore();

export default {
  name: "SideBar",
  components: {
    SearchList, GroupList, FriendList, Plus, ConversationList, Location, Setting, Document, Menu
  },
  setup() {
    const userStore = useUserStore();
    const {userProfile} = storeToRefs(userStore);
    const menu = useMenu();

    return {
      userProfile,
      Search,
      menu
    }
  },
  data() {
    return {
      searchStr: '',
      searchResults: [],
      showSearchList: false,
    }
  },
  watch: {
    searchStr(newValue) {
      if(newValue === '') {
        this.searchResults = [];
        return;
      }
      const searchReg = new RegExp(newValue.toLowerCase());
      const friendResults = friendStore.friendList.filter(friendItem => {
        const name = friendItem.remark || friendItem.profile.nick || friendItem.userID;

        return searchReg.test(name.toLowerCase());

      })

      const groupResults = groupStore.groupList.filter(groupItem => {

        return searchReg.test(groupItem.name.toLowerCase() || groupItem.groupID.toLowerCase());
      })

      this.searchResults = [{title: '联系人', listData:[...friendResults]},{title: '群聊',listData: [...groupResults]}];
    }
  },
  methods: {
    openProfile() {
      dialogStore.openHomeDialog('Profile')
    },
    openCreateGroupDialog() {
      dialogStore.openHomeDialog('CreateGroupDialog');
    },
    changeLanguage() {
      setLanguage(i18n.global.locale === "zh-cn" ? "en" : "zh-cn");
    },
    openSearchList() {
      this.showSearchList = true;
      setTimeout(() => {
        document.addEventListener('click',this.closeSearchList)
      },100)
    },
    closeSearchList() {
      setTimeout(() => {
        this.showSearchList = false;
        this.searchStr = '';
        document.removeEventListener('click',this.closeSearchList);
      },100)
    }
  }
}
</script>

<style lang="scss" scoped>

.sidebar-wrapper {

  $left-with: 4rem;

  width: 100%;
  height: 100%;
  display: flex;

  .left {
    width: $left-with;
    height: 100%;

    .avatar-wrapper {
      padding-top: 0.5rem;
      width: 4rem;
      height: 6rem;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icon-box {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-box {
      width: $left-with;
      height: $left-with;
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: #777;

      .menu {
        &:hover {
          color: #999;
        }

        &:active {
          color: #57be6a;
        }
      }
    }
  }

  .right {
    flex-grow: 1;
    background-color: rgb(245, 245, 245);
    display: flex;
    flex-direction: column;

    .list-header {
      width: 100%;
      height: 3.5rem;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>