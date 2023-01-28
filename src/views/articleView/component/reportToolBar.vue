<template>
  <div id="reportToolBar">
    <div class="leftInput">
      <el-select style="margin-right: 30px; margin-bottom: 10px; width: 170px" v-model="reason" placeholder="选择举报理由">
        <el-option v-for="item in reasonList" :key="item.name" :label="item.name" :value="item.name" />
      </el-select>
      <el-select style="margin-right: 30px; margin-bottom: 10px; width: 170px" v-model="state" placeholder="选择状态">
        <el-option label="审核中" value="1" />
        <el-option label="封禁" value="2" />
        <el-option label="正常" value="3" />
      </el-select>
      <el-date-picker
        style="margin-right: 30px;  margin-bottom: 10px;"
        @change='pickerChange'
        v-model="time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="x"
      />
      <el-input style="width: 250px;" v-model="input" placeholder="请输入搜索内容" />
      <el-button :icon="Refresh" @click="resetInfo" style="margin-left: 15px">重置</el-button>
      <el-button :icon="Search" @click="searchInfo" type="primary">搜索</el-button>
    </div>
    <div class="rigthBtn">
      <el-button :icon="CollectionTag" @click="addReason" type="primary">举报理由管理</el-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { Search, Refresh, CollectionTag } from '@element-plus/icons-vue'
import { InitData } from "@/types/articleView/reportToolBar";

export default defineComponent({
  name: 'reportToolBar',
  props: ['reasonList'],
  emits: ['addReason', 'searchInfo', 'resetInfo'],
  setup(prop, context) {
    const data = reactive(new InitData())

    const addReason = () => {
      context.emit('addReason')
    }
    const pickerChange = (e: any) => {
      data.startTime = e[0]
      data.endTime = e[1]
    }
    const searchInfo = () => {
      context.emit('searchInfo', {
        startTime: data.startTime == 9007199254740991n ? null : data.startTime,
        endTime: data.endTime == 9007199254740991n ? null : data.endTime,
        val: data.input,
        reason: data.reason,
        state: data.state,
      })
    }
    const resetInfo = () => {
      data.startTime = 9007199254740991n
      data.endTime = 9007199254740991n
      data.reason = ''
      data.input = ''
      data.time = 0
      data.state = ''
      context.emit('resetInfo')
    }

    return {
      Search, Refresh,
      CollectionTag,
      pickerChange,
      addReason,
      searchInfo,
      resetInfo,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#reportToolBar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 10px;
  .leftInput {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex: 8;
  }
  .rigthBtn {
    flex: 2;
    display: flex;
    justify-content: flex-end;
  }
}
</style>