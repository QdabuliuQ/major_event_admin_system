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
:root {
  --el-font-size-base: 13px !important;
}
.paginationContainer {
  margin: 30px 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
