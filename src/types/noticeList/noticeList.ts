import { NoTiceInt } from "@/types/indexView/indexView";

export class InitData {
  notices: NoTiceInt[] = []
  offset: number = 1
  pageSize: number = 10
  total: number = 0
  drawer: boolean = false
  idx: number = 0
}