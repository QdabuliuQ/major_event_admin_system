<template>
  <div id="cateToolBar">
    <div class="leftInput">
      <el-input style="margin-right: 30px; width: 250px" v-model="val" placeholder="请输入查找内容" />
      <el-select style="margin-right: 30px; width: 150px" v-model="is_delete">
        <el-option label="全部" :value="-1" />
        <el-option label="正常" :value="0" />
        <el-option label="禁用" :value="1" />
      </el-select>
      <el-date-picker style="margin-right: 30px" @change='pickerChange' v-model="time" type="datetimerange" range-separator="至"
          start-placeholder="开始时间" end-placeholder="结束时间" value-format="x" />
      <el-button :icon="Refresh" @click="resetInfo">重置</el-button>
      <el-button @click="searchInfo" :icon="Search" type="primary">搜索</el-button>
    </div>
    <div class="rightBtn">
      <el-button @click="addCate" :icon="Plus" type="primary">添加分类</el-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from "@/types/articleView/cateToolBar";
import { Search, Plus, Refresh } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'cateToolBar',
  emits: ['addCate', 'searchInfo', 'resetInfo'],
  setup(props, context) {
    const data = reactive(new InitData())
    
    const addCate = () => {
      context.emit('addCate')
    }

    const pickerChange = (e: BigInt[]) => {
      data.startTime = e[0]
      data.endTime = e[1]
    }

    const resetInfo = () => {
      data.val = '',
      data.is_delete = -1
      data.time = 0
      data.startTime = 9007199254740991n
      data.endTime = 9007199254740991n
      context.emit('resetInfo')
    }
    const searchInfo = () => {
      context.emit('searchInfo', {
        val: data.val,
        is_delete: data.is_delete,
        startTime: data.startTime,
        endTime: data.endTime,
      })
    }

    return {
      Refresh,
      Plus,
      Search,
      searchInfo,
      resetInfo,
      pickerChange,
      addCate,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#cateToolBar {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .leftInput {
    display: flex;
    align-items: center;
  }
  
}
</style>