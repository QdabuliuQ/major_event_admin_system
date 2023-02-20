import { SearchFormInt } from "../articleView/articleList";

export class InitData {
  reportData: {
    desc: string
    id: string
    nickname: string
    proof: any
    reason: string
    state: string
    time: number
    user_id: string
    user_pic: string
    video_id: string
    video_url: string
  }[] = []
  offset: number = 1
  total: number = 0
  pageSize: number = 0
  idx: number = -1
  infoDrawer: boolean = false
  videoDialog: boolean = false

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
      placeholder: '状态'
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