<template>
  <div class="articleItem">
    <div class="article_cover">
      <div :style="{backgroundColor: state == 2 || is_delete == 1 ? '#ee5757' : '#27b3ee'}" class="rightTarget">
        {{ state == '2' ? '封禁' :
  is_delete == 1 ? '删除' : '正常'
        }}
      </div>
      <img :src="cover_img" alt="">
    </div>
    <div class="article_info">
      <div class="info_item article_title">
        {{ title }}
      </div>
      <div class="info_item article_desc">
        {{ desc }}
      </div>
      <div class="info_item article_pubTime">
        {{ proxy.$moment(pub_date).format('YYYY-MM-DD HH:mm:ss') }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, reactive, ComponentInternalInstance, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'articleItem',
  props: [
    'author_id',
    'cate_name',
    'cover_img',
    'desc',
    'id',
    'is_delete',
    'pub_date',
    'state',
    'targets',
    'title',
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
.articleItem {
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);

  .article_cover {
    width: 100%;
    aspect-ratio: 2/1.3;
    position: relative;

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
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .article_info {
    font-size: 13px;
    padding: 8px;

    .info_item {
      margin-bottom: 5px;
    }

    .article_title {
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

    .article_pubTime {
      color: #b0b0b0;
      font-size: 12px;
    }
  }
}
</style>