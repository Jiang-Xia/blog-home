import { Module } from 'vuex'

interface State {
  count: number
}
const store: Module<State, unknown> = {
  namespaced: true,
  state() {
    return {
      count: 0
    }
  },
  getters: {},
  // 只能同步
  mutations: {},
  // 支持异步,可以考虑引入API
  actions: {}
}

export default store
