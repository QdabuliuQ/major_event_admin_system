<template>
  <div id="receNoticeInfo">
    <el-page-header @back="router.go(-1)">
      <template #content>
        <span class="topTitle">{{ routerPath == 'updateReceNotice' ? '修改' : '发布' }}前台公告</span>
      </template>
    </el-page-header>
    <div class="infoContainer">
      <div ref="fromContainerRef" class="fromContainer">
        <el-form ref="noticeInfoFormRef" :model="noticeForm" :rules="rules" label-width="100px" status-icon>
          <el-form-item label="公告标题" prop="title">
            <el-input v-model="noticeForm.title" />
          </el-form-item>
          <el-form-item v-if="type == '1'" label="公告置顶">
            <el-switch v-model="noticeForm.is_top" />
          </el-form-item>
          <el-form-item v-if="type == '1'" label="公告状态">
            <el-radio-group v-model="noticeForm.status">
              <el-radio label="1">正常</el-radio>
              <el-radio label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="inputItem">
          <div class="itemLabel">公告内容</div>
          <div class="itemTextarea">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
              :mode="mode" />
            <Editor style="height: 500px; overflow-y: hidden;" v-model="noticeForm.valueHtml"
              :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
          </div>
        </div>
        <div class="btnItem">
          <el-button @click="pubNotice" type="primary">{{ routerPath == 'updateReceNotice' ? '修改' : '发布'
          }}公告</el-button>
        </div>
      </div>
      <div class="noticeContainer">
        <el-scrollbar :height="height + 'px'">
          <noticeContent :title="noticeForm.title" :content="noticeForm.valueHtml" :pub_name="noticeForm.pub_name"
            :time="noticeForm.time" :pub_id="noticeForm.pub_id" />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, ref, shallowRef, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { useRouter } from "vue-router";
import type { FormInstance } from "element-plus";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import glovar from "@/static/globalVar";
import noticeContent from "@/components/noticeContent.vue";
import { InitData } from "@/types/noticeView/receNoticeInfo";
import { addNotice, getNoticeInfo, updateNoticeInfo } from "@/network/receNoticeInfo"

export default defineComponent({
  name: 'receNoticeInfo',
  components: {
    noticeContent,
    Editor,
    Toolbar
  },
  setup() {
    const router = useRouter()
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const editorRef = shallowRef()
    const fromContainerRef = ref()
    const noticeInfoFormRef: any = ref<FormInstance>()
    const data = reactive(new InitData())
    const type = sessionStorage.getItem('type')

    const updateSuccess = (msg: string) => {
      proxy.$msg({
        title: '成功',
        message: msg,
        type: 'success'
      })
    }
    const updateError = (msg: string) => {
      proxy.$msg({
        title: '错误',
        message: msg,
        type: 'error'
      })
    }

    const pubNotice = () => {
      noticeInfoFormRef.value.validate((vaild: boolean) => {
        if (vaild) {
          // 判断公告内容
          if (data.noticeForm.valueHtml == "<p><br></p>") {
            return proxy.$msg({
              title: '错误',
              message: '公告内容不能为空',
              type: 'error'
            })
          }

          if (data.routerPath == 'updateReceNotice') {
            let form = data.noticeForm
            updateNoticeInfo({
              id: form.id,
              is_top: form.is_top ? 1 : 0,
              status: form.status,
              title: form.title,
              content: form.valueHtml,
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
                router.go(-1)
              }
            })
          } else {
            // 发起请求
            addNotice({
              title: data.noticeForm.title,
              content: data.noticeForm.valueHtml,
              is_top: data.noticeForm.is_top ? 1 : 0,
              status: data.noticeForm.status,
            }).then((res: any) => {
              if (res.data.status) {
                proxy.$msg({
                  title: '错误',
                  message: '发布公告失败',
                  type: 'error'
                })
              } else {
                proxy.$msg({
                  title: '成功',
                  message: '发布公告成功',
                  type: 'success'
                })
                router.go(-1)
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

    // 编辑器配置
    const editorConfig: any = {
      placeholder: '请输入内容...',
      MENU_CONF: {
        uploadImage: {
          fieldName: 'image',
          server: glovar.url + '/upload/imageNotice',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          onSuccess: () => {
            updateSuccess('上传图片成功')
          },

          onError: () => {
            updateError('上传图片失败')
          }
        },
        uploadVideo: {
          fieldName: 'video',
          server: glovar.url + '/upload/videoNotice',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          onSuccess: () => {
            updateSuccess('上传视频成功')
          },
          onError: () => {
            updateError('上传视频失败')
          }
        }
      }
    }

    // 组件创建
    const handleCreated = (editor: any) => {
      editorRef.value = editor // 记录 editor 实例，重要！

      setTimeout(() => {
        // const toolbar = DomEditor.getToolbar(editor)
        // const curToolbarConfig = toolbar?.getConfig();
        data.height = fromContainerRef.value.clientHeight

      }, 300)
    }

    onMounted(() => {
      data.routerPath = router.currentRoute.value.name as string
      if (data.routerPath == 'updateReceNotice') {
        getNoticeInfo({
          id: router.currentRoute.value.query.id as string
        }).then(res => {
          console.log(res);
          if (res.data.status) {
            proxy.$msg({
              title: '错误',
              msg: res.data.msg,
              type: 'error'
            })
            router.go(-1)
            
            
          } else {
            data.noticeForm.title = res.data.data.title
            data.noticeForm.is_top = res.data.data.is_top ? true : false
            data.noticeForm.status = res.data.data.status
            data.noticeForm.valueHtml = res.data.data.content
            data.noticeForm.pub_name = res.data.data.pub_name
            data.noticeForm.pub_id = res.data.data.pub_id
            data.noticeForm.time = res.data.data.time
            data.noticeForm.id = res.data.data.id
          }
        })
      }
    })

    return {
      type,
      pubNotice,
      handleCreated,
      noticeInfoFormRef,
      fromContainerRef,
      editorRef,
      editorConfig,
      router,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#receNoticeInfo {
  .infoContainer {
    margin-top: 20px;
    display: flex;

    .fromContainer {
      width: 50%;
      padding-right: 20px;

      .btnItem {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }

    .noticeContainer {
      padding-left: 20px;
      width: 50%;
      box-sizing: border-box;
      border-left: 2px dashed #ccc;
    }
  }

  .inputItem {
    margin-top: 25px;
    width: 100%;
    display: flex;

    .itemLabel {
      width: 88px;
      padding-right: 12px;
      font-size: 13px;
      text-align: right;
    }

    .itemTextarea {
      border: 1px solid #ccc;
      flex: 1;
    }
  }
}
</style>