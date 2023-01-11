export class InitData {
  offset: number = 1

  logData: {
    admin_email: string
    admin_id: string
    admin_name: string
    admin_phone: string
    admin_status: string
    log_id: string
    ope_desc: string
    ope_email: string
    ope_id: string
    ope_name: string
    ope_status: string
    ope_time: bigint
    phone: string
    time: bigint
    type: string
  }[] = []

  pageSize: number = 0
  total: number = 0

  startTime: bigint = 9007199254740991n
  endTime: bigint = 9007199254740991n
  type: string = '-1'
  val: string = ''
}