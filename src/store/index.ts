/**
 * @description: 全局状态共享 需要用到时引入此文件即可
 */
import { reactive, readonly } from 'vue'
import { watch, toRaw } from 'vue'
import { createAction } from './action'
export interface AnyPropName {
  [propName: string | number]: any
}
export interface XStore {
  action: AnyPropName
  state: AnyPropName
}
export interface XState {
  token: string
  userInfo: AnyPropName
  userConfig: AnyPropName
}
// state
export const State: XState = reactive({
  token: '',
  userInfo: {},
  userConfig: {
    paperFeeling: true,
    theme: 'light'
  }
})
// 创建State
export function createState() {
  return reactive(State)
}

// 使用
const state = createState()
const action = createAction(state)
export const useStore = (): XStore => {
  const store: XStore = {
    // 为了防止意外修改
    state: createPersistStorage(state, 'blog'),
    action: readonly(action)
  }
  return store
}

// 数据持久化存储
export function createPersistStorage<T>(state: any, rootkey = 'default'): T {
  const STORAGE_KEY = '--APP-STORAGE--'
  Object.entries(getItem(true)).forEach(([key, value]) => {
    // 把本地的缓存的数据赋值给state
    state[key] = value
  })
  function setItem(state: XState) {
    const stateRow = getItem() // 获取STORAGE_KEY下全部
    stateRow[rootkey] = state //更新最新的state
    const stateStr = JSON.stringify(stateRow)
    localStorage.setItem(STORAGE_KEY, stateStr)
  }

  function getItem(init?: boolean) {
    const stateStr = localStorage.getItem(STORAGE_KEY) || '{}'
    const stateRow = JSON.parse(stateStr) || {}
    // console.log(stateRow)
    // 有key直接取对象属性，第一次时使用rootKey
    return init ? stateRow[rootkey] || {} : stateRow // 获取STORAGE_KEY下全部 为了能给对应的key更新
  }

  watch(state, () => {
    // https://v3.cn.vuejs.org/api/basic-reactivity.html#toraw
    const stateRow = toRaw(state)
    // 存储
    setItem(stateRow)
    // console.log('state', state)
  })
  return readonly(state)
}

export default useStore
