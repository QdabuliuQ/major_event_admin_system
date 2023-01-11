<template>
  <div id="adminView">
    <div class="topNav">大事件后台管理系统</div>
    <div class="bottomContainer">
      <div class="leftMenu">
        <el-menu :default-active="activeIndex">
          <el-sub-menu v-for="item in menuList" :index="item.index">
            <template #title>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                @click="router.push(menu.path)"
                v-for="menu in item.list"
                :key="menu.index"
                :index="menu.index"
                >{{ menu.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="rightRouterView">
        <div class="routerContainer">
          <div style="padding: 20px">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/adminView/adminView";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "adminView",
  setup() {
    const router = useRouter()
    const data: InitData = reactive(new InitData());
    onMounted(() => {
      data.activeIndex = router.currentRoute.value.meta.index as string;
    });
    return {
      router,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#adminView {
  .topNav {
    width: 100vw;
    height: 55px;
    line-height: 55px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
    background-color: #499afc;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
  }
  .bottomContainer {
    display: flex;
    justify-content: flex-end;
    margin-top: 55px;
    .leftMenu {
      width: 200px;
      height: 100%;
      position: fixed;
      z-index: 2;
      left: 0;
      top: 55px;
      .el-menu {
        height: 100%;
        background-color: #393939;
        .el-sub-menu__title {
          color: #fff !important;
          &:hover {
            background-color: #4d4d4d;
          }
        }
        .el-menu-item-group {
          .el-menu-item {
            color: #fff !important;
            &:hover {
              background-color: #4d4d4d;
            }
          }
          .is-active {
            color: #499afc !important;
            background-color: #4d4d4d;
            font-weight: bold;
          }
        }
      }
    }
    .rightRouterView {

      width: calc(100% - 200px);
      .routerContainer {
        margin: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .1);
      }
    }
  }
}
</style>