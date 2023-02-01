import { SearchFormInt } from "../articleView/articleList";

export class InitData {
  uploadType: string = ''

  userData: {
    id: number | string,
    username: string,
    nickname: string
    email: string
    user_pic: string
    status: number | string
    _status: string
  }[] = []

  visible: boolean = false
  visiblePwdDia: boolean = false
  uIndex: number = 0
  tmpData: {
    id: number | string,
    username: string,
    nickname: string
    email: string
    user_pic: string
    status: number | string
    intro: string
    _status: string
  } | any = {
      id: '',
      username: '',
      nickname: '',
      email: '',
      user_pic: '',
      status: 0,
      _status: '',
      intro: ''
    }
  total: number = 0
  pageSize: any = 0
  offset: any = 1
  rules: any = {
    nickname: [
      { 
        required: true, 
        message: '用户姓名不能为空',
        trigger: 'blur' 
      }
    ],
    email: [
      {
        required: true,
        message: '账号邮箱不能为空',
        trigger: 'blur',
      },
      {
        pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,    //正则校验不用字符串
        message: '输入格式账号错误',
        trigger: 'blur'
      }
    ],
    phone: [
      { 
        required: true, 
        message: '手机号不能为空',
        trigger: 'blur' 
      },
      {
        pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
        message: '手机号不合法',
        trigger: 'blur'
      }
    ],
  }

  rulesPwd: any = {
    newPassword: [
      {
        required: true,
        message: '新密码不能为空',
        trigger: 'blur',
      },
      {
        pattern: /^[\S]{6,12}$/,
        message: '密码长度在6-12之间',
        trigger: 'blur'
      }
    ],
    rootPassword: [
      {
        required: true,
        message: '管理员密码不能为空',
        trigger: 'blur',
      },
    ]
  }
  rulePwdForm: {
    newPassword: string
    rootPassword: string
  } = {
    newPassword: '',
    rootPassword: ''
  }

  val: string = ''
  status: number = -1

  form: SearchFormInt[] = [
    {
      type: 'select',
      name: 'status',
      option: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '封禁',
          value: 2
        },
        {
          label: '禁言',
          value: 3
        },
      ],
      width: 150,
      placeholder: '账号状态'
    },
    {
      type: 'input',
      name: 'val',
      width: 250,
      placeholder: '请输入搜索内容'
    },
  ]
}