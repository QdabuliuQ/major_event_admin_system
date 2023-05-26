<template>
  <div id="eventView">
    <searchForm style="width: 1100px;" @search-info="getData()" @reset-info="getData()" ref="searchFormRef"
      :form="form" />
    <el-table :data="events" style="width: 100%">
      <el-table-column prop="ev_id" label="动态ID" width="250" />
      <el-table-column prop="praise_count" label="点赞数" width="80" />
      <el-table-column prop="comment_count" label="评论数" width="80" />
      <el-table-column label="发布时间" width="200">
        <template #default="scope">
          {{ proxy.$moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="动态类型" width="90">
        <template #default="scope">
          <el-tag v-if="scope.row.type == '1'" type="success">文本</el-tag>
          <el-tag v-else-if="scope.row.type == '2'">文章</el-tag>
          <el-tag v-else-if="scope.row.type == '3'" type="info">视频</el-tag>
          <el-tag v-else-if="scope.row.type == '4'" type="warning">动态</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="动态状态" width="90">
        <template #default="scope">
          <el-tag v-if="scope.row.state == '1'" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.state == '2'" type="danger">封禁</el-tag>
          <el-tag v-else-if="scope.row.state == '3'" type="warning">删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="210">
        <template #default="scope">
          <userInfo :user_pic="scope.row.user_pic" :nickname="scope.row.nickname" :user_id="scope.row.user_id" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button :icon="Tickets" @click="getEvent(scope.$index)" size="small" type="primary">查看动态</el-button>
          <el-button :icon="Close" :disabled="scope.row.state != '1'" @click="banEvent(scope.$index)" size="small"
            type="danger">封禁动态</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
        layout="prev, pager, next" :total="total" />
    </div>
    <el-dialog v-model="dialog" width="40%">
      <eventItem v-if="eventDetail" 
        :user_id="eventDetail.user_id" 
        :nickname="eventDetail.nickname" 
        :images="eventDetail.images" 
        :type="eventDetail.type"
        :resource_info="eventDetail.resource_info"
        :praise_count="eventDetail.praise_count"
        :commentCount="eventDetail.commentCount"
        :content="eventDetail.content"
        :user_pic="eventDetail.user_pic" />
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance, ref } from 'vue'
import { Close, Tickets } from '@element-plus/icons-vue'
import { InitData, IntEvent } from "@/types/eventView/eventView";
import { getEventList, deleteEvent, getEventDetail } from "@/network/eventView";
import userInfo from "@/components/userInfo.vue";
import searchForm from "@/components/searchForm.vue";
import eventItem from "@/components/eventItem.vue";

export default defineComponent({
  name: 'eventView',
  components: {
    userInfo,
    searchForm,
    eventItem
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())
    const searchFormRef = ref()

    const getEvent = (i: number) => {
      data.dialog = true
      let id: string = data.events[i].ev_id
      if(!data.eventMap.has(id)) {
        getEventDetail({
          ev_id: id
        }).then(res => {
          if (res.data.status) {
            return proxy.$msg({
              title: '错误',
              message: res.data.msg,
              type: 'error'
            })
          }
          data.eventDetail = res.data.data
          data.eventMap.set(id, res.data.data)
        })
      } else {
        data.eventDetail = data.eventMap.get(id) as IntEvent
      }
    }
    const banEvent = (i: number) => {
      deleteEvent({
        ev_id: data.events[i].ev_id
      }).then(res => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.events[i].state = '2'
        proxy.$msg({
          title: '成功',
          message: res.data.msg,
          type: 'success'
        })
      })
    }
    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }
    const getData = () => {
      let form = searchFormRef.value.getValue()
      getEventList({
        offset: data.offset,
        val: form.val.value,
        state: form.state.value,
        type: form.type.value,
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
        data.events = res.data.data
        data.pageSize = res.data.pageSize
        data.total = res.data.count
      })
    }

    onMounted(() => {
      getData()
    })
    return {
      Tickets,
      Close,
      proxy,
      searchFormRef,
      getData,
      getEvent,
      banEvent,
      pageChange,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#eventView {}
</style>