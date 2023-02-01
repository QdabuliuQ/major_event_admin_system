export interface SearchFormInt {
  type: string
  name: string
  option?: {label: string, value: string|number}[]
  width?: number
  placeholder?: string
}

export class InitData {
  listData: {
    id: string
    cate_name: string
    cate_id: string
    collect_count: number
    comment_count: number
    browse_count: number
    cover_img: string
    pub_date: bigint
    title: string
    targets: any[]
    user_pic: string
    nickname: string
    intro: string
    content: string
  }[] = []
  offset: number = 1
  total: number = 0
  pageSize: number = 0

  drawer: boolean = false
  dialogVisible: boolean = false

  activeIndex: number = 0

  form: SearchFormInt[] = [
    {
      type: 'select',
      name: 'category',
      option: [
      ],
      width: 150,
      placeholder: '文章类别'
    },
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
      ],
      width: 150,
      placeholder: '文章状态'
    },
    {
      type: 'date-picker',
      name: 'time',
    },
    {
      type: 'input',
      name: 'val',
      width: 200,
      placeholder: '请输入搜索内容'
    },
  ]
}