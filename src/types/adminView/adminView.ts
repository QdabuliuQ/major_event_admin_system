export class InitData { 
  menuList: {
    name: string,
    index: string,
    icon: string,
    list: {
      name: string,
      index: string,
      path: string
    }[]
  }[] = []
}