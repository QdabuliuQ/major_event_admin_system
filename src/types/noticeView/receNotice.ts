export class InitData {
  offset: number = 1
  pageSize: number = 0
  total: number = 0

  is_top: number = -1
  status: string = '0'
  time: number = 0
  val: string = ''
  startTime: BigInt = 9007199254740991n
  endTime: BigInt = 9007199254740991n
  app_status: string = '0'
  noticeData: {
    content: string
    email: string
    id: string
    is_top: number
    name: string
    phone: string
    pub_id: string
    pub_status: string
    status: string
    time: bigint
    title: string
  }[] = []

  drawer: boolean = false

  tmpData: any = {}

  
}