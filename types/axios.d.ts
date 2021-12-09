/*
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-08-06 14:20:46
 * @LastEditTime: 2021-12-09 08:58:53
 * @Description:
 * @FilePath: \blog-home\types\axios.d.ts
 */
// typings/axios.d.ts

import axios from 'axios'

declare module 'axios' {
  // https://github.com/axios/axios/issues/1510
  export interface AxiosResponse<T> {
    code: number
    result?: boolean
    message?: string
  }
}
