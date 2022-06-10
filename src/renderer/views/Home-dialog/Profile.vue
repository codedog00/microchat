<template>
  <el-dialog
      v-model="dialogStore.homeDialog.dialogVisible"
      :draggable="true"
      width="18rem" custom-class="my-dialog"
      @closed="closed"
  >
    <div class="profile-wrapper">
      <ModifiableAvatar
          :src="userStore.userProfile.avatar"
          :size="70"
          :on-success="afterAvatarUpdate"
      />
      <!--  显示用户名  -->
      <ModifiableText
          :text="userProfile?.nick || userProfile?.userID"
          v-model="modifiableUserProfile.nick"
      />

      <!--   显示个性签名   -->
      <ModifiableText
          :text="modifiableUserProfile.selfSignature || this.$t('profile.notSetSelfSignature')"
          v-model="userStore.userProfile.selfSignature"
      />

      <hr style="width: 100%"/>

      <el-form v-model="userStore.userProfile" label-width="4.5rem">

        <el-form-item :label="'用户名'">
          <el-input disabled v-model="userStore.userProfile.userID"/>
        </el-form-item>

        <el-form-item :label="this.$t('profile.gender')">
          <el-select
              v-model="userStore.userProfile.gender"
              :placeholder="modifiableUserProfile.gender || this.$t('profile.genderTypeName.notSet')"
          >
            <el-option
                :value="this.TIM.TYPES.GENDER_FEMALE"
                :label="this.$t('profile.genderTypeName.female')"
            />
            <el-option
                :value="this.TIM.TYPES.GENDER_MALE"
                :label="this.$t('profile.genderTypeName.male')"
            />
            <el-option
                :value="this.TIM.TYPES.GENDER_UNKNOWN"
                :label="this.$t('profile.genderTypeName.unknown')"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="this.$t('profile.birthday')">
          <el-date-picker
              v-model="userStore.userProfile.birthday"
              :placeholder="this.$t('profile.pickADay')"
              style="width: 100%"
          />
        </el-form-item>

        <el-form-item :label="this.$t('profile.location')">
          <el-cascader v-model="selectedLocation" :options="locations"/>
        </el-form-item>

        <el-form-item :label="this.$t('profile.allowType')">
          <el-select v-model="userStore.userProfile.allowType">
            <el-option
                :value="this.TIM.TYPES.ALLOW_TYPE_ALLOW_ANY"
                :label="this.$t('profile.allowTypeName.allowAny')"
            />
            <el-option
                :value="this.TIM.TYPES.ALLOW_TYPE_NEED_CONFIRM"
                :label="this.$t('profile.allowTypeName.needConfirm')"
            />
            <el-option
                :value="this.TIM.TYPES.ALLOW_TYPE_DENY_ANY"
                :label="this.$t('profile.allowTypeName.denyAny')"
            />
          </el-select>
        </el-form-item>

      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogStore.homeDialog.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateProfile">确认</el-button>
      </span>
    </template>

  </el-dialog>

</template>

<script lang="ts">
import {storeToRefs} from "pinia";
import useUserStore from "@store/user/user";
import useDialogStore from "@store/dialog/dialog";
import {Edit, Plus} from "@element-plus/icons-vue";
import ModifiableText from "@renderer/components/ModifiableText/ModifiableText.vue";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import ModifiableAvatar from "@renderer/components/Avatar/ModifiableAvatar.vue";
import locationUtils from "@renderer/utils/china_location";

const userStore = useUserStore();
const dialogStore = useDialogStore();

export default {
  name: "Profile",
  components: {ModifiableAvatar, Plus, ModifiableText, Edit},
  setup() {
    return {
      dialogStore,
      userStore
    }
  },
  data() {
    return {
      modifiableUserProfile: {...userStore.userProfile},
    }
  },
  computed: {
    userProfile:() => userStore.userProfile,
    selectedLocation: {
      get() {
        return locationUtils.strToArr(this.modifiableUserProfile.location)
      },
      set(value: string[]) {
        this.modifiableUserProfile.location = locationUtils.arrToStr(value);
      }
    },
    locations() {
      return locationUtils.locationsObj();
    }
  },
  methods: {
    updateProfile() {
      let {nick, selfSignature, gender, birthday, allowType,location} = userStore.userProfile
      this.userStore.updateProfile({
        nick, selfSignature, gender: this.TIM.TYPES.GENDER_MALE, birthday: Number(birthday), allowType,location
      })
          .then(data => {
            ElMessage.success('修改成功')
            dialogStore.closeHomeDialog();
          })
    },
    afterAvatarUpdate(res) {
      this.userStore.updateProfile({avatar: res.avatarURL ?? ''})
          .then(data => {
            ElMessage.success(res.message);
          })
    },
    closed() {
      //恢复初始值
      this.modifiableUserProfile = {...this.userProfile};
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

}

</style>

<style lang="scss">
//取消el-dialog的padding
.my-dialog {
  .el-dialog__body {
    padding-top: 0;
  }
}
</style>