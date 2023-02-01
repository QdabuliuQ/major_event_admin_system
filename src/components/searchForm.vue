<template>
  <div v-if="form && form.length" id="searchForm">
    <div v-for="item,index of form" :style="{width: item.width+'px'}" :key="item.name" class="formItem">
      <el-select v-if="item.type == 'select'" v-model="formData[index].value" :placeholder="item.placeholder">
        <el-option v-for="op in item.option" :key="op.value" :label="op.label" :value="op.value" />
      </el-select>
      <el-date-picker
        v-else-if="item.type == 'date-picker'"
        @change='(e: any[]) => {

        }'
        v-model="formData[index].value"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="x"
      />
      <el-input v-else-if="item.type == 'input'" v-model="formData[index].value" :placeholder="item.placeholder" />
    </div>
    <el-button class="clickBtn" :icon="Refresh" @click="resetInfo">重置</el-button>
    <el-button class="clickBtn" :icon="Search" @click="searchInfo" type="primary">搜索</el-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, watch, reactive, toRefs } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

interface ComInitData {
  formData: {
    value: any
  }[]

  copyForm: any
}

export default defineComponent({
  name: 'searchForm',
  /**
   * form表单[array]
   *    - 下拉框：
   *      - type属性 select
   *      - name属性
   *      - width宽度
   *      - option数据
   *      - placeholder文本内容
   *    - 时间选择器：
   *      - type属性 date-picker
   *      - name属性
   *      - width宽度
   *    - 输入框：
   *      - type属性 input
   *      - name属性 
   *      - width宽度
   *      - placeholder文本内容
   */
  props: ['form'],
  emits: ['searchInfo', 'resetInfo'],
  setup(props, context) {
    const data: ComInitData = reactive({
      copyForm: null,
      formData: []
    })

    const getValue = () => {
      let dataObj: any = {}
      for(let [index, item] of data.copyForm.entries()) {
        dataObj[(item.name) as string] = data.formData[index]
      }
      return dataObj
    }

    const resetInfo = () => {
      for(let item of data.formData) {
        item.value = ''
      }
      context.emit('resetInfo', getValue())
    }
    const searchInfo = () => {
      context.emit('searchInfo', getValue())
    }

    const deepClone = (obj: any) => {
      if(typeof obj != 'object' || obj == null) {
        return obj
      }
      let result: any = null
      if(obj instanceof Array) {
        result = []
      } else {
        result = {}
      }
      for(let key in obj) {
        result[key] = deepClone(obj[key])
      }
      return result
    }

    const createValue = (form: any[]) => {
      for(let [index, item] of form.entries()) {
        let valObj: any = null
        switch (item.type) {
          case 'select':
          case 'input':
            valObj = {
              value: ''
            }
            break;
          case 'date-picker':
            valObj = {
              value: 0,
            }
            break;
        }
        data.formData.push(valObj)
      }
    }
    
    watch(() => props.form, (val: any) => {
      data.copyForm = deepClone(val)
      createValue(val)
    }, {
      deep: true,
      immediate: true
    })

    return {
      getValue,
      searchInfo,
      resetInfo,
      Search, Refresh,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#searchForm {
  display: flex;
  flex-wrap: wrap;
  .formItem {
    margin-right: 30px;
    margin-bottom: 15px;
  }
  .clickBtn {
    margin-bottom: 15px;
  }
}
</style>