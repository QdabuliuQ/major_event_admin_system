import { SearchFormInt } from "../articleView/articleList";

export class InitData {
  reasonDialog: boolean = false
  reasonInput: string = ''
  reasonList: {
    name: string
    type: string
  }[] = []
  offset: number = 1
  total: number = 0
  pageSize: number = 0
  reportData: {
    comment_id: string
    content: string
    id: string
    nickname: string
    re_nickname: string
    re_user_pic: string
    reason: string
    state: string
    time: number
    u_id: string
    user_id: string
    user_pic: string
  }[] = []

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
          label: '审核中',
          value: '1'
        },
        {
          label: '封禁',
          value: '2'
        },
        {
          label: '正常',
          value: '3'
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