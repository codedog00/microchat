<template>
  <el-card class="card-wrapper" :shadow="shadow">

    <el-row>
      <el-col :span="18">
        <el-row align="middle" style="height: 50%;font-size: 1.3rem">
          <div class="name limited-text">{{name}}</div>
          <el-icon :style="{fontSize: '1rem',color: avatarColor}"><Avatar /></el-icon>
        </el-row>
        <el-row style="height: 50%;color: gray">用户ID：{{id}}</el-row>
      </el-col>
      <el-col :span="6">
        <el-avatar size="large" :src="src"/>
      </el-col>
    </el-row>
    <hr>
    <el-row >
      <el-form label-width="5rem" label-position="left">
        <slot></slot>
<!--        <el-form-item v-for="info in infos" :label="info.label">{{info.value}}</el-form-item>-->
      </el-form>
    </el-row>
    <hr>
    <el-row>
      <el-form label-width="5rem" label-position="left">
        <el-form-item label="朋友圈"></el-form-item>
      </el-form>
    </el-row>
    <hr>
    <el-row justify="end">
      <slot name="footer"></slot>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import {Avatar,} from "@element-plus/icons-vue";
import {PropType} from "vue";
export default {
  name: "VCard",
  components: {Avatar},
  props: {
    name: {
      type: String as PropType<string>,
      default: () => (''),
    },
    id: {
      type: String as PropType<string>,
      default: () => (''),
    },
    src: {
      type: String as PropType<string>,
      default: () => (''),
    },
    gender: {
      type: String as PropType<string>,
      default: () => (''),
    },
    infos: {
      type: Array as PropType<Array<{ label:string; value: string;}>>,
      default: () => [],
    },
    shadow: {
      type: String as PropType<string>,
      default: () => 'never'
    }
  },
  computed: {
    avatarColor() {
      let color = 'gray';
      if(this.gender === 'female') color = 'pink';
      if(this.gender === 'male') color = 'lightskyblue';
      return color;
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  padding: 0 1rem;

  .name {
    max-width: 80%;
  }
}

.limited-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>

<style>
.el-card {
  border: 0;
}
</style>