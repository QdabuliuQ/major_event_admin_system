<template>
  <div id="articleCate">
    <div class="cateNav">
      <searchForm @search-info="getData()" @reset-info="getData()" ref="searchFormRef" :form="form" />
      <el-button @click="addCate" :icon="Plus" type="primary">添加分类</el-button>
    </div>
    <!-- <cateToolBar @resetInfo="resetInfo" @searchInfo="searchInfo" @addCate="addCate" /> -->
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
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button size="small" :icon="Edit" @click="updateItem(scope.$index)" type="primary">编辑分类</el-button>
          <el-button size="small" :icon="PriceTag" @click="targetItem(scope.$index)" type="warning">标签管理</el-button>
          <el-button size="small" :icon="Close" v-if="!scope.row.is_delete" @click="setItemStatus(scope.$index, 1)"
            type="danger">禁用</el-button>
          <el-button size="small" :icon="Check" v-else @click="setItemStatus(scope.$index, 0)"
            type="success">还原</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination @current-change="pageChange" :current-page="offset" :page-size="pageSize" background
        layout="prev, pager, next" :total="total" />
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
  <el-drawer @close="drawerClose" :size="'40%'" v-model="drawer" title="标签管理" direction="rtl">
    <div class="targetInfoContainer">
      <div class="inputContainer">
        <div class="inputForm">
          <el-input style="margin-right: 15px" v-model="targetInput" placeholder="输入标签内容" />
          <el-button @click="addTarget" type="primary">添加</el-button>
        </div>
      </div>
      <div class="targetContainer">
        <div v-if="targetList.length" class="targets">
          <el-tag v-for="tag,index in targetList" :key="tag.id" closable :disable-transitions="false"
            @close="closeEvent(tag, index)">
            {{ tag.name }}
          </el-tag>
          <div v-if="!noMore" style="text-align: center; margin: 10px 0">
            <el-button @click="loadMore" size="small" type="primary">加载更多</el-button>
          </div>
        </div>
        <el-empty v-else description="暂无分类标签" />
      </div>
    </div>
  </el-drawer>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, ref, getCurrentInstance, ComponentInternalInstance, toRefs } from 'vue'
import type { FormInstance } from "element-plus";
import { Plus, Close, Edit, Check, PriceTag } from '@element-plus/icons-vue'
import {
  getCateList,
  addArticleCate,
  updateArticleCate,
  updateCateStatus,
  getCategoryTarget,
  addCategoryTarget,
  deleteCategoryTarget
} from "@/network/articleCate";
import { InitData } from "@/types/articleView/articleCate";
import searchForm from "@/components/searchForm.vue";

export default defineComponent({
  name: 'articleCate',
  components: {
    searchForm
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const cateFormRef: any = ref<FormInstance>()
    const searchFormRef = ref()
    const data: InitData = reactive(new InitData())

    // 获取数据
    const getData = () => {
      let form = searchFormRef.value.getValue()
      getCateList({
        offset: data.offset,
        limit: data.pageSize,
        val: form.val.value,
        is_delete: form.state.value,
        startTime: form.time.value.length ? form.time.value[0] : null,
        endTime: form.time.value.length ? form.time.value[1] : null
      }).then(res => {
        data.cateData = res.data.data
        data.total = res.data.count
        data.noMore = res.data.noMore
      })
    }
    

    const loadMore = () => {
      data.targetOffset ++
      getTargetData()
    }

    const pageChange = (e: number) => {
      data.offset = e
      getData();
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

    // 更新分类状态
    const setItemStatus = (e: number, type: number) => {
      let itemData = data.cateData[e]
      if (itemData.is_delete == type) {
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
        }
      })
    }

    const getTargetData = () => {
      getCategoryTarget({
        id: data.cate_id,
        limit: data.targetLimit,
        offset: data.targetOffset
      }).then(res => {
        if (res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: '获取分类标签失败',
            type: 'error'
          })
        }
        data.targetList.push(...res.data.data)
        data.noMore = res.data.noMore

      })
    }

    // 查看标签
    const targetItem = (e: number) => {
      data.cate_id = data.cateData[e].id
      data.drawer = true
      data.noMore = false
      getTargetData()
    }

    // 添加标签
    const addTarget = () => {
      if (data.targetInput.trim() != '') {
        addCategoryTarget({
          name: data.targetInput.trim(),
          cate_id: data.cate_id
        }).then(res => {
          if (res.data.status) {
            return proxy.$msg({
              title: '错误',
              message: res.data.msg,
              type: 'error'
            })
          }
          proxy.$msg({
            title: '成功',
            message: res.data.msg,
            type: 'success'
          })
          data.noMore = false
          data.targetOffset = 1
          data.targetList.length = 0
          getTargetData()
        })
      } else {
        proxy.$msg({
          title: '错误',
          message: '标签内容不能为空',
          type: 'error'
        })
      }
    }

    const closeEvent = (e: {
      id: string
      cate_id: string
      name: string
      time: any
    }, i: number) => {
      console.log(e.id, e.cate_id, i);
      deleteCategoryTarget({
        id: e.id,
        cate_id: e.cate_id
      }).then(res => {
        if(res.data.status) {
          return proxy.$msg({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
        data.targetList.splice(i, 1)
        proxy.$msg({
          title: '成功',
          message: res.data.msg,
          type: 'success'
        })
      })
    }

    const drawerClose = () => {
      data.targetOffset = 1
      data.noMore = false
      data.targetInput = ''
      data.targetList.length = 0
    }

    onMounted(() => {
      getData()
    }) 

    return {
      getData,
      drawerClose,
      loadMore,
      addTarget,
      closeEvent,
      targetItem,
      pageChange,
      Plus,
      PriceTag,
      Edit,
      Close,
      Check,
      setItemStatus,
      addCate,
      updateItem,
      submitInfo,
      handleClose,
      searchFormRef,
      cateFormRef,
      proxy,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>

.targetInfoContainer {
  .inputContainer {
    margin-bottom: 10px;
    .inputForm {
      display: flex;
      align-items: center;
    }
  }

  .el-tag {
    height: 30px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}

#articleCate {
  .el-button--small {
    padding: 15px 11px;
  }
  .cateNav {
    display: flex;
    justify-content: space-between;
  }
}
</style>