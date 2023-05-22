<template>
  <div id="e_commentList">
    <searchForm @search-info="getData()" @reset-info="getData()" ref="searchFormRef" :form="form" />
    <el-table :data="comments" style="width: 100%">
      <el-table-column prop="comment_id" label="评论ID" width="250" />
      <el-table-column label="动态ID" width="250">
        <template #default="scope">
          <el-link type="primary">{{ scope.row.ev_id }}</el-link>
        </template>
      </el-table-column>

      <el-table-column label="评论内容" width="300">
        <template #default="scope">
          <div :title="scope.row.content" class="commentContent">{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="praise_count" label="点赞数" width="90" />
      <el-table-column label="评论状态" width="90">
        <template #default="scope">
          <el-tag v-if="scope.row.is_delete == '0'" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.is_delete == '1'" type="danger">删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="200">
        <template #default="scope">
          {{ proxy.$moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="210">
        <template #default="scope">
          <userInfo :user_pic="scope.row.user_pic" :nickname="scope.row.nickname" :user_id="scope.row.user_id" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
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
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { InitData } from "@/types/commentView/e_commentList";
import searchForm from "@/components/searchForm.vue";
import { getEventCommentList, deleteEventComment } from "@/network/commentList";
import userInfo from "@/components/userInfo.vue";

export default defineComponent({
  name: 'e_commentList',
  components: {
    searchForm,
    userInfo
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())
    const searchFormRef = ref()

    // 切换页码
    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }
    const deleteEvent = (idx: number) => {
      deleteEventComment({
        comment_id: data.comments[idx].comment_id
      }).then(res => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.comments[idx].is_delete = 1
        proxy.$msg({
          title: '成功',
          message: res.data.msg,
          type: 'success'
        })
      })
    }
    const getData = () => {
      let form = searchFormRef.value.getValue()
      getEventCommentList({
        offset: data.offset,
        val: form.val.value,
        is_delete: form.is_delete.value,
        startTime: form.time.value.length ? form.time.value[0] : null,
        endTime: form.time.value.length ? form.time.value[1] : null,
      }).then(res => {
        if (res.data.status) {
          proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.comments = res.data.data
        data.pageSize = res.data.pageSize
        data.total = res.data.count
      })
    }


    onMounted(() => {
      getData()
    })
    return {
      proxy,
      searchFormRef,
      pageChange,
      deleteEvent,
      getData,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'></style>