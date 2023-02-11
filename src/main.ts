import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElNotification } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import moment from 'moment'; 
import 'moment/locale/zh-cn'
import mitt from 'mitt'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$msg = ElNotification
app.config.globalProperties.$url = 'http://127.0.0.1:8080'
app.config.globalProperties.$moment = moment
app.config.globalProperties.$mitt = new (mitt as any)()

app.config.globalProperties.$fileType = function (fileName: any) {  // 判断文件类型
  let suffix = ''; // 后缀获取
  let result: any = ''; // 获取类型结果
  if (fileName) {
    const flieArr = fileName.split('.'); // 根据.分割数组
    suffix = flieArr[flieArr.length - 1]; // 取最后一个
  }
  if (!suffix) return false; // fileName无后缀返回false
  suffix = suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作
  // 匹配图片
  const imgList = ['png', 'jpg', 'jpeg', 'gif']; // 图片格式
  result = imgList.find(item => item === suffix);
  if (result) return 'image';
}

app.use(ElementPlus).use(store).use(router).mount('#app')
