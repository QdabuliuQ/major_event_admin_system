<template>
  <div id="videoReport">
    <div style="width: 90%">
      <searchForm 
        ref="searchFormRef"
        @search-info="getData()"
        @reset-info="getData()"
        :form="form"
      />
    </div>
    <el-table :data="reportData" style="width: 100%">
      <el-table-column prop="id" label="举报ID" />
      <el-table-column prop="video_id" label="视频ID" />
      <el-table-column prop="reason" label="举报理由" />
      <el-table-column label="提交时间">
        <template #default="scope">
          {{ proxy.$moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="90">
        <template #default="scope">
          <el-tag v-if="scope.row.state == '1'" type="info">审核中</el-tag>
          <el-tag v-else-if="scope.row.state == '2'" type="danger">封禁</el-tag>
          <el-tag v-else-if="scope.row.state == '3'" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="提交用户">
        <template #default="scope">
          <userInfo 
            :user_id="scope.row.user_id"
            :user_pic="scope.row.user_pic"
            :nickname="scope.row.nickname"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template #default="scope">
          <el-button @click="() => {
            idx = scope.$index
            videoDialog = true
          }" :icon="VideoCamera" type="primary" size="small">查看视频</el-button>
          <el-button @click="() => {
            idx = scope.$index
            infoDrawer = true
          }" :icon="Message" type="success" size="small">举报信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
        layout="prev, pager, next" :total="total" />
    </div>
  </div>
  <el-dialog class="videoDialogClass" v-model="videoDialog" title="视频播放" width="45%">
    <video controls v-show="videoDialog && reportData[idx]" :src="reportData[idx].video_url"></video>
  </el-dialog>
  <el-drawer
    :lock-scroll="true"
    size="40%"
    v-model="infoDrawer"
    title="举报信息"
    direction="rtl"
    v-if="reportData.length && idx != -1"
  >
    <div class="reportInfoContainer">
      <reportInfo 
        :reason="reportData[idx].reason"
        :desc="reportData[idx].desc"
        :proof="reportData[idx].proof"
      />
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button :disabled="reportData[idx].state != '1'" type="danger" @click="updateState('2', reportData[idx].id)">封禁</el-button>
        <el-button :disabled="reportData[idx].state != '1'" type="success" @click="updateState('3', reportData[idx].id)">正常</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance, ref } from 'vue'
import { VideoCamera, Message } from '@element-plus/icons-vue'
import { InitData } from "@/types/videoView/videoReport";
import { getReportReason, updateReportState } from "@/network/articleReport";
import { getVideoReportList } from "@/network/videoReport";
import userInfo from "@/components/userInfo.vue";
import searchForm from "@/components/searchForm.vue";
import reportInfo from "@/views/articleView/component/reportInfo.vue";

export default defineComponent({
  name: 'videoReport',
  components: {
    userInfo,
    searchForm,
    reportInfo
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())
    const searchFormRef = ref()

    const getData = () => {
      let form = searchFormRef.value.getValue()

      getVideoReportList({
        offset: data.offset,
        reason: form.reason.value,
        startTime: form.time.value.length ? form.time.value[0] : null,
        endTime: form.time.value.length ? form.time.value[1] : null,
        val: form.val.value,
        state: form.state.value,
      }).then((res: any) => {
        if(res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: '获取举报列表失败',
            type: 'error'
          })
        }
        data.reportData = res.data.data
        data.pageSize = res.data.pageSize
        data.total = res.data.count
      })
    }

    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }

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

    const updateState = (state: string, id: string) => {
      updateReportState({
        state,
        id,
        type: '2'
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
        data.infoDrawer = false
        getData()
      })
    }

    onMounted(() => {
      getData()
      getReason()
    })
    return {
      searchFormRef,
      getData,
      pageChange,
      updateState,
      VideoCamera, Message,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
</style>