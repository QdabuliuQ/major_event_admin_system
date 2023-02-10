<template>
  <div @click="toDetail" class="userInfoItem">
    <el-avatar :src="user_pic" />
    <div class="userData">
      <div class="userName">
        {{ nickname }}
      </div>
      <div class="userId">
        {{ user_id }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'userInfo',
  props: ['user_pic', 'nickname', 'user_id'],
  setup(props) {
    const router = useRouter()

    const toDetail = () => {
      router.push('/userInfo/articles/'+props.user_id)
    }

    return {
      toDetail
    }
  }
})
</script>

<style lang='less'>
.userInfoItem {
  display: flex;
  align-items: center;
  cursor: pointer;
  .userData {
    width: 50%;
    font-size: 13px;
    margin-left: 8px;

    .userName {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
    }

    .userId {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
      font-size: 12px;
      color: rgb(167, 167, 167);
    }
  }
}
</style>