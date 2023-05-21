<template>
  <div id="commentReport">
    <div class="reportNav">
      <searchForm @searchInfo="getData()" @resetInfo="getData()" ref="searchFormRef" :form="form" />
      <div class="rightNav">
        <el-button :icon="CollectionTag" @click="reasonDialog = true" type="primary">举报理由管理</el-button>
      </div>
    </div>
    <el-table :data="reportData" style="width: 100%">
      <el-table-column label="评论内容">
        <template #default="scope">
          <div class="commentContent">
            {{ scope.row.content }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="评论位置" width="90">
        <template #default="scope">
          <div class="commentContent">
            <el-tag v-if="scope.row.type == '1'">文章</el-tag>
            <el-tag v-else-if="scope.row.type == '2'" class="ml-2" type="success">视频</el-tag>
            <el-tag v-else class="ml-2" type="warning">动态</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120" prop="reason" label="举报理由" />
      <el-table-column label="提交时间">
        <template #default="scope">
          {{ proxy.$moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template #default="scope">
          <el-tag v-if="scope.row.state == '1'" type="info">审核中</el-tag>
          <el-tag v-else-if="scope.row.state == '2'" type="danger">封禁</el-tag>
          <el-tag v-else-if="scope.row.state == '3'" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="提交用户">
        <template #default="scope">
          <userInfo :user_pic="scope.row.re_user_pic" :nickname="scope.row.re_nickname" :user_id="scope.row.user_id" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button :icon="Close" size="small" :disabled="scope.row.state != '1'" type="danger"
            @click="updateState(scope.row.record_id, '2', scope.row.comment_id, scope.row.user_id, scope.row.type)">封禁</el-button>
          <el-button :icon="Check" size="small" :disabled="scope.row.state != '1'" type="success"
            @click="updateState(scope.row.record_id, '3', scope.row.comment_id, scope.row.user_id, scope.row.type)">正常</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
        layout="prev, pager, next" :total="total" />
    </div>
  </div>

  <scrollDialog class="reportReasonDialogClass" :footer="true" title="举报理由管理" :height="400" :visible="reasonDialog"
    @update:modelValue="reasonDialog = $event">
    <div class="inputContainer">
      <el-input v-model="reasonInput" placeholder="请输入举报理由，不超过20个字" />
      <el-button @click="addReasonTarget" style="margin-left: 10px" type="primary">添加</el-button>
    </div>
    <div class="reasonItemContainer">
      <el-tag @close="removeTarget(item.name)" v-for="item, index in reasonList" :key="item.name" closable>
        {{ item.name }}
      </el-tag>
    </div>
  </scrollDialog>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  ComponentInternalInstance,
  ref
} from 'vue'
import { Close, Check, CollectionTag } from '@element-plus/icons-vue'
import scrollDialog from "@/components/scrollDialog.vue";
import { InitData } from "@/types/commentView/commentReport.";
import { deleteReportReason, addReportReason, getReportReason } from "@/network/articleReport";
import { getCommentReportList, updateCommentReportState } from "@/network/commentReport";
import searchForm from "@/components/searchForm.vue";
import userInfo from "@/components/userInfo.vue";

export default defineComponent({
  name: 'commentReport',
  components: {
    scrollDialog,
    searchForm,
    userInfo
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())

    const searchFormRef = ref()

    const getData = () => {
      let form = searchFormRef.value.getValue()

      getCommentReportList({
        state: form.state.value,
        reason: form.reason.value,
        startTime: form.time.value.length ? form.time.value[0] : null,
        endTime: form.time.value.length ? form.time.value[1] : null,
        val: form.val.value,
        type: form.type.value,
        offset: data.offset
      }).then((res: any) => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.total = res.data.count
        data.reportData = res.data.data
        data.pageSize = res.data.pageSize
      })
    }

    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }

    const updateState = (record_id: string, state: string, comment_id: string, user_id: string, type: string) => {
      updateCommentReportState({
        record_id,
        state,
        comment_id,
        user_id,
        type
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
        getData()
      })
    }

    // 添加标签
    const addReasonTarget = () => {
      let val = data.reasonInput.trim()
      if (val == '') {
        return proxy.$msg({
          title: '错误',
          message: '输入内容不能为空',
          type: 'error'
        })
      }
      if (val.length > 20) {
        return proxy.$msg({
          title: '错误',
          message: '输入内容不能超过20个字符',
          type: 'error'
        })
      }
      addReportReason({
        name: val,
        type: '2'
      }).then((res: any) => {
        if (res.data.status) {
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
        data.reasonInput = ''
        getReason()
      })
    }
    // 删除标签
    const removeTarget = (name: string) => {
      deleteReportReason({
        name,
        type: '2'
      }).then((res: any) => {
        if (res.data.status) {
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
        data.reasonInput = ''
        getReason()
      })
    }
    // 获取举报理由
    const getReason = () => {
      getReportReason({
        type: '2'
      }).then((res: any) => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.reasonList = res.data.data
        let arr = []
        for(let item of data.reasonList) {
          arr.push({
            label: item.name,
            value: item.name
          })
        }
        data.form[0].option = arr
      })
    }

    onMounted(() => {
      getReason()

      getData()
    })

    return {
      getData,
      searchFormRef,
      pageChange,
      updateState,
      proxy,
      removeTarget,
      addReasonTarget,
      Close, Check,
      CollectionTag,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.commentReportInfoClass {
  
  .commentDetail {
    display: flex;

    .leftInfo {
      flex: 1;
    }

    .rightInfo {
      width: 78%;

      .uInfo {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 10px 0;
      }

      .commentInfo {
        font-size: 14px;
      }
    }
  }
}

.reportReasonDialogClass {
  .inputContainer {
    display: flex;
    align-items: center;
  }

  .reasonItemContainer {
    padding: 15px 0;

    .el-tag {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}

#commentReport {
  .reportNav {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .rightNav {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 15px;
    }
  }
  .commentContent {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .comment_idLink {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #1da0e1;
    cursor: pointer;
  }
}
</style>