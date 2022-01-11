import { XState } from './index'
// 创建 action 修改 State的方法
// 修改token
function updateToken(state: XState) {
  return (token: string) => {
    state.token = token
  }
}
// 更新userInfo
function updateUserInfo(state: XState) {
  return (userInfo: any) => {
    state.userInfo = { ...state.userInfo, ...userInfo }
  }
}

function updateUserConfig(state: XState) {
  return (userConfig: any) => {
    state.userConfig = { ...state.userConfig, ...userConfig }
  }
}

// 创建action
export function createAction(state: XState) {
  return {
    updateToken: updateToken(state),
    updateUserInfo: updateUserInfo(state),
    updateUserConfig: updateUserConfig(state)
  }
}
