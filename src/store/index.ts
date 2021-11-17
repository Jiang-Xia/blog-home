import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import Article from './modules/article'
import User from './modules/user'
export interface State {
  count: number
}
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: {
    Article,
    User
  }
})

export default store
