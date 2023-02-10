<template>
  <div v-if="list.length" id="videoList_userInfo">
    <videoItem 
      v-for="item in list"
      :key="item.id"
      :user_id="item.user_id"
      :cover_img="item.cover_img"
      :duration="item.duration"
      :id="item.id"
      :is_delete="item.is_delete"
      :time="item.time"
      :state="item.state"
      :title="item.title"
    />
  </div>
  <el-empty v-else description="暂无视频相关数据" />
  <div v-if="list.length" class="paginationContainer">
    <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
      layout="prev, pager, next" :total="total" />
  </div>
</template>

<script lang='ts'>
import { defineComponent,getCurrentInstance,ComponentInternalInstance, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { getVideoById, getCollectVideoById, getPraiseVideoById } from "@/network/userInfoView";
import { InitData } from "@/types/userInfoView/videoList";
import videoItem from "./components/videoItem.vue";

export default defineComponent({
  name: 'videoList',
  components: {
    videoItem
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
      if(data.routerName == 'videos') {
        getVideoById({
          id: id as string,
          offset: data.offset
        }).then((res: any) => {
          if (res.data.status) {
            return proxy.$msg({
              title: '错误',
              message: '获取视频列表失败',
              type: 'error'
            })
          }
          data.total = res.data.count
          data.pageSize = res.data.pageSize
          data.list = res.data.data
        })
      } else if (data.routerName == 'videoCollect') {
        getCollectVideoById({
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
      } else if (data.routerName == 'videoPraise') {
        getPraiseVideoById({
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
      
    }
    getData()

    return {
      pageChange,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#videoList_userInfo {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}
</style>