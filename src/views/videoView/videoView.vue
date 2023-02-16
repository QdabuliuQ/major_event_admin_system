<template>
  <div id="videoView">
    <searchForm ref="searchFormRef" class="videoViewSearchForm" @search-info="getData()" @reset-info="getData()"
      :form="form" />
    <el-table :data="videoData" style="width: 100%">
      <el-table-column prop="id" label="视频ID" width="200" />
      <el-table-column label="视频标题" width="350">
        <template #default="scope">
          <div :title="scope.row.title" class="video_title">
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="点赞数" width="100">
        <template #default="scope">
          <el-button @click="dataDetail(scope.row.id, 'praise')" type="primary" link>{{
            scope.row.praise_count
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="收藏数" width="100">
        <template #default="scope">
          <el-button @click="dataDetail(scope.row.id, 'collect')" type="primary" link>{{ scope.row.collect_count }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="视频状态" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.state == '1'" type="info">审核中</el-tag>
          <el-tag v-else-if="scope.row.state == '2'" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.state == '3'" type="danger">封禁</el-tag>
          <el-tag v-else-if="scope.row.state == '4'" type="warning">删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="180">
        <template #default="scope">
          {{ proxy.$moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="180">
        <template #default="scope">
          <userInfo :user_pic="scope.row.user_pic" :nickname="scope.row.nickname" :user_id="scope.row.user_id" />
        </template>
      </el-table-column>
      <el-table-column label="视频" width="140">
        <template #default="scope">
          <div @click="() => {
            activeIndex = scope.$index
            videoDialog = true
          }" class="video_item_container">
            <div class="item_icon"><el-icon :size="32" :color="'rgba(255,255,255,0.9)'">
                <VideoPlay />
              </el-icon></div>
            <img :src="scope.row.cover_img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="180" label="操作">
        <template #default="scope">
          <el-button @click="updateState(scope.row.id, '2', scope.$index)" :disabled="scope.row.state == '4' || scope.row.state == '2'"
            :icon="Check" size="small" type="success">
            正常
          </el-button>
          <el-button @click="updateState(scope.row.id, '3', scope.$index)" :disabled="scope.row.state == '4' || scope.row.state == '3'"
            :icon="Close" size="small" type="danger">
            封禁
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
        layout="prev, pager, next" :total="total" />
    </div>
  </div>
  <el-dialog class="videoDialogClass" v-model="videoDialog" title="Tips" width="45%">
    <video controls v-show="videoDialog && videoData[activeIndex]" :src="videoData[activeIndex].video_url"></video>
  </el-dialog>
  <el-drawer v-model="drawer" :size="'40%'" :title="drawerType == 'praise' ? '点赞用户' : '收藏用户'" direction="rtl">
    <div v-if="userList.length" class="userListContainer">
      <div v-for="item in userList" class="userListItem">
        <userInfo :user_pic="item.user_pic" :nickname="item.nickname" :user_id="item.id" />
      </div>
      <div class="paginationContainer">
        <el-pagination hide-on-single-page @current-change="drawerPageChange" :current-page="drawerOffset"
          :page-size="drawerPageSize" background layout="prev, pager, next" :total="drawerTotal" />
      </div>
    </div>
    <el-empty v-else description="暂无点赞用户" />
  </el-drawer>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, reactive, ComponentInternalInstance, onMounted, toRefs, ref } from 'vue'
import { VideoPlay, Check, Close } from '@element-plus/icons-vue'
import { InitData } from "@/types/videoView/videoView";
import { getVideoList, updateVideoState, getVideoCollect, getVideoPraise } from "@/network/videoView";
import userInfo from "@/components/userInfo.vue";
import searchForm from "@/components/searchForm.vue";

export default defineComponent({
  name: 'videoView',
  components: {
    userInfo,
    searchForm
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const searchFormRef = ref()
    const data = reactive(new InitData())

    // 获取列表数据
    const getData = () => {
      let form = searchFormRef.value.getValue()
      getVideoList({
        offset: data.offset,
        state: form.state.value.toString(),
        // is_delete: form.is_delete.value.toString(),
        startTime: form.time.value.length ? form.time.value[0] : null,
        endTime: form.time.value.length ? form.time.value[1] : null,
        val: form.val.value
      }).then((res: any) => {
        data.videoData = res.data.data
        data.total = res.data.count
        data.pageSize = res.data.pageSize
      })
    }

    const drawerPageChange = (e: number) => {
      data.drawerOffset = e
      dataDetail(data.drawerId, data.drawerType)
    }

    // 页码更新
    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }

    // 更新状态
    const updateState = (id: string, state: string, i: number) => {
      updateVideoState({
        id,
        state
      }).then((res: any) => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        proxy.$msg({
          title: '成功',
          message: res.data.msg,
          type: 'success'
        })
        data.videoData[i].state = state
      })
    }

    const dataDetail = (id: string, type: string) => {
      data.drawerId = id
      data.drawerOffset = 1
      data.drawerType = type
      if (type == 'praise') {
        getVideoPraise({
          id: id as string,
          offset: data.drawerOffset
        }).then((res: any) => {
          if (res.data.status) {
            return proxy.$msg({
              title: '错误',
              msg: res.data.msg,
              type: 'error'
            })
          }
          data.drawerTotal = res.data.count
          data.drawerPageSize = res.data.pageSize
          data.userList = res.data.data
          data.drawer = true
        })
      } else {
        getVideoCollect({
          id: id as string,
          offset: data.drawerOffset
        }).then((res: any) => {
          if (res.data.status) {
            return proxy.$msg({
              title: '错误',
              msg: res.data.msg,
              type: 'error'
            })
          }
          data.drawerTotal = res.data.count
          data.drawerPageSize = res.data.pageSize
          data.userList = res.data.data
          data.drawer = true
        })
      }
    }

    onMounted(() => {
      getData()
    })
    return {
      drawerPageChange,
      dataDetail,
      getData,
      searchFormRef,
      pageChange,
      updateState,
      Close,
      Check,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.userListContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  .userListItem {
    // flex: 3;
    margin-bottom: 10px;
  }
}

.videoDialogClass {
  .el-dialog__body {
    padding: 0 20px 20px;
  }

  video {
    width: 100%;
    aspect-ratio: 2/1.2;
  }
}

.el-table-fixed-column--right {
  z-index: 1 !important;
}

#videoView {
  .videoViewSearchForm {
    width: 90%;
  }

  .video_title {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .video_item_container {
    cursor: pointer;
    width: 100px;
    aspect-ratio: 2/1.3;
    margin: 0;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    position: relative;

    .item_icon {
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.306);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>