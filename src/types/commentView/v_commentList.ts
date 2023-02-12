import { IntComment } from "./commentList";
import { SearchFormInt } from "../articleView/articleList";

export class InitData {
  offset: number = 1
  total: number = 1
  pageSize: number = 1
  videoDialog: boolean = false
  videoUrl: string = ''
  commentData: IntComment[] = []

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