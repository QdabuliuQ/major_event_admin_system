<template>
  <div id="toolBar">
    <div class="leftSearchBar">
      <div class="labelSelelct">账号状态：</div>
      <el-select style="margin-right: 30px" v-model="status">
        <el-option label="全部" value="0" />
        <el-option label="正常" value="1" />
        <el-option label="封禁" value="2" />
      </el-select>
      <el-input v-model="input" placeholder="请输入搜索内容"> </el-input>
      <el-button :icon="Refresh" @click="resetInfo" style="margin-left: 15px">重置</el-button>
      <el-button :icon="Search" @click="searchInfo" type="primary">搜索</el-button>
    </div>
    <div class="rightBtnBar">
      <el-button :icon="Plus" @click="addAdmin" type="primary">添加管理员</el-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { InitData } from "@/types/manageView/toolBar";

export default defineComponent({
  name: "toolBar",
  emits: ["addAdmin", "resetInfo", "searchInfo"],
  setup(props, context) {
    const data = reactive(new InitData());

    const addAdmin = () => {
      context.emit("addAdmin");
    };

    const resetInfo = () => {
      data.input = ''
      data.status = '0'
      context.emit("resetInfo");
    }

    const searchInfo = () => {
      context.emit("searchInfo", {
        val: data.input,
        status: parseInt(data.status),
      });
    }

    return {
      Plus,
      Search, Refresh,
      searchInfo,
      resetInfo,
      addAdmin,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#toolBar {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .leftSearchBar {
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