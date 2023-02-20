<template>
  <div id="reportInfo">
    <div class="infoItem">
      <div class="itemName">
        举报理由
      </div>
      <div class="itemValue">
        {{ reason }}
      </div>
    </div>
    <div class="infoItem">
      <div class="itemName">
        举报描述
      </div>
      <div class="itemValue">
        {{ desc }}
      </div>
    </div>
    <div v-if="proof" class="infoItem">
      <div class="itemName">
        证明材料
      </div>
      <div class="itemValue itemImage">
        <el-image v-for="item, index in proof" style="width: 150px; height: 150px" :src="item.link"
          :preview-src-list="[item.link]" fit="cover" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'reportInfo',
  props: ['reason', 'desc', 'proof'],

  setup() {
    const data = reactive({})
    onMounted(() => {
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#reportInfo {
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
</style>