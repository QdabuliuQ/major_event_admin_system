<template>
  <div id="backNotice">
    <toolBar @searchInfo="searchInfo" @resetInfo="resetInfo" />

    <el-table :data="noticeData" style="width: 100%">
      <el-table-column prop="id" label="公告ID" width="140" />
      <el-table-column label="公告标题" >
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
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="noticeInfo(scope.$index)" type="primary">查看公告</el-button>
          <el-button @click="router.push('/updateBackNotice?id='+scope.row.id)" type="warning">编辑公告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination
        @current-change="pageChange"
        :current-page="offset"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
  <el-drawer class="noticeDrawerClass" v-model="drawer" :size="'40%'" :direction="'rtl'">
    <template #header>
      <h4>查看公告</h4>
    </template>
    <template #default>
      <noticeContent 
        :title="tmpData.title" 
        :pub_name="tmpData.name" 
        :pub_id="tmpData.pub_id"
        :time="proxy.$moment(tmpData.time).format('YYYY-MM-DD HH:mm:ss')"
        :content="tmpData.content" />
    </template>
  </el-drawer>
</template>

<script lang='ts'>
import { defineComponent, reactive, getCurrentInstance, ComponentInternalInstance, toRefs } from 'vue'
import { useRouter } from "vue-router";
import toolBar from "./conponent/toolBar.vue";
import { getBackNotice } from "@/network/backNotice";
import { InitData } from "@/types/noticeView/backNotice";
import noticeContent from "@/components/noticeContent.vue";


export default defineComponent({
  name: 'backNotice',
  components: {
    toolBar,
    noticeContent
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const router = useRouter()

    const data = reactive(new InitData())

    const getData = (startTime?: BigInt, endTime?: BigInt, is_top?: number, status?: string, val?: string) => {
      getBackNotice({
        offset: data.offset,
        startTime,
        endTime,
        is_top,
        status,
        val
      }).then((res: any) => {
        console.log(res);
        data.pageSize = res.data.pageSize
        data.total = res.data.count
        data.noticeData = res.data.data
      })
    }
    getData()
    
    // 页码改变回调
    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }

    // 查看公告内容
    const noticeInfo = (i: number) => {
      data.tmpData = data.noticeData[i]
      data.drawer = true
    }

    // 搜索信息
    const searchInfo = (d: any) => {
      data.offset = 1
      data.startTime = d.startTime
      data.endTime = d.endTime
      data.is_top = d.is_top
      data.status = d.status
      data.val = d.val
      getData(d.startTime, d.endTime, d.is_top, d.status, d.val)
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
      getData()
    }

    return {
      resetInfo,
      searchInfo,
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
.noticeDrawerClass {
  .el-drawer__body {
    padding: 20px 30px;
  }
}
#backNotice {
  .itemTitle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>