<template>
  <div id="articleList">
    articleList
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'articleList',
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
#articleList {
  
}
</style>