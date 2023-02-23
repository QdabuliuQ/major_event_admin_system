<template>
  <div id="receNotice">
    <div class="noticeTopNav">
      <searchForm 
        @search-info="getData()"
        @reset-info="getData()"
        ref="searchFormRef"
        :form="form"
      />
      <div class="btnContainer">
        <el-button @click="router.push('/addReceNotice')" type="primary">添加公告</el-button>
      </div>
    </div>
    
    <!-- <toolBar @resetInfo="resetInfo" @searchInfo="searchInfo" type="rece" /> -->

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
          <el-button size="small" @click="noticeInfo(scope.$index)" type="primary">查看公告</el-button>
          <el-button v-if="scope.row.isMe" :disabled="scope.row.app_status != '1'" size="small" @click="router.push('/updateReceNotice?id=' + scope.row.id)" type="warning">编辑公告</el-button>
          <el-dropdown v-if="type == '1'" style="margin-left: 12px">
            <el-button size="small" :disabled="scope.row.app_status != '1'" type="success">
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
import { defineComponent, reactive, getCurrentInstance, ComponentInternalInstance, toRefs, ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { InitData } from "@/types/noticeView/receNotice";
import { getReceNotice } from "@/network/receNotice";
import { updateStatus } from "@/network/receNotice";
import noticeContent from "@/components/noticeContent.vue";
import toolBar from "./conponent/toolBar.vue";
import searchForm from "@/components/searchForm.vue";


export default defineComponent({
  name: 'receNotice',
  components: {
    noticeContent,
    toolBar,
    searchForm
  },
  setup() {
    const searchFormRef = ref()
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const router = useRouter()
    const data = reactive(new InitData())
    const type = sessionStorage.getItem('type')

    const getData = () => {
      let form = searchFormRef.value.getValue()
      console.log(form);
      
      getReceNotice({
        offset: data.offset,
        startTime: form.time.value.length ? form.time.value[0] : null,
        endTime: form.time.value.length ? form.time.value[1] : null,
        is_top: form.is_top.value,
        status: form.status.value,
        val: form.val.value,
        app_status: form.app_status.value
      }).then((res => {
        data.noticeData = res.data.data
        data.total = res.data.count
        data.pageSize = res.data.pageSize
      }))
    }
    

    // 查看公告内容
    const noticeInfo = (i: number) => {
      data.tmpData = data.noticeData[i]
      data.drawer = true
    }

    const pageChange = (e: number) => {
      data.offset = e
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

    onMounted(() => {
      getData()
    })

    return {
      getData,
      searchFormRef,
      type,
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
#receNotice {
  .noticeTopNav {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .btnContainer {
      margin-bottom: 10px;
    }
  }
}
</style>