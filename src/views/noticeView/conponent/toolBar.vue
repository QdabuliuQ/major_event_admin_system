<template>
  <div id="toolBar_notice">
    <div class="inputContainer">
      <div class="inputItem">
        <div class="inputText">
          是否置顶
        </div>
        <el-select v-model="is_top">
          <el-option label="全部" :value="-1" />
          <el-option label="置顶" :value="1" />
          <el-option label="不置顶" :value="0" />
        </el-select>
      </div>

      <div class="inputItem">
        <div class="inputText">
          公告状态
        </div>
        <el-select v-model="status">
          <el-option label="全部" value="0" />
          <el-option label="正常" value="1" />
          <el-option label="禁用" value="2" />
        </el-select>
      </div>

      <div class="inputItem">
        <el-date-picker @change='pickerChange' v-model="time" type="datetimerange" range-separator="至"
          start-placeholder="开始时间" end-placeholder="结束时间" value-format="x" />
      </div>

      <div v-if="type == 'rece'" style="margin-bottom: 0px" class="inputItem">
        <div class="inputText">
          审核状态
        </div>
        <el-select v-model="app_status">
          <el-option label="全部" value="0" />
          <el-option label="审核中" value="1" />
          <el-option label="审核通过" value="2" />
          <el-option label="审核失败" value="3" />
        </el-select>
      </div>

      <div style="margin-bottom: 0px" class="inputItem">
        <el-input class="valInput" v-model="val" placeholder="请输入搜索内容" />
      </div>

      <el-button @click="resetInfo">重置</el-button>
      <el-button @click="searchInfo" type="primary">搜索</el-button>
    </div>
    <div class="btnContainer">
      <el-button @click="router.push(type != 'rece' ? '/addBackNotice' : '/addReceNotice')" type="primary">添加公告</el-button>
    </div>
  </div>

</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from "vue-router";
import { InitData } from "@/types/noticeView/toolBar";

export default defineComponent({
  name: 'toolBar',
  props: ['type'],

  emits: ['searchInfo', 'resetInfo'],
  setup(props, context) {
    const router = useRouter()

    const data = reactive(new InitData())
    
    const pickerChange = (e: BigInt[]) => {
      data.startTime = e[0]
      data.endTime = e[1]
    }

    const searchInfo = () => {
      context.emit('searchInfo', {
        startTime: data.startTime == 9007199254740991n ? undefined : data.startTime,
        endTime: data.endTime == 9007199254740991n ? undefined : data.endTime,
        is_top: data.is_top,
        val: data.val,
        status: data.status,
        app_status: data.app_status
      })
    }

    const resetInfo = () => {
      data.time = 0
      data.startTime = 9007199254740991n
      data.endTime = 9007199254740991n
      data.is_top = -1
      data.status = '0'
      data.val = ''
      data.app_status = '0'
      context.emit('resetInfo')
    }

    return {
      resetInfo,
      searchInfo,
      pickerChange,
      router,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#toolBar_notice {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .inputContainer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .inputItem {
    display: flex;
    align-items: center;
    margin-right: 30px;
    margin-bottom: 15px;

    .inputText {
      font-size: 13px;
      margin-right: 15px;
    }

    .el-select {
      width: 150px;
    }
    .valInput {
      width: 300px;
    }
  }

  .btnContainer {
    margin-left: 150px;
    display: flex;
    align-items: center;
  }
}
</style>