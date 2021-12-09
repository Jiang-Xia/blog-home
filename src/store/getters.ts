import { getInfo, getToken } from '@/utils/cookie'
const getters = {
  userInfo: (state: any) => {
    // console.log(state.user.userIn, getInfo())
    if (state.user.userInfo && Object.keys(state.user.userInfo).length) {
      return state.user.userInfo
    } else {
      return getInfo()
    }
  },
  toekn: (state: any) => state.user.toekn || getToken()
}
export default getters