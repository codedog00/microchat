<template>
  <div class="file-element-wrapper" @click="downloadFile">
    <el-icon size="2.5rem">
      <Document/>
    </el-icon>
    <div class="file-element">
      <span class="file-name">{{ message.payload.fileName }}</span>
      <span class="file-size">{{ size }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {Document} from "@element-plus/icons-vue";

export default {
  name: "FileElement",
  components: {Document},
  props: {
    message: {
      type: Object as PropType<message>,
      required: true,
    }
  },
  computed: {
    size() {
      const size = this.message.payload.fileSize
      if (size > 1024) {
        if (size / 1024 > 1024) {
          return `${this.toFixed(size / 1024 / 1024)} Mb`
        }
        return `${this.toFixed(size / 1024)} Kb`
      }
      return `${this.toFixed(size)}B`
    },
  },
  methods: {
    toFixed(number, precision = 2) {
      return number.toFixed(precision)
    },
    downloadFile() {
      let flag = confirm('是否下载文件？');
      if(!flag) return;

      if (window.fetch) {
        fetch(this.fileUrl)
            .then(res => res.blob())
            .then(blob => {
              let a = document.createElement('a')
              a.href = window.URL.createObjectURL(blob)
              a.download = this.fileName
              a.click()
            })
      } else {
        let a = document.createElement('a')
        a.href = this.fileUrl
        a.target = '_blank'
        a.download = this.filename
        a.click()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.file-element-wrapper {
  position: relative;
  cursor: pointer;
  display: flex;

  .file-element {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
  }

  .file-size {
    font-size: 12px;
    padding-top: 5px
  }

}


</style>