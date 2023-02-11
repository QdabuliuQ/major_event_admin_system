interface ArticleInt {
  title: string
  cate_name: string
  user_pic: string
  targets: any[]
  intro: string
  pub_date: number
  cover_img: string
  content: string
  nickname: string
}

export class InitData {
  info: any = null
  articleDrawer: boolean = false
  activeIdx: string = 'articles'
  videoDialog: boolean = false
  videoUrl: string = ''
  articleInfo: ArticleInt | null = null
}