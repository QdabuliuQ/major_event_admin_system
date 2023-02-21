<template>
  <div id="noticeList">
    <el-page-header @back="router.go(-1)">
      <template #content>
        <span class="">{{ type == '1' ? '后台公告' : '前台公告' }}</span>
      </template>
    </el-page-header>
    <div class="listContainer">
      <div @click="() => {
        idx = index
        drawer = true
      }" v-for="item,index in notices" :key="item.id" class="noticeItem">
        <div class="leftItem">
          
          <div :title="item.title" class="item itemTitle">
            <el-tag style="margin-right: 5px;" v-if="item.is_top == 1" size="small">置顶</el-tag>
            {{ item.title }}
          </div>
          <div class="item itemDesc">
            {{ item.desc }}
          </div>
        </div>
        <div class="rightItem">
          <div class="itemTime">
            {{ proxy.$moment(item.time).format('YYYY-MM-DD HH:mm:ss') }} 
          </div>
        </div>
      </div>
    </div>
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
        :title="notices[idx].title" 
        :pub_name="notices[idx].nickname" 
        :pub_id="notices[idx].pub_id"
        :time="proxy.$moment(notices[idx].time).format('YYYY-MM-DD HH:mm:ss')"
        :content="notices[idx].content" />
    </template>
  </el-drawer>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { Upload } from '@element-plus/icons-vue';
import { InitData } from "@/types/noticeList/noticeList";
import { getBackNoticeList, getReceNoticeList } from "@/network/indexView";
import noticeContent from "@/components/noticeContent.vue";

export default defineComponent({
  name: 'noticeList',
  components: {
    noticeContent
  },
  setup() {
    const data = reactive(new InitData())
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const router = useRouter()
    const { type } = useRoute().params
    if (type != '1' && type != '2') {
      proxy.$msg({
        title: '错误',
        message: '获取公告数据失败',
        type: 'error'
      })
      router.go(-1)
    }

    const getData = () => {
      if (type == '1') {
        getBackNoticeList({
          offset: data.offset,
          pageSize: data.pageSize
        }).then((res: any) => {
          if (res.data.status) {
            return proxy.$msg({
              title: '错误',
              message: '获取后台公告失败',
              type: 'error'
            })
          }
          data.notices = res.data.data
          data.total = res.data.count
        })
      } else if (type == '2') {
        getReceNoticeList({
          offset: data.offset,
          pageSize: data.pageSize
        }).then((res: any) => {
          if (res.data.status) {
            return proxy.$msg({
              title: '错误',
              message: '获取后台公告失败',
              type: 'error'
            })
          }
          data.notices = res.data.data
          data.total = res.data.count
        })
      }
    }

    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }

    getData()
    

    return {
      Upload,
      pageChange,
      proxy,
      type,
      router,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#noticeList {
  .listContainer {
    margin-top: 10px;
    .noticeItem {
      display: flex;
      align-items: center;
      padding: 15px 10px;
      cursor: pointer;
      box-sizing: border-box;
      &:not(:last-child) {
        border-bottom: 1px solid rgb(227, 227, 227);
      }
      &:hover {
        background-color: #fafafa;
      }
    }
    .leftItem {
      flex: 8;
      .itemTitle {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 8px;
      }
      .itemDesc {
        color: #b0b0b0;
      }
      .item {
        width: 60vw;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .rightItem {
      flex: 2;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 14px;
      color: #b0b0b0;
    }
  }
}
</style>