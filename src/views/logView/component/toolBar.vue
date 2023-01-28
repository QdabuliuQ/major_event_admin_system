<template>
  <div id="toolBar_log">
    <div class="pickContainer">
      <el-date-picker
        @change='pickerChange'
        v-model="time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="x"
      />
    </div>
    <el-select style="margin-right: 20px" v-model="value" placeholder="">
      <el-option label="全部" value="0" />
      <el-option label="添加" value="1" />
      <el-option label="更改" value="2" />
    </el-select>
    <div style="margin-right: 10px">
      <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
    </div>
    <el-button :icon="Refresh" @click="resetInfo" style="margin-left: 15px">重置</el-button>
    <el-button :icon="Search" @click="searchInfo" type="primary">搜索</el-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { Search, Refresh } from '@element-plus/icons-vue'
import { InitData } from "@/types/logView/toolBar";

export default defineComponent({
  name: "toolBar1",
  emits: ['searchInfo', 'resetInfo'],
  setup(props, context) {
    const data = reactive(new InitData());
    
    const pickerChange = (e: any) => {
      data.startTime = e[0]
      data.endTime = e[1]
    }

    const searchInfo = () => {
      context.emit('searchInfo', {
        startTime: data.startTime == 9007199254740991n ? undefined : data.startTime,
        endTime: data.endTime == 9007199254740991n ? undefined : data.endTime,
        type: data.value,
        val: data.input
      })
    }

    const resetInfo = () => {
      data.time = 0
      data.startTime = 9007199254740991n
      data.endTime = 9007199254740991n
      data.value = '0'
      data.input = ''
      context.emit('resetInfo')
    }

    return {
      Search, Refresh,
      resetInfo,
      searchInfo,
      pickerChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#toolBar_log {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .pickContainer {
    margin-right: 20px;
  }
  .el-select {
    width: 150px;
  }
}
</style>