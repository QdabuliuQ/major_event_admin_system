<template>
  <div class="eventVideo">
    <video controls :src="video_url"></video>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'eventVideo',
  props: [
    'video_url',
  ],
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
.eventVideo {
  padding: 10px 12px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 10px;
  video {
    background-color: #000;
    width: 100%;
    height: 220px;
    object-fit: contain;
  }
}
</style>