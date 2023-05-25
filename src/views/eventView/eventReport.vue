<template>
  <div id="eventReport">
    <searchForm style="width: 1100px;" @search-info="getData()" @reset-info="getData()" ref="searchFormRef"
      :form="form" />
    <el-table class="commentTableContainerClass" :data="reports" style="width: 100%">
      <el-table-column prop="ev_id" label="动态ID" width="250" />
      <el-table-column prop="reason" label="举报理由" />
      <el-table-column label="提交时间" width="200">
        <template #default="scope">
          {{ proxy.$moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="举报状态" width="90">
        <template #default="scope">
          <el-tag v-if="scope.row.state == '1'" type="info">审核中</el-tag>
          <el-tag v-else-if="scope.row.state == '2'" type="danger">封禁</el-tag>
          <el-tag v-else-if="scope.row.state == '3'" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="提交者">
        <template #default="scope">
          <userInfo :user_pic="scope.row.user_pic" :nickname="scope.row.nickname" :user_id="scope.row.user_id" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="290">
        <template #default="scope">
          <el-button @click="getDetail(scope.$index)" :icon="Tickets" size="small" type="primary">查看动态</el-button>
          <el-button @click="updateState(scope.$index, '2')" :icon="Close" :disabled="scope.row.state != '1'" size="small"
            type="danger">封禁</el-button>
          <el-button @click="updateState(scope.$index, '3')" :icon="Check" :disabled="scope.row.state != '1'" size="small"
            type="success">正常</el-button>
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
import { Close, Check, Tickets } from '@element-plus/icons-vue'
import { getEventReport, updateReportState, getEventDetail } from "@/network/eventView";
import { InitData } from "@/types/eventView/eventReport";
import { IntEvent } from '@/types/eventView/eventView';
import { getReportReason } from '@/network/articleReport';
import userInfo from "@/components/userInfo.vue";
import eventItem from "@/components/eventItem.vue";
import searchForm from "@/components/searchForm.vue";

export default defineComponent({
  name: 'eventReport',
  components: {
    userInfo,
    eventItem,
    searchForm
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())
    const searchFormRef = ref()

    // 获取举报理由
    const getReason = () => {
      getReportReason().then((res: any) => {
        if(res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        let option = []
        for(let item of res.data.data) {
          option.push({
            label: item.name,
            value: item.name
          })
        }
        data.form[0].option = option
      })
    }
    // 获取动态详情
    const getDetail = (i: number) => {
      data.dialog = true
      let id: string = data.reports[i].ev_id
      if(!data.eventMap.has(id)) {
        getEventDetail({
          ev_id: id
        }).then(res => {
          if (res.data.status) {
            proxy.$msg({
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
    // 切换页码
    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }
    const getData = () => {
      let form = searchFormRef.value.getValue()
      getEventReport({
        offset: data.offset,
        val: form.val.value,
        state: form.state.value,
        reason: form.reason.value,
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
        data.reports = res.data.data
        data.total = res.data.count
        data.pageSize = res.data.pageSize
      })
    }
    // 更新状态
    const updateState = (idx: number, state: string) => {
      if (data.reports[idx].state == '1') {
        updateReportState({
          state,
          reason: data.reports[idx].reason,
          user_id: data.reports[idx].user_id,
          ev_id: data.reports[idx].ev_id
        }).then(res => {
          if (res.data.status) {
            proxy.$msg({
              title: '错误',
              message: res.data.msg,
              type: 'error'
            })
          }
          data.reports[idx].state = state

        })
      }
    }

    onMounted(() => {
      getData()
      getReason()
    })
    return {
      searchFormRef,
      getData,
      getDetail,
      pageChange,
      updateState,
      Tickets,
      Check,
      Close,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#eventReport {}
</style>