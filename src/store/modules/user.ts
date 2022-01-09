import { Module } from 'vuex'
import { reactive } from 'vue'
import { userLogin } from '@/api/user'
import { setToken, setInfo, removeToken, removeInfo } from '@/utils/cookie'
import { Message } from '@arco-design/web-vue'
interface State {
  token: string
  userInfo: object
  userCongfig: object
}
const store: Module<State, unknown> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userCongfig: {
        // 是否开启纸感
        paperFeeling: true
      }
    }
  },
  getters: {
    getUserCongfig(state) {
      // 直接使用localStorage获取会改变响应性 视图会不更新
      // let local = localStorage.getItem('userCongfig')
      return state.userCongfig
    }
  },
  // 只能同步
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_USER_CONFIG: (state, userCongfig) => {
      state.userCongfig = { ...state.userCongfig, ...userCongfig }
      localStorage.setItem('userCongfig', JSON.stringify(userCongfig))
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
      Message.success('登录成功')
      return res
    },
    // 用户退出
    async logout({ commit }) {
      await setTimeout(() => {
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', {})
        removeToken()
        removeInfo()
        Message.success('退出成功')
      }, 500)
      return true
    },
    async userCongfig({ commit }, userCongfig) {
      commit('SET_USER_CONFIG', userCongfig)
    }
  }
}
export default store
