<template>
  <div class="articleMessage">
    <message 
      :from_id="from_id"
      :from_user_nickname="from_user_nickname"
      :from_user_pic="from_user_pic"
      :state="state"
      :time="time"
    >
      <div class="messageBox">
        <div class="article">
          <el-image :src="resource_info.cover_img" fit="cover" />
          <div class="detail">
            <div class="title">{{ resource_info.title }}</div>
            <div class="desc">{{ resource_info.content }}</div>
          </div>
        </div>
      </div>
    </message>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import message from "./message.vue";

export default defineComponent({
  name: 'articleMessage',
  components: {
    message
  },
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
.articleMessage {
  .messageBox {
    display: flex;
    align-items: center;
    .article {
      cursor: pointer;
      padding: 10px 10px 8px;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      align-items: center;
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
      .el-image {
        width: 70px;
        height: 70px;
        border-radius: 8px;
        overflow: hidden;
        img {
          vertical-align: bottom;
        }
      }
      .detail {
        margin-left: 10px;
        width: 150px;
        .title {
          font-size: 14px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 5px;
        }
        .desc {
          font-size: 13px;
          color: #ccc;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>