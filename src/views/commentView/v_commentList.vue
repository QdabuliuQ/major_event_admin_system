<template>
  <div id="v_commentList">
    <searchForm 
      @search-info="getData"
      @reset-info="getData"
      ref="searchFormRef"
      :form="form"
    />
    <el-table :data="commentData" style="width: 100%">
      <el-table-column prop="comment_id" label="评论ID"/>
      <el-table-column label="视频ID">
        <template #default="scope">
          <el-button
            type="primary"
            link
            @click="() => {
              videoUrl = scope.row.video_url
              videoDialog = true
            }"
            >{{ scope.row.video_id }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="评论内容">
        <template #default="scope">
          <div :title="scope.row.content" class="commentContent">{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="praise_count" label="点赞量" width="100" />
      <el-table-column label="发布时间" width="200">
        <template #default="scope">
          {{ proxy.$moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="评论状态" width="90">
        <template #default="scope">
          <el-tag v-if="scope.row.is_delete == '0'" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.is_delete == '1'" type="danger">删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="190">
        <template #default="scope">
          <userInfo :user_pic="scope.row.user_pic" :nickname="scope.row.nickname" :user_id="scope.row.user_id" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button :disabled="scope.row.is_delete == 1" @click="deleteEvent(scope.$index)" size="small"
            type="danger">删除评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
        layout="prev, pager, next" :total="total" />
    </div>
  </div>
  <el-dialog class="videoDialogClass" v-model="videoDialog" title="视频播放" width="45%">
    <video controls v-show="videoDialog" :src="videoUrl"></video>
  </el-dialog>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { InitData } from "@/types/commentView/v_commentList";
import { getVideoCommentList, deleteVideoComment } from "@/network/v_commentList";
import searchForm from "@/components/searchForm.vue";
import userInfo from "@/components/userInfo.vue";

export default defineComponent({
  name: 'v_commentList',
  components: {
    userInfo,
    searchForm
  },
  setup() {
    const searchFormRef = ref()
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())

    const getData = () => {
      let form = searchFormRef.value.getValue()
      getVideoCommentList({
        offset: data.offset,
        is_delete: form.is_delete.value,
        startTime: form.time.value.length ? form.time.value[0] : null,
        endTime: form.time.value.length ? form.time.value[1] : null,
        val: form.val.value 
      }).then((res: any) => {
        if(res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: '获取视频评论失败',
            type: 'error'
          })
        }
        data.commentData = res.data.data
        data.pageSize = res.data.pageSize
        data.total = res.data.count
      })
    }
    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }
    const deleteEvent = (i: number) => {
      if(data.commentData[i].is_delete == 0) {
        deleteVideoComment({
          comment_id: data.commentData[i].comment_id
        }).then((res: any) => {
          if(res.data.status) {
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
          data.commentData[i].is_delete = 1
        })
      }
    }

    onMounted(() => {
      getData()
    })

    return {
      getData,
      searchFormRef,
      pageChange,
      deleteEvent,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#v_commentList {
  .commentContent {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  } 
}
</style>