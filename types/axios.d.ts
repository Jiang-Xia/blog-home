/*
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-08-06 14:20:46
 * @LastEditTime: 2021-08-09 17:14:11
 * @Description:
 * @FilePath: \xia-admin\types\axios.d.ts
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

import Mock from 'mockjs'
declare module 'Mock' {}
