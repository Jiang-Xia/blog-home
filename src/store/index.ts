import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import article from './modules/article'
import user from './modules/user'
import getters from './getters'
export interface State {
  count: number
}
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: {
    article,
    user
  },
  getters,
  mutations: {},
  actions: {}
})

export default store
