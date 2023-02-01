import { SearchFormInt } from "./articleList";

export class InitData {
  reportData: any[] = []
  offset: number = 1
  articleDrawer: boolean = false
  artIndex: number = -1
  reasonDialog: boolean = false

  reasonList: {name: string}[] = []

  reasonInput: string = ''

  infoDrawer: boolean = false

  pageSize: number = 0
  total: number = 0

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
      placeholder: '举报状态'
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