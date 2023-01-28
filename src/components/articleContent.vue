<template>
  <div id="articleContent">
    <div class="articleTitle articleInfoItem">
      {{ title }}
    </div>
    <div class="articleTargets articleInfoItem">
      <div class="cate_item t_item">
        {{ cate_name }}
      </div>
      <div v-for="item in targets" :key="item.value" class="target_item t_item">
        {{ item.label }}
      </div>
    </div>
    <div class="articleAuthorData">
      <el-avatar fit="cover" :src="user_pic" />
      <div class="authorInfo">
        <div class="authorNickname">{{ nickname }}({{ intro }})</div>
        <div class="articleTime">{{ proxy.$moment(pub_date).format("YYYY-MM-DD HH:mm") }}</div>
      </div>
    </div>
    <div class="articleContent">
      <el-image style="width: 100%; aspect-ratio: 2/1.2" :src="cover_img" :preview-src-list="[cover_img]" fit="cover" />
      <div class="htmlContent">
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, getCurrentInstance, onMounted, ComponentInternalInstance, toRefs } from 'vue'
export default defineComponent({
  name: 'articleContent',
  props: [
    'title',
    'cate_name',
    'targets',
    'user_pic',
    'nickname',
    'intro',
    'pub_date',
    'cover_img',
    'content'
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
#articleContent {
  .articleInfoItem {
    padding-bottom: 10px;
  }

  .articleTitle {
    font-size: 18px;
    font-weight: bold;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .articleTargets {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 5px;

    .t_item {
      padding: 7px 15px;
      border-radius: 20px;
      font-size: 13px;
      zoom: .8;
      margin-right: 8px;
      margin-bottom: 8px;
    }

    .cate_item {
      background-color: #009bfc2e;
      color: #409eff;
    }

    .target_item {
      background-color: #f4f4f4;
    }
  }

  .articleAuthorData {
    display: flex;
    align-items: center;
    font-size: 13px;
    padding: 10px 0;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;

    .authorInfo {
      margin-left: 7px;
      width: 80%;

      .authorNickname {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .articleTime {
        color: #a4a4a4;
      }
    }
  }

  .articleContent {
    padding: 10px 0;

    .htmlContent * {
      word-wrap: break-word;
    }

    .htmlContent {

      img {
        width: 100%;
        aspect-ratio: 2/1.2;
        object-fit: cover;
      }

      video {
        width: 100%;
      }
    }

  }
}
</style>