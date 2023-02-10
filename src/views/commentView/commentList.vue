<template>
  <div id="commentList">
    <searchForm @search-info="getData()" @reset-info="getData()" ref="searchFormRef" :form="form" />
    <el-table class="commentTableContainerClass" :data="comments" style="width: 100%">
      <el-table-column prop="comment_id" label="评论ID" width="250" />
      <el-table-column prop="content" label="评论内容" width="300">
        <template #default="scope">
          <div :title="scope.row.content" class="commentContent">{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="praise" label="点赞数" width="90" />
      <el-table-column prop="reply" label="回复数" width="90" />
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
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-dropdown>
            <el-button style="margin-right: 8px" size="small" type="primary">
              查看<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="articleInfo(scope.$index)">所在文章</el-dropdown-item>
                <el-dropdown-item @click="replyInfo(scope.$index)">回复评论</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
  <el-drawer :size="'40%'" :lock-scroll="true" v-model="articleDrawer" title="文章信息" direction="rtl">
    <articleContent v-if="articleList && articleList[idx]" :title="articleList[idx].title"
      :cate_name="articleList[idx].cate_name" :targets="articleList[idx].targets" :user_pic="articleList[idx].user_pic"
      :nickname="articleList[idx].nickname" :intro="articleList[idx].intro" :pub_date="articleList[idx].pub_date"
      :cover_img="articleList[idx].cover_img" :content="articleList[idx].content" />
  </el-drawer>
  <el-drawer class="commentTableContainerClass" :size="'50%'" v-model="replyDrawer" :lock-scroll="true" title="回复评论"
    direction="rtl">
    <el-table v-if="flootComments[replyIdx]" :border="true" stripe :data="flootComments[replyIdx].comments">
      <el-table-column label="评论ID" prop="comment_id" width="250" />
      <el-table-column prop="content" label="评论内容" width="300">
        <template #default="scope">
          <div :title="scope.row.content" class="commentContent">{{
            scope.row.content
          }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="praise" label="点赞数" width="90" />
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
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button :disabled="scope.row.is_delete == 1" @click="itemDeleteEvent(scope.$index)" size="small"
            type="danger">删除评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination hide-on-single-page @current-change="itemPageChange" :current-page="flootComments[idx].offset"
        :page-size="itemPageSize" background layout="prev, pager, next" :total="flootComments[idx].count" />
    </div>
  </el-drawer>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, ComponentInternalInstance, reactive, onMounted, toRefs } from 'vue'
import { InitData } from "@/types/commentView/commentList";
import { getCommentList, getCommentFloor, deleteComment, getArticleDetail } from "@/network/commentList";
import articleContent from "@/components/articleContent.vue";
import searchForm from "@/components/searchForm.vue";
import userInfo from "@/components/userInfo.vue";

export default defineComponent({
  name: 'commentList',
  components: {
    articleContent,
    searchForm,
    userInfo
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())

    const searchFormRef = ref()

    const getData = () => {
      data.articleList = []
      data.flootComments = []
      let form = searchFormRef.value.getValue()
      getCommentList({
        offset: data.offset,
        val: form.val.value,
        is_delete: form.is_delete.value,
        startTime: form.time.value.length ? form.time.value[0] : null,
        endTime: form.time.value.length ? form.time.value[1] : null,
      }).then((res: any) => {
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
        for (let item of data.comments) {
          data.flootComments.push({
            count: 0,
            offset: 1,
            comments: null,
          })
        }
      })
    }

    // 切换页码
    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }

    // 切换页码
    const itemPageChange = (e: number) => {
      data.flootComments[data.replyIdx].offset = e
      getCommentFloor({
        comment_id: data.comments[data.replyIdx].comment_id,
        art_id: data.comments[data.replyIdx].art_id,
        offset: data.flootComments[data.replyIdx].offset,
        limit: data.itemPageSize,
      }).then((res: any) => {
        data.flootComments[data.replyIdx].count = res.data.count
        data.flootComments[data.replyIdx].comments = res.data.data
      })
    }

    // 查看回复评论
    const replyInfo = (i: number) => {
      data.replyIdx = i
      if (!data.flootComments[i].comments) {
        getCommentFloor({
          comment_id: data.comments[data.replyIdx].comment_id,
          art_id: data.comments[data.replyIdx].art_id,
          offset: data.flootComments[data.replyIdx].offset,
          limit: data.itemPageSize,
        }).then((res: any) => {
          data.flootComments[data.replyIdx].count = res.data.count
          data.flootComments[data.replyIdx].comments = res.data.data
          data.replyDrawer = true
        })
      } else {
        data.replyDrawer = true
      }
    }
    // 查看文章
    const articleInfo = (i: number) => {
      data.idx = i
      if (!data.articleList[i]) {
        getArticleDetail({
          id: data.comments[data.idx].art_id
        }).then((res: any) => {
          data.articleList[i] = res.data.data
          data.articleDrawer = true
        })
      } else {
        data.articleDrawer = true
      }
    }

    const itemDeleteEvent = (i: number) => {
      deleteComment({
        comment_id: data.flootComments[data.replyIdx].comments[i].comment_id
      }).then((res: any) => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.flootComments[data.replyIdx].comments[i].is_delete = 1
        proxy.$msg({
          title: '成功',
          message: res.data.msg,
          type: 'success'
        })
      })
    }

    // 删除评论
    const deleteEvent = (i: number) => {
      deleteComment({
        comment_id: data.comments[i].comment_id
      }).then((res: any) => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.comments[i].is_delete = 1
        proxy.$msg({
          title: '成功',
          message: res.data.msg,
          type: 'success'
        })
      })
    }

    onMounted(() => {
      getData()
    })

    return {
      replyInfo,
      itemPageChange,
      itemDeleteEvent,
      deleteEvent,
      getData,
      searchFormRef,
      articleInfo,
      pageChange,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.el-table-fixed-column--right {
  z-index: 1 !important;
}

.commentTableContainerClass {
  .commentContent {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>