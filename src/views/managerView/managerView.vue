<template>
  <div id="managerView">
    <toolBar @searchInfo='searchInfo' @resetInfo='resetInfo' @addAdmin="addAdmin" />
    <el-table :data="adminData" style="width: 100%">
      <el-table-column prop="admin_id" label="ID" width="180" />
      <el-table-column prop="name" label="用户姓名" width="180" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="time" label="创建时间" width="180">
        <template #default="scope">
          {{ scope.row.time ? proxy.$moment(scope.row.time).format('YYYY-MM-DD HH:mm') : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="账号状态" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.status == 2" type="danger">封禁</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="editInfo(scope.$index)" type="primary"
            >编辑信息</el-button
          >
          <el-button @click="editInfo(scope.$index, 'password')" type="warning"
            >修改密码</el-button
          >
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
    <!-- 修改信息 -->
    <el-dialog
      v-model="updateVisible"
      :top="'10vh'"
      title="编辑管理员信息"
      width="40%"
    >
      <el-form
        ref="infoFromRef"
        :rules="rules"
        :label-width="80"
        :model="tmpData"
      >
        <el-form-item label="账号ID">
          <el-input disabled v-model="tmpData.admin_id" />
        </el-form-item>
        <el-form-item prop="name" label="用户姓名">
          <el-input v-model="tmpData.name" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="tmpData.phone" />
        </el-form-item>
        <el-form-item prop="email" label="账号邮箱">
          <el-input v-model="tmpData.email" />
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select v-model="tmpData.status">
            <el-option label="正常" value="1" />
            <el-option label="封禁" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item prop="rootPwd" label="密码验证">
          <el-input show-password v-model="tmpData.rootPwd" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateVisible = false">取消</el-button>
          <el-button type="primary" @click="updateInfo"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 添加管理员 -->
    <el-dialog
      v-model="addVisible"
      @closed="addDialogClose"
      :top="'10vh'"
      title="添加管理员信息"
      width="40%"
    >
      <el-form
        ref="addInfoFromRef"
        :rules="rules"
        :label-width="80"
        :model="addData"
      >
        <el-form-item prop="name" label="用户姓名">
          <el-input v-model="addData.name" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="addData.phone" />
        </el-form-item>
        <el-form-item prop="email" label="账号邮箱">
          <el-input v-model="addData.email" />
        </el-form-item>
        <el-form-item prop="password" label="账号密码">
          <el-input show-password v-model="addData.password" />
        </el-form-item>
        <el-form-item prop="rootPwd" label="密码验证">
          <el-input show-password v-model="addData.rootPwd" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="submitAdminInfo">添加</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改密码 -->
    <!--  -->
    <el-dialog
      :top="'10vh'"
      v-model="visiblePwdDia"
      title="修改账号密码"
      width="40%"
      @closed="pwdDialogClose"
    >
      <el-form
        ref="pwdFormRef"
        :model="rulePwdForm"
        :rules="rulesPwd"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="rulePwdForm.newPassword" />
        </el-form-item>
        <el-form-item label="管理员密码" prop="rootPassword">
          <el-input v-model="rulePwdForm.rootPassword" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visiblePwdDia = false">取消</el-button>
          <el-button type="primary" @click="updatePwd"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
import type { FormInstance } from "element-plus";
import toolBar from "./component/toolBar.vue";
import { getAdminList, addAdminInfo, updateAdminInfo, updateAdminPwd } from "@/network/managerView";
import { InitData } from "@/types/manageView/managerView";

export default defineComponent({
  name: "managerView",
  components: {
    toolBar,
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;

    const infoFromRef: any = ref<FormInstance>();
    const addInfoFromRef: any = ref<FormInstance>();
    const pwdFormRef: any = ref<FormInstance>();
    const data = reactive(new InitData());

    const getAdmin = (val?: string, status?: string) => {
      getAdminList({
        offset: data.offset,
        val,
        status
      }).then((res: any) => {
        data.adminData = res.data.data;
        data.total = res.data.count;
        data.pageSize = res.data.pageSize;
      });
    };
    getAdmin();

    // 打开管理员dialog
    const addAdmin = () => {
      data.addVisible = true;
    };
    // 添加管理员
    const submitAdminInfo = () => {
      // 验证表单信息
      addInfoFromRef.value?.validate((vaild: boolean) => {
        if (vaild) {
          // 发起请求
          addAdminInfo({
            rootPwd: data.addData.rootPwd,
            name: data.addData.name,
            phone: data.addData.phone,
            email: data.addData.email,
            password: data.addData.password,
          }).then((res: any) => {
            if (res.data.status) {
              // 失败
              proxy.$msg({
                title: "错误",
                message: res.data.msg,
                type: "error",
              });
            } else {
              // 成功
              proxy.$msg({
                title: "成功",
                message: res.data.msg,
                type: "success",
              });
              getAdmin();
              // 关闭弹窗
              data.addVisible = false;
            }
          });
        } else {
          proxy.$msg({
            title: "警告",
            message: "请完善输入内容",
            type: "warning",
          });
        }
      });
    };

    // 弹窗关闭回调
    const addDialogClose = () => {
      // 清空数据
      addInfoFromRef.value?.resetFields();
    };

    const pageChange = (e: number) => {
      data.offset = e
      if(data.val != '' || data.status != '-1') {
        getAdmin(data.val, data.status);

      } else {
        getAdmin();
      }
    };

    const editInfo = (i: number, type?: string) => {
      data.adminData[i].rootPwd = ''
      data.tmpData = {...data.adminData[i]};

      if (type != "password") {
        data.updateVisible = true;
      } else {
        data.visiblePwdDia = true;
      }
    };

    // 更新信息
    const updateInfo = () => {
      infoFromRef.value?.validate((vaild: boolean, field: any) => {
        
        if(vaild) {
          updateAdminInfo({
            rootPwd: data.tmpData.rootPwd,
            admin_id: data.tmpData.admin_id,
            name: data.tmpData.name,
            phone: data.tmpData.phone,
            email: data.tmpData.email,
            status: parseInt(data.tmpData.status as string),
          }).then((res: any) => {
            if(res.data.status) {
              proxy.$msg({
                title: "错误",
                message: res.data.msg,
                type: "error",
              });
            } else {
              proxy.$msg({
                title: "成功",
                message: res.data.msg,
                type: "success",
              });
              getAdmin();
              data.updateVisible = false;
            }
          })
        } else {
          proxy.$msg({
            title: "警告",
            message: "请完善输入内容",
            type: "warning",
          });
        }
      })
    };

    // 重置列表信息
    const resetInfo = () => {
      data.offset = 1
      data.val = '' 
      data.status = '-1'
      getAdmin()
    }

    // 搜索信息
    const searchInfo = (d: {
      val: string
      status: string
    }) => {
      data.offset = 1
      data.val = d.val
      data.status = d.status
      getAdmin(d.val, d.status)
    }

    // 关闭更新密码窗口回调
    const pwdDialogClose = () => {
      pwdFormRef.value.resetFields();
    };

    // 更新管理员密码
    const updatePwd = () => {
      // 验证表单
      pwdFormRef.value.validate((vaild: boolean) => {
        if(vaild) {
          updateAdminPwd({
            admin_id: data.tmpData.admin_id,
            newPwd: data.rulePwdForm.newPassword,
            rootPwd: data.rulePwdForm.rootPassword
          }).then((res: any) => {
            if(res.data.status) {
              proxy.$msg({
                title: "错误",
                message: res.data.msg,
                type: "error",
              });
            } else {
              proxy.$msg({
                title: "成功",
                message: res.data.msg,
                type: "success",
              });
              data.visiblePwdDia = false;
              getAdmin();
            }
          })
        } else {
          proxy.$msg({
            title: "警告",
            message: "请完善输入内容",
            type: "warning",
          });
        }
      })
    }

    return {
      addAdmin,
      submitAdminInfo,
      addDialogClose,
      updateInfo,
      editInfo,
      pageChange,
      resetInfo,
      searchInfo,
      updatePwd,
      pwdDialogClose,
      infoFromRef,
      addInfoFromRef,
      pwdFormRef,
      proxy,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#managerView {
}
</style>