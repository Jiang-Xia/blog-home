import request from '@/utils/request'
export const getArticleList = async (params: any) => {
  const res = await request({
    url: '/article/list',
    method: 'get',
    params
  })
  return res.data
}
export const getArticleInfo = async (params: any) => {
  const res = await request({
    url: '/article/info',
    method: 'get',
    params
  })
  return res.data
}

export const createArticle = async (data: any) => {
  const res = await request({
    url: '/article/create',
    method: 'post',
    data
  })
  return res.data
}

export const addArticle = async (params: any) => {
  const res = await request({
    url: '/article/create',
    method: 'get',
    params
  })
  return res.data
}
export const delArticle = async (params: any) => {
  const res = await request({
    url: '/article/delete',
    method: 'get',
    params
  })
  return res.data
}
