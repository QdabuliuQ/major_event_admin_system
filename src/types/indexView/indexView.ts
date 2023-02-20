interface NoTiceInt {
  content: string
  id: string
  is_top: number
  pub_id: string
  status: string
  time: number
  title: string
}

export class InitData {
  websiteData: any = null

  backNotice: NoTiceInt[] = []
  receNotice: NoTiceInt[] = []
  cateData: {
    name: string
    count: number 
  }[] = []
}