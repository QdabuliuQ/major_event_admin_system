<template>
  <div id="loginView">
    <div class="loginContainer">
      <div class="mask"></div>
      <div class="container_title">
        登录账号
      </div>
      <div class="container_input">
        <input v-model="account" placeholder="输入手机号或者邮箱" type="text">
      </div>
      <div class="container_input">
        <input v-model="password" placeholder="输入密码" type="text">
      </div>
      <div class="container_input code_input">
        <input v-model="c" placeholder="输入密码" type="text">
        <div @click="toggleCode" class="svgCode" v-html="svg"></div>
      </div>
      <div class="container_select">
        <el-select popper-class="loginSelectStatusClass" v-model="type">
          <el-option
            label="超级管理员"
            :value="1"
          />
          <el-option
            label="普通管理员"
            :value="2"
          />
        </el-select>
      </div>
      <div @click="loginEvent" class="container_btn">
        点击登录
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
import axios from "axios";
import { useRouter } from "vue-router";
import glovar from "@/static/globalVar";
import { InitData } from "@/types/loginView/loginView";
import { login } from "@/network/loginView";

export default defineComponent({
  name: "loginView",
  setup() {
    let timer: any = null
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const router = useRouter()

    const data = reactive(new InitData());

    const getCode = () => {
      const service = axios.create({
        baseURL: glovar.url+'/code/getCode', // api的base_url
        withCredentials: true, // 解决服务器设置token到cookies中，浏览器Application的cookies中没有存入token
        timeout: 20000 // 请求超时时间
      })
      service({
        url: glovar.url+'/code/getCode',
        method: 'get',
      }).then((res: any) => {
        data.svg = res.data.svg
        data.code = res.data.code
      })
    }
    getCode()

    // 切换验证码
    const toggleCode = () => {
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        getCode()
      }, 300);
    }

    const loginEvent = () => {
      if(data.c.trim() != data.code) {
        return proxy?.$msg({
          title: "错误",
          message: '验证码错误',
          type: "error",
        });
      }
      if (data.account.trim() != "" && data.password.trim() != "") {
        login(data.account.trim(), data.password.trim(), data.type).then((res: any) => {
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
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("type", res.data.type)
            
            setTimeout(() => {
              console.log('登录', sessionStorage.getItem("token"));
              
              router.push('/admin' )
              
            }, 300);
          }
        });
      } else {
        proxy?.$msg({
          title: "错误",
          message: '账号或密码不能为空',
          type: "error",
        });
      }
    };

    return {
      toggleCode,
      loginEvent,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.loginSelectStatusClass {
  text-align: center;
}
#loginView {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(130deg,  #3ab7ef, #be87fa);
  .loginContainer {
    position: relative;
    z-index: 2;
    padding: 50px 30px;
    border-radius: 10px;
    overflow: hidden;
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      filter: blur(6px);
    background-color: #ffffff48;

    }
    .container_title {
      padding: 30px 0 60px;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      letter-spacing: 6px;
      text-indent: 6px;
      color: #fff;
    }
    .code_input {
      display: flex;
      align-items: center;
      input {
        flex: 1;
      }
      .svgCode {
        margin-left: 10px;
        height: 100%;
        cursor: pointer;
        position: relative;
        top: 3px;
        svg {
          height: 100%;
        }
      }
    }
    .container_select {
      margin-bottom: 20px;
      .el-select {
        width: 100%;
        .el-input__inner {
          text-align: center;
        }
      }
    }
    .container_input {
      width: 300px;
      margin-bottom: 20px;
      input {
        width: 100%;
        padding: 10px 0;
        outline: none;
        border: 0;
        border-bottom: 1px solid #fff;
        transition: .2s all linear;
        background-color: transparent;
        color: #fff;
        &::placeholder {
          font-size: 13px;
          color: #fff;
        }
        &:focus {
          border-bottom: 1px solid #499afc;
        }
      }
    }
    .container_btn {
      width: 100%;
      padding: 12px 0 14px;
      text-align: center;
      cursor: pointer;
      background-color: #499afc;
      color: #fff;
      letter-spacing: 4px;
      font-weight: bold;
      border-radius: 6px;
      text-indent: 6px;
      user-select: none;
      margin-bottom: 60px;
      &:hover {
        background-color: #3e84d9;
      }
    }
    .btnContainer {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>