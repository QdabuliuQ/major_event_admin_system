<template>
  <div class="eventItem">
    <eventInfo :reply="false" :user_id="user_id" :nickname="nickname" :user_pic="user_pic" :time="time" :type="type"
      :content="content" :images="images">
      <div v-if="resource_info == -1" class="emptyContent">内容以删除</div>
      <eventArticle v-else-if="resource_info && type == '2'" :cover_img='resource_info.cover_img'
        :title='resource_info.title' :pub_date='resource_info.pub_date' :content='resource_info.content'
        :id='resource_info.id' />
      <eventVideo v-else-if="resource_info && type == '3'" :video_url='resource_info.video_url' />
      <eventReply v-else-if="resource_info && type == '4'"
        :content="resource_info?.content"
        :ev_id="resource_info?.ev_id"
        :images="resource_info?.images"
        :nickname="resource_info?.nickname"
        :resource_id="resource_info?.resource_id"
        :resource_info="resource_info?.resource_info"
        :time="resource_info?.time"
        :type="resource_info?.type"
        :user_id="resource_info?.user_id"
      />
      <eventData :praiseCount='praise_count' :commentCount='commentCount' />
    </eventInfo>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import eventInfo from "@/components/eventInfo.vue";
import eventArticle from "@/components/eventArticle.vue";
import eventVideo from "@/components/eventVideo.vue";
import eventReply from "@/components/eventReply.vue";
import eventData from "@/components/eventData.vue";

export default defineComponent({
  name: 'eventItem',
  components: {
    eventArticle,
    eventVideo,
    eventData,
    eventInfo,
    eventReply
  },
  props: [
    'ev_id',
    'user_id',
    'nickname',
    'user_pic',
    'time',
    'type',
    'content',
    'images',
    'resource_id',
    'resource_info',
    'commentCount',
    'shareCount',
    'is_praise',
    'praise_count',
  ],
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
.eventItem {
  .emptyContent {
    padding: 15px;
    text-align: center;
    background-color: #f8f8f8;
    margin-bottom: 10px;
    font-size: 14px;
    color: #868686;
    border-radius: 8px;
  }
}
</style>