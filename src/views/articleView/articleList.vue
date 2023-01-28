<template>
  <div id="articleList">
    <el-table :data="listData" style="width: 100%">
      <el-table-column prop="id" label="文章ID" />
      <el-table-column prop="cate_name" label="文章类别" width="100">
        <template #default="scope">
          <el-tag type="success">{{ scope.row.cate_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章标题">
        <template #default="scope">
          <div class="articleTitle">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="browse_count" width="80" label="浏览量" />
      <el-table-column prop="comment_count" width="80" label="评论数" />
      <el-table-column prop="collect_count" width="80" label="收藏数" />
      <el-table-column label="发布时间">
        <template #default="scope">
          {{ proxy.$moment(scope.row.pub_date).format("YYYY-MM-DD HH:mm") }}
        </template>
      </el-table-column>
      <el-table-column label="文章状态" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.state == '1'">正常</el-tag>
          <el-tag v-else type="danger">封禁</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="150">
        <template #default="scope">
          <div class="tableUserInfo">
            <el-avatar :src="scope.row.user_pic" />
            <div class="userDetail">
              <div>{{ scope.row.nickname }}</div>
              <div class="userId">{{ scope.row.author_id }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="190">
        <template #default="scope">
          <el-button @click="() => {
            activeIndex = scope.$index
            drawer = true
          }" :icon="Document" size="small" type="primary">查看文章</el-button>
          <el-button @click="updateState('2', scope.row.id)" :icon="CloseBold" v-if="scope.row.state == '1'" type="danger" size="small">封禁</el-button>
          <el-button @click="updateState('1', scope.row.id)" :icon="Select" v-else type="success" size="small">解封</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-drawer :lock-scroll="true" v-model="drawer" title="查看文章" direction="rtl" :size="'40%'">
    <div v-if="listData.length">
      <articleContent 
        :title="listData[activeIndex].title"
        :cate_name="listData[activeIndex].cate_name"
        :targets="listData[activeIndex].targets"
        :user_pic="listData[activeIndex].user_pic"
        :nickname="listData[activeIndex].nickname"
        :intro="listData[activeIndex].intro"
        :pub_date="listData[activeIndex].pub_date"
        :cover_img="listData[activeIndex].cover_img"
        :content="listData[activeIndex].content" />
    </div>
  </el-drawer>
</template>

<script lang='ts'>
import { defineComponent, reactive, ComponentInternalInstance, getCurrentInstance, toRefs } from 'vue'
import { Document, CloseBold, Select } from '@element-plus/icons-vue'
import { InitData } from "@/types/articleView/articleList";
import { getArticleList, updateArticleState } from "@/network/articleList";
import articleContent from "@/components/articleContent.vue";

export default defineComponent({
  name: 'articleList',
  components: {
    articleContent
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())

    const getData = () => {
      getArticleList({
        offset: data.offset
      }).then(res => {
        console.log(res);
        data.listData = res.data.data
      })
    }
    getData()

    const updateState = (state: string, id: string) => {
      updateArticleState({
        id,
        state
      }).then((res: any) => {
        if(res.data.state) {
          return proxy.$msg({
            title: '失败',
            message: res.data.msg,
            type: 'error'
          })
        }
        proxy.$msg({
          title: '成功',
          message: res.data.msg,
          type: 'success'
        })
        getData()
      })
    }

    return {
      updateState,
      Document,
      Select,
      CloseBold,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#articleList {
  .articleTitle {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .tableUserInfo {
    display: flex;
    align-items: center;
    font-size: 13px;

    .userDetail {
      margin-left: 5px;

      .userId {
        font-size: 12px;
        color: #a6a6a6;
      }
    }
  }
}
</style>