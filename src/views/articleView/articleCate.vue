<template>
  <div id="articleCate">
    <cateToolBar @resetInfo="resetInfo" @searchInfo="searchInfo" @addCate="addCate" />
    <el-table :data="cateData" style="width: 100%">
      <el-table-column prop="id" label="分类ID" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="alias" label="别名" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column prop="time" label="创建时间">
        <template #default="scope">
          {{ scope.row.time ? proxy.$moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss') : '' }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.is_delete" type="danger">禁用</el-tag>
          <el-tag v-else type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button :icon="Edit" @click="updateItem(scope.$index)" type="primary">编辑分类</el-button>
          <el-button :icon="Close" v-if="!scope.row.is_delete" @click="setItemStatus(scope.$index, 1)" type="danger">禁用</el-button>
          <el-button :icon="Check" v-else @click="setItemStatus(scope.$index, 0)" type="success">还原</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination
        @current-change="pageChange"
        :current-page="offset"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" :title="(type == 'add' ? '添加' : '修改') + '文章分类'" width="40%" @close="handleClose">
    <el-form ref="cateFormRef" :model="cateForm" :rules="rules" label-width="80px" status-icon>
      <el-form-item v-if="type == 'update'" label="分类ID">
        <el-input disabled v-model="cateForm.id" />
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="cateForm.name" />
      </el-form-item>
      <el-form-item label="分类别名" prop="alias">
        <el-input v-model="cateForm.alias" />
      </el-form-item>
      <el-form-item label="分类描述" prop="desc">
        <el-input v-model="cateForm.desc" />
      </el-form-item>
      <el-form-item label="验证密码" prop="password">
        <el-input v-model="cateForm.password" />
      </el-form-item>
    </el-form>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitInfo">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, getCurrentInstance, ComponentInternalInstance, toRefs } from 'vue'
import type { FormInstance } from "element-plus";
import { Close, Edit, Check } from '@element-plus/icons-vue'
import { getCateList, addArticleCate, updateArticleCate, updateCateStatus } from "@/network/articleCate";
import { InitData } from "@/types/articleView/articleCate";
import cateToolBar from "./component/cateToolBar.vue";

export default defineComponent({
  name: 'articleCate',
  components: {
    cateToolBar
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const cateFormRef: any = ref<FormInstance>()
    const data: InitData = reactive(new InitData())

    // 获取数据
    const getData = (val?: string, is_delete?: number, startTime?: BigInt, endTime?: BigInt) => {
      getCateList({
        offset: data.offset,
        limit: data.pageSize,
        val,
        is_delete,
        startTime: (startTime == 9007199254740991n ? 0 : startTime) as bigint,
        endTime: (endTime == 9007199254740991n ? 0 : endTime) as bigint
      }).then(res => {
        data.cateData = res.data.data
        data.total = res.data.count
      })
    }
    getData()

    const pageChange = (e: number) => {
      data.offset = e
      if(data.val != '' || data.is_delete != -1 || data.startTime != 9007199254740991n) {
        getData(data.val, data.is_delete, data.startTime, data.endTime)
      } else {
        getData();
      }
    }

    const updateItem = (e: number) => {
      data.type = 'update'
      data.cateForm = { ...data.cateData[e] }
      data.dialogVisible = true
    }

    const addCate = () => {
      data.cateForm.name = ''
      data.cateForm.alias = ''
      data.cateForm.desc = ''
      data.cateForm.password = ''
      data.type = 'add'
      data.dialogVisible = true
    }

    const handleClose = () => {
      cateFormRef.value.resetFields()
    }

    // 提交表单信息
    const submitInfo = () => {
      // 表单验证
      cateFormRef.value.validate((vaild: boolean) => {
        if (vaild) {
          if (data.type == 'update') {
            updateArticleCate({
              id: data.cateForm.id as string,
              name: data.cateForm.name,
              alias: data.cateForm.alias,
              desc: data.cateForm.desc,
              password: data.cateForm.password as string,
            }).then(res => {
              if (res.data.status) {
                proxy.$msg({
                  title: '错误',
                  message: res.data.msg,
                  type: 'error'
                })
              } else {
                proxy.$msg({
                  title: '成功',
                  message: res.data.msg,
                  type: 'success'
                })
                getData()
                data.dialogVisible = false
              }
            })
          } else {
            addArticleCate({
              name: data.cateForm.name,
              alias: data.cateForm.alias,
              desc: data.cateForm.desc,
              password: data.cateForm.password as string,
            }).then((res: any) => {
              if (res.data.status) {
                proxy.$msg({
                  title: '错误',
                  message: res.data.msg,
                  type: 'error'
                })
              } else {
                proxy.$msg({
                  title: '成功',
                  message: res.data.msg,
                  type: 'success'
                })
                getData()
                data.dialogVisible = false
              }
            })
          }

        } else {
          proxy.$msg({
            title: '错误',
            message: '请完善输入内容',
            type: 'error'
          })
        }
      })
    }

    const searchInfo = (e: any) => {
      data.val = e.val
      data.is_delete = e.is_delete
      data.startTime = e.startTime
      data.endTime = e.endTime
      data.offset = 1
      getData(e.val, e.is_delete, e.startTime, e.endTime)
    }

    const resetInfo = () => {
      data.val = ''
      data.is_delete = -1
      data.startTime = 9007199254740991n
      data.endTime = 9007199254740991n
      data.offset = 1
      getData()
    }

    // 更新分类状态
    const setItemStatus = (e: number, type: number) => {
      let itemData = data.cateData[e]
      if(itemData.is_delete == type) {
        return proxy.$msg({
          title: '错误',
          message: '更新分类状态错误',
          type: 'error'
        })
      }
      updateCateStatus({
        id: itemData.id,
        is_delete: type
      }).then(res => {
        if(res.data.status) {
          proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        } else {
          proxy.$msg({
            title: '成功',
            message: res.data.msg,
            type: 'success'
          })
          getData()
        }
      })

    }

    return {
      resetInfo,
      searchInfo,
      pageChange,
      Edit,
      Close,
      Check,
      setItemStatus,
      addCate,
      updateItem,
      submitInfo,
      handleClose,
      cateFormRef,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#articleCate {}
</style>