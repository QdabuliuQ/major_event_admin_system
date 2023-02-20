<template>
  <div v-if="panelData" id="dataPanel">
    <div v-for="item in panelData" class="panelItem">
      <div class="panelTitle">
        <component :is="item.icon"></component>
        <span>{{ item.title }}</span>
      </div>
      <div class="panelCount">
        <em>{{ item.total }}</em>
      </div>
      <div class="panelTip">
        <div v-if="item.add == 0">
          无新增内容
        </div>
        <div v-else>
          较昨天新增 <span>+{{item.add}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'dataPanel',
  props: ['panelData'],
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
#dataPanel {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .panelItem {
    padding: 10px 30px;
    
    .panelTitle {
      display: flex;
      align-items: center;
      color: #000;
      font-size: 13.5px;
      span {
        position: relative;
        top: -.5px;
      }
      svg {
        width: 20px;
        margin-right: 5px;
      }
    }
    .panelCount {
      font-size: 40px;
      font-weight: bold;
      color: #499afc;
    }
    .panelTip {
      font-size: 13px;
      font-weight: bold;
      span {
        color: #499afc;
      }
    }
  }
}
</style>