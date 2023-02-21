<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from "vue";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default defineComponent({
  name: 'App',
  setup() {
    return {
      locale: zhCn,
    }
  }
})
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
img {
  user-select: none;
}
:root {
  --el-font-size-base: 13px !important;
}
.el-button--small {
  padding: 15px 11px !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.paginationContainer {
  margin: 30px 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.adminInfoContainer {
  .infoItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    .rightInfo {
      font-weight: bold;
    }
  }
}
.videoDialogClass {
  .el-dialog__body {
    padding: 0 20px 20px;
  }

  video {
    width: 100%;
    aspect-ratio: 2/1.2;
    object-fit: contain;
    background-color: #000;
  }
}
.noticeDrawerClass {
  .el-drawer__body {
    padding: 20px 30px;
  }
}
</style>
