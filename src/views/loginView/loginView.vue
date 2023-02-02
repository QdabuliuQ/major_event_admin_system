<template>
  <div id="loginView">
    <div class="loginContainer">
      <el-input style="margin-bottom: 30px" v-model="phone">
        <template #prepend>手机号：</template>
      </el-input>
      <el-input v-model="password">
        <template #prepend>密码：</template>
      </el-input>
      <div class="btnContainer">
        <el-button @click="loginEvent" size="large" type="primary"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
import { useRouter } from "vue-router";
import { InitData } from "@/types/loginView/loginView";
import { login } from "@/network/loginView";

export default defineComponent({
  name: "loginView",
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const router = useRouter()

    const data: InitData = reactive({
      phone: "",
      password: "",
    });

    const loginEvent = () => {
      if (data.phone.trim() != "" && data.password.trim() != "") {
        login(data.phone.trim(), data.password.trim(), 1).then((res: any) => {
          if (res.data.status) {
            proxy?.$msg({
              title: "错误",
              message: res.data.msg,
              type: "error",
            });
          } else {
            proxy?.$msg({
              title: "成功",
              message: res.data.msg,
              type: "success",
            });
            localStorage.setItem("token", res.data.token);
            setTimeout(() => {
              router.push('/admin')
            }, 100);
          }
        });
      }
    };

    return {
      loginEvent,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#loginView {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginContainer {
    padding: 50px 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .btnContainer {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>