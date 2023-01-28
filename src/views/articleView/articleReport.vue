<template>
  <div id="articleReport">
    <reportToolBar :reasonList="ressonList" @searchInfo="searchInfo" @resetInfo="resetInfo" @addReason="addReason" />
    <el-table :data="reportData" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="art_id" label="文章ID" />
      <el-table-column prop="reason" label="举报理由" />
      <el-table-column label="提交时间">
        <template #default="scope">
          {{ proxy.$moment(scope.row.time).format("YYYY-MM-DD HH:mm") }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.state == '1'" type="info">审核中</el-tag>
          <el-tag v-else-if="scope.row.state == '2'" type="danger">封禁</el-tag>
          <el-tag v-else-if="scope.row.state == '3'" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="提交用户">
        <template #default="scope">
          <div style="display:flex;align-items:center">
            <el-avatar :src="scope.row.user_pic" />
            <div class="tableUserInfo">
              <div class="userNickname">{{ scope.row.nickname }}</div>
              <div class="userId">{{ scope.row.user_id }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width='220'>
        <template #default="scope">
          <el-button @click="() => {
            artIndex = scope.$index
            articleDrawer = true
          }" :icon="Document" type="primary" size="small">查看文章</el-button>
          <el-button @click="() => {
            artIndex = scope.$index
            infoDrawer = true
          }" :icon="Message" type="success" size="small">举报信息</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-drawer
    :lock-scroll="true"
    size="40%"
    v-model="articleDrawer"
    title="文章内容"
    direction="rtl"
    v-if="reportData.length"
  >
    <div>
      <articleContent 
        :title="reportData[artIndex].title"
        :cate_name="reportData[artIndex].cate_name"
        :targets="reportData[artIndex].targets"
        :user_pic="reportData[artIndex].user_pic"
        :nickname="reportData[artIndex].nickname"
        :intro="reportData[artIndex].intro"
        :pub_date="reportData[artIndex].pub_date"
        :cover_img="reportData[artIndex].cover_img"
        :content="reportData[artIndex].content" />
    </div>
  </el-drawer>
  <el-drawer
    :lock-scroll="true"
    size="40%"
    v-model="infoDrawer"
    title="举报信息"
    direction="rtl"
    v-if="reportData.length && artIndex != -1"
  >
    <div class="reportInfoContainer">
      <div class="infoItem">
        <div class="itemName">
          举报理由
        </div>
        <div class="itemValue">
          {{ reportData[artIndex].reason }}
        </div>
      </div>
      <div class="infoItem">
        <div class="itemName">
          举报描述
        </div>
        <div class="itemValue">
          {{ reportData[artIndex].desc }}
        </div>
      </div>
      <div v-if="reportData[artIndex].proof" class="infoItem">
        <div class="itemName">
          证明材料
        </div>
        <div class="itemValue itemImage">
          <el-image
            v-for="item,index in reportData[artIndex].proof"
            style="width: 150px; height: 150px"
            :src="item.link"
            :preview-src-list="[item.link]"
            fit="cover"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button :disabled="reportData[artIndex].state != '1'" type="danger" @click="updateState('2', reportData[artIndex].id)">封禁</el-button>
        <el-button :disabled="reportData[artIndex].state != '1'" type="success" @click="updateState('3', reportData[artIndex].id)">正常</el-button>
      </div>
    </template>
  </el-drawer>
  <scrollDialog class="reportReasonDialogClass" :footer="true" title="举报理由管理" :height="400" :visible="reasonDialog"
    @update:modelValue="reasonDialog = $event">
    <div class="inputContainer">
      <el-input v-model="reasonInput" placeholder="请输入举报理由，不超过20个字" />
      <el-button @click="addReasonTarget" style="margin-left: 10px" type="primary">添加</el-button>
    </div>
    <div class="reasonItemContainer">
      <el-tag @close="removeTarget(item.name)" v-for="item,index in ressonList" :key="item.name" closable>
        {{ item.name }}
      </el-tag>
    </div>
  </scrollDialog>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, ComponentInternalInstance, reactive, toRefs } from 'vue'
import { Document, Message } from '@element-plus/icons-vue'
import { getReportList, deleteReportReason, addReportReason, getReportReason, updateReportState } from "@/network/articleReport";
import { InitData } from "@/types/articleView/articleReport";
import articleContent from "@/components/articleContent.vue";
import scrollDialog from "@/components/scrollDialog.vue";
import reportToolBar from "./component/reportToolBar.vue";

export default defineComponent({
  name: 'articleReport',
  components: {
    articleContent,
    scrollDialog,
    reportToolBar
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())

    const getData = () => {
      getReportList({
        offset: data.offset,
        reason: data.reason,
        startTime: data.startTime == 9007199254740991n ? 0 : data.startTime,
        endTime: data.endTime == 9007199254740991n ? 0 : data.endTime,
        val: data.val,
        state: data.state,
      }).then((res: any) => {
        data.reportData = res.data.data
      })
    }
    getData()

    const getReason = () => {
      getReportReason().then((res: any) => {
        if(res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.ressonList = res.data.data
      })
    }
    getReason()

    const updateState = (state: string, id: string) => {
      updateReportState({
        state,
        id
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

    const addReason = () => {
      data.reasonDialog = true
    }

    const addReasonTarget = () => {
      let val = data.reasonInput.trim()
      if(val == '') {
        return proxy.$msg({
          title: '错误',
          message: '输入内容不能为空',
          type: 'error'
        })
      }
      if(val.length > 20) {
        return proxy.$msg({
          title: '错误',
          message: '输入内容不能超过20个字符',
          type: 'error'
        })
      }
      addReportReason({
        name: val
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
        data.reasonInput = ''
        getReason()
      })
    }

    // 删除举报理由
    const removeTarget = (name: string) => {
      deleteReportReason({
        name
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
        data.reasonInput = ''
        getReason()
      })
    }

    // 重置信息
    const resetInfo = () => {
      data.startTime = 9007199254740991n
      data.endTime = 9007199254740991n
      data.reason = ''
      data.val = ''
      data.state = ''
      data.offset = 1
      getData()
    }
    const searchInfo = (e: any) => {
      data.startTime = e.startTime
      data.endTime = e.endTime
      data.reason = e.reason
      data.val = e.val
      data.state = e.state
      data.offset = 1
      getData()
    }

    return {
      searchInfo,
      resetInfo,
      removeTarget,
      addReasonTarget,
      addReason,
      updateState,
      Message,
      Document,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
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
.reportInfoContainer {
  .infoItem {
    padding-bottom: 20px;
    .itemName {
      font-weight: bold;
      margin-bottom: 6px;
    }
    .itemValue {
      color: #7b7b7bcc;
    }
    .itemImage {
      display: flex;
      flex-wrap: wrap;
      .el-image {
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
  }
}
#articleReport {
  .tableUserInfo {
    margin-left:5px;
    font-size: 13px;
    .userId {
      color: #b1b1b1;
    }
  }
}
</style>