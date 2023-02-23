import { SearchFormInt } from "../articleView/articleList";

export class InitData {
  offset: number = 1
  pageSize: number = 0
  total: number = 0

  is_top: number = -1
  status: string = '0'
  time: number = 0
  val: string = ''
  startTime: BigInt = 9007199254740991n
  endTime: BigInt = 9007199254740991n
  app_status: string = '0'
  noticeData: {
    content: string
    email: string
    id: string
    is_top: number
    name: string
    phone: string
    pub_id: string
    pub_status: string
    status: string
    time: bigint
    title: string
  }[] = []

  drawer: boolean = false

  tmpData: any = {}

  form: SearchFormInt[] = [
    {
      type: 'select',
      name: 'app_status',
      option: [
        {
          label: '审核中',
          value: '1'
        },
        {
          label: '审核通过',
          value: '2'
        },
        {
          label: '审核失败',
          value: '3'
        },
      ],
      width: 150,
      placeholder: '是否置顶'
    },
    {
      type: 'select',
      name: 'is_top',
      option: [
        {
          label: '置顶',
          value: 1
        },
        {
          label: '不置顶',
          value: 0
        },
      ],
      width: 150,
      placeholder: '是否置顶'
    },
    {
      type: 'select',
      name: 'status',
      option: [
        {
          label: '正常',
          value: '1'
        },
        {
          label: '禁用',
          value: '2'
        },
      ],
      width: 150,
      placeholder: '公告状态'
    },
    {
      type: 'date-picker',
      name: 'time',
    },
    {
      type: 'input',
      name: 'val',
      width: 250,
      placeholder: '请输入搜索内容'
    },
  ]
}