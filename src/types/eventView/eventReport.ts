import { SearchFormInt } from "../articleView/articleList"
import { IntEvent } from "./eventView"

interface IntEventReport {
  ev_id: string
  nickname: string
  reason: string
  state: string
  time: number
  user_id: string
  user_pic: string
}

export class InitData {
  offset: number = 1
  total: number = 0
  pageSize: number = 0
  dialog: boolean = false
  eventMap: Map<string, IntEvent> = new Map()
  eventDetail: IntEvent | null = null
  reports: IntEventReport[] = []

  form: SearchFormInt[] = [
    {
      type: 'select',
      name: 'reason',
      option: [],
      width: 150,
      placeholder: '举报理由'
    },
    {
      type: 'select',
      name: 'state',
      option: [
        {
          value: '1',
          label: '审核中'
        },
        {
          value: '2',
          label: '封禁'
        },
        {
          value: '3',
          label: '正常'
        },
      ],
      width: 150,
      placeholder: '审核状态'
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