<template>
  <div class="eventReply">
    <eventInfo :reply="true" :user_id="user_id" :nickname="nickname" :time="time" :type="type" :content="content"
      :images="images">
      <div v-if="resource_info == -1" class="emptyContent">内容以删除</div>
      <eventArticle v-else-if="resource_info && type == '2'" :cover_img='resource_info.cover_img'
        :title='resource_info.title' :pub_date='resource_info.pub_date' :content='resource_info.content'
        :id='resource_info.id' />
      <eventVideo v-else-if="resource_info && type == '3'" :video_url='resource_info.video_url' />
    </eventInfo>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import eventInfo from "@/components/eventInfo.vue";
import eventArticle from "@/components/eventArticle.vue";
import eventVideo from "@/components/eventVideo.vue";

export default defineComponent({
  name: 'eventReply',
  components: {
    eventInfo,
    eventArticle,
    eventVideo,
  },
  props: [
    'content',
    'ev_id',
    'images',
    'nickname',
    'resource_id',
    'resource_info',
    'time',
    'type',
    'user_id',
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
.eventReply {
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #f8f8f8;
  padding: 10px 12px;

  .eventArticle {
    background-color: #fff;
    margin-bottom: 0 !important;
  }

  .eventVideo {
    background-color: #fff;
    margin-bottom: 0 !important;
  }
}
</style>