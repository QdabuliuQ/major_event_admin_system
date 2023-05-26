<template>
  <div class="videoMessage">
    <message 
      :from_id="from_id"
      :from_user_nickname="from_user_nickname"
      :from_user_pic="from_user_pic"
      :state="state"
      :time="time"
    >
      <div class="messageBox">
        <div class="video">
          <div class="mask">
            <el-icon><VideoPlay /></el-icon>
            <div class="info">
              <div class="title">{{ resource_info.title }}</div>
              <div class="time">{{ proxy.$moment(resource_info.time).format("YYYY-MM-DD HH:mm") }}</div>
            </div>
          </div>
          <el-image :src="resource_info.cover_img" fit="cover" />
        </div>
      </div>
    </message>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { VideoPlay } from '@element-plus/icons-vue'
import message from "./message.vue";

export default defineComponent({
  name: 'videoMessage',
  props: [
    'from_id',
    'from_user_nickname',
    'from_user_pic',
    'msg_id',
    'resource',
    'resource_info',
    'room_id',
    'state',
    'time',
    'to_id',
    'type'],
  components: {
    message
  },
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
.videoMessage {
  .messageBox {
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
    .video {
      position: relative;
      height: 160px;
      .el-image {
        width: 250px;
        height: 100%;
        img {
          vertical-align: bottom;
        }
      }
      .mask {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.507);
        .el-icon {
          color: #fff;
          font-size: 50px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .info {
          position: absolute;
          bottom: 10px;
          left: 10px;
          .title {
            color: #fff;
            font-size: 13px;
            width: 220px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 4px;
          }
          .time {
            color: #dadada;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>