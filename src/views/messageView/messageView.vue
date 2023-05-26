<template>
  <div id="messageView">
    <el-table :data="messages" style="width: 100%">
      <el-table-column label="消息ID" width="250">
        <template #default="scope">
          <span style="font-size: 12px">{{ scope.row.msg_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间ID" width="160">
        <template #default="scope">
          <el-link @click="getRoomDetail(scope.$index)" type="primary">{{ scope.row.room_id }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="消息状态" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.state == '1'" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.state == '2'" type="danger">删除</el-tag>
        </template>
        </el-table-column>
      <el-table-column label="消息类型" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.type == '1'">文本</el-tag>
          <el-tag v-else-if="scope.row.type == '2'" type="warning">文章</el-tag>
          <el-tag v-else-if="scope.row.type == '3'" type="info">视频</el-tag>
        </template>
        </el-table-column>
      <el-table-column label="消息内容" width="150">
        <template #default="scope">
          <div class="messageContent" v-if="scope.row.type == '1'" :title="scope.row.resource">{{ scope.row.resource }}</div>
          <el-link @click="getArticle(scope.$index)" v-else-if="scope.row.type == '2'" type="primary">查看文章</el-link>
          <el-link @click="getVideo(scope.$index)" v-else-if="scope.row.type == '3'" type="primary">查看视频</el-link>
        </template>
        </el-table-column>
      <el-table-column label="发送时间" width="200">
        <template #default="scope">
          {{ proxy.$moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="发送者" width="190">
        <template #default="scope">
          <userInfo :user_pic="scope.row.from_user_pic" :nickname="scope.row.from_nickname" :user_id="scope.row.from_id" />
        </template>
      </el-table-column>
      <el-table-column label="接收者" width="190">
        <template #default="scope">
          <userInfo :user_pic="scope.row.to_user_pic" :nickname="scope.row.to_nickname" :user_id="scope.row.to_id" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button :disabled="scope.row.state == '2'" :icon="Delete" @click="deleteEvent(scope.$index)" size="small" type="danger">删除消息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="videoDialogClass" v-model="videoDialog" title="视频播放" width="45%">
      <video controls :src="video_url"></video>
    </el-dialog>
    <el-drawer :lock-scroll="true" v-model="drawer" title="查看文章" direction="rtl" :size="'40%'">
    <div v-if="article_info">
      <articleContent :title="article_info.title" :cate_name="article_info.cate_name"
        :targets="article_info.targets" :user_pic="article_info.user_pic"
        :nickname="article_info.nickname" :intro="article_info.intro"
        :pub_date="article_info.pub_date" :cover_img="article_info.cover_img"
        :content="article_info.content" />
    </div>
  </el-drawer>
  <scrollDialog :footer="true" title="房间消息" @handleClose="handleClose" :visible="roomDialog" @update:modelValue="roomDialog = $event">
    <div v-if="roomMessage" class="messageList">
      <div v-for="item in roomMessage" :key="item.msg_id" class="messageItem">
        <textMessage 
          v-if="item.type == '1'" 
          :from_id="item.from_id"
          :from_user_nickname="item.from_user_nickname"
          :from_user_pic="item.from_user_pic"
          :msg_id="item.msg_id"
          :resource="item.resource"
          :resource_info="item.resource_info"
          :room_id="item.room_id"
          :state="item.state"
          :time="item.time"
          :to_id="item.to_id"
          :type="item.type"
        />
        <articleMessage 
          v-else-if="item.type == '2'" 
          :from_id="item.from_id"
          :from_user_nickname="item.from_user_nickname"
          :from_user_pic="item.from_user_pic"
          :msg_id="item.msg_id"
          :resource="item.resource"
          :resource_info="item.resource_info"
          :room_id="item.room_id"
          :state="item.state"
          :time="item.time"
          :to_id="item.to_id"
          :type="item.type"
        />
        <videoMessage 
          v-else-if="item.type == '3'" 
          :from_id="item.from_id"
          :from_user_nickname="item.from_user_nickname"
          :from_user_pic="item.from_user_pic"
          :msg_id="item.msg_id"
          :resource="item.resource"
          :resource_info="item.resource_info"
          :room_id="item.room_id"
          :state="item.state"
          :time="item.time"
          :to_id="item.to_id"
          :type="item.type"
        />
      </div>
      <div class="paginationContainer">
        <el-pagination
          @current-change="pageChange"
          :current-page="roomInfoOffset"
          :page-size="roomInfoPageSize"
          background
          layout="prev, pager, next"
          :total="roomInfoCount"
          hide-on-single-page
        />
      </div>
    </div>
  </scrollDialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { getRoomMessage, getArticleById, getMessageList, deleteMessageById, getVideoUrlById } from "@/network/messageView";
import { InitData } from "@/types/messageView/messageView";
import userInfo from "@/components/userInfo.vue";
import articleContent from "@/components/articleContent.vue";
import scrollDialog from "@/components/scrollDialog.vue";
import textMessage from "./component/textMessage.vue";
import articleMessage from "./component/articleMessage.vue";
import videoMessage from "./component/videoMessage.vue";


export default defineComponent({
  name: 'messageView',
  components: {
    userInfo,
    articleContent,
    scrollDialog,
    textMessage,
    articleMessage,
    videoMessage
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive(new InitData())

    // 关闭回调
    const handleClose = () => {
      data.roomInfoOffset = 1
    }
    // 切换页码
    const pageChange = (e: number) => {
      data.roomInfoOffset = e
      getRoomDetail(data.roomIdx)
    }
    // 获取房间消息 
    const getRoomDetail = (i: number) => {
      data.roomIdx = i
      if(data.roomInfoOffset == 1) data.roomDialog = true
      getRoomMessage({
        room_id: data.messages[i].room_id,
        offset: data.roomInfoOffset
      }).then(res => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.roomMessage = res.data.data
        data.roomInfoCount = res.data.count
        data.roomInfoPageSize = res.data.pageSize
      })
    }
    // 获取文章消息
    const getArticle = (i: number) => {
      let id: string = data.messages[i].msg_id
      data.drawer = true
      if(!data.messageInfo.has(id)) {
        getArticleById({
          id: data.messages[i].resource
        }).then(res => {
          if (res.data.status) {
            return proxy.$msg({
              title: '错误',
              message: res.data.msg,
              type: 'error'
            })
          }
          data.article_info = res.data.data
          data.messageInfo.set(id, res.data.data)
        })
      } else {
        data.article_info = data.messageInfo.get(id)
      }
    }
    // 获取视频消息
    const getVideo = (i: number) => {
      data.videoDialog = true
      let id: string = data.messages[i].msg_id
      if(!data.messageInfo.has(id)) {
        getVideoUrlById({
          id: data.messages[i].resource
        }).then(res => {
          if (res.data.status) {
            return proxy.$msg({
              title: '错误',
              message: res.data.msg,
              type: 'error'
            })
          }
          data.video_url = res.data.data.video_url
          data.messageInfo.set(id, res.data.data.video_url)
        })
      } else {
        data.video_url = data.messageInfo.get(id)
      }
    }
    // 删除消息
    const deleteEvent = (i: number) => {
      deleteMessageById({
        msg_id: data.messages[i].msg_id
      }).then(res => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.messages[i].state = '2'
      })
    }
    // 获取数据
    const getData = () => {
      getMessageList({
        offset: data.offset
      }).then(res => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.messages = res.data.data
        data.pageSize = res.data.pageSize
        data.total = res.data.count
      })
    }

    onMounted(() => {
      getData()
    })
    return {
      handleClose,
      pageChange,
      getRoomDetail,
      getArticle,
      getVideo,
      Delete,
      deleteEvent,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#messageView {
  .messageContent {
    font-size: 12px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>