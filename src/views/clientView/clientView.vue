<template>
  <div id="clientView">
    <inputSearch @searchInfo="searchInfo" @resetInfo='resetInfo' />
    <el-table :data="userData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="110" />
      <el-table-column label="头像" width="100">
        <template #default="scope">
          <div class="tablePicContainer">
            <el-avatar :src="scope.row.user_pic" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="账号状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.status == 2" type="danger">封禁</el-tag>
          <el-tag v-else-if="scope.row.status == 3" type="warning">禁言</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="edieInfo(scope.$index)" type="primary"
            >编辑信息</el-button
          >
          <el-button @click="edieInfo(scope.$index, 'password')" type="warning"
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
    <el-dialog v-model="visible" :top="'10vh'" title="编辑用户信息" width="40%">
      <el-form
        ref="infoFromRef"
        :rules="rules"
        :label-width="80"
        :model="tmpData"
      >
        <el-form-item label="账号ID">
          <el-input disabled v-model="tmpData.id" />
        </el-form-item>
        <el-form-item label="账号头像">
          <div @click="inputUploadRef.click()" class="avatarContainer">
            <img v-if="tmpData.user_pic" :src="tmpData.user_pic" alt="" />
            <div v-else class="noAvatar">
              <el-icon style="width: 30px; height: 30px"
                ><Plus style="font-size: 30px"
              /></el-icon>
            </div>
            <input
              @change="updateAvatar"
              ref="inputUploadRef"
              style="display: none"
              type="file"
            />
          </div>
        </el-form-item>
        <el-form-item prop="username" label="用户姓名">
          <el-input v-model="tmpData.username" />
        </el-form-item>
        <el-form-item label="账号昵称">
          <el-input v-model="tmpData.nickname" />
        </el-form-item>
        <el-form-item prop="email" label="账号邮箱">
          <el-input v-model="tmpData.email" />
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select v-model="tmpData.status">
            <el-option label="正常" value="1" />
            <el-option label="封禁" value="2" />
            <el-option label="禁言" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="updateInfo"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
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
  onMounted,
  toRefs,
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
import axios from "axios";
import type { FormInstance } from "element-plus";
import {
  getUserList,
  updateUserInfo,
  updateUserPwd,
} from "@/network/clientView";
import { InitData } from "@/types/clientView/clientView";
import inputSearch from "./component/inputSearch.vue";

export default defineComponent({
  name: "clientView",
  components: {
    inputSearch,
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;

    const inputUploadRef: any = ref();
    const infoFromRef: any = ref<FormInstance>();
    const pwdFormRef: any = ref<FormInstance>();

    const data: InitData = reactive(new InitData());

    // 获取所有用户信息
    const getUser = (val?: string, status?: number) => {
      getUserList({
        offset: data.offset,
        val,
        status
      }).then((res: any) => {
        data.userData = res.data.data;
        data.total = res.data.count;
        data.pageSize = res.data.pageSize;
      });
    };
    getUser();

    const filterStatus = (status: number): string => {
      switch (status) {
        case 1:
          return "正常";
        case 2:
          return "封禁";
        case 3:
          return "禁言";
        default:
          return "";
      }
    };

    const edieInfo = (index: number, type?: string) => {
      data.userData[index].status = data.userData[index].status.toString()
      data.tmpData = { ...data.userData[index] };
      
      if (type != "password") {
        data.visible = true;
      } else {
        data.visiblePwdDia = true;
      }
    };

    // 上传头像
    const updateAvatar = () => {
      if (proxy.$fileType(inputUploadRef.value.files[0].name) == "image") {
        let formData = new FormData();
        formData.append("avatar", inputUploadRef.value.files[0]);
        axios
          .post(proxy.$url + "/upload/avatar", formData, {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res: any) => {
            if (!res.data.status) {
              proxy.$msg({
                title: "成功",
                message: "上传图片成功",
                type: "success",
              });
              data.tmpData.user_pic = res.data.url;
            } else {
              proxy.$msg({
                title: "错误",
                message: "上传图片失败",
                type: "error",
              });
            }
          });
      } else {
        proxy.$msg({
          title: "错误",
          message: "文件类型错误",
          type: "error",
        });
      }
    };

    // 更新用户信息
    const updateInfo = () => {
      infoFromRef.value.validate((vaild: any, field: any) => {
        if (vaild) {
          updateUserInfo({
            id: data.tmpData.id,
            username: data.tmpData.username,
            nickname: data.tmpData.nickname,
            email: data.tmpData.email,
            status: parseInt(data.tmpData.status),
            user_pic: data.tmpData.user_pic,
          }).then((res: any) => {
            if (!res.data.status) {
              proxy.$msg({
                title: "成功",
                message: "修改用户信息成功",
                type: "success",
              });
              getUser();
              data.visible = false;
            } else {
              proxy.$msg({
                title: "失败",
                message: "修改用户信息失败",
                type: "error",
              });
            }
          });
        } else {
          proxy.$msg({
            title: "警告",
            message: "请完善必填信息",
            type: "warning",
          });
        }
      });
    };

    // 更新用户密码
    const updatePwd = () => {
      console.log(data.tmpData);
      // 验证表单信息
      pwdFormRef.value.validate((vaild: any, field: any) => {
        if (vaild) {
          updateUserPwd({
            id: data.tmpData.id,
            newPwd: data.rulePwdForm.newPassword,
            rootPwd: data.rulePwdForm.rootPassword,
          }).then((res: any) => {
            if (res.data.status) {
              return proxy.$msg({
                title: "错误",
                message: res.data.msg,
                type: "error",
              });
            }
            proxy.$msg({
              title: "成功",
              message: res.data.msg,
              type: "success",
            });
            data.visiblePwdDia = false;
            pwdFormRef.value.resetFields();
          });
        } else {
          proxy.$msg({
            title: "警告",
            message: "请完善必填信息",
            type: "warning",
          });
        }
      });
    };

    // 关闭更新密码窗口回调
    const pwdDialogClose = () => {
      pwdFormRef.value.resetFields();
    };

    // 页数改变
    const pageChange = (val: any) => {
      data.offset = val;
      if(data.val != '' || data.status != -1) {
        getUser(data.val, data.status);
      } else {
        getUser();
      }
    };

    const searchInfo = (d: { key: string; val: string; status: number }) => {
      data.offset = 1;
      data.val = d.val
      data.status = d.status
      getUser(d.val, d.status)
    };

    const resetInfo = () => {
      data.offset = 1;
      data.val = '' 
      data.status = -1
      getUser()
    }

    onMounted(() => {});

    return {
      pwdDialogClose,
      resetInfo,
      searchInfo,
      updatePwd,
      pageChange,
      updateInfo,
      updateAvatar,
      edieInfo,
      inputUploadRef,
      infoFromRef,
      pwdFormRef,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#clientView {
  .tablePicContainer {
    display: flex;
    align-items: center;
  }
  .avatarContainer {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px dashed 000;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .noAvatar {
      width: 100%;
      height: 100%;
      background-color: rgb(243, 243, 243);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
}
</style>