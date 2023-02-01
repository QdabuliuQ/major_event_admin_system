import { SearchFormInt } from "./articleList";

export class InitData {
  offset: number = 1
  pageSize: number = 10
  total: number = 0
  type: string = ''

  val: string = ''
  is_delete: number = -1
  startTime: bigint = 9007199254740991n
  endTime: bigint = 9007199254740991n

  cateData: {
    id: string
    alias: string
    desc: string
    is_delete: number
    name: string
    time: bigint
  }[] = []

  dialogVisible: boolean = false

  rules: any = {
    name: [
      { 
        required: true, 
        message: '分类名称不能为空',
        trigger: 'blur' 
      }
    ],
    alias: [
      { 
        required: true, 
        message: '分类别名不能为空',
        trigger: 'blur' 
      }
    ],
    desc: [
      { 
        required: true, 
        message: '分类描述不能为空',
        trigger: 'blur' 
      }
    ],
    password: [
      { 
        required: true, 
        message: '验证密码不能为空',
        trigger: 'blur' 
      }
    ],
  }

  cateForm: {
    id?: string
    name: string
    alias: string
    desc: string
    password?: string
    is_delete?: number
  } = {
    name: '',
    alias: '',
    desc: '',
    password: ''
  }
  cate_id: string = ''
  drawer: boolean = false

  targetLimit: number = 70
  targetOffset: number = 1
  targetList: {
    id: string
    cate_id: string
    name: string
    time: any
  }[] = []

  targetInput: string = ''
  noMore: boolean = false

  form: SearchFormInt[] = [
    {
      type: 'input',
      name: 'val',
      width: 200,
      placeholder: '请输入搜索内容'
    },
    {
      type: 'select',
      name: 'state',
      option: [
        {
          label: '正常',
          value: 0
        },
        {
          label: '禁用',
          value: 1
        },
      ],
      width: 150,
      placeholder: '分类状态'
    },
    {
      type: 'date-picker',
      name: 'time',
    },
  ]
}