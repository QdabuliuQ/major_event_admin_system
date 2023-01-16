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
}