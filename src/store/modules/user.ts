import { Module } from 'vuex'
import { userLogin } from '@/api/user'
import { setToken, setInfo, removeToken, removeInfo } from '@/utils/cookie'
import { message } from 'ant-design-vue'
interface State {
  token: string
  userInfo: object
}
const store: Module<State, unknown> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {},
  // 只能同步
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  // 支持异步,可以考虑引入API
  actions: {
    async login({ commit }, userInfo) {
      const res = await userLogin(userInfo)
      const user = res.info.user
      const token = res.info.token
      setToken('Bearer', token)
      setInfo(user)
      commit('SET_TOKEN', token)
      commit('SET_USER_INFO', user)
      message.success('登录成功')
      return res
    },
    // 用户退出
    async logout({ commit }) {
      await setTimeout(() => {
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', {})
        removeToken()
        removeInfo()
        message.success('退出成功')
      }, 500)
      return true
    }
  }
}
export default store
