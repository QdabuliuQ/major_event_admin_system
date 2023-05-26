<template>
  <div class="textMessage">
    <message 
      :from_id="from_id"
      :from_user_nickname="from_user_nickname"
      :from_user_pic="from_user_pic"
      :state="state"
      :time="time"
    >
      <div class="messageBox">
        {{ resource }}
      </div>
    </message>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import message from "./message.vue";

export default defineComponent({
  name: 'textMessage',
  components: {
    message
  },
  props: [
    'from_id',
    'from_user_nickname',
    'from_user_pic',
    'msg_id',
    'resource',
    'resource_info',
    'room_id',
    'state',
    'time',
    'to_id',
    'type'],
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
.textMessage {
  .messageBox {
    padding: 10px 10px;
    border-radius: 7px;
    font-size: 13px;
    display: inline;
    background-color: #499afc;
    color: #fff;
  }
}
</style>