<template>
  <div class="eventData">
    <div className='dataItem'>
      <el-icon :size="18"><Upload /></el-icon>
      <span>{{ praiseCount ? praiseCount : '点赞' }}</span>
    </div>
    <div className='dataItem'>
      <el-icon :size="20"><ChatDotSquare /></el-icon>
      <span>{{ commentCount ? commentCount : '评论' }}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { Upload, ChatDotSquare } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'eventData',
  components: {
    Upload,
    ChatDotSquare
  },
  props: [
    'praiseCount',
    'commentCount'
  ],
  setup() {
    const data = reactive({})
    onMounted(() => {
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.eventData {
  display: flex;
  align-items: center;
  .dataItem {
    flex: 1;
    display: flex;
    align-items: center;
    color: #909090;
    font-family: '宋体';
    font-weight: bold;
    span {
      display: inline-block;
      margin-left: 3px;
      font-size: 13px;
    }
  }
}
</style>