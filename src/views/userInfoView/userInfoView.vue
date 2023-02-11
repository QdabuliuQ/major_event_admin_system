<template>
  <div v-if="info" id="userInfoView">
    <div class="userBasicInfo">
      <div class="bgImageContainer">
        <div class="mask"></div>
        <img class="bg_image" :src="info.bg_image" alt="">
        <div class="infoData">
          <div class="leftData">
            <img :src="info.user_pic" alt="">
          </div>
          <div class="rightData">
            <div class="dataItem">
              {{ info.nickname }}
            </div>
            <div v-if="info.email" class="dataItem">
              邮箱：{{ info.email }}
            </div>
            <div v-if="info.phone" class="dataItem">
              手机号：{{ info.phone }}
            </div>
            <div v-if="info.sex" class="dataItem">
              性别：{{ info.sex == 1 ? '男' : '女' }}
            </div>
            <div v-if="info.intro" class="dataItem">
              简介：{{ info.intro }}
            </div>
            <div v-if="info.birthday" class="dataItem">
              生日：{{ proxy.$moment(info.birthday).format('YYYY-MM-DD') }}
            </div>
            <div class="dataItem">
              账号状态：<el-tag v-if="info.status == '1'" type="success">正常</el-tag>
              <el-tag v-else-if="info.status == '2'" type="info">禁言</el-tag>
              <el-tag v-else type="danger">封禁</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-tabs style="margin-top: 10px" v-model="activeIdx" @tab-change="handleClick">
      <el-tab-pane label="发布文章" name="articles"></el-tab-pane>
      <el-tab-pane label="发布视频" name="videos"></el-tab-pane>
      <el-tab-pane label="文章收藏" name="articleCollect"></el-tab-pane>
      <el-tab-pane label="文章浏览" name="articleBrowse"></el-tab-pane>
      <el-tab-pane label="文章点赞" name="articlePraise"></el-tab-pane>
      <el-tab-pane label="视频收藏" name="videoCollect"></el-tab-pane>
      <el-tab-pane label="视频点赞" name="videoPraise"></el-tab-pane>
      <el-tab-pane label="关注" name="userFollow"></el-tab-pane>
      <el-tab-pane label="粉丝" name="userFans"></el-tab-pane>
    </el-tabs>
    <div style="margin: 10px 0">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>

  <el-empty v-else description="获取用户信息失败" />
  <el-drawer v-model="articleDrawer" title="文章内容" direction="rtl" :size="'40%'">
    <articleContent v-if="articleInfo" :title="articleInfo.title" :cate_name="articleInfo.cate_name"
      :user_pic="articleInfo.user_pic" :targets="articleInfo.targets" :nickname="articleInfo.nickname"
      :intro="articleInfo.intro" :pub_date="articleInfo.pub_date" :cover_img="articleInfo.cover_img"
      :content="articleInfo.content" />
  </el-drawer>
  <el-dialog class="videoDialogClass" v-model="videoDialog" title="Tips" width="45%">
    <video controls v-show="videoDialog" :src="videoUrl"></video>
  </el-dialog>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, ComponentInternalInstance, reactive, toRefs, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserInfoById, getArticleDetail } from '@/network/userInfoView'
import { InitData } from "@/types/userInfoView/userInfoView";
import articleContent from "@/components/articleContent.vue";

export default defineComponent({
  name: 'userInfoView',
  components: {
    articleContent
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const route = useRoute()
    const router = useRouter()
    const data = reactive(new InitData())
    const { id } = route.params

    data.activeIdx = router.currentRoute.value.name as string

    getUserInfoById({
      id: id as string
    }).then((res: any) => {
      if (res.data.status) {
        return proxy.$msg({
          title: '错误',
          message: res.data.msg,
          type: 'error'
        })
      }
      data.info = res.data.data
    })

    const handleClick = (e: string) => {
      router.replace(`/userInfo/${e}/` + id)
    }
    const articleClick = (id: string) => {
      getArticleDetail({
        id,
      }).then((res: any) => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: '获取文章信息失败',
            type: 'error'
          })
        }
        data.articleInfo = res.data.data
        data.articleDrawer = true
      })
    }
    const videoClick = (url: string) => {
      data.videoUrl = url
      data.videoDialog = true
    }

    onMounted(() => {
      proxy.$mitt.on('articleInfo', articleClick)
      proxy.$mitt.on('videoInfo', videoClick)
    })

    onUnmounted(() => {
      proxy.$mitt.off('articleInfo', articleClick)
      proxy.$mitt.off('videoInfo', videoClick)
    })

    return {
      handleClick,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.videoDialogClass {
  .el-dialog__body {
    padding: 0 20px 20px;
  }

  video {
    width: 100%;
    aspect-ratio: 2/1.2;
  }
}
#userInfoView {
  .userBasicInfo {
    .bgImageContainer {
      width: 100%;
      height: 300px;
      background-color: #000;
      position: relative;

      .mask {
        width: 100%;
        height: 100%;
        z-index: 2;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.511);
      }

      .bg_image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .infoData {
        z-index: 3;
        position: absolute;
        display: flex;
        align-items: center;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);

        .leftData {
          img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 50%;
          }
        }

        .rightData {
          width: 50%;
          margin-left: 20px;
          color: #fff;
          font-size: 16px;

          .dataItem {
            &:not(:last-child) {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
  }
}
</style>