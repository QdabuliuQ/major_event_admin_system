<template>
  <div id="noticeContent">
    <div class="noticeTitle">
      {{ title && title != '' ? title : '公告标题' }}
    </div>
    <div class="noticeDetail">
      <div class="pubAdmin">
        {{ pub_name && pub_name != '' ? pub_name : '发布者' }}
      </div>
      <div class="pubTime">{{ time && time != 9007199254740991n ? '发布时间：' + proxy.$moment(time).format('YYYY-MM-DD HH:mm:ss') : '发布时间' }}</div>
    </div>
    <div v-if="content && content != '' && content != '<p><br></p>'" class="noticeText" v-html="content">
    </div>
    <div v-else>暂无内容</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, ComponentInternalInstance, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'noticeContent',
  props: [
    'title',
    'pub_name',
    'pub_id',
    'time',
    'content'
  ],
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive({})

    return {
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#noticeContent {
  .noticeTitle {
    font-size: 25px;
    font-weight: bold;
  }
  .noticeDetail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 14px;
    .pubTime {
      color: #adadad;
    }
    .pubAdmin {
      cursor: pointer;
      color: #5fa1f4;
    }
  }
  .noticeText {
    img {
      width: 100%;
    }
    video {
      width: 100%;
    }
  }
}
</style>