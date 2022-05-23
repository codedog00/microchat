<template>
  <transition name="drawer-fade">
    <div class="drawer-wrapper" v-show="modelValue" :style="drawerSty" @click.stop>
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "Drawer",
  emits: {
    'update:modelValue': (modelValue: boolean) => {
      return true;
    }
  },
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    width: {
      type: String as PropType<string>,
      default: () => '30%',
    }
  },
  data() {
    return {
      drawerSty: {
        width: this.width,
      }
    }
  },
  watch: {
    modelValue(newValue) {
      if(newValue) {
        setTimeout(() => {
          document.addEventListener('click',this.closeDrawer)
        },100)
      }else {
        document.removeEventListener('click',this.closeDrawer)
      }
    }
  },
  methods: {
    closeDrawer() {
      this.$emit('update:modelValue',false)
    }
  },
}
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  position: absolute;
  right: 0;
  height: 100%;

  background-color: white;
  overflow: hidden;
}
</style>

<style>

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  /*transition: opacity 0.5s ease;*/
  transition: all 0.5s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  transform: translateX(100%);
}
</style>