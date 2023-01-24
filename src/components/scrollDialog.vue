<template>
  <el-dialog class="scrollDialogContainer" v-model="dialogVisible" :title="title" :width="width ? width : '40%'" :before-close="handleClose">
    <el-scrollbar :lock-scroll="true" :height="(height ? height : 370) + 'px'">
      <div style="padding: 30px 30px 20px">
        <slot></slot>
      </div>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ cancelVal? cancelVal: '取消' }}</el-button>
        <el-button type="primary" @click="confirm">
          {{ confirmVal? confirmVal: '确认' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { defineComponent, reactive, watch, toRefs } from 'vue'

interface ComInitData {
  dialogVisible: boolean
}

export default defineComponent({
  name: 'scrollDialog',
  emits: ['handleClose', 'confirm', 'update:modelValue'],
  props: ['visible', 'title', 'height', 'width', 'cancelVal', 'confirmVal'],
  setup(props, context) {
    const data: ComInitData = reactive({
      dialogVisible: false
    })

    const handleClose = () => {
      context.emit('handleClose')
      context.emit("update:modelValue", false)
    }

    const confirm = () => {
      context.emit('confirm')
    }

    watch(() => props.visible, (newVal: boolean) => {
      data.dialogVisible = newVal
    })

    return {
      confirm,
      handleClose,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.scrollDialogContainer {
  .el-dialog__body {
    padding: 0;
  }
}
</style>