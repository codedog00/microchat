<template>
  <div class="text-wrapper" >
        <span class="text-show" v-show="!isEdit" >
          {{ text || value}} <!-- 如果text未传入就显示绑定的变量 -->
          <el-icon class="btn-edit" @click="isEdit = true"><Edit/></el-icon>
        </span>
    <el-input
        v-show="isEdit"
        v-model="value"
        size="small"
        :autofocus="true"
        @blur="isEdit = false"
    />
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {Edit} from "@element-plus/icons-vue";

export default {
  name: "ModifiableText",
  components: {Edit},
  emits:['update:modelValue'],
  props: {
    //有时候需要对绑定的原始值进行处理后在显示
    text: {
      type: String as PropType<string>,
      default: () => ('')
    },
    //绑定输入
    modelValue: {
      type: String as PropType<string>,
      default: () => (''),
    }
  },
  data() {
    return {
      isEdit: false,
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue',value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-wrapper {
  height: 2rem;
  display: flex;
  align-items: center;

  .text-show {
    display: flex;
    align-items: center;

    .btn-edit {
      transform: translateX(50%);
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
  }
}
</style>