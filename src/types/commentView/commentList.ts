import { SearchFormInt } from "../articleView/articleList";

interface IntComment {
  art_id: string
  comment_id: string
  content: string
  is_delete: number
  nickname: string
  parent_id: string
  praise: number
  reply: number
  time: number
  user_id: string
  user_pic: string
}

export class InitData {
  offset: number = 1

  pageSize: number = 0
  total: number = 0
  comments: IntComment[] = []
  flootComments: any = null
  articleDrawer: boolean = false
  itemPageSize: number = 10

  replyDrawer: boolean = false

  idx: number = 0
  replyIdx: number = 0

  articleList: any[] = []

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