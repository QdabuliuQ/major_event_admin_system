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

  drawer: boolean = false
  dialogVisible: boolean = false

  activeIndex: number = 0
}