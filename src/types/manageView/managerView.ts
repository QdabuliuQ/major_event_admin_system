export class InitData {
  offset: number = 1
  pageSize: number = 1
  total: number = 1
  visiblePwdDia: boolean = false
  updateVisible: boolean = false
  addVisible: boolean = false
  adminData: {
    admin_id: string
    email: string
    name: string
    phone: string
    status: string
    type: number
    rootPwd: string 
  }[] = []

  tmpData: {
    admin_id: string
    email: string
    name: string
    phone: string
    status: string
    type: number
    rootPwd: string
  } = {
    admin_id: '',
    email: '',
    name: '',
    phone: '',
    status: '1',
    type: 0,
    rootPwd: ''
  }

  addData: {
    admin_id: string
    email: string
    name: string
    phone: string
    password: string
    rootPwd: string
    status: string
    time: bigint | string
  } = {
    admin_id: '',
    email: '',
    name: '',
    phone: '',
    password: '',
    rootPwd: '',
    status: '1',
    time: ''
  }

  rules: any = {
    name: [
      { 
        required: true, 
        message: '用户姓名不能为空',
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
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
      },
      {
        pattern: /^[\S]{6,12}$/,
        message: '密码长度在6-12之间',
        trigger: 'blur'
      }
    ],
    rootPwd: [
      {
        required: true,
        message: '超级管理员密码不能为空',
        trigger: 'blur',
      }
    ]
  }

  val: string = ''
  status: string = '-1'

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
}