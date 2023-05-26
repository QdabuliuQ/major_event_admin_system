<template>
  <div id="articleList">
    <div class="toolNavBar">
      <searchForm 
        ref="searchFormRef"
        @searchInfo="setData"
        @resetInfo="setData"
        :form="form" />
    </div>
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
          <userInfo 
            :nickname="scope.row.nickname"
            :user_pic="scope.row.user_pic"
            :user_id="scope.row.author_id"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="190">
        <template #default="scope">
          <el-button @click="() => {
            activeIndex = scope.$index
            drawer = true
          }" :icon="Document" size="small" type="primary">查看文章</el-button>
          <el-button @click="updateState('2', scope.row.id)" :icon="CloseBold" v-if="scope.row.state == '1'"
            type="danger" size="small">封禁</el-button>
          <el-button @click="updateState('1', scope.row.id)" :icon="Select" v-else type="success"
            size="small">解封</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
        layout="prev, pager, next" :total="total" />
    </div>
  </div>
  <el-drawer :lock-scroll="true" v-model="drawer" title="查看文章" direction="rtl" :size="'40%'">
    <div v-if="listData.length">
      <articleContent :title="listData[activeIndex].title" :cate_name="listData[activeIndex].cate_name"
        :targets="listData[activeIndex].targets" :user_pic="listData[activeIndex].user_pic"
        :nickname="listData[activeIndex].nickname" :intro="listData[activeIndex].intro"
        :pub_date="listData[activeIndex].pub_date" :cover_img="listData[activeIndex].cover_img"
        :content="listData[activeIndex].content" />
    </div>
  </el-drawer>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted, reactive, ComponentInternalInstance, getCurrentInstance, toRefs } from 'vue'
import { Document, CloseBold, Select } from '@element-plus/icons-vue'
import { InitData } from "@/types/articleView/articleList";
import { getArticleList, updateArticleState } from "@/network/articleList";
import articleContent from "@/components/articleContent.vue";
import searchForm from "@/components/searchForm.vue";
import userInfo from "@/components/userInfo.vue";
import { getCateList } from "@/network/articleCate";

export default defineComponent({
  name: 'articleList',
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

    const setData = (e: any) => {
      getData()
    }

    const getData = () => {
      let form = searchFormRef.value.getValue()
      getArticleList({
        offset: data.offset,
        cate_id: form.category.value,
        state: form.state.value,
        startTime: form.time.value.length ? form.time.value[0] : null,
        endTime: form.time.value.length ? form.time.value[1] : null,
        val: form.val.value
      }).then(res => {
        data.listData = res.data.data
        data.pageSize = res.data.pageSize
        data.total = res.data.count
      })
    }
    

    // 切换页码
    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }

    const updateState = (state: string, id: string) => {
      updateArticleState({
        id,
        state
      }).then((res: any) => {
        if (res.data.state) {
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

    getCateList({
      offset: 1,
      limit: 999
    }).then((res: any) => {
      let option = []
      for(let item of res.data.data) {
        let op = {
          label: item.name,
          value: item.id
        }
        option.push(op)
      }
      data.form[0].option = option
    })

    onMounted(() => {
      getData()
    })

    return {
      searchFormRef,
      setData,
      pageChange,
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
  .toolNavBar {
    display: flex;
  }
  .articleTitle {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>