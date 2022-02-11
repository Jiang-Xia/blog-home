import request from '@/utils/request'
export const getArticleList = async (data: any) => {
  const res = await request({
    url: '/article/list',
    method: 'post',
    data
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

export const editArticle = async (data: any) => {
  const res = await request({
    url: '/article/edit',
    method: 'post',
    data
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

// 更新阅读量
export const updateViews = async (data: any) => {
  const res = await request({
    url: '/article/views',
    method: 'post',
    data
  })
  return res.data
}

// 更新点赞数
export const updateLikes = async (data: any) => {
  const res = await request({
    url: '/like',
    method: 'post',
    data
  })
  return res.data
}

// 必应每日一图
export const dailyImage = async (n?: number) => {
  const res = await request({
    url: '/resources/daily-img',
    method: 'get',
    params: { n }
  })
  return res.data
}

// 获取文章归档
export const getArchives = async () => {
  const res = await request({
    url: '/article/archives',
    method: 'get'
  })
  return res.data
}
