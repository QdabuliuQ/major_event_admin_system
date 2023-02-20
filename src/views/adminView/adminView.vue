<template>
  <div id="adminView">
    <div class="topNav">大事件后台管理系统</div>
    <div class="bottomContainer">
      <div class="leftMenu">
        <el-scrollbar class="menuScrollContainer" :height="height + 'px'">
          <el-menu :default-active="activeIndex">
            <el-menu-item @click="() => {
              router.push('/index')
              activeIndex = '0-0'
            }" index="0-0">
              <el-icon>
                <House />
              </el-icon>
              <span>后台首页</span>
            </el-menu-item>
            <el-sub-menu v-for="item in menuList" :index="item.index">
              <template #title>
                <component v-if="item.icon" :is="item.icon"></component>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item @click="router.push(menu.path)" v-for="menu in item.list" :key="menu.index"
                  :index="menu.index">
                  <component :is="Menu"></component>
                  {{ menu.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="rightRouterView">
        <div v-if="path == '/index'" class="_routerContainer">
          <router-view></router-view>
        </div>
        <div v-else class="routerContainer">
          <div style="padding: 20px">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, onUnmounted, toRefs, watch } from "vue";
import { Menu, House } from '@element-plus/icons-vue'
import { InitData } from "@/types/adminView/adminView";
import { useRouter, useRoute } from "vue-router";

let timer: any = null;

export default defineComponent({
  name: "adminView",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const data: InitData = reactive(new InitData());
    data.path = route.path

    const resizeEvent = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        data.height = document.documentElement.clientHeight - document.getElementsByClassName('topNav')[0].clientHeight
      }, 200);
    }

    watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
      data.path = newValue
    })

    onMounted(() => {
      data.path = route.path
      data.activeIndex = router.currentRoute.value.meta.index as string;
      data.height = document.documentElement.clientHeight - document.getElementsByClassName('topNav')[0].clientHeight
      window.addEventListener('resize', resizeEvent)
    });

    onUnmounted(() => {
      window.removeEventListener('resize', resizeEvent)
    })

    return {
      House,
      Menu,
      router,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#adminView {
  .el-scrollbar__view {
    .is-active {
      color: #499afc !important;
      background-color: #4d4d4d;
      font-weight: bold;
    }
  }

  .el-menu-item {
    color: #fff;

    .el-icon {
      margin-right: 0;
    }

    &:hover {
      background-color: #4d4d4d;
    }
  }

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
    z-index: 4;
    top: 0;
    left: 0;
    right: 0;
  }

  .bottomContainer {
    display: flex;
    justify-content: flex-end;
    margin-top: 55px;

    .menuScrollContainer {
      background-color: #393939;
    }

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

          svg {
            width: 18px;
            margin-right: 5px;
          }

          &:hover {
            background-color: #4d4d4d;
          }
        }

        .el-menu-item-group {
          .el-menu-item {
            color: #fff !important;

            svg {
              width: 18px;
              margin-right: 5px;
            }

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

      ._routerContainer {
        margin: 20px;
      }

      .routerContainer {
        margin: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .1);
      }
    }
  }
}
</style>