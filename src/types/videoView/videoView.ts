import { SearchFormInt } from "../articleView/articleList";

interface VideoInt {
  cover_img: string
  duration: number
  id: string
  is_delete: string
  nickname: string
  state: string
  time: number
  title: string
  user_id: string
  user_pic: string
  video_url: string
  praise_count: number
  collect_count: number
}

export class InitData {
  offset: number = 1
  total: number = 0
  pageSize: number = 0
  videoData: VideoInt[] = []
  videoDialog: boolean = false
  activeIndex: number = -1

  drawer: boolean = false
  drawerOffset: number = 1
  drawerPageSize: number = 1
  drawerTotal: number = 1
  drawerType: string = ''
  drawerId: string = ''

  userList: {
    id: string
    nickname: string
    intro: string
    user_pic: string
  }[] = []
  form: SearchFormInt[] = [
    {
      type: 'select',
      name: 'state',
      option: [
        {
          label: '审核中',
          value: 1
        },
        {
          label: '正常',
          value: 2
        },
        {
          label: '封禁',
          value: 3
        },
      ],
      width: 150,
      placeholder: '审核状态'
    },
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
      placeholder: '视频状态'
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