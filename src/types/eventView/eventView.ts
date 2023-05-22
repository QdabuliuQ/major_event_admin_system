import { SearchFormInt } from "../articleView/articleList"

export interface IntEvent {
  comment_count: number
  content: string
  ev_id: string
  images: string
  nickname: string
  praise_count: number
  resource_id: string
  state: string
  time: number
  type: string
  user_id: string
  user_pic: string
}

export class InitData {
  total: number = 0
  pageSize: number = 0
  offset: number = 1

  events: IntEvent[] = []

  form: SearchFormInt[] = [
    {
      type: 'select',
      name: 'state',
      option: [
        {
          label: '正常',
          value: '1'
        },
        {
          label: '封禁',
          value: '2'
        },
        {
          label: '删除',
          value: '3'
        },
      ],
      width: 150,
      placeholder: '动态状态'
    },
    {
      type: 'select',
      name: 'type',
      option: [
        {
          label: '文本',
          value: '1'
        },
        {
          label: '文章',
          value: '2'
        },
        {
          label: '视频',
          value: '3'
        },
        {
          label: '动态',
          value: '4'
        },
      ],
      width: 150,
      placeholder: '动态类型'
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