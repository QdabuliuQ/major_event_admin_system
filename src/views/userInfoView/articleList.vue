<template>
  <div v-if="list.length" id="articleList_userInfo">
    <articleItem v-for="item of list" :key="item.id" :author_id="item.author_id" :cate_name="item.cate_name"
      :cover_img="item.cover_img" :desc="item.desc" :id="item.id" :is_delete="item.is_delete" :pub_date="item.pub_date"
      :state="item.state" :targets='item.targets' :title='item.title' />
  </div>
  <el-empty v-else description="暂无文章相关数据" />
  <div v-if="list.length" class="paginationContainer">
    <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
      layout="prev, pager, next" :total="total" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, ComponentInternalInstance, reactive, onMounted, toRefs } from 'vue'
import { useRoute, useRouter } from "vue-router";
import {
  getArticleById,
  getCollectArticleById,
  getBrowseArticleById,
  getPraiseArticleById
} from "@/network/userInfoView";
import { InitData } from "@/types/userInfoView/articleList";
import articleItem from "./components/articleItem.vue";

export default defineComponent({
  name: 'articleList',
  components: {
    articleItem
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const router = useRouter()
    const route = useRoute()
    const { id } = route.params
    const data = reactive(new InitData())

    data.routerName = router.currentRoute.value.name as string

    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }

    const getData = () => {
      setTimeout(() => {
        if (data.routerName == 'articles') {
          getArticleById({
            id: id as string,
            offset: data.offset
          }).then((res: any) => {
            if (res.data.status) {
              return proxy.$msg({
                title: '错误',
                message: '获取文章列表失败',
                type: 'error'
              })
            }
            data.total = res.data.count
            data.pageSize = res.data.pageSize
            data.list = res.data.data
          })
        } else if (data.routerName == 'articleCollect') {
          getCollectArticleById({
            id: id as string,
            offset: data.offset
          }).then((res: any) => {
            if (res.data.status) {
              return proxy.$msg({
                title: '错误',
                message: '获取收藏列表失败',
                type: 'error'
              })
            }
            data.total = res.data.count
            data.pageSize = res.data.pageSize
            data.list = res.data.data
          })
        } else if (data.routerName == 'articleBrowse') {
          getBrowseArticleById({
            id: id as string,
            offset: data.offset
          }).then((res: any) => {
            if (res.data.status) {
              return proxy.$msg({
                title: '错误',
                message: '获取浏览列表失败',
                type: 'error'
              })
            }
            data.total = res.data.count
            data.pageSize = res.data.pageSize
            data.list = res.data.data
          })
        } else if (data.routerName == 'articlePraise') {
          getPraiseArticleById({
            id: id as string,
            offset: data.offset
          }).then((res: any) => {
            if (res.data.status) {
              return proxy.$msg({
                title: '错误',
                message: '获取点赞列表失败',
                type: 'error'
              })
            }
            data.total = res.data.count
            data.pageSize = res.data.pageSize
            data.list = res.data.data
          })
        }
      }, 100);
    }
    getData()

    onMounted(() => {
    })
    return {
      pageChange,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#articleList_userInfo {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}
</style>