<template>
  <div class="messageItem">
    <div className='userInfo'>
      <el-avatar :src="from_user_pic" />
    </div>
    <div className='message'>
      <div class="nickname">
        {{ from_user_nickname }} 
        <div class="time">({{ proxy.$moment(time).format("YYYY-MM-DD HH:mm:ss") }})</div>
        <el-link v-if="state == '1'" type="success">正常</el-link>
        <el-link v-else-if="state == '2'" type="danger">删除</el-link>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
export default defineComponent({
  name: 'message',
  props: [
    'from_id',
    'from_user_nickname',
    'from_user_pic',
    'state',
    'time',],
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive({})
    onMounted(() => {
    })
    return {
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.messageItem {
  display: flex;
  margin-bottom: 10px;
  .el-avatar {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .message {
    margin-left: 12px;
    background-color: #fff;
    position: relative;
    word-break:break-all;
    .nickname {
      font-size: 13px;
      margin: 5px 0 8px;
      display: flex;
      align-items: center;
      .time {
        display: inline;
        font-size: 12px;
        margin-left: 8px;
        margin-right: 8px;
        color: #ccc;
      }
    }
    .content {
      display: flex;
    }
  }
}
</style>