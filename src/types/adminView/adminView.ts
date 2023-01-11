export class InitData { 
  activeIndex: string = ''
  menuList: {
    name: string,
    index: string,
    icon: string,
    list: {
      name: string,
      index: string,
      path: string
    }[]
  }[] = [
    {
      name: "用户信息",
      index: "1",
      icon: "user",
      list: [
        {
          name: "普通用户",
          index: "1-1",
          path: "/client",
        },
        {
          name: "普通管理员",
          index: "1-2",
          path: "/administrator",
        },
      ],
    },
    {
      name: "文章管理",
      index: "2",
      icon: "user",
      list: [
        {
          name: "所有文章",
          index: "2-1",
          path: "/article",
        },
      ],
    },
    {
      name: "操作日志",
      index: "3",
      icon: "user",
      list: [
        {
          name: "超级管理员日志",
          index: "3-1",
          path: "/supAdminLog",
        },
        {
          name: "管理员日志",
          index: "3-2",
          path: "/adminLog",
        },
      ],
    },
  ],
}