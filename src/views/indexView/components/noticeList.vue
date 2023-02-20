<template>
  <div v-if="list.length" class="noticeList">
    <div v-for="item in list" class="listItem">
      <div class="leftInfo">
        {{ item[title] }}
      </div>
      <div class="rightInfo">
        <el-icon v-if="item[is_top] == '1'" size="15" color="#499afc">
        <Upload />
      </el-icon>
        {{ proxy.$moment(item[time]).fromNow() }}
      </div>
    </div>
  </div>
  <div v-else class="emptyList">
    暂无发布公告
  </div>
</template>

<script lang='ts'>
import { Upload } from '@element-plus/icons-vue';
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
export default defineComponent({
  name: 'noticeList',
  props: ['list', 'title', 'time', 'is_top'],
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive({})
    onMounted(() => {
    })
    return {
      Upload,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.noticeList {
  .listItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 13px;
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: 1px dashed #ccc;
    }

    &:hover {
      color: #499afc !important;
    }

    &:first-child {
      padding: 0 0 10px 0 !important;
    }

    &:last-child {
      padding: 10px 0 0 0 !important;
    }

    .leftInfo {
      width: 240px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      transition: .2s all linear;

    }

    .el-icon {
      margin-right: 10px;
      font-weight: bold;
    }

    .rightInfo {
      color: #a6a6a6;
      display: flex;
      align-items: center;
    }
  }
}

.emptyList {
  padding: 130px 0;
  color: #a6a6a6;
  text-align: center;
}</style>