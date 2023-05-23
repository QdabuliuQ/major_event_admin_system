<template>
  <div class="eventArticle">
    <div className='leftCover'>
      <el-image fit='cover' :src="cover_img" />
    </div>
    <div className='rightInfo'>
      <div class="title">{{ title }}</div>
      <div class="context">{{ content.replace(/<[^>]+>/ig, '') }}</div>
      <span className='context'>{{ proxy.$moment(pub_date).format('YYYY-MM-DD HH:mm:ss') }}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
export default defineComponent({
  name: 'eventArticle',
  props: [
    'cover_img',
    'title',
    'pub_date',
    'content',
    'id'
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
.eventArticle {
  padding: 10px 12px;
  background-color: #f8f8f8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .leftCover {
    width: 80px;
    height: 80px;

    .el-image {
      width: 100%;
      height: 100%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .rightInfo {
    margin-left: 10px;
    flex: 1;

    .rv-typography__text {
      font-size: 14px;
      word-break: break-all;
    }

    .context {
      display: block;
      font-size: 12px !important;
      color: #959595;
      margin-top: 5px;
    }
  }
}</style>