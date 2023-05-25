import { SearchFormInt } from "../articleView/articleList"
import { IntEvent } from "../eventView/eventView"
import { IntComment } from "./commentList"

export class InitData {
  offset: number = 1
  total: number = 0
  pageSize: number = 0
  comments: IntComment[] = []
  dialog: boolean = false
  eventDetail: IntEvent | null = null
  eventMap: Map<string, IntEvent> = new Map()
  form: SearchFormInt[] = [
    {
      type: 'select',
      name: 'is_delete',
      option: [
        {
          label: '正常',
          value: 0
        },
        {
          label: '删除',
          value: 1
        },
      ],
      width: 150,
      placeholder: '评论状态'
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