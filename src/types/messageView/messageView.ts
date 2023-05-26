interface MessageInt {
  from_id: string
  from_nickname: string
  from_user_pic: string
  msg_id: string
  resource: string
  room_id: string
  state: string
  time: number
  to_id: string
  to_nickname: string
  to_user_pic: string
  type: string
}

export class InitData {
  offset: number = 1
  pageSize: number = 0
  total: number = 0
  messages: MessageInt[] = []
  videoDialog: boolean = false
  messageInfo: Map<string, any> = new Map()
  video_url: string = ''
  article_info: any = null
  drawer: boolean = false
  roomDialog: boolean = false
  roomInfoOffset: number = 1
  roomInfo: Map<string, any> = new Map()
  roomMessage: any = null
  roomInfoCount: number = 0
  roomInfoPageSize: number = 0
  roomIdx: number = 0
}