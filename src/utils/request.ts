import axios from 'axios'
// import router from '@/router/'
import { getToken, removeToken, removeInfo } from '@/utils/cookie'
// import { getCode } from '@/utils/common'
// import showXiaLogin from '@/components/xia-login/main'

import { ElMessage } from 'element-plus'

interface MessageConfig {
  message: string
  duration: number
  type: string
}
function errorMsg(msg: string) {
  ElMessage.error(msg)
}
const $axios = axios.create({
  timeout: 4290000,
  baseURL: ''
})
$axios.interceptors.request.use(
  (config) => {
    // openLoading()
    const token = getToken()
    // if (config.method === 'get') {
    //   // 解决get请求axios不能设置Content-Type
    //   config.data = true
    // }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (token) {
      // 请求头部添加token
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
/**
 * 响应拦截器
 * 用于处理loading状态关闭、请求成功回调、响应错误处理
 */
$axios.interceptors.response.use(
  (response) => {
    // closeLoading()
    // console.log(response.data)
    const status = response.status
    const code = response.data.code
    if ((status >= 200 && status < 300) || status === 304) {
      // const pollingStatus = response.data.data.status
      if (code === '00000') {
        return Promise.resolve(response.data)
      } else {
        errorMsg(response.data.msg)
        return Promise.reject(new Error(response.data || 'Error'))
      }
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    console.error(error)
    if (error.response) {
      const data = error.response && error.response.data
      switch (error.response.status) {
        case 401:
          if (/10$/.test(data.code) || /11$/.test(data.code)) {
            // 授权无效或者授权超时
            errorMsg(data.msg)
            // router.replace({
            //   name: 'timeOut',
            //   query: {
            //     redirect: router.currentRoute.fullPath
            //   }
            // })

            removeToken()
            removeInfo()
          } else {
            errorMsg(data.msg)
          }
          break
        case 404:
          errorMsg('网络请求不存在')
          break
        default:
          errorMsg(error.response.data.msg)
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        errorMsg('请求超时！请检查网络是否正常')
      } else {
        errorMsg('请求失败，请检查网络是否已连接')
      }
    }
    return Promise.reject(error)
  }
)
export default $axios
