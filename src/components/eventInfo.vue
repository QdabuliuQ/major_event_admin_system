<template>
  <div class="eventInfo">
    <div className='userInfo'>
      <div className='leftInfo'>
        <el-avatar v-if="!reply" fit='cover' :src='user_pic' />
        <div className='userData'>
          <div className='nickname'>
            {{ nickname }}
            <span className='type'>
              {{
                type == '1' ? '发布动态'
                : type == '2' ? '分享文章'
                  : type == '3' ? '分享视频'
                    : '转发动态' }}
            </span>
          </div>
          <div className='pubTime'>
            {{ proxy.$moment(time).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </div>
      </div>
    </div>
    <div :style="{marginLeft: reply ? '0px' : '50px'}" className='eventContext'>
      <div v-if="content" className='eventContent'>
        {{ content }}
      </div>
      <div v-if="images && images.length" className='eventImages'>
        <div v-for="item in images" :key="item.link" class="imgItem">
          <el-image :preview-src-list="[item.link]" style="width: 100%; height: 100%" :src="item.link" fit="cover" />
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
export default defineComponent({
  name: 'eventInfo',
  props: [
    'reply',
    'user_id',
    'nickname',
    'user_pic',
    'time',
    'type',
    'content',
    'images',
  ],
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const data = reactive({})
    onMounted(() => {
    })
    return {
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.eventInfo {
  .userInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .leftInfo {
      display: flex;
      align-items: center;

      .el-avatar {
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .userData {
      flex: 1;

      .nickname {
        font-size: 14px;
        margin-bottom: 5px;

        .type {
          display: inline-block;
          margin-left: 10px;
          color: #b7b7b7;
        }
      }

      .pubTime {
        color: #b7b7b7;
        font-size: 12px;
      }
    }
  }

  .eventContext {
    margin-bottom: 10px;
    .eventContent {
      margin-bottom: 10px;
      font-size: 14px;
      word-break: break-all;
    }

    .eventImages {
      margin-bottom: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 10px;

      .imgItem {
        width: 100%;
        aspect-ratio: 1/1;
        border-radius: 6px;
        overflow: hidden;
      }
    }
  }
}
</style>