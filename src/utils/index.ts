import _copy from 'copy-to-clipboard'
import { Message } from '@arco-design/web-vue'
// 节流
export function throttle(fn: { apply: (arg0: any, arg1: any[]) => void }, t: number) {
  let flag = true
  const interval = t || 500
  return function (this: any, ...args: any) {
    if (flag) {
      // 每个函数都有apply方法，调用apply可以改变当前函数的this和参数
      fn.apply(this, args)
      // 修改传入的函数this指向以及传递参数
      // console.log(this, args)
      flag = false
      setTimeout(() => {
        flag = true
      }, interval)
    }
  }
}

// 防抖
export function debounce(fn: { apply: (arg0: any, arg1: any) => void }, t: number) {
  let timeId: any = null
  const delay = t || 500
  return function (this: any, ...args: any) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      timeId = null
      fn.apply(this, args)
    }, delay)
  }
}

export function copy(text: string) {
  Message.success('copy!')
  return _copy(text)
}

// 生成目录
export function makeToc(html: string): tocInter[] {
  const reg = /<h([\d]) id="([^<]+)">([^<]+)<\/h([\d])>/gi
  let ret = null
  const toc: tocInter[] = []
  while ((ret = reg.exec(html)) !== null) {
    toc.push({ level: ret[1], id: ret[2], text: ret[3] })
  }
  return toc
}
export interface tocInter {
  level: string
  id: string
  text: string
}
