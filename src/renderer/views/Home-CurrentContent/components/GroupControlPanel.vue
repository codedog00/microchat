<template>
  <div >
    <div class="members">
      <el-popover
          v-for="member in members"
          trigger="click"
          placement="bottom"
          @click.stop
      >
        <template #reference>
          <div class="single-member" >
            <el-avatar :src="member.avatar" />
            {{member.nameCard || member.nick ||member.userID}}
          </div>
        </template>
        <div @click.stop>
          <el-descriptions :column="1">
            <el-descriptions-item label="用户ID">{{member.userID}}</el-descriptions-item>
            <el-descriptions-item label="群名片">{{member.nameCard || '暂无'}}</el-descriptions-item>
          </el-descriptions>
          <el-form>
            <el-form-item label="角色" >
              <el-select
                  v-model="member.role"
                  @change="updateRole($event,member.userID)"
                  :disabled="!iAmOwner || member.role === this.TIM.TYPES.GRP_MBR_ROLE_OWNER"
                  size="small">
                <el-option label="管理员" :value="this.TIM.TYPES.GRP_MBR_ROLE_ADMIN" />
                <el-option label="群员" :value="this.TIM.TYPES.GRP_MBR_ROLE_MEMBER" />
                <el-option disabled label="群主" :value="this.TIM.TYPES.GRP_MBR_ROLE_OWNER" />
              </el-select>
            </el-form-item>
          </el-form>
          <el-button
              v-if="member.role === roleMember && profile.selfInfo.role !== roleMember"
              type="danger"
              size="small"
              @click="deleteMember(member)"
          >
            踢出群组
          </el-button>
        </div>
      </el-popover>

    </div>
    <hr color="lightgray">
    <el-form label-position="top" style="padding: 1rem">
      <el-form-item label="群ID">
        {{profile.groupID}}
      </el-form-item>
      <el-form-item label="群名称">
        <el-input
            v-model="profile.name"
            :disabled="profile.selfInfo.role !== this.TIM.TYPES.GRP_MBR_ROLE_OWNER"
        />
      </el-form-item>
      <el-form-item label="群名片">
        <el-input v-model="profile.selfInfo.nameCard" placeholder="在本群所展示昵称"/>
      </el-form-item>
      <el-form-item label="角色">
        {{profile.selfInfo.role}}
      </el-form-item>
      <el-form-item>
        <el-button type="danger" v-if="!iAmOwner" @click="quitGroup">
          退出群聊
        </el-button>
        <el-button type="danger" v-if="iAmOwner" @click="dismissGroup">
          解散群聊
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {PropType, ref} from "vue";
import tim from '@renderer/tim';
import {ElMessage} from "element-plus/es";

export default {
  name: "GroupControlPanel",
  props: {
    profile: {
      type: Object as PropType<group>,
      required: true,
    }
  },
  setup(props) {

    console.log(props.profile.groupID)

    const members = ref(new Array<GroupMember>());

    const updateMembers = () => {
      tim.getGroupMemberList({
        groupID: props.profile.groupID,
        count: 30,
      })
          .then(({data}) => {
            console.log(data.memberList);
            members.value = data.memberList;
          })
    }

    updateMembers()


    return {
      members,
      updateMembers,
    }
  },
  data() {
    return {
      roleMember: this.TIM.TYPES.GRP_MBR_ROLE_MEMBER,
    }
  },
  computed: {
    iAmOwner() {
      return this.profile.selfInfo.role === this.TIM.TYPES.GRP_MBR_ROLE_OWNER;
    },
  },
  methods: {
    deleteMember(member:GroupMember) {
      this.tim.deleteGroupMember({
        groupID: this.profile.groupID,
        userIDList: [member.userID],
      })
          .then(() => {
            ElMessage.success('删除成功');
            this.updateMembers();
          })
          .catch(err => {
            ElMessage.error('删除失败');
            console.error(err);
          })
    },
    updateRole(role:string,userID:string) {
      tim.setGroupMemberRole({
        groupID: this.profile.groupID,
        userID: userID,
        role: role,
      })
          .then(() => {
            ElMessage.success('修改成功');
          })
          .catch(err => {
            ElMessage.error('修改失败');
            console.error(err);
          })
    },
    dismissGroup() {
      this.tim.dismissGroup(this.profile.groupID)
          .then(() => {
            ElMessage.success('解散群成功');
          })
          .catch(err => {
            ElMessage.error('解散群失败');
            console.error(err);
          })
          .finally(() => {
            this.$router.replace('/home')
          })
    },
    quitGroup() {
      this.tim.quitGroup(this.profile.groupID)
          .then(() => {
            ElMessage.success('退出群成功');
          })
          .catch(err => {
            ElMessage.error('退出群失败');
            console.error(err);
          })
          .finally(() => {
            this.$router.replace('/home')
          })
    }
  },
}
</script>

<style lang="scss" scoped>
$members-width: 100%;

.members {
  width: $members-width;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem 0;

  .single-member {
    width: $members-width *0.25;
    height: $members-width * 0.25;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>