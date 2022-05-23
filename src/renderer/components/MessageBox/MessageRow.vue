<template>
  <el-row class="message-row" :class="position">
    <el-avatar :src="src" class="avatar" @click="this.$emit('avatarClick')"/>
    <div class="content">
      <div class="name">
        {{title}}
      </div>
      <slot></slot>
    </div>
    <input
        type="checkbox"
        v-if="selectionMode"
        :name="index"
        @change="handleChange"
        style="margin-top: 2rem"
        class="checkbox"
    />
  </el-row>
</template>

<script lang="ts">

import {inject, PropType} from "vue";
import MessageBubble from "@renderer/components/MessageBox/MessageBubble.vue";

export default {
  name: "MessageRow",
  components: { MessageBubble},
  emits: {
    avatarClick() {
      return true;
    }
  },
  props: {
    position: {
      type: String as PropType<'left' | 'right'>,
      default: () => ('left'),
    },
    index: {
      type: String as PropType<string>,
      default: () => null,
    },
    title: {
      type: String as PropType<string>,
      default: () => ('')
    },
    src: {
      type: String as PropType<string>,
      default: () => ('')
    }
  },
  setup() {
    const selectionMode = inject('selectionMode', false);
    const selectedGroup = inject('selectedGroup');

    return {
      selectionMode,
      selectedGroup,
    }
  },
  data() {
    return {
      checked: false,
    }
  },
  methods: {
    handleChange(e) {
      if(e.target.checked) {
        this.selectedGroup.push(this.index);
      }else{
        this.selectedGroup.splice(
            this.selectedGroup.findIndex(item => item === this.index),
            1
        );
      }

      console.log(this.selectedGroup);
    }
  }
}
</script>

<style lang="scss" scoped>
.message-row {
  margin: 1rem 0;
  padding: 0 0.5rem;
  //background-color: yellow;
  display: flex;

  .content {
    max-width: 60%;
    margin: 0 0.6rem;
    display: flex;
    flex-direction: column;
  }
}

.left {
  justify-content: flex-start;

  .avatar {
    order: 1;
  }
  .content {
    order: 2;
  }
  .checkbox {
    order: 3;
  }
}

.right {
  justify-content: flex-end;

  .avatar {
    order: 3;
  }
  .content {
    order: 2;
    align-items: flex-end;
  }
  .checkbox {
    order: 1;
  }
}
</style>