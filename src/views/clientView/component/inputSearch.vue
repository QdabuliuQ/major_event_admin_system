<template>
  <div id="inputSearch">
    <div class="inputBox">
      <div class="labelSelelct">账号状态：</div>
      <el-select style="margin-right: 30px" v-model="status">
        <el-option label="全部" value="0" />
        <el-option label="正常" value="1" />
        <el-option label="封禁" value="2" />
        <el-option label="禁言" value="3" />
      </el-select>
      <el-input v-model="input" placeholder="请输入搜索内容">
      </el-input>
      <el-button @click="resetInfo" style="margin-left: 15px">重置</el-button>
      <el-button @click="searchInfo" type="primary">搜索</el-button>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
import { InitData } from "@/types/clientView/inputSearch";

export default defineComponent({
  name: "inputSearch",
  emits: ["searchInfo", "resetInfo"],
  setup(props, context) {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;

    const data = reactive(new InitData());
    // 搜索信息
    const searchInfo = () => {
      context.emit("searchInfo", {
        val: data.input,
        status: parseInt(data.status),
      });
    };

    // 重置信息
    const resetInfo = () => {
      data.input = ''
      data.status = '0'
      context.emit("resetInfo");
    }
    return {
      resetInfo,
      searchInfo,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#inputSearch {
  width: 100%;
  margin-bottom: 30px;
  .inputBox {
    width: 60%;
    display: flex;
    align-items: center;
    .labelSelelct {
      font-size: 13px;
      min-width: 70px;
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
}
</style>