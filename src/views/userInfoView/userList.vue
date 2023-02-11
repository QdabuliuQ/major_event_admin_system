<template>
  <div class="listTitle" v-if="list.length">
    {{ routerName == 'userFollow' ? total + '个关注' : total + '个粉丝' }}
  </div>
  <div v-if="list.length" id="userList">
    <userInfo 
      v-for="item in list"
      :key="item.id"
      :user_pic="item.user_pic"
      :nickname="item.nickname"
      :user_id="item.id"
    />
  </div>
  <el-empty v-else description="暂无用户相关数据" />
  <div v-if="list.length" class="paginationContainer">
    <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
      layout="prev, pager, next" :total="total" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive,ComponentInternalInstance, getCurrentInstance, toRefs } from 'vue'
import { useRouter, useRoute } from "vue-router";
import userInfo from "@/components/userInfo.vue";
import { getUserFollow, getUserFans } from "@/network/userInfoView";
import { InitData } from "@/types/userInfoView/userList";

export default defineComponent({
  name: 'userList',
  components: {
    userInfo
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
      if (data.routerName == 'userFollow') {
        getUserFollow({
          id: id as string,
          offset: data.offset
        }).then((res: any) => {
          if(res.data.status) {
            return proxy.$msg({
              title: '错误',
              message: '获取关注列表失败',
              type: 'error'
            })
          }
          data.list = res.data.data
          data.pageSize = res.data.pageSize
          data.total = res.data.count
        })
      } else {
        getUserFans({
          id: id as string,
          offset: data.offset
        }).then((res: any) => {
          if(res.data.status) {
            return proxy.$msg({
              title: '错误',
              message: '获取粉丝列表失败',
              type: 'error'
            })
          }
          data.list = res.data.data
          data.pageSize = res.data.pageSize
          data.total = res.data.count
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
.listTitle {
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 15px;
}
#userList {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
}
</style>