<template>
  <div id="adminLog">
    adminLog
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'adminLog',
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
</style>