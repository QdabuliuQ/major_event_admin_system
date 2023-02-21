export interface NoTiceInt {
  content: string
  id: string
  is_top: number
  pub_id: string
  status: string
  time: number
  title: string
  nickname: string
  desc?: string
}

export class InitData {
  websiteData: any = null
  drawer: boolean = false
  type: string = '1'
  tmpData: NoTiceInt | null = null

  backNotice: NoTiceInt[] = []
  receNotice: NoTiceInt[] = []
  cateData: {
    name: string
    count: number 
  }[] = []
}