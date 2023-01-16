<template>
  <div id="receNotice">
    <toolBar @resetInfo="resetInfo" @searchInfo="searchInfo" type="rece" />

    <el-table :data="noticeData" style="width: 100%">
      <el-table-column prop="id" label="公告ID" width="140" />
      <el-table-column label="公告标题">
        <template #default="scope">
          <div :title="scope.row.title" class="itemTitle">
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="是否置顶" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.is_top">置顶</el-tag>
          <el-tag type="info" v-else>不置顶</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="公告状态" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.status == '1'">正常</el-tag>
          <el-tag type="danger" v-else-if="scope.row.status == '2'">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.app_status == '1'">审核中</el-tag>
          <el-tag type="success" v-else-if="scope.row.app_status == '2'">通过</el-tag>
          <el-tag type="danger" v-else-if="scope.row.app_status == '3'">不通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="170">
        <template #default="scope">
          {{ proxy.$moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="150">
        <template #default="scope">
          <el-popover :width="250" placement="bottom" trigger="hover">
            <template #reference>
              <el-button type="primary" link>{{ scope.row.name }}</el-button>
            </template>
            <div class="adminInfoContainer">
              <div class="infoItem">
                <div class="leftTitle">账号ID</div>
                <div class="rightInfo">
                  {{ scope.row.pub_id }}
                </div>
              </div>
              <div class="infoItem">
                <div class="leftTitle">姓名</div>
                <div class="rightInfo">
                  {{ scope.row.name }}
                </div>
              </div>
              <div class="infoItem">
                <div class="leftTitle">手机号</div>
                <div class="rightInfo">
                  {{ scope.row.phone }}
                </div>
              </div>
              <div class="infoItem">
                <div class="leftTitle">邮箱</div>
                <div class="rightInfo">
                  {{ scope.row.email }}
                </div>
              </div>
              <div class="infoItem">
                <div class="leftTitle">账号状态</div>
                <div class="rightInfo">
                  <el-tag v-if="scope.row.pub_status == 1" type="success">正常</el-tag>
                  <el-tag v-else-if="scope.row.pub_status == 2" type="danger">封禁</el-tag>
                </div>
              </div>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button @click="noticeInfo(scope.$index)" type="primary">查看公告</el-button>
          <el-button :disabled="scope.row.app_status == '3'" @click="router.push('/updateReceNotice?id=' + scope.row.id)" type="warning">编辑公告</el-button>
          <el-dropdown style="margin-left: 12px">
            <el-button :disabled="scope.row.app_status != '1'" type="success">
              审核<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="updateNoticeStatus(scope.row.id, '2')">通过</el-dropdown-item>
                <el-dropdown-item @click="updateNoticeStatus(scope.row.id, '3')">不通过</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
        layout="prev, pager, next" :total="total" />
    </div>
  </div>
  <el-drawer class="noticeDrawerClass" v-model="drawer" :size="'40%'" :direction="'rtl'">
    <template #header>
      <h4>查看公告</h4>
    </template>
    <template #default>
      <noticeContent :title="tmpData.title" :pub_name="tmpData.name" :pub_id="tmpData.pub_id"
        :time="proxy.$moment(tmpData.time).format('YYYY-MM-DD HH:mm:ss')" :content="tmpData.content" />
    </template>
  </el-drawer>
</template>

<script lang='ts'>
import { defineComponent, reactive, getCurrentInstance, ComponentInternalInstance, toRefs } from 'vue'
import { useRouter } from "vue-router";
import { InitData } from "@/types/noticeView/receNotice";
import toolBar from "./conponent/toolBar.vue";
import { getReceNotice } from "@/network/receNotice";
import { updateStatus } from "@/network/receNotice";
import noticeContent from "@/components/noticeContent.vue";

export default defineComponent({
  name: 'receNotice',
  components: {
    noticeContent,
    toolBar
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const router = useRouter()
    const data = reactive(new InitData())

    const getData = (startTime?: BigInt, endTime?: BigInt, is_top?: number, status?: string, val?: string, app_status?: string) => {
      getReceNotice({
        offset: data.offset,
        startTime,
        endTime,
        is_top,
        status,
        val,
        app_status
      }).then((res => {
        data.noticeData = res.data.data
        data.total = res.data.count
        data.pageSize = res.data.pageSize
      }))
    }
    getData()

    // 查看公告内容
    const noticeInfo = (i: number) => {
      data.tmpData = data.noticeData[i]
      data.drawer = true
    }

    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }

    // 搜索信息
    const searchInfo = (d: any) => {
      data.offset = 1
      data.startTime = d.startTime
      data.endTime = d.endTime
      data.is_top = d.is_top
      data.status = d.status
      data.val = d.val
      data.app_status = d.app_status
      getData(d.startTime, d.endTime, d.is_top, d.status, d.val, d.app_status)
    }

    // 重置信息
    const resetInfo = () => {
      data.offset = 1
      data.time = 0
      data.startTime = 9007199254740991n
      data.endTime = 9007199254740991n
      data.is_top = -1
      data.status = '0'
      data.val = ''
      data.app_status = '0'
      getData()
    }

    // 更新公告状态
    const updateNoticeStatus = (id: string, status: string) => {
      updateStatus({
        id,
        app_status: status
      }).then(res => {
        if (res.data.status) {
          proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        } else {
          proxy.$msg({
            title: '成功',
            message: res.data.msg,
            type: 'success'
          })
        }
        getData()
      })
    }

    return {
      resetInfo,
      searchInfo,
      updateNoticeStatus,
      pageChange,
      noticeInfo,
      router,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#receNotice {}
</style>