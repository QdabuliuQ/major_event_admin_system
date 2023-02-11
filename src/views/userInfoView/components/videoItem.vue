<template>
  <div @click="() => {
    proxy.$mitt.emit('videoInfo', video_url)
  }" id="videoItem">
    <div class="video_cover">
      <div :style="{backgroundColor: state == 3 || is_delete == 1 ? '#ee5757' : '#27b3ee'}" class="rightTarget">
        {{ state == '3' ? '封禁' :
  is_delete == 1 ? '删除' : '正常'
        }}
      </div>
      <div class="mask">
        <el-icon color="#fff" size="50"><VideoPlay /></el-icon>
        <span class="duration">
          {{ getTimes(duration) }}
        </span>
      </div>
      <img :src="cover_img" alt="">
    </div>
    <div class="video_info">
      <div class="info_item video_title">
        {{ title }}
      </div>
      <div class="info_item video_pubTime">
        {{ proxy.$moment(time).format('YYYY-MM-DD HH:mm:ss') }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, ComponentInternalInstance, toRefs } from 'vue'
import { VideoPlay } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'videoItem',
  props: [
    'user_id',
    'cover_img',
    'duration',
    'id',
    'is_delete',
    'time',
    'state',
    'title',
    'video_url'
  ],
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    
    const getTimes = (t: number) => {
      let m: any = parseInt(t / 60 % 60 as any)
      let s: any = parseInt(t % 60 as any)
      //三元表达式 补零 如果小于10 则在前边进行补零 如果大于10 则不需要补零
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return `${m}:${s}`
    }

    return {
      getTimes,
      proxy
    }
  }
})
</script>

<style lang='less'>
#videoItem {
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
  .video_cover {
    width: 100%;
    aspect-ratio: 2/1.3;
    position: relative;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(10, 10, 10, 0.345);
      .duration {
        position: absolute;
        bottom: 8px;
        left: 8px;
        color: #fff;
        font-size: .375rem;
      }
    }
    .rightTarget {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px 10px 6px 12px;
      font-size: 12px;
      color: #fff;
      font-weight: bold;
      background-color: #27b3ee;
      border-bottom-left-radius: 8px;
      zoom: .9;
      z-index: 2;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  .video_info {
    font-size: 13px;
    padding: 8px;

    .info_item {
      margin-bottom: 5px;
    }

    .video_title {
      font-weight: bold;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 控制多行的行数
      -webkit-box-orient: vertical;
    }

    .article_desc {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .video_pubTime {
      color: #b0b0b0;
      font-size: 12px;
    }
  }
}
</style>