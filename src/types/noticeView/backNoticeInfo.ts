export class InitData {
  height: number = 0

  routerPath: string = ''

  noticeForm: {
    title: string
    is_top: boolean
    status: string
    valueHtml: string
    pub_name?: string
    time: BigInt
    pub_id: string
    id: string
  } = {
      title: '',
      is_top: false,
      status: '1',
      valueHtml: '',
      pub_name: '',
      time: 9007199254740991n,
      pub_id: '',
      id: ''
    }

  rules: any = {
    title: [
      {
        required: true,
        message: '公告标题不能为空',
        trigger: 'blur',
      },
    ]
  }
  toolbarConfig: any = {
    toolbarKeys: [
      "headerSelect",
      "blockquote",
      "bold",
      "underline",
      "italic",
      "through",
      "fontSize",
      "fontFamily",
      "lineHeight",
      "bulletedList",
      "numberedList",
      {
        iconSvg: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
        key: "group-justify",
        menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
        title: "对齐"
      },
      "insertLink",
      "uploadImage",
      "uploadVideo",
      "insertTable",
      "codeBlock",
      "divider",
      "undo",
      "redo"
    ]
  }
  mode: string = 'default'
}